import { EventEmitter } from 'events'
import { join, parse } from 'node:path'
import { minifyJS } from '../codeModifiers/codeMinifiers.js'
import { renameEsImports } from '../codeModifiers/renameEsImports.js'
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
import { isClientJSFile, isClientPath, isJSFile } from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'

class FileManagerPublicJS extends EventEmitter {
  /** @type {AppFileManagers} */
  appFileManagers

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {Map<string, string[]>} */
  depsMap = new Map()

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    super()

    this.appConfig = appConfig
    this.appPaths = appPaths
    this.appFileManagers = appFileManagers

    this.#initialize()
  }

  /**
   * Render all raw files into output .js files
   *
   * @param {string} componentName
   * @returns {Promise<void>}
   * @throws
   * An error if the component dir doesn't exist
   */
  async renderComponent(componentName) {
    const inputDir = this.appPaths.components
    const componentDir = join(inputDir, componentName)

    if (!(await dirExists(componentDir))) {
      throw new Error(`Component directory "${componentDir}" doesn't exist.`)
    }

    await this.#renderAllFiles(componentName)
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
   * @param {{minify: boolean, renameEsImports: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(fileAbsPath, string, options) {
    let output = string

    /** Put modifications below */

    if (options.renameEsImports) {
      const esImports = renameEsImports(output)

      output = esImports.code

      if (esImports.deps.length > 0) {
        this.depsMap.set(fileAbsPath, esImports.deps)
      }
    }

    if (options.minify) {
      output = await minifyJS(output, fileAbsPath)
    }

    return output
  }

  /**
   * @param {string} componentName
   * @returns {Promise<void>}
   */
  async #renderAllFiles(componentName) {
    const componentDir = join(this.appPaths.components, componentName)

    if (!(await dirExists(componentDir))) {
      return
    }

    await this.#renderDir(componentDir)
  }

  /**
   * @param {string} dir
   * @returns {Promise<void>}
   */
  async #renderDir(dir) {
    const scanDir = await readDir(dir)

    for (const fileName of scanDir) {
      const filePath = join(dir, fileName)
      const relativePath = filePath.replace(this.appPaths.components, '')
      const isClient = isClientPath(
        relativePath, this.appConfig.pathNames.clientDirName
      )

      if (!isClient) {
        continue
      }

      if (await isDir(filePath)) {
        await this.#renderDir(filePath)
      }
      else {
        if (
          isClientJSFile(relativePath, this.appConfig.pathNames.clientDirName)
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

    const inputFile = join(this.appPaths.components, relativePath)
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
    }
    else if (inputMtime.getTime() > outputMtime.getTime()) {
      let contents = (await readFile(inputFile)).toString().trim()

      contents = await this.#modifyFileContents(
        inputFile,
        contents,
        {
          renameEsImports: true,
          minify: !this.appConfig.development
        }
      )

      await writeFile(outputFile, contents)
      await setTimes(outputFile, inputMtime, inputMtime)
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.appConfig.development) return

    const componentsDir = this.appPaths.components

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const relativePath = fullPath.replace(componentsDir, '')
      const isPublicJS = isClientJSFile(
        relativePath,
        this.appConfig.pathNames.clientDirName
      )

      if (isPublicJS) {
        await this.#renderFile(relativePath)

        const isViewJS = isJSFile(
          relativePath,
          new Set([this.appConfig.pathNames.viewsDirName])
        )

        if (isViewJS) {
          this.emit('updatedServerSideJs', 'view', fullPath)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.componentsDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerPublicJS }
