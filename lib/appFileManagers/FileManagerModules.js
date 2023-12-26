import { readFile } from 'node:fs/promises'
import { dirname, join, parse, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { minifyCSS, minifyJS } from '../codeModifiers/codeMinifiers.js'
import { renameEsImports } from '../codeModifiers/renameEsImports.js'
import fs from '../functions/fileSystem.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class FileManagerModules {
  /**
   * @type {Map<string, {
   *   code: string,
   *   path: string,
   *   parsedPath: ParsedPath,
   *   stats: FileSystem.Stats
   * }>}
   */
  #modulesCache = new Map()

  /**
   * A cache used for paths only
   *
   * @type {Map<string, string>}
   */
  #pathsCache = new Map()

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {string} */
  modulesDir = ''

  /** @type {Map<string, string[]>} */
  depsMap = new Map()

  /** @type {string} */
  outputDir = ''

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   */
  constructor(appConfig, appPaths) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.modulesDir = this.appPaths.modules
    this.outputDir = this.appPaths.output
  }

  /**
   * @param {string} modulePath
   * @returns {Promise<{
   *   code: string,
   *   path: string,
   *   parsedPath: ParsedPath,
   *   stats: FileSystem.Stats
   * }>}
   * @throws {Error}
   */
  async getModuleFile(modulePath) {
    let isAppModule = true
    let modulePathClean = modulePath

    if (modulePath.startsWith('galaxia/')) {
      modulePathClean = modulePath.substring(8)
      isAppModule = false
    }

    let record = this.#modulesCache.get(modulePathClean)

    if (!record) {
      let whitelisted = false

      if (
        this.#isModulePathWhitelisted(
          this.appConfig.nodeModules.whitelist, modulePathClean
        )
      ) {
        whitelisted = true
      }
      else if (
        this.#isModulePathWhitelisted(
          // @ts-ignore
          this.appConfig.nodeModules.__whitelist, modulePathClean
        )
      ) {
        whitelisted = true
        isAppModule = false
      }

      if (!whitelisted) {
        const errorMessage = `Module "${modulePathClean}" is not whitelisted.`

        if (this.appConfig.development) {
          console.error(errorMessage)
        }

        throw new Error(errorMessage)
      }

      const path = await this.#getModuleFilePath(modulePathClean, isAppModule)
      const stats = await fs.fileStats(path)
      const parsedPath = parse(path)
      const bufferData = await readFile(join(parsedPath.dir, parsedPath.base))
      const code = await this.#modifyFileContents(
        modulePathClean,
        parsedPath,
        bufferData,
        {
          renameEsImports: true,
          minify: true
        }
      )

      record = { code, path, parsedPath, stats }

      this.#modulesCache.set(modulePathClean, record)
    }

    return record
  }

  /**
   * @param {string} dir
   * @returns {Promise<string | null>}
   */
  async #getClosestNodeModulesDir(dir) {
    let previousDir = dir
    let currentDir = dir

    while (true) {
      const nodeModulesDir = join(currentDir, 'node_modules')

      if (await fs.isDir(nodeModulesDir)) {
        return nodeModulesDir
      }

      previousDir = currentDir
      currentDir = dirname(currentDir)

      if (currentDir === previousDir) {
        break
      }
    }

    return null
  }

  /**
   * @param {string} moduleName
   * @param {boolean} [relativeToApp]
   * If true, look in node_modules of the app.
   * If false, look in node_modules of the framework.
   * @returns {Promise<string>}
   * @throws {Error}
   */
  async #getModuleFilePath(moduleName, relativeToApp = true) {
    const rootDir = relativeToApp
      ? this.appPaths.root
      : join(__dirname, '../../')

    return this.#getNodeModuleMainScriptPath(rootDir, moduleName)
  }

  /**
   * @param {string} rootDir
   * @param {string} modulePath
   * Usually the name of the module, like 'module-name', but it could be like
   * 'module-name/path-to/file'
   * @returns {Promise<string>}
   * @throws {Error} If the file could not be resolved
   */
  async #getNodeModuleMainScriptPath(rootDir, modulePath) {
    let mainFile = this.#pathsCache.get(modulePath)

    if (mainFile === undefined) {
      /*
       * When "node_modules" is resolved, it's node_modules of the app,
       * not the framework
       */

      const nodeModulesDir = (await this.#getClosestNodeModulesDir(rootDir))
        ?? resolve('node_modules')
      const indexOfFirstSlash = modulePath.indexOf('/')
      /*
       * // Some modules may contain .js
       * const isModulePath = extname(modulePath) === ''
       */
      const isModulePath = await fs.isDir(nodeModulesDir, modulePath)
      const isFilePath = !isModulePath
      const moduleName = (isModulePath)
        ? modulePath
        : modulePath.substring(0, indexOfFirstSlash)

      let moduleDir = (isFilePath)
        ? join(nodeModulesDir, moduleName)
        : join(nodeModulesDir, modulePath)

      if (!(await fs.dirExists(moduleDir))) {
        throw new Error(`Module ${moduleName} was not found in ${nodeModulesDir}`)
      }

      if (isModulePath) {
        let packageJsonFile = join(moduleDir, 'package.json')

        if (!(await fs.fileExists(packageJsonFile))) {
          moduleDir = join(nodeModulesDir, moduleName)
          packageJsonFile = join(moduleDir, 'package.json')

          if (!(await fs.fileExists(packageJsonFile))) {
            throw new Error(`package.json file doesn't exist for module located in ${moduleDir}`)
          }
        }

        const packageJsonContents = (await readFile(packageJsonFile)).toString()
        const packageJson = JSON.parse(packageJsonContents)
        const mainProp = packageJson['module']
          // eslint-disable-next-line max-len
          ?? ((typeof packageJson['exports'] === 'string') ? packageJson['exports'] : null)
          ?? packageJson['main']
          ?? './index.js'

        mainFile = join(moduleDir, mainProp)

        if (!(await fs.fileExists(mainFile))) {
          throw new Error(`No "main" file was found for module ${modulePath}`)
        }
      }
      else {
        mainFile = join(nodeModulesDir, modulePath)

        if (!(await fs.fileExists(mainFile))) {
          // Try /dist dir
          const slashIndex = modulePath.indexOf('/')

          mainFile = join(
            nodeModulesDir,
            modulePath.substring(0, slashIndex),
            'dist',
            modulePath.substring(slashIndex + 1)
          )

          if (!(await fs.fileExists(mainFile))) {
            throw new Error(`File not found: ${mainFile}`)
          }
        }
      }

      this.#pathsCache.set(modulePath, mainFile)
    }

    return mainFile
  }

  /**
   * @param {string[]} whitelist
   * @param {string} modulePathClean
   * @returns {boolean}
   */
  #isModulePathWhitelisted(whitelist, modulePathClean) {
    for (const whitelistedModuleName of whitelist) {
      if (
        modulePathClean === whitelistedModuleName
        || modulePathClean.startsWith(whitelistedModuleName + '/')
      ) {
        return true
      }
    }

    return false
  }

  /**
   * Modify files coming from node_modules, because they are not
   * pre-modified like the project files.
   *
   * - If we look at node_modules as a folder in which all files
   *   must be pre-processed, it contains too much files.
   * - Files in node_modules usually don't change, and because of
   *   that they don't need to be watched for changes and
   *   pre-processed automatically.
   * - Modifying them could be relatively fast actually, less than
   *   1ms per file.
   *
   * Downsides:
   * - In development, if these files change, the browser's cache
   *   needs to be cleared.
   * - Because the modified versions of these files are cached only
   *   in the process
   * (RAM, no HDD), this means that they are modified every time the
   * server is restarted. But because these files are not versioned
   * (in the link), if browser's cache is enabled, most of the time
   * they can be received from it.
   *
   * @param {string} moduleName
   * @param {ParsedPath} parsedPath
   * @param {Buffer} bufferData
   * @param {{minify: boolean, renameEsImports: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(moduleName, parsedPath, bufferData, options) {
    let code = bufferData.toString()

    if (parsedPath.ext === '.js' || parsedPath.ext === '.mjs') {
      if (options.renameEsImports) {
        const esImports = renameEsImports(code, parsedPath)

        code = esImports.code

        if (esImports.deps.length > 0) {
          this.depsMap.set(moduleName, esImports.deps)
        }
      }

      if (
        options.minify
        && !this.appConfig.development
        && !parsedPath.name.endsWith('.min')
      ) {
        code = await minifyJS(code)
      }
    }

    if (parsedPath.ext === '.css') {
      code = (options.minify && !this.appConfig.development)
        ? await minifyCSS(code)
        : code
    }

    return code
  }
}

export { FileManagerModules }
