import { resolve, sep } from 'node:path'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import { dirExists, ensureDirSync } from '../functions/fileSystem.js'
import {
  extractNodeModulePathname,
  isClientCssFile,
  isClientPath,
  isFilePath,
  isRoutesFile,
  pathSplit,
  removeVersionFromPathname
} from '../functions/urlsAndPaths.js'
import { AppStaticFilesServer } from '../server/AppStaticFilesServer.js'
import { HttpContext } from '../server/HttpContext.js'
import configDefaults from './appConfig/configDefaults.js'
import { AppModules } from './AppModules.js'
import { EarlyHints } from './EarlyHints.js'
import { Hooks } from './Hooks.js'

/** The app wrapper */
class App {
  /** @type {AppModules | null} */
  #appModules = null

  /** @type {string} */
  #rootPath

  /** @type {app.FullConfig} */
  #config = configDefaults

  /** @type {boolean} */
  #development

  /** @type {app.Paths} */
  #paths = { root: '', modules: '', output: '' }

  /** @type {AppStaticFilesServer | null} */
  #staticFiles = null

  /** @type {Hooks | null} */
  #hooks = null

  /**
   * @param {string} appPath
   * @param {boolean} development
   */
  constructor(appPath, development) {
    this.#development = development
    this.#rootPath = resolve(appPath)
  }

  /**
   * @returns {app.FullConfig}
   */
  get config() {
    return this.#config
  }

  /**
   * @returns {boolean}
   */
  get development() {
    return this.#development
  }

  /**
   * @returns {app.Paths}
   */
  get paths() {
    return this.#paths
  }

  /**
   * @returns {Promise<void>}
   */
  async start() {
    const configReader = new ConfigReaderAndParser()
    const configFileNames = (this.#development)
      ? ['galaxia.dev.config', 'galaxia.config']
      : ['galaxia.prod.config', 'galaxia.config']

    this.#config = await configReader.fromFile(
      configDefaults,
      this.#rootPath,
      configFileNames
    )

    const modulesPath
      = this.#rootPath + sep
      + this.#config.dirNames.app + sep
      + this.#config.dirNames.modules

    this.#paths = {
      root: this.#rootPath,
      modules: modulesPath,
      output: this.#getOutputFilesDirectory()
    }

    if (!(await dirExists(this.#paths.modules))) {
      throw new Error(`You should create "${this.#paths.modules}" dir`)
    }

    await ensureDirSync(this.#paths.output)

    this.#config.development = this.#development

    const appFileManagers = new AppFileManagers(this.config, this.paths)
    const earlyHints = new EarlyHints(this.config, this.paths, appFileManagers)

    this.#staticFiles = new AppStaticFilesServer(
      this.config, this.paths, appFileManagers, earlyHints
    )
    this.#appModules = new AppModules(
      this.config, this.paths, appFileManagers, earlyHints
    )
    this.#hooks = new Hooks()
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {Promise<void>}
   */
  async processRequest(httpContext) {
    if (this.#staticFiles === null || this.#appModules === null) {
      throw new Error('The app is not started')
    }

    const { dirNames } = this.#config
    const pathnameWithoutVersion = removeVersionFromPathname(
      httpContext.request.url.pathname
    )
    const pathnameSplit = pathSplit(pathnameWithoutVersion)
    const pathnameSplitForFiles = (pathnameSplit.length === 1)
      ? [dirNames.layout, dirNames.client, pathnameSplit[0] ?? '']
      : pathnameSplit

    if (pathnameSplit.length === 0) {
      pathnameSplit.push('index')
    }

    const isFile = isFilePath(httpContext.request.url.pathname)
    const nodeModulePathname = extractNodeModulePathname(pathnameSplitForFiles)

    // 1) request type:
    // .../@modules/moduleName
    // .../@modules/moduleName/fileName.js
    if (nodeModulePathname !== '') {
      return this.#processRequestAsNodeModule(httpContext, nodeModulePathname)
    }

    // 2) request type: app module
    if (!isFile) {
      return this.#processRequestAsAppModule(httpContext, pathnameSplit)
    }

    // 3) request type: .../file.ext?variable=value
    const isClient = isClientPath(pathnameSplitForFiles, dirNames.client)
    const isRoutes = isRoutesFile(pathnameSplitForFiles, dirNames.routes)

    if (
      isClient
      || isRoutes
      || isClientCssFile(pathnameSplitForFiles, dirNames.styles)
    ) {
      return this.#processRequestAsStaticFile(
        httpContext,
        pathnameSplitForFiles,
        isRoutes
      )
    }

    // 4) forbidden file
    this.#processRequestForbiddenFile(httpContext)
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string} nodeModulePathname
   * @returns {Promise<void>}
   * @throws {Error}
   */
  #processRequestAsNodeModule(httpContext, nodeModulePathname) {
    if (this.#staticFiles === null) {
      throw new Error('The app is not started')
    }

    return this.#staticFiles.deliverNodeModule(httpContext, nodeModulePathname)
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string[]} pathnameSplit
   * @returns {Promise<void>}
   * @throws {Error}
   */
  #processRequestAsAppModule(httpContext, pathnameSplit) {
    if (this.#appModules === null) {
      throw new Error('The app is not started')
    }

    return this.#appModules.processRequest(httpContext, pathnameSplit)
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string[]} pathnameSplitForFiles
   * @param {boolean} isRoutes
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async #processRequestAsStaticFile(
    httpContext,
    pathnameSplitForFiles,
    isRoutes
  ) {
    if (this.#appModules === null || this.#staticFiles === null) {
      throw new Error('The app is not started')
    }

    const moduleName = pathnameSplitForFiles[0] ?? ''

    if (moduleName) {
      try {
        await this.#appModules.ensureModuleIsRendered(moduleName)
      }
      catch (error) {
        if (this.#development) {
          throw error
        }
      }
    }

    if (this.#hooks) {
      const hooksDir
        = this.#paths.modules + sep
        + moduleName + sep
        + this.#config.dirNames.hooks

      await this.#hooks.run(hooksDir, 'static', httpContext)
    }

    await this.#staticFiles.deliverStaticFile(
      httpContext,
      `/${pathnameSplitForFiles.join('/')}`,
      !isRoutes
    )
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {void}
   */
  #processRequestForbiddenFile(httpContext) {
    httpContext.response.statusCode = 403
    httpContext.response.end()
  }

  /**
   * @returns {string}
   */
  #getOutputFilesDirectory() {
    return this.#rootPath + sep
      + this.#config.dirNames.dist + sep
      + (`.cache-${(this.#development) ? 'dev' : 'prod'}`)
  }
}

export { App }
