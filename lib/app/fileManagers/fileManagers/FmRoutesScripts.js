import { EventEmitter } from 'events'
import { basename, dirname, parse, sep } from 'node:path'
import { minifyJS } from '../../../codeModifiers/codeMinifiers.js'
import {
  dirExists,
  dirExistsSync,
  fileExists,
  readDir, setTimes,
  writeFile
} from '../../../functions/fileSystem.js'
import {
  isRoutesScript,
  normalizePathSlashes
} from '../../../functions/urlsAndPaths.js'
import { importSomeFile } from '../../../functions/utils.js'
import {
  RoutesFileGeneratorUsingTsCompiler
} from '../../routes/RoutesFileGeneratorUsingTsCompiler.js'
import { FileManagers } from '../FileManagers.js'
import { getPathMtime } from './functions/common.js'

class FmRoutesScripts extends EventEmitter {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /** @type {Map<string, app.ImportsCacheItem>} */
  #importsCache = new Map()

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    super()

    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers

    this.#initialize()
  }

  /**
   * @param {string} moduleName
   * @param {string} jsFileName
   * @param {string} [globalVersion]
   * @returns {Promise<app.ImportsCacheItem>}
   */
  async importFile(moduleName, jsFileName, globalVersion = '') {
    // "+" is much faster than path.join()
    const pathToFileWithoutExt
      = this.#appPaths.modules + sep
      + moduleName + sep
      + this.#appConfig.dirNames.routes + sep
      + jsFileName

    let exports = this.#importsCache.get(pathToFileWithoutExt)

    if (!exports) {
      exports = await importSomeFile(
        [pathToFileWithoutExt],
        ['js', 'mjs'],
        globalVersion
      )

      this.#importsCache.set(pathToFileWithoutExt, exports)
    }

    return exports
  }

  /**
   * Render all raw files into output .js files
   *
   * @param {string} moduleName
   * @returns {Promise<void>}
   * @throws
   * An error if the module dir doesn't exist
   */
  async renderModule(moduleName) {
    const inputDir = this.#appPaths.modules
    const moduleDir = inputDir + sep + moduleName

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
      output = await minifyJS(output)
    }

    return output
  }

  /**
   * Create special public versions of the routes files
   * that can be seen from the browser.
   *
   * @param {string} moduleName
   * @returns {Promise<void>}
   * @throws
   */
  async #renderAllFiles(moduleName) {
    const routesDir = this.#appConfig.dirNames.routes
    const dir = this.#appPaths.modules + sep + moduleName + sep + routesDir

    if (!(await dirExists(dir))) {
      return
    }

    const scanDir = await readDir(dir)

    for (const fileName of scanDir) {
      const relativePath = `/${moduleName}/${routesDir}/${fileName}`

      if (!isRoutesScript(relativePath, routesDir)) {
        continue
      }

      await this.#renderFile(dir + sep + fileName)
    }
  }

  /**
   * @param {string} inputFile
   * A path that ends up with this structure .../module/server/File.js
   * @returns {Promise<void>}
   * @throws If something is not as expected
   */
  async #renderFile(inputFile) {
    const parsedPath = parse(inputFile)
    const fileName = parsedPath.base
    const routesName = parsedPath.name
    const dirName = basename(dirname(inputFile))
    const moduleName = basename(dirname(dirname(inputFile)))
    const outputFile
      = this.#appPaths.output + sep
      + moduleName + sep
      + dirName + sep
      + fileName
    const routesDirName = this.#appConfig.dirNames.routes

    const inputMtime = await getPathMtime(inputFile)
    const outputMtime = await getPathMtime(outputFile)

    if (inputMtime <= outputMtime) {
      return
    }

    const ajaxVersion = (
      typeof this.#appConfig.ajax === 'object'
      && ('version' in this.#appConfig.ajax)
    )
      ? this.#appConfig.ajax.version
      : ''

    if (parsedPath.ext !== '.js') {
      throw new Error(`Wrong extension for a routes file. Expected ".js", got "${parsedPath.ext}"`)
    }

    if (dirName !== routesDirName) {
      throw new Error(`Wrong dir name for a routes file. Expected "${routesDirName}", got "${dirName}"`)
    }

    if (routesName && await fileExists(inputFile)) {
      let contents = ''

      try {
        contents = await new RoutesFileGeneratorUsingTsCompiler().generate(
          inputFile,
          moduleName,
          routesName,
          ajaxVersion
        )
      }
      catch (error) {
        throw new SyntaxError(`Failed to generate client-side routes file for "file:///${normalizePathSlashes(inputFile)}". ${error.message}`)
      }

      contents = await this.#modifyFileContents(
        inputFile,
        contents,
        {
          /*
           * Minifiers may not work correctly with class
           * methods names 'like/this'()
           */
          minify: !this.#appConfig.development
        }
      )

      await writeFile(outputFile, contents)
      await setTimes(outputFile, inputMtime / 1000, inputMtime / 1000)
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.#appConfig.development) return

    const routesDirName = this.#appConfig.dirNames.routes
    const modulesDir = this.#appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')

      if (isRoutesScript(relativePath, routesDirName)) {
        await this.#renderFile(fullPath)

        this.emit('file', 'route', fullPath)
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FmRoutesScripts }
