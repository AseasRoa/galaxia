import { tmpdir } from 'node:os'
import { join, resolve, sep } from 'node:path'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import { dirExists, ensureDirSync } from '../functions/fileSystem.js'
import {
  extractNodeModuleName,
  isClientCssFile,
  isClientPath,
  isRouterFile,
  pathSplit,
  removeVersionFromPathname,
  replacePathSeparators
} from '../functions/urlsAndPaths.js'
import { AppStaticFilesServer } from '../server/AppStaticFilesServer.js'
import { HttpExchange } from '../server/HttpExchange.js'
import { AppModules } from './AppModules.js'
import { configDefaults } from './configDefaults.js'
import { Hooks } from './Hooks.js'

/** The app wrapper */
class App {
  /** @type {AppModules | null} */
  #appModules = null

  /** @type {AppFileManagers | null} */
  #appFileManagers = null

  /** @type {string} */
  #rootPath

  /** @type {string} */
  #modulesDirName = 'app'

  /** @type {app.FullConfig} */
  #config = configDefaults

  /** @type {boolean} */
  #development

  /** @type {app.Paths} */
  #paths

  /** @type {AppStaticFilesServer | null} */
  #staticFiles = null

  /** @type {Hooks | null} */
  #hooks = null

  /**
   * @param {string} appPath
   * @param {boolean} development
   */
  constructor(appPath, development) {
    const modulesPath = join(appPath, this.#modulesDirName)

    this.#development = development
    this.#rootPath = resolve(appPath)
    this.#paths = {
      root: this.#rootPath,
      modules: modulesPath,
      output: this.#getOutputFilesDirectory(appPath)
    }
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
   * @param {HttpExchange} exchange
   */
  async parseRequest(exchange) {
    if (this.#staticFiles === null || this.#appModules === null) {
      throw new Error('The app is not started')
    }

    const { dirNames } = this.#config

    const pathnameSplit = pathSplit(
      removeVersionFromPathname(exchange.request.url.pathname)
    )
    const pathnameSplitForFiles = (pathnameSplit.length === 1)
      ? [dirNames.layout, dirNames.client, pathnameSplit[0] ?? '']
      : pathnameSplit

    if (pathnameSplit.length === 0) {
      pathnameSplit.push('index')
    }

    const isFile = this.#isFilePath(
      exchange.request.url.pathname
    )
    const isStyleFile = isClientCssFile(
      pathnameSplitForFiles,
      dirNames.styles
    )
    const isClient = isClientPath(
      pathnameSplitForFiles,
      dirNames.client
    )
    const isRouter = isRouterFile(
      pathnameSplitForFiles,
      dirNames.routes
    )
    const moduleName = extractNodeModuleName(pathnameSplitForFiles)

    // 1) request type: .../@modules/moduleName
    if (!isFile && moduleName) {
      await this.#staticFiles.parseNodeModule(exchange, moduleName)

      return
    }

    // 2) request type: .../file.ext?variable=value
    if (isFile && (isStyleFile || isClient || isRouter)) {
      const moduleName = pathnameSplitForFiles[0] ?? ''

      if (moduleName) {
        try {
          await this.#appModules.ensureModuleIsRendered(moduleName)
        }
        catch (e) {
          // nothing
        }
      }

      if (this.#hooks) {
        // TODO un-hardcode the paths below, put them into configuration
        const hooksFilePath = `${this.#paths.modules}${sep}${moduleName}${sep}hooks${sep}static.hooks.js`

        await this.#hooks.run(exchange, hooksFilePath)
      }

      await this.#staticFiles.parseStaticFile(
        exchange,
        `/${pathnameSplitForFiles.join('/')}`,
        !isRouter
      )

      return
    }

    // 3) forbidden file
    if (isFile && !isClient) {
      exchange.response.statusCode = 403
      exchange.response.end()

      return
    }

    // 4) request type: app module
    await this.#appModules.parseRequest(exchange, pathnameSplit)
  }

  /**
   * @returns {Promise<void>}
   */
  async start() {
    if (!(await dirExists(this.#paths.modules))) {
      throw new Error(`You should create "${this.#modulesDirName}" dir`)
    }

    await ensureDirSync(this.#paths.output)

    const configReader = new ConfigReaderAndParser()
    const configFileNames = (this.#development)
      ? ['galaxia.dev.config', 'galaxia.config']
      : ['galaxia.config']

    this.#config = await configReader.fromFile(
      configDefaults,
      this.#rootPath,
      configFileNames
    )

    this.#config.development = this.#development
    this.#appFileManagers = new AppFileManagers(
      this.config, this.paths
    )
    this.#staticFiles = new AppStaticFilesServer(
      this.config, this.paths, this.#appFileManagers
    )
    this.#appModules = new AppModules(
      this.config, this.paths, this.#appFileManagers
    )
    this.#hooks = new Hooks()
  }

  /**
   * @param {string} appPath
   * @returns {string}
   */
  #getOutputFilesDirectory(appPath) {
    return join(
      tmpdir(),
      'nodejs-galaxia',
      `public-${(this.#development) ? 'dev' : 'prod'}`,
      replacePathSeparators(appPath, '-')
    )
  }

  /**
   * @param {string} inputPath
   * @returns {boolean}
   */
  #isFilePath(inputPath) {
    /**
     * The fastest way to detect this seems to be regex.
     * I tried node's path.parse(), which is 2 times slower.
     * I also tried reversed for loop, which is even slower.
     */
    return /\.[\w]+$/u.test(inputPath)
  }
}

export { App }
