import { createServer } from 'node:http'
import { generateRandomString } from '../../functions/utils.js'
import { HTTPServer } from './HTTPServer.js'

class HTTP1Server extends HTTPServer {
  #requestsTimeoutMs = 2 * 60 * 1000

  /**
   * @param {function(Web.HttpServer):any} onReady
   * @returns {Web.HttpServer}
   */
  start(onReady) {
    const port = this.appConfig.server.httpPort

    this.server = createServer()

    const server = this.server

    this.#setServerTimeouts(server)
    this.#setupEventListeners(server)

    server.listen(port, () => {
      onReady(server)
    })

    return server
  }

  /**
   * @param {Net.Socket} socket
   */
  #closeSocket(socket) {
    if (socket.allowHalfOpen) {
      socket.end(() => {
        socket.destroy()
      })
    }
    else {
      socket.destroy()
    }
  }

  /**
   * @param {Web.HttpServer} server
   */
  #setServerTimeouts(server) {
    /**
     * This is server.timeout
     *
     * @see https://nodejs.org/api/http.html#serversettimeoutmsecs-callback
     * @default 0
     */
    server.setTimeout(this.#requestsTimeoutMs)

    /**
     * @see https://nodejs.org/api/http.html#serverheaderstimeout
     * @default 60000
     * @type {number}
     */
    server.headersTimeout = 1 * 60 * 1000

    /**
     * @see https://nodejs.org/api/http.html#serverrequesttimeout
     * @default 300000
     * @type {number}
     */
    server.requestTimeout = 5 * 60 * 1000

    /**
     * @see https://nodejs.org/api/http.html#serverkeepalivetimeout
     * @default 5000
     * @type {number}
     */
    server.keepAliveTimeout = 5 * 1000
  }

  /**
   * @param {Web.HttpServer} server
   */
  #setupEventListeners(server) {
    server.on('connection', (socket) => {
      socket['--connection-id'] = generateRandomString(8)

      this.connections.push(socket)

      /*
       * 'timeout' event:
       *
       * Emitted if the socket times out from inactivity. This is only
       * to notify that  the socket has been idle. The user must manually
       * close the connection.
       */
      socket.on('timeout', () => {
        this.#closeSocket(socket)
      })

      /*
       * 'end' event:
       *
       * Emitted when the other end of the socket signals the end of
       * transmission, thus ending the readable side of the socket.
       */
      socket.on('end', () => {
        this.#closeSocket(socket)
      })

      /*
       * 'close' event:
       *
       * Emitted once the socket is fully closed. The argument hadError
       * is a boolean which says if the socket was closed due to a
       * transmission error.
       */
      socket.on('close', () => {
        socket.unref()
      })

      // Set network inactivity timeout (same as server.setTimeout())
      socket.setTimeout(this.#requestsTimeoutMs)
    })
  }
}

export { HTTP1Server }
