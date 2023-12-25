/* eslint-disable max-len */

import { IncomingMessage } from 'node:http'
import { Http2ServerRequest } from 'node:http2'

/**
 * What is what in WHATWG
 *
 * "  https:   //  user : pass @ sub.host.com : 80   /p/a/t/h  ?  query=string   #hash "
 * │          │  │      │      │   hostname   │port│          │                │       │
 * │          │  │ user-│ pass-├──────────────┴────┤          │                │       │
 * │ protocol │  │ name │ word │        host       │          │                │       │
 * ├──────────┴──┼──────┴──────┼───────────────────┤          │                │       │
 * │   origin    │             │       origin      │ pathname │     search     │ hash  │
 * ├─────────────┴─────────────┴───────────────────┴──────────┴────────────────┴───────┤
 * │                                    href                                           │
 * └───────────────────────────────────────────────────────────────────────────────────┘
 */

/**
 * WHATWG URL, but from Node's server request.
 *
 * Why? Because the built-in "new URL()" is super slow
 * (as of Node.js version 19.0 and older).
 */
class Url {
  #host = ''

  #hostname = ''

  #origin = ''

  #pathname = ''

  #port = ''

  #protocol = ''

  #search = ''

  /** @type {URLSearchParams} */
  // @ts-ignore
  #searchParams

  /**
   * @param {IncomingMessage | Http2ServerRequest} request
   */
  constructor(request) {
    this.#fromRequest(request)
  }

  /**
   * @returns {string}
   */
  get host() {
    return this.#host
  }

  /**
   * @param {string} host
   */
  set host(host) {
    this.#host = host

    const portIndex = this.#host.indexOf(':')

    if (portIndex === -1) {
      this.#hostname = this.#host
    }
    else {
      this.#hostname = this.#host.substring(0, portIndex)
      this.#port = this.#host.substring(portIndex + 1)
    }

    this.#origin = `${this.#protocol}//${this.#host}`
  }

  /**
   * @returns {string}
   */
  get hostname() {
    return this.#hostname
  }

  /**
   * @returns {string}
   */
  get origin() {
    return this.#origin
  }

  /**
   * @returns {string}
   */
  get pathname() {
    return this.#pathname
  }

  /**
   * @param {string} pathname
   */
  set pathname(pathname) {
    this.#pathname = pathname
  }

  /**
   * @returns {string}
   */
  get port() {
    return this.#port
  }

  /**
   * @returns {string}
   */
  get protocol() {
    return this.#protocol
  }

  /**
   * @param {string} protocol
   */
  set protocol(protocol) {
    this.#protocol = protocol
  }

  /**
   * @returns {string}
   */
  get search() {
    return this.#search
  }

  /**
   * @param {string} search
   */
  set search(search) {
    this.#search = search

    /*
     * URLSearchParams is faster than querystring or other
     * functions that I created
     */
    this.#searchParams = new URLSearchParams(this.#search)
  }

  /**
   * @returns {URLSearchParams}
   */
  get searchParams() {
    return this.#searchParams
  }

  /**
   * @param {IncomingMessage | Http2ServerRequest} request
   * @throws {TypeError}
   */
  #fromRequest(request) {
    if (
      !(request instanceof IncomingMessage)
      && !(request instanceof Http2ServerRequest)
    ) {
      throw new TypeError('request must be an instance of IncomingMessage or Http2ServerRequest')
    }

    const requestUrl = request.url ?? ''

    let qIndex = requestUrl.indexOf('?')

    if (qIndex === -1) qIndex = requestUrl.indexOf('&')

    this.protocol = (request instanceof IncomingMessage) ? 'http:' : 'https:'
    this.pathname = (qIndex === -1)
      ? requestUrl
      : requestUrl.substring(0, qIndex)
    this.search = (qIndex === -1) ? '' : requestUrl.substring(qIndex)
    this.host = ('authority' in request)
      ? request.authority // HTTP 2
      : request.headers.host ?? '' // HTTP 1.1
  }
}

export { Url }
