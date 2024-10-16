import console from 'node:console'
import EventEmitter from 'node:events'
import { HooksInitializer } from './HooksInitializer.js'
import { HooksRunner } from './HooksRunner.js'
import { HttpContext } from './HttpContext.js'
import { HttpRequest } from './HttpRequest.js'
import { HttpResponse } from './HttpResponse.js'
import { HTTP1Server } from './httpServers/HTTP1Server.js'
import { HTTP2Server } from './httpServers/HTTP2Server.js'
import { ProxyHandler } from './ProxyHandler.js'

class AppServer extends EventEmitter {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {Array<(HTTP1Server | HTTP2Server)>} */
  #servers = []

  /** @type {HooksInitializer} */
  #hooksInitializer

  /** @type {HooksRunner} */
  #hooksRunner

  /** @type {Function[]} */
  #hooksToRun = []

  /**
   * @param {app.FullConfig} appConfig
   */
  constructor(appConfig) {
    super()

    this.#appConfig = appConfig
    this.#hooksInitializer = new HooksInitializer(this.#appConfig)
    this.#hooksRunner = new HooksRunner()
  }

  /**
   * @returns {ServerStats}
   */
  getStats() {
    const connectionsCount = this.#getConnectionsCount()

    return {
      requestsCount: this.#hooksInitializer.requestsCounter.getCount(),
      connectionsCountHttp1: connectionsCount.http1,
      connectionsCountHttp2: connectionsCount.http2,
      connectionsCount: connectionsCount.http1 + connectionsCount.http2
    }
  }

  /**
   * @param {function(Web.Server):any} onReady
   * @param {function(HttpContext):any} onRequest
   * @returns {Promise<Array<(HTTP1Server | HTTP2Server)>>}
   * The servers who have been created
   */
  async start(onReady, onRequest) {
    this.#hooksToRun = await this.#hooksInitializer.initialize()

    return new Promise((resolve) => {
      const startHttp1 = this.#appConfig.server.httpPort > 0
      const startHttp2 = this.#appConfig.server.httpsPort > 0

      const serversToStart = ((startHttp1) ? 1 : 0) + ((startHttp2) ? 1 : 0)

      let startedServersCount = 0

      /**
       * @param {Http.Server | Http2.Http2SecureServer}server
       */
      const onServerReady = (server) => {
        startedServersCount += 1

        onReady(server)

        if (startedServersCount === serversToStart) {
          setImmediate(() => this.emit('started', startedServersCount))

          resolve(this.#servers)
        }
      }

      /**
       * @param {HttpContext} httpContext
       */
      const onHttp1Request = (httpContext) => {
        this.#aggregatedRequestListener(httpContext, onRequest)
      }

      /**
       * @param {HttpContext} httpContext
       */
      const onHttp2Request = (httpContext) => {
        this.#aggregatedRequestListener(httpContext, onRequest)
      }

      if (startHttp1) {
        this.#startServer(
          HTTP1Server,
          onServerReady,
          onHttp1Request,
          this.#aggregatedUpgradeListener.bind(this)
        )
      }

      if (startHttp2) {
        this.#startServer(
          HTTP2Server,
          onServerReady,
          onHttp2Request,
          this.#aggregatedUpgradeListener.bind(this)
        )
      }
    })
  }

  /**
   * @returns {Promise<void>}
   * The servers who have been stopped
   */
  stop() {
    return new Promise((resolve, reject) => {
      const serversToClose = this.#servers.length

      if (serversToClose === 0) {
        resolve()
      }
      else {
        /** @type {Array<Promise<void>>} */
        const stopPromises = []

        this.#servers.forEach((server) => stopPromises.push(server.stop()))

        Promise.all(stopPromises).then(
          () => resolve(),
          (error) => reject(error)
        )
      }
    })
  }

  /**
   * Accepts the requests from both, the HTTP and the HTTP2 servers
   * and relays the request further
   *
   * @param {HttpContext} httpContext
   * @param {function(HttpContext):void} onRequest
   */
  #aggregatedRequestListener(httpContext, onRequest) {
    const { request, response } = httpContext

    const continueRequest = this.#hooksRunner.runFuncsSync(
      this.#hooksToRun,
      httpContext
    )

    if (!continueRequest) {
      return
    }

    // Proxy
    if (this.#appConfig.server.proxy) {
      const proxyConfig = this.#appConfig.server.proxy
      const pathName = request.url.pathname

      for (const key in proxyConfig) {
        if (pathName.startsWith(key)) {
          const port = proxyConfig[key] ?? 0
          const proxyHandler = new ProxyHandler({ port })
          const timeout = this.#appConfig.server.responseTimeout * 1000

          proxyHandler.web(
            request.original,
            response.original,
            pathName,
            timeout
          )

          return
        }
      }
    }

    onRequest(httpContext)
  }

  /**
   * @param {HttpRequest} request
   * @param {Stream.Duplex} socket
   * @param {Buffer} head
   */
  #aggregatedUpgradeListener(request, socket, head) {
    const host = request.url.hostname

    if ('proxy' in this.#appConfig.server) {
      if (!host) return

      const proxyConfig = this.#appConfig.server.proxy

      for (const key in proxyConfig) {
        if (request.url.pathname.startsWith(key)) {
          const port = proxyConfig[key] ?? 0
          const proxyHandler = new ProxyHandler({ port })

          proxyHandler.ws(request.original, socket, head)

          return
        }
      }
    }
  }

  /**
   * @returns {{http1: number, http2: number}}
   */
  #getConnectionsCount() {
    let http1 = 0
    let http2 = 0

    for (const server of this.#servers) {
      if (server instanceof HTTP1Server) {
        http1 += server.getConnectionsCount()
      }
      else if (server instanceof HTTP2Server) {
        http2 += server.getConnectionsCount()
      }
    }

    return { http1, http2 }
  }

  /**
   * @param {typeof HTTP1Server | typeof HTTP2Server} ServerCreatorClass
   * @param {function(Web.Server):any} onReady
   * @param {function(HttpContext):any} onRequest
   * @param {function(HttpRequest, Stream.Duplex, Buffer):any} onUpgrade
   */
  #startServer(ServerCreatorClass, onReady, onRequest, onUpgrade) {
    const creator = new ServerCreatorClass(this.#appConfig)

    this.#servers.push(creator)

    const server = creator.start(onReady)

    server.on('error', (error) => {
      console.error(error)
    })
    server.on('request', (request, response) => {
      onRequest(
        new HttpContext(
          new HttpRequest(request),
          new HttpResponse(response)
        )
      )
    })
    server.on('upgrade', (request, stream, buffer) => {
      onUpgrade(new HttpRequest(request), stream, buffer)
    })
  }
}

export { AppServer }
