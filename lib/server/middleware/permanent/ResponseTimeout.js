class ResponseTimeout {
  /** @type {number} */
  #timeoutMs = 0

  /**
   * @param {number} timeoutMs
   */
  constructor(timeoutMs) {
    this.#timeoutMs = timeoutMs
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   */
  run({ response }) {
    response.original.on('timeout', (res) => {
      if (res.writableEnded) { // response ended
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
      res.statusCode = 504

      res.end(`${res.statusCode} Gateway Timeout`)
    })
    response.original.setTimeout(this.#timeoutMs)

    return true
  }
}

export { ResponseTimeout }
export default ResponseTimeout
