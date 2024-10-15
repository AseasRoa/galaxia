class UserAgentFilter {
  /** @type {app.RequestsUserAgentFilterRule[]} */
  #rules = []

  /** @param {app.RequestsUserAgentFilterRule[]} rules */
  constructor(rules) {
    this.#rules = rules
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   */
  run({ request, response }) {
    if (!this.#isUserAgentAllowed(request)) {
      response.statusCode = 403
      response.end('Forbidden')

      return false
    }

    return true
  }

  /**
   * @param {HttpRequest} request
   * @returns {boolean}
   * @throws {Error}
   */
  #isUserAgentAllowed(request) {
    let allowed = true

    if (Array.isArray(this.#rules)) {
      for (const rule of this.#rules) {
        if (!(rule instanceof Object)) {
          continue
        }

        let pathMatch = false

        if (!rule.path) {
          pathMatch = true
        }
        else if (typeof rule.path === 'string') {
          if (
            rule.path === '*'
            || rule.path.toLowerCase() === request.url.pathname.toLowerCase()
          ) {
            pathMatch = true
          }
        }
        else if (rule.path instanceof RegExp) {
          if (rule.path.test(request.url.pathname)) {
            pathMatch = true
          }
        }
        else {
          throw new Error('User Agent Filter path must be either RegExp or a string')
        }

        if (pathMatch) {
          const userAgent = request.headers['user-agent'] ?? ''

          if (Array.isArray(rule.allow)) {
            for (const pattern of rule.allow) {
              if (typeof pattern === 'string') {
                if (pattern === userAgent) {
                  allowed = true
                }
              }
              else if (pattern instanceof RegExp) {
                if (pattern.test(userAgent)) {
                  allowed = true
                }
              }
            }
          }

          if (Array.isArray(rule.deny)) {
            for (const pattern of rule.deny) {
              if (typeof pattern === 'string') {
                if (pattern === userAgent) {
                  allowed = false
                }
              }
              else if (pattern instanceof RegExp) {
                if (pattern.test(userAgent)) {
                  allowed = false
                }
              }
            }
          }
        }
      }
    }

    return allowed
  }
}

export { UserAgentFilter }
export default UserAgentFilter
