import { Http2ServerRequest } from 'node:http2'
import { Socket } from 'node:net'
import http2Proxy from 'http2-proxy'

class ProxyHandler {
  /** @type {string} */
  #hostname

  /** @type {number} */
  #port

  /** @type {'http' | 'https' | undefined} */
  #protocol

  /**
   * @param {object} input
   * @param {string} [input.hostname]
   * @param {'http' | 'https'} [input.protocol]
   * @param {number} input.port
   */
  constructor({ hostname = '127.0.0.1', protocol = 'http', port }) {
    this.#hostname = hostname
    this.#protocol = protocol
    this.#port = port
  }

  /**
   * @see https://www.npmjs.com/package/http2-proxy
   * @param {Web.Request} request
   * @param {Web.Response} response
   * @param {string} path
   * @param {number} [timeout] Request timeout in milliseconds
   */
  web(request, response, path, timeout = 0) {
    void http2Proxy.web(
      // @ts-ignore
      request,
      response,
      {
        hostname: this.#hostname,
        port: this.#port,
        protocol: this.#protocol,
        path: path,
        timeout: timeout,
        onReq: (req, { headers }) => {
          if (!headers) return

          let remoteAddress = req.socket.remoteAddress ?? ''

          // Remove the ::ffff: prefix
          remoteAddress = remoteAddress.replace(/^.*:/u, '')

          /**
           * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For
           * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
           * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto
           */
          headers['x-forwarded-for'] = remoteAddress
          headers['x-forwarded-proto'] = req.socket instanceof Socket
            ? 'http'
            : 'https'
          headers['x-forwarded-host'] = (req instanceof Http2ServerRequest)
            ? req.authority // HTTP 2
            : req.headers.host ?? '' // HTTP 1.1
        }
      },
      this.#defaultWebHandler.bind(this)
    )
  }

  /**
   * @see https://www.npmjs.com/package/http2-proxy
   * @param {Web.Request} request
   * @param {Net.Socket | Stream.Duplex} socket
   * @param {Buffer} head
   */
  ws(request, socket, head) {
    void http2Proxy.ws(
      // @ts-ignore
      request,
      socket,
      head,
      {
        hostname: this.#hostname,
        port: this.#port
      },
      this.#defaultWsHandler.bind(this)
    )
  }

  /**
   * @param {Error} error
   * @param {Web.Request} request
   * @param {Web.Response} response
   */
  #defaultWebHandler(error, request, response) {
    if (error) {
      console.error('#defaultWebHandler error: ', error)

      response.statusCode = 502
      response.end('502 Bad Gateway')
    }
  }

  /**
   * @param {Error} err
   * @param {Web.Request} req
   * @param {Net.Socket} socket
   */
  #defaultWsHandler(err, req, socket) {
    if (err) {
      // @ts-ignore
      if (err?.code !== 'EPIPE') {
        console.error('#defaultWsHandler error', err)
      }

      socket.destroy()
    }
  }
}

export { ProxyHandler }
