import { readFile } from 'node:fs/promises'
import { dirname, join, parse, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { minifyCSS, minifyJS } from '../../../codeModifiers/codeMinifiers.js'
import fs from '../../../functions/fileSystem.js'
import { extractEntryPoint } from '../../../functions/packageJson.js'
import { ImportMaps } from '../ImportMaps.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class FmModules {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {ImportMaps} */
  #importMaps

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

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {ImportMaps} importMaps
   */
  constructor(appConfig, appPaths, importMaps) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#importMaps = importMaps
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
          this.#appConfig.nodeModules.whitelist, modulePathClean
        )
      ) {
        whitelisted = true
      }
      else if (
        this.#isModulePathWhitelisted(
          // @ts-expect-error
          this.#appConfig.nodeModules.__whitelist, modulePathClean
        )
      ) {
        whitelisted = true
        isAppModule = false
      }

      if (!whitelisted) {
        const errorMessage = `Module "${modulePath}" is not whitelisted.`

        if (this.#appConfig.development) {
          console.error(errorMessage)
        }

        throw new Error(errorMessage)
      }

      const rootDir = this.#getRootDir(isAppModule)
      const path = await this.#getNodeModuleMainScriptPath(
        rootDir,
        modulePathClean
      )
      const dependencies = await this.#getNodeModuleDependencies(
        rootDir,
        modulePathClean
      )

      const stats = await fs.fileStats(path)
      const parsedPath = parse(path)
      const bufferData = await readFile(parsedPath.dir + sep + parsedPath.base)
      const code = await this.#modifyFileContents(
        parsedPath,
        bufferData,
        { minify: !this.#appConfig.development }
      )

      record = { code, path, parsedPath, stats }

      this.#modulesCache.set(modulePathClean, record)
      await this.#importMaps.injectFromPackageJsonDependencies(
        modulePathClean,
        dependencies
      )
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
      const nodeModulesDir = currentDir + sep + 'node_modules'

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
   * @param {boolean} [relativeToApp]
   * If true, look in node_modules of the app.
   * If false, look in node_modules of the framework.
   * @returns {string}
   */
  #getRootDir(relativeToApp = true) {
    return (relativeToApp)
      ? this.#appPaths.root
      : join(__dirname, '../../')
  }

  /**
   * @param {string} rootDir
   * @param {string} modulePath
   * @returns {Promise<Object<string, string>>}
   */
  async #getNodeModuleDependencies(rootDir, modulePath) {
    const { packageJsonFile } = await this.#getNodeModuleData(
      rootDir,
      modulePath
    )

    const packageJsonData = await this.#readPackageJson(packageJsonFile)
    const dependencies = packageJsonData.dependencies ?? {}

    if (!(dependencies instanceof Object)) {
      throw new Error(`Missing dependencies for package ${modulePath}`)
    }

    return dependencies
  }

  /**
   * @param {string} rootDir
   * @param {string} modulePath
   * @returns {Promise<({
   *   isModulePath: boolean,
   *   nodeModulesDir: string,
   *   moduleName: string,
   *   moduleDir: string,
   *   packageJsonFile: string
   * })>}
   */
  async #getNodeModuleData(rootDir, modulePath) {
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
    const moduleName = (isFilePath && indexOfFirstSlash > -1)
      ? modulePath.substring(0, indexOfFirstSlash)
      : modulePath

    let moduleDir = (isFilePath)
      ? nodeModulesDir + sep + moduleName
      : nodeModulesDir + sep + modulePath

    if (!(await fs.dirExists(moduleDir))) {
      throw new Error(`Module ${moduleName} was not found in ${nodeModulesDir}`)
    }

    let packageJsonFile = moduleDir + sep + 'package.json'

    if (!(await fs.fileExists(packageJsonFile))) {
      moduleDir = nodeModulesDir + sep + moduleName
      packageJsonFile = moduleDir + sep + 'package.json'

      if (!(await fs.fileExists(packageJsonFile))) {
        throw new Error(`package.json file doesn't exist for module located in ${moduleDir}`)
      }
    }

    return {
      isModulePath,
      moduleDir,
      nodeModulesDir,
      moduleName,
      packageJsonFile
    }
  }

  /**
   * @param {string} packageJsonFile
   * @returns {Promise<any>}
   */
  async #readPackageJson(packageJsonFile) {
    const packageJsonContents = (await readFile(packageJsonFile)).toString()
    const packageJson = JSON.parse(packageJsonContents)

    return packageJson
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
      const moduleData = await this.#getNodeModuleData(rootDir, modulePath)
      const { isModulePath, nodeModulesDir, moduleDir, packageJsonFile }
        = moduleData

      if (isModulePath) {
        const packageJson = await this.#readPackageJson(packageJsonFile)
        const mainProp = extractEntryPoint(packageJson)

        mainFile = join(moduleDir, mainProp)

        if (!(await fs.fileExists(mainFile))) {
          mainFile = moduleDir + sep + 'index.js'
        }

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
   * @param {ParsedPath} parsedPath
   * @param {Buffer} bufferData
   * @param {{minify: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(parsedPath, bufferData, options) {
    let code = bufferData.toString()

    if (parsedPath.ext === '.js' || parsedPath.ext === '.mjs') {
      if (
        options.minify
        && !this.#appConfig.development
        && !parsedPath.name.endsWith('.min')
      ) {
        code = await minifyJS(code)
      }
    }

    if (parsedPath.ext === '.css') {
      code = (options.minify && !this.#appConfig.development)
        ? await minifyCSS(code)
        : code
    }

    return code
  }
}

export { FmModules }
