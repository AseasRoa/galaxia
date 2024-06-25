import { HttpResponse } from './HttpResponse.js'

class HttpResponseFormatter {
  /** @type {Object<string, number>} */
  #maxAge = {}

  /** @type {Object<string, string>} */
  #mimeTypes = {}

  /**
   * @param {object} config
   * @param {Object<string, number>} [config.maxAge]
   * @param {Object<string, string>} [config.mimeTypes]
   */
  constructor({ maxAge, mimeTypes }) {
    this.#maxAge = maxAge ?? {}
    this.#mimeTypes = mimeTypes ?? {}
  }

  /**
   * @param {HttpResponse} response
   * @param {CompressionAlgorithmName} compressionAlgorithm
   */
  setContentEncoding(response, compressionAlgorithm) {
    if (compressionAlgorithm) {
      this.#setHeadersInResponse(response, {
        'content-encoding': compressionAlgorithm
      })
    }
  }

  /**
   * @param {HttpResponse} response
   * @param {string} extension
   * @param {Date} [timeModified]
   */
  setHeaders(response, extension, timeModified) {
    const headers = {
      ...this.#createContentTypeHeaders(extension),
      ...this.#createCacheControlHeaders(extension, timeModified)
    }

    this.#setHeadersInResponse(response, headers)
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
   * @param {string} extension
   * @param {Date | null} [timeModified]
   * @returns {Object<string, string>}
   */
  #createCacheControlHeaders(extension, timeModified) {
    const ext = extensionName(extension)
    const maxAgeSeconds = this.#maxAge?.[ext] ?? 0
    const cacheControl = (maxAgeSeconds > 0)
      ? `public, max-age=${maxAgeSeconds.toString()}, must-revalidate`
      : 'no-cache, no-store, must-revalidate'
    /*
     * // toUTCString is slow!
     * const lastModified  = (timeModified ?? new Date()).toUTCString()
     */

    return {
      'accept-ranges': 'bytes',
      'cache-control': cacheControl,
      'vary': 'Accept-Encoding,User-Agent'
      // 'last-modified' : lastModified,
    }
  }

  /**
   * @param {string} extension
   * @returns {Object<string, string>}
   */
  #createContentTypeHeaders(extension) {
    const ext = extensionName(extension)
    const contentType = this.#mimeTypes?.[ext] ?? 'text/plain'

    return { 'content-type': contentType }
  }

  /**
   * @param {HttpResponse} response
   * @param {Object<string, string>} headers
   */
  #setHeadersInResponse(response, headers) {
    for (const headerName in headers) {
      response.setHeader(headerName, headers[headerName] ?? '')
    }
  }
}

/**
 * @param {string} extension
 * File extension (including '.' in the beginning)
 * @returns {string}
 * File extension name (extension without '.' in the beginning)
 */
function extensionName(extension) {
  return (extension.startsWith('.')) ? extension.substring(1) : extension
}

export { HttpResponseFormatter }
