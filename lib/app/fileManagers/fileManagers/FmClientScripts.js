import { EventEmitter } from 'events'
import { parse, sep } from 'node:path'
import ts from 'typescript'
import { minifyJS } from '../../../codeModifiers/codeMinifiers.js'
import {
  dirExists,
  dirExistsSync,
  fileExists,
  isDir,
  readDir,
  readFile,
  remove,
  setTimes,
  writeFile
} from '../../../functions/fileSystem.js'
import {
  isClientPath,
  isClientScript, isScriptExt, isTsExt,
  normalizePathSlashes
} from '../../../functions/urlsAndPaths.js'
import { FileManagers } from '../FileManagers.js'
import { ImportMaps } from '../ImportMaps.js'
import { getPathMtime } from './functions/common.js'

class FmClientScripts extends EventEmitter {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /** @type {ImportMaps} */
  #importMaps

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   * @param {ImportMaps} importMaps
   */
  constructor(appConfig, appPaths, appFileManagers, importMaps) {
    super()

    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers
    this.#importMaps = importMaps

    this.#initialize()
  }

  /**
   * Render all raw files into output .js files
   *
   * @param {string} moduleName
   * @returns {Promise<void>}
   * @throws {Error} If the module dir doesn't exist
   */
  async renderModule(moduleName) {
    const moduleDir = this.#appPaths.modules + sep + moduleName

    if (!(await dirExists(moduleDir))) {
      throw new Error(`Module directory "${moduleDir}" doesn't exist.`)
    }

    await this.#renderAllFiles(moduleName)
  }

  /**
   * @returns {void}
   * @throws {Error}
   */
  #initialize() {
    if (!(dirExistsSync(this.#appPaths.output))) {
      throw new Error(`Output dir not found: ${this.#appPaths.output}`)
    }

    if (this.#appConfig.development) {
      this.#watchForFileChanges()
    }
  }

  /**
   * Transpile/minify the input string
   *
   * @param {string} fileAbsPath
   * @param {string} string
   * @param {{minify: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(fileAbsPath, string, options) {
    let output = string

    /** Put modifications below */

    if (options.minify) {
      output = await minifyJS(output, fileAbsPath)
    }

    return output
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<void>}
   */
  async #renderAllFiles(moduleName) {
    const moduleDir = this.#appPaths.modules + sep + moduleName

    if (!(await dirExists(moduleDir))) {
      return
    }

    await this.#renderDir(moduleDir)
  }

  /**
   * @param {string} dir
   * @returns {Promise<void>}
   */
  async #renderDir(dir) {
    const scanDir = await readDir(dir)

    for (const fileName of scanDir) {
      const filePath = dir + sep + fileName
      const relativePath = filePath.replace(this.#appPaths.modules, '')
      const isClient = isClientPath(
        relativePath, this.#appConfig.dirNames.client
      )

      if (!isClient) {
        continue
      }

      if (await isDir(filePath)) {
        await this.#renderDir(filePath)
      }
      else {
        if (
          isClientScript(relativePath, this.#appConfig.dirNames.client)
        ) {
          try {
            await this.#renderFile(relativePath)
          }
          catch (error) {
            error.message = `Failed to render file file:///${normalizePathSlashes(filePath)}`

            throw error
          }
        }
      }
    }
  }

  /**
   * @param {string} relativePath
   * @returns {Promise<void>}
   * @throws {Error} If the file extension is not allowed
   */
  async #renderFile(relativePath) {
    const parsedPath = parse(relativePath)

    if (!isScriptExt(parsedPath.ext)) {
      throw new Error(`Wrong extension for public file. Expected ".js", got "${parsedPath.ext}"`)
    }

    const inputFile = this.#appPaths.modules + relativePath
    const outputFile = this.#appPaths.output + relativePath

    const inputMtime = await getPathMtime(inputFile)
    const outputMtime = await getPathMtime(outputFile)

    if (!(await fileExists(inputFile))) {
      await remove(outputFile)
      await this.#importMaps.deleteImportsForFile(relativePath)
    }
    else if (inputMtime > outputMtime) {
      const development = this.#appConfig.development === true
      let contents = (await readFile(inputFile)).toString()

      if (isTsExt(parsedPath.ext) && !parsedPath.name.endsWith('.d')) {
        const fileName = parsedPath.name + parsedPath.ext
        const transpiled = this.#tsTranspileCode(
          contents,
          fileName,
          development
        )
        contents = transpiled.outputText
      }

      contents = await this.#modifyFileContents(
        inputFile,
        contents,
        { minify: !development }
      )

      await writeFile(outputFile, contents)
      await setTimes(outputFile, inputMtime / 1000, inputMtime / 1000)

      await this.#importMaps.injectFromAppModuleFile(inputFile, relativePath)
    }
  }

  /**
   * @param {string} sourceCode
   * @param {string} fileName Should be the name of the original TS file.
   * When used properly, the original TS file appears in DevTools -> Sources.
   * If omitted, the default name would be 'module.ts', and the problem is
   * bigger when there are multiple .ts files in the same dir.
   * @param {boolean} inlineSourceMap
   * @returns {ts.TranspileOutput}
   */
  #tsTranspileCode(sourceCode, fileName, inlineSourceMap = false) {
    return ts.transpileModule(
      sourceCode,
      {
        fileName: fileName,
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          allowImportingTsExtensions: true,
          sourceMap: false,
          inlineSourceMap: inlineSourceMap,
          inlineSources: inlineSourceMap,
        }
      }
    )
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.#appConfig.development) return

    const modulesDir = this.#appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')

      if (isClientScript(relativePath, this.#appConfig.dirNames.client)) {
        await this.#renderFile(relativePath)

        this.emit('file', 'client', fullPath)
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FmClientScripts }
