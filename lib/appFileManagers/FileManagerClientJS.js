import { EventEmitter } from 'events'
import { join, parse } from 'node:path'
import { minifyJS } from '../codeModifiers/codeMinifiers.js'
import {
  dirExists,
  ensureDirSync,
  fileExists,
  fileStats,
  isDir,
  readDir,
  readFile,
  remove,
  setTimes,
  writeFile
} from '../functions/fileSystem.js'
import {
  isClientJSFile,
  isClientPath,
  isJSFile
} from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'
import { ImportMaps } from './ImportMaps.js'

class FileManagerClientJS extends EventEmitter {
  /** @type {AppFileManagers} */
  appFileManagers

  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {ImportMaps} */
  #importMaps

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   * @param {ImportMaps} importMaps
   */
  constructor(appConfig, appPaths, appFileManagers, importMaps) {
    super()

    this.appConfig = appConfig
    this.appPaths = appPaths
    this.appFileManagers = appFileManagers
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
    const inputDir = this.appPaths.modules
    const moduleDir = join(inputDir, moduleName)

    if (!(await dirExists(moduleDir))) {
      throw new Error(`Module directory "${moduleDir}" doesn't exist.`)
    }

    await this.#renderAllFiles(moduleName)
  }

  /**
   * @returns {void}
   */
  #initialize() {
    ensureDirSync(this.appPaths.output)

    if (this.appConfig.development) {
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
    const moduleDir = join(this.appPaths.modules, moduleName)

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
      const filePath = join(dir, fileName)
      const relativePath = filePath.replace(this.appPaths.modules, '')
      const isClient = isClientPath(
        relativePath, this.appConfig.dirNames.client
      )

      if (!isClient) {
        continue
      }

      if (await isDir(filePath)) {
        await this.#renderDir(filePath)
      }
      else {
        if (
          isClientJSFile(relativePath, this.appConfig.dirNames.client)
        ) {
          try {
            await this.#renderFile(relativePath)
          }
          catch (error) {
            error.message = `Failed to render file file:///${filePath.replace(/\\/ug, '/')}`

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

    if (parsedPath.ext !== '.js') {
      throw new Error(`Wrong extension for public file. Expected ".js", got "${parsedPath.ext}"`)
    }

    const inputFile = join(this.appPaths.modules, relativePath)
    const outputFile = join(this.appPaths.output, relativePath)

    // Get modified time of input and output files
    let inputMtime = new Date(0)
    let outputMtime = new Date(0)

    try {
      inputMtime = (await fileStats(inputFile)).mtime
      outputMtime = (await fileStats(outputFile)).mtime
    }
    catch (e) {
      // Nothing here, because it's expected for the output file to not exist
    }

    if (!(await fileExists(inputFile))) {
      await remove(outputFile)
      await this.#importMaps.deleteImportsForFile(relativePath)
    }
    else if (inputMtime.getTime() > outputMtime.getTime()) {
      const minify = !this.appConfig.development
      let contents = (await readFile(inputFile)).toString()

      contents = await this.#modifyFileContents(inputFile, contents, { minify })

      await writeFile(outputFile, contents)
      await setTimes(outputFile, inputMtime, inputMtime)

      await this.#importMaps.injectFromAppModuleFile(inputFile, relativePath)
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.appConfig.development) return

    const modulesDir = this.appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')
      const isClientJS = isClientJSFile(
        relativePath,
        this.appConfig.dirNames.client
      )

      if (isClientJS) {
        await this.#renderFile(relativePath)

        const isViewJS = isJSFile(
          relativePath,
          new Set([this.appConfig.dirNames.views])
        )

        if (isViewJS) {
          this.emit('updatedServerSideJs', 'view', fullPath)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerClientJS }
