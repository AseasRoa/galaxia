class HttpToHttps {
  /** @type {app.HttpToHttpsRule[]} */
  #rules = []

  /**
   * @param {app.HttpToHttpsRule[]} rules
   */
  constructor(rules) {
    this.#rules = rules
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   * @throws {Error}
   */
  run({ request, response }) {
    let redirect = false
    let httpsPort = '443'

    if (
      // @ts-ignore
      request.original.scheme !== 'https'
      && Array.isArray(this.#rules)
    ) {
      for (const rule of this.#rules) {
        if (!(rule instanceof Object)) {
          continue
        }

        let hostnameMatch = false

        if (!rule.hostname) {
          hostnameMatch = true
        }
        else if (typeof rule.hostname === 'string') {
          if (
            rule.hostname === '*'
            || (
              rule.hostname.toLowerCase()
              === request.url.hostname.toLowerCase()
            )
          ) {
            hostnameMatch = true
          }
        }
        else if (rule.hostname instanceof RegExp) {
          if (rule.hostname.test(request.url.hostname)) {
            hostnameMatch = true
          }
        }
        else {
          throw new Error('Hostname must be either RegExp or a string')
        }

        redirect = hostnameMatch

        if (hostnameMatch) {
          const { pathname } = request.url

          if (Array.isArray(rule.excludePaths)) {
            for (const pattern of rule.excludePaths) {
              if (typeof pattern === 'string') {
                if (pattern === pathname) {
                  redirect = false
                  break
                }
              }
              else if (pattern instanceof RegExp) {
                if (pattern.test(pathname)) {
                  redirect = false
                  break
                }
              }
            }
          }

          if (redirect) {
            httpsPort = (rule.httpsPort ?? 443).toString() || '443'
          }

          break
        }
      }
    }

    if (redirect) {
      const { url } = request
      const hostname = (httpsPort === '443')
        ? url.hostname
        : url.hostname + ':' + httpsPort

      const location = `https://${hostname}${url.pathname}${url.search}`

      response.statusCode = 301
      response.setHeader('location', location)
      response.end()
    }

    return !redirect
  }
}

export { HttpToHttps }
export default HttpToHttps
