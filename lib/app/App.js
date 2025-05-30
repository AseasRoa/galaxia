import { resolve, sep } from 'node:path'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import {
  dirExists,
  dirExistsSync,
  ensureDirSync
} from '../functions/fileSystem.js'
import {
  extractNodeModulePathname,
  isClientCssFile,
  isClientPath,
  isFilePath,
  isRoutesScript,
  pathSplit,
  removeVersionFromPathname
} from '../functions/urlsAndPaths.js'
import { AppStaticFilesServer } from '../server/AppStaticFilesServer.js'
import { HooksRunner } from '../server/HooksRunner.js'
import { HttpContext } from '../server/HttpContext.js'
import configDefaults from './appConfig/configDefaults.js'
import { AppModules } from './AppModules.js'
import { EarlyHints } from './EarlyHints.js'
import { FileManagers } from './fileManagers/FileManagers.js'

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

  /** @type {HooksRunner | null} */
  #hooksRunner = null

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

    this.#config.development = this.#development

    const firstRun = (!await dirExistsSync(this.#paths.output))

    if (firstRun) {
      await ensureDirSync(this.#paths.output)
    }

    const appFileManagers = new FileManagers(this.config, this.paths)

    if (firstRun) {
      await appFileManagers.ensureAllModulesAreRendered()
    }

    const earlyHints = new EarlyHints(this.config, this.paths, appFileManagers)

    this.#staticFiles = new AppStaticFilesServer(
      this.config, this.paths, appFileManagers, earlyHints
    )
    this.#appModules = new AppModules(
      this.config, this.paths, appFileManagers, earlyHints
    )
    this.#hooksRunner = new HooksRunner()
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
    const isRoutes = isRoutesScript(pathnameSplitForFiles, dirNames.routes)
    const isClientCss = isClientCssFile(
      pathnameSplitForFiles,
      dirNames.client,
      dirNames.css
    )
    const forbidDirectFile = (
      isRoutes
      || (isClient && !isClientCss && pathnameSplitForFiles[2] === dirNames.css)
    )
    const tryDirectFile = !forbidDirectFile

    if (
      isClient
      || isRoutes
      || isClientCss
    ) {
      return this.#processRequestAsStaticFile(
        httpContext,
        pathnameSplitForFiles,
        tryDirectFile
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
   * @param {boolean} tryDirectFile
   * @returns {Promise<void>}
   * @throws {Error}
   */
  async #processRequestAsStaticFile(
    httpContext,
    pathnameSplitForFiles,
    tryDirectFile
  ) {
    if (this.#appModules === null || this.#staticFiles === null) {
      throw new Error('The app is not started')
    }

    const moduleName = pathnameSplitForFiles[0] ?? ''

    if (this.#hooksRunner) {
      await this.#hooksRunner.runFromModule(
        this.#config, this.#paths, moduleName, 'static', httpContext)
    }

    await this.#staticFiles.deliverStaticFile(
      httpContext,
      `/${pathnameSplitForFiles.join('/')}`,
      tryDirectFile
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
    return `${this.#rootPath + sep
      + this.#config.dirNames.dist + sep
    }.cache-${(this.#development) ? 'dev' : 'prod'}`
  }
}

export { App }
