import console from 'node:console'
import EventEmitter from 'node:events'
import { sep } from 'node:path'
import { isClass } from '../functions/utils.js'
import { HooksRunner } from './HooksRunner.js'
import { HttpContext } from './HttpContext.js'
import { HttpRequest } from './HttpRequest.js'
import { HttpResponse } from './HttpResponse.js'
import { HTTP1Server } from './httpServers/HTTP1Server.js'
import { HTTP2Server } from './httpServers/HTTP2Server.js'
import {
  RequestsCounter
} from './middleware/RequestsCounter/RequestsCounter.js'
import WWWRedirect from './middleware/WWWRedirect/WWWRedirect.js'
import { ProxyHandler } from './ProxyHandler.js'

const requestsCounter = new RequestsCounter(60)

class AppServer extends EventEmitter {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {Array<(HTTP1Server | HTTP2Server)>} */
  #servers = []

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
    this.#hooksRunner = new HooksRunner()
    this.#initHooks()
  }

  /**
   * @returns {ServerStats}
   */
  getStats() {
    const connectionsCount = this.#getConnectionsCount()

    return {
      requestsCount: requestsCounter.getCount(),
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
    await this.#initHooks()

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
        if (this.#appConfig.server.redirectHttpToHttps) {
          const excludePaths
            = this.#appConfig.server.redirectHttpToHttpsExcludePaths

          if (this.#redirectHttpToHttps(httpContext, excludePaths)) {
            return
          }
        }

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

  async #initHooks() {
    this.#hooksToRun = [
      requestsCounter.addRequest.bind(requestsCounter)
    ]

    /**
     * key: Config rule
     * value: Class name
     *
     * @type {Object<string, string>}
     */
    const map = {
      userAgentFilter: 'UserAgentFilter',
      rateLimiter: 'RateLimiter'
    }

    for (const ruleName in map) {
      const className = map[ruleName]

      if (
        !(ruleName in this.#appConfig.server.middleware)
        || !(this.#appConfig.server.middleware[ruleName] instanceof Object)
      ) {
        throw new Error('Missing or wrong rule')
      }

      if (this.#appConfig.server.middleware[ruleName].enabled) {
        const filePath = `./middleware/${className}${sep}${className}.js`
        const exports = (await import(filePath))

        if (!(typeof exports === 'object')) {
          throw new Error(`Middleware ${filePath} does not have exports.`)
        }

        // @ts-ignore
        const ImportedClass = exports[className] ?? exports.default

        if (!isClass(ImportedClass)) {
          throw new Error(`Middleware ${filePath} does not export a class.`)
        }

        // @ts-ignore
        const { rules } = this.#appConfig.server.middleware[ruleName]
        const instance = new ImportedClass(rules)

        this.#hooksToRun.push(
          instance.run.bind(instance)
        )
      }
    }

    const wwwRedirect = new WWWRedirect(this.#appConfig.server?.hostNames ?? [])

    this.#hooksToRun.push(wwwRedirect.run.bind(wwwRedirect))
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

    const configHostnames = this.#appConfig.server?.hostNames ?? []

    // Wrong host name
    if (!configHostnames.includes(request.url.hostname)) {
      response.statusCode = 404
      response.end(`${request.url.hostname} can't be found here`)

      return
    }

    // Set request timeout
    if (this.#appConfig.server.requestTimeout) {
      const timeoutMs = this.#appConfig.server.requestTimeout * 1000

      this.#setResponseTimeout(response.original, timeoutMs)
    }

    // Proxy
    if (this.#appConfig.server.proxy) {
      const proxyConfig = this.#appConfig.server.proxy
      const pathName = request.url.pathname

      for (const key in proxyConfig) {
        if (pathName.startsWith(key)) {
          const port = proxyConfig[key] ?? 0
          const proxyHandler = new ProxyHandler({ port })
          const timeout = this.#appConfig.server.requestTimeout * 1000

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
   * @param {Web.Response} response
   */
  #onResponseTimeout(response) {
    if (response.writableEnded) { // response ended
      return
    }

    /**
     * There is a problem with status code 408, because browsers
     * keep repeating the request. More info in the links.
     *
     * @see https://github.com/dvonlehman/express-request-proxy/issues/19
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504
     * @type {number}
     */
    response.statusCode = 504

    response.end(`${response.statusCode} Gateway Timeout`)
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string[]} excludePaths
   * @returns {boolean} Whether the request has been redirected
   */
  #redirectHttpToHttps(httpContext, excludePaths) {
    const { request, response } = httpContext

    if (
      (Array.isArray(excludePaths))
      && (excludePaths.includes(request.url.pathname))
    ) {
      return false
    }

    response.statusCode = 301

    response.setHeader(
      'location',
      `https://${request.url.host}${request.url.pathname}${request.url.search}`
    )
    response.end()

    return true
  }

  /**
   * @param {Web.Response} response
   * @param {number} timeoutMs
   */
  #setResponseTimeout(response, timeoutMs) {
    response.on('timeout', this.#onResponseTimeout.bind(this))

    response.setTimeout(timeoutMs)
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
