import { IncomingMessage } from 'node:http'
import { Http2ServerRequest } from 'node:http2'
import { parse } from './cookie/index.js'
import { Url } from './Url.js'

class HttpRequest {
  /** @type {import('http').IncomingHttpHeaders} */
  headers

  /** @type {string} */
  httpVersion = ''

  /** @type {string} */
  method = ''

  /** @type {IncomingMessage | Http2ServerRequest} */
  original

  /** @type {Object<string, (string | undefined)> | null} */
  #cookies = null

  /** @type {string} */
  #remoteAddress = ''

  /** @type {Url} */
  #url

  /**
   * @param {IncomingMessage | Http2ServerRequest} request
   */
  constructor(request) {
    // Properties, same as the original request
    this.method = request.method ?? ''
    this.httpVersion = request.httpVersion
    this.headers = request.headers

    // Different properties
    this.original = request
    this.#url = new Url(request)
    this.#remoteAddress = this.#getRemoteAddress(request)
  }

  /**
   * @returns {boolean}
   */
  get complete() {
    return this.original.complete
  }

  /**
   * An object, containing all request cookies
   *
   * @returns {Object<string, (string | undefined)>}
   */
  get cookies() {
    if (this.#cookies === null) {
      const request = this.original

      this.#cookies = parse(request.headers.cookie ?? '')
    }

    return this.#cookies
  }

  /**
   * @returns {string}
   */
  get remoteAddress() {
    return this.#remoteAddress
  }

  /**
   * @returns {Url}
   */
  get url() {
    return this.#url
  }

  /**
   * @param {string} name Cookie name
   * @returns {string} Returns the cookie value, or
   * an empty string if the cookie doesn't exist
   */
  getCookie(name) {
    return this.cookies[name] ?? ''
  }

  /**
   * Returns 'true' if a cookie with the given name exists.
   *
   * @param {string} name Cookie name
   * @returns {boolean}
   */
  hasCookie(name) {
    return (name in this.cookies)
  }

  /**
   * @param {number} msecs
   * @param {(() => void)} [callback]
   */
  setTimeout(msecs, callback) {
    this.original.setTimeout(msecs, callback)
  }

  /**
   * @param {Web.Request} request
   * @returns {string}
   */
  #getRemoteAddress(request) {
    /**
     * "remoteAddress" may be undefined if the socket is destroyed
     *
     * @see https://nodejs.org/api/net.html#net_socket_remoteaddress
     */

    let remoteAddress = (request?.socket?.remoteAddress) ?? ''

    // Remove things like ::ffff: in the front of the IP address
    remoteAddress = remoteAddress.replace(/^.*:/u, '')

    return remoteAddress
  }
}

export { HttpRequest }
