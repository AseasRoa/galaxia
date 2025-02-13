import { Http2ServerRequest } from 'node:http2'
import { HttpRequest } from '../../server/HttpRequest.js'

/**
 * @typedef {Http2.Http2Session
 * | import('net').Socket
 * | import('tls').TLSSocket} ServerConnection
 */

/**
 * @typedef RoutesCacheItem
 * @type {object}
 * @property {Map<string, any>} exportsMap
 * @property {ServerConnection} serverConnection
 * @property {Date} timeAccessed
 */

/** @type {Map<string, RoutesCacheItem>} */
const routesCache = new Map()

/** @type {NodeJS.Timeout | null} */
let cleanupInterval = null

class RoutesCache {
  /**
   * This timeout is used only when the very first instance of this
   * class is created, because the cleanup function is global.
   *
   * @type {number}
   */
  #classInstancesTimeoutMs = 0

  #cleanupPeriodMs = 5 * 1000

  /**
   * @type {HttpRequest}
   */
  #request

  /**
   * @type {string}
   */
  #sessionKey = ''

  /**
   * @param {HttpRequest} request
   * @param {number} [classInstancesTimeoutMs]
   */
  constructor(request, classInstancesTimeoutMs = 60000) {
    this.#request = request
    this.#classInstancesTimeoutMs = classInstancesTimeoutMs
    this.#sessionKey = this.#generateRouteSessionKey()
  }

  /**
   * @param {string} uniqueFileKey
   * @returns {any | null}
   */
  getClassInstance(uniqueFileKey) {
    let output = null

    if (this.#sessionKey && routesCache.has(this.#sessionKey)) {
      const cacheRecord = routesCache.get(this.#sessionKey)

      if (cacheRecord?.exportsMap.has(uniqueFileKey)) {
        output = cacheRecord.exportsMap.get(uniqueFileKey)
        cacheRecord.timeAccessed = new Date()
      }
    }

    return output
  }

  /**
   * @param {string} uniqueFileKey
   * @param {any} exports
   */
  setClassInstance(uniqueFileKey, exports) {
    const request = this.#request.original

    /** @type {ServerConnection} */
    // @ts-expect-error
    const serverConnection = (request instanceof Http2ServerRequest)
      ? request?.stream.session
      : request.socket

    if (!routesCache.has(this.#sessionKey)) {
      routesCache.set(this.#sessionKey, {
        serverConnection: serverConnection,
        exportsMap: new Map(),
        timeAccessed: new Date()
      })
    }

    routesCache.get(this.#sessionKey)?.exportsMap.set(uniqueFileKey, exports)

    if (!cleanupInterval) {
      cleanupInterval = startGlobalPeriodicCleanup(
        this.#cleanupPeriodMs,
        this.#classInstancesTimeoutMs
      )
    }
  }

  /**
   * Generate a string that contains 2 parts:
   *
   * 1: Unique session key from the connection - a string
   * generated on the server, to ensure uniqueness of the
   * final key by the server in case something is wrong
   * with the browser's key.
   *
   * 2: Unique session key from the browser - generated on
   * the browser when the main page is loaded, used to make
   * sure the final session key is different on every
   * browser tab.
   *
   * @returns {string}
   */
  #generateRouteSessionKey() {
    const request = this.#request.original

    // @ts-expect-error
    const connectionId = (request?.stream?.session)
      // @ts-expect-error
      ? request.stream.session['--connection-id'] // HTTP2
      // @ts-expect-error
      : request.socket['--connection-id'] // HTTP1

    return `${connectionId}-${(request.headers['x-session-key'] ?? '').toString()}`
  }
}

/**
 * @param {number} periodMs
 * @param {number} timeoutMs
 * @returns {NodeJS.Timeout}
 */
function startGlobalPeriodicCleanup(periodMs, timeoutMs) {
  return setInterval(() => {
    const currentTime = new Date().getTime()

    routesCache.forEach((item, key) => {
      // Delete by timeout
      if (timeoutMs) {
        const endTime = item.timeAccessed.getTime() + timeoutMs

        if (currentTime > endTime) {
          routesCache.delete(key)
        }
      }

      // Delete by destroyed server connection
      if (item?.serverConnection?.destroyed) {
        routesCache.delete(key)
      }
    })
  }, periodMs)
}

/**
 * @param {string} uniqueFileKey
 */
function deleteFromCache(uniqueFileKey) {
  routesCache.forEach((item) => {
    item.exportsMap.forEach((map, key) => {
      if (key === uniqueFileKey) {
        item.exportsMap.delete(key)
      }
    })
  })
}

export { deleteFromCache, RoutesCache }
