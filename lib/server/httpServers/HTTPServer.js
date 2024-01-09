class HTTPServer {
  /**
   * @type {app.FullConfig}
   * @protected
   */
  appConfig

  /** @type {(Web.Socket | Http2.ServerHttp2Session)[]} */
  connections = []

  /**
   * @type {Http.Server | Http2.Http2SecureServer | null}
   * @protected
   */
  server = null

  /**
   * @param {app.FullConfig} appConfig
   */
  constructor(appConfig) {
    this.appConfig = appConfig

    setInterval(() => {
      this.cleanupConnections()
    }, 1000)
  }

  /**
   * @returns {void}
   */
  cleanupConnections() {
    this.connections = this.connections.filter(
      (connection) => !connection.destroyed
    )
  }

  /**
   * @returns {number}
   */
  getConnectionsCount() {
    return this.connections.length
  }

  /**
   * @see https://nodejs.org/api/http.html#serverclosecallback
   * @see https://nodejs.org/api/http2.html#serverclosecallback_1
   * @returns {Promise<void>}
   */
  async stop() {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        throw new Error('No server exists')
      }

      /*
       * In HTTP/2 the .close() function prevents new requests,
       * but is not invoked until all active sessions are stopped.
       */
      this.server.close(() => {
        resolve()
      })

      this.#closeConnections().then(
        () => {
          /*
           * Do nothing here. When eventually the connections are closed,
           * the .close() callback will be invoked.
           */
        }, (error) => {
          // This is here only to prevent TS error
          reject(error)
        }
      )
    })
  }

  /**
   * @returns {Promise<void>}
   */
  async #closeConnections() {
    return new Promise((resolve) => {
      this.cleanupConnections()

      let connectionsToClose = this.connections.length

      if (!connectionsToClose) resolve()

      this.connections.forEach((connection) => {
        const onClosedConnection = () => {
          connectionsToClose -= 1

          if (connectionsToClose === 0) {
            resolve()
          }
        }

        /**
         * For HTTP/2
         *
         * In HTTP/2 the connection is a Session
         *
         * @see https://nodejs.org/api/http2.html#http2sessionclosecallback
         */
        if ('close' in connection) {
          connection.close(onClosedConnection)
        }

        /**
         * For HTTP/1
         *
         * In HTTP/1 the connection is a Net Socket. These sockets are closed
         * automatically after some time, so there is no need to deliberately
         * close them.
         * Note: Don't use .destroy(), because it closes the socket immediately,
         * it's not graceful.
         *
         * @see https://nodejs.org/api/net.html#socketdestroyerror
         */
        if ('timeout' in connection) {
          connection.setTimeout(1)

          connection.on('timeout', onClosedConnection)
        }
      })
    })
  }
}

export { HTTPServer }
