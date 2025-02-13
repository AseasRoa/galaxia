import { createSecureServer } from 'node:http2'
import { generateRandomString } from '../../functions/utils.js'
import { ServerNameIndication } from '../ServerNameIndication.js'
import { HTTPServer } from './HTTPServer.js'

class HTTP2Server extends HTTPServer {
  #requestsTimeoutMs = 2 * 60 * 1000

  /**
   * @param {function(Http2.Http2SecureServer):any} onReady
   * @returns {Http2.Http2SecureServer}
   */
  start(onReady) {
    const sni = new ServerNameIndication(this.appConfig.server.ssl)
    const options = {
      SNICallback: sni.createContext.bind(sni),
      allowHTTP1: true
    }
    const port = this.appConfig.server.httpsPort

    this.server = createSecureServer(options)

    const { server } = this

    this.#setServerTimeouts(server)
    this.#setupEventListeners(server)

    server.listen(port, () => {
      onReady(server)
    })

    return server
  }

  /**
   * @param {Http2.Http2SecureServer} server
   */
  #setServerTimeouts(server) {
    /**
     * This is server.timeout
     *
     * @see https://nodejs.org/api/http2.html#serversettimeoutmsecs-callback
     * @default 0
     */
    server.setTimeout(this.#requestsTimeoutMs)
  }

  /**
   * @param { Http2.Http2SecureServer} server
   */
  #setupEventListeners(server) {
    server.on('session', (session) => {
      // @ts-expect-error
      session['--connection-id'] = generateRandomString(8)

      this.connections.push(session)

      /*
       * The 'timeout' event is emitted if there is no activity on the
       * Http2Session after the configured number of milliseconds.
       */
      session.on('timeout', () => {
        session.close()
      })

      // Set network inactivity timeout (same as server.setTimeout())
      session.setTimeout(this.#requestsTimeoutMs)
    })
  }
}

export { HTTP2Server }
