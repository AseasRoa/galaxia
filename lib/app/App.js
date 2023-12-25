import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import { dirExists } from '../functions/fileSystem.js'
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
import { AppComponents } from './AppComponents.js'
import { configDefaults } from './configDefaults.js'

/** The app wrapper */
class App {
  /** @type {AppComponents | null} */
  #appComponents = null

  /** @type {AppFileManagers | null} */
  #appFileManagers = null

  /** @type {string} */
  #appPath

  /** @type {string} */
  #componentsDirName = 'components'

  /** @type {app.Config} */
  #config = configDefaults

  /** @type {boolean} */
  #development

  /** @type {app.Paths} */
  #paths

  /** @type {AppStaticFilesServer | null} */
  #staticFiles = null

  /**
   * @param {string} appPath
   * @param {boolean} development
   */
  constructor(appPath, development) {
    const componentsPath = join(appPath, this.#componentsDirName)

    this.#development = development
    this.#appPath = resolve(appPath)
    this.#paths = {
      root: this.#appPath,
      components: componentsPath,
      output: this.#getOutputFilesDirectory(appPath)
    }
  }

  /**
   * @returns {app.Config}
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
    if (this.#staticFiles === null || this.#appComponents === null) {
      throw new Error('The app is not started')
    }

    let pathnameSplit = pathSplit(
      removeVersionFromPathname(exchange.request.url.pathname)
    )

    const pathnameSplitForFiles = [...pathnameSplit]

    if (pathnameSplitForFiles.length === 1) {
      pathnameSplitForFiles.unshift('index')
    }

    if (pathnameSplit.length === 0) {
      pathnameSplit = ['index']
    }

    const { routesDirName } = this.#config.pathNames

    const isFile = this.#isFilePath(exchange.request.url.pathname)
    const isStyleFile = isClientCssFile(pathnameSplitForFiles)
    const isClient = isClientPath(
      pathnameSplitForFiles,
      this.#config.pathNames.clientDirName
    )
    const isRouter = isRouterFile(pathnameSplitForFiles, routesDirName)
    const moduleName = extractNodeModuleName(pathnameSplitForFiles)

    // 1) request type: .../@modules/moduleName
    if (moduleName) {
      await this.#staticFiles.parseNodeModule(exchange, moduleName)

      return
    }

    // 2) request type: .../file.ext?variable=value
    if (isFile && (isStyleFile || isClient || isRouter)) {
      const componentName = pathnameSplitForFiles[0] ?? ''

      if (componentName) {
        try {
          await this.#appComponents.ensureComponentIsRendered(componentName)
        }
        catch (e) {
          // nothing
        }
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
    await this.#appComponents.parseRequest(exchange, pathnameSplit)
  }

  /**
   * @returns {Promise<void>}
   */
  async start() {
    if (!(await dirExists(this.#paths.components))) {
      throw new Error(`You should create "${this.#componentsDirName}" dir`)
    }

    const configReader = new ConfigReaderAndParser()
    const configFileNames = (this.#development)
      ? ['galaxia.dev.config', 'galaxia.config']
      : ['galaxia.config']

    this.#config = await configReader.fromFile(
      configDefaults,
      this.#appPath,
      configFileNames
    )

    this.#config.development = this.#development
    this.#appFileManagers = new AppFileManagers(this.config, this.paths)
    this.#staticFiles = new AppStaticFilesServer(
      this.config, this.paths, this.#appFileManagers
    )
    this.#appComponents = new AppComponents(
      this.config, this.paths, this.#appFileManagers
    )
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
