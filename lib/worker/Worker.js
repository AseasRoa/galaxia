import cluster from 'node:cluster'
import console from 'node:console'
import EventEmitter from 'node:events'
import process from 'node:process'
import { App } from '../app/App.js'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import { isDirSync } from '../functions/fileSystem.js'
import { isDebugMode } from '../functions/utils.js'
import { Ipc } from '../ipc/Ipc.js'
import { AppServer } from '../server/AppServer.js'
import { HTTP1Server } from '../server/httpServers/HTTP1Server.js'
import { HTTP2Server } from '../server/httpServers/HTTP2Server.js'
import { ColoredConsole } from './ColoredConsole.js'

const configReader = new ConfigReaderAndParser()

class Worker extends EventEmitter {
  /** @type {App | null} */
  #app = null

  /** @type {AppServer | null} */
  #server = null

  /** @type {EnvironmentVariables} */
  #workerConfig = {
    appPath: '',
    devMode: true,
    heartbeatInterval: 1000,
    showInitialMessages: true
  }

  /**
   * @param {EnvironmentVariables} config
   */
  constructor(config) {
    super()

    this.#initialize(config)
  }

  /**
   * @returns {boolean} Whether the application was started
   * in development environment
   */
  get development() {
    return this.#workerConfig.devMode
  }

  /**
   * @returns {Promise<void>}
   */
  async kill() {
    await this.stop()
    process.kill(process.pid, 'SIGTERM')
  }

  /**
   * @returns {Promise<Array<(HTTP1Server | HTTP2Server)>>}
   * @throws {Error}
   */
  async start() {
    this.#app = new App(this.#workerConfig.appPath, this.#workerConfig.devMode)

    await this.#app.start()

    if (this.#app.config.name) {
      process.title = `node | galaxia | worker | ${this.#app.config.name}`
    }

    this.#server = new AppServer(this.#app.config)

    this.#startHeartBeat()
    this.#setupGlobals()
    this.#setupCommunicationWithCluster()

    this.#server.on('started', (servers) => {
      /*
       * The timeout helps for immediately attached multiple
       * listeners to receive the event
       */
      this.emit('started', servers)
    })

    const servers = await this.#startServers(this.#app, this.#server)

    return servers
  }

  /**
   * @returns {Promise<void>}
   */
  async stop() {
    if (this.#server) {
      await this.#server.stop()
    }

    this.#server = null
    this.#app = null
  }

  /**
   * @param {EnvironmentVariables} config
   */
  #initialize(config) {
    this.#validateConfig(config)

    this.#workerConfig = configReader.mergeDefaults(this.#workerConfig, config)
  }

  /**
   * @returns {void}
   */
  #setupCommunicationWithCluster() {
    /**
     * @param {{cmd: string}} message
     * @returns {Promise<void>}
     */
    const onMessage = async(message) => {
      if (message.cmd === 'shutDown') {
        await this.kill()
      }
    }

    process.on('message', onMessage)

    // IPC Duplex Communication
    if (!cluster.isPrimary) {
      const ipc = new Ipc()

      ipc.onMessage('workerStats', () => ({
        cpuUsage: process.cpuUsage(),
        memoryUsage: process.memoryUsage(),
        server: this.#server?.getStats()
      }))
    }
  }

  /**
   * @returns {void}
   */
  #setupGlobals() {
    new ColoredConsole({
      string: 'green',
      boolean: 'magenta',
      number: 'magentaBright',
      null: 'yellow'
    }).assignTo(console)
  }

  /**
   * Send heartbeat data to the parent cluster on a regular interval
   */
  #startHeartBeat() {
    if (cluster.isWorker && !isDebugMode()) {
      const handler = () => {
        if (process.send) process.send({ cmd: 'heartbeat' })

        this.emit('heartbeat')
      }

      setInterval(handler, this.#workerConfig.heartbeatInterval * 0.95)
      handler()
    }
  }

  /**
   * @param {App} app
   * @param {AppServer} appServer
   * @returns {Promise<Array<(HTTP1Server | HTTP2Server)>>}
   */
  #startServers(app, appServer) {
    /** @type {Net.AddressInfo[]} */
    const serverAddresses = []

    /**
     * @param {Http.Server | Http2.Http2Server} server
     */
    const onReady = (server) => {
      /**
       * server.address() returns null before the 'listening' event
       * has been emitted or after calling server.close().
       * For a server listening on a pipe or Unix domain socket,
       * the name is returned as a string.
       *
       * @type {Net.AddressInfo | string | null}
       */
      const serverAddress = server.address()

      if (serverAddress instanceof Object) {
        serverAddresses.push(serverAddress)
      }
    }

    if (this.#workerConfig.showInitialMessages) {
      setTimeout(() => {
        /** @type {string[]} */
        const addresses = []

        serverAddresses.forEach((address) => {
          addresses.push(`${address.address}:${address.port}`)
        })

        console.info(`Server is now listening on: ${addresses.join(', ')}`)
      }, 200)
    }

    return appServer.start(onReady, app.processRequest.bind(app))
  }

  /**
   * @param {EnvironmentVariables} config
   * @throws If the config is not valid
   */
  #validateConfig(config) {
    if (!isDirSync(config.appPath)) {
      throw new Error('Please, provide existing absolute application path')
    }
  }
}

export default Worker

export { Worker }
