import { RateLimiterCollector } from './RateLimiterCollector.js'

class RateLimiter {
  /** @type {null | Map<string | RegExp, RateLimiterCollector>} */
  #collectors = null

  /** @type {app.RequestsRateLimitsRule[]} */
  #rules = []

  /**
   * @param {app.RequestsRateLimitsRule[]} rules
   */
  constructor(rules) {
    this.#rules = rules
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   */
  run({ request, response }) {
    if (this.#isRateLimited(request)) {
      response.statusCode = 429
      response.end('Too Many Requests')

      return false
    }

    return true
  }

  /**
   * @returns {void}
   * @throws {Error}
   */
  #setRateLimiters() {
    this.#collectors = new Map()

    if (Array.isArray(this.#rules)) {
      for (const rule of this.#rules) {
        if (
          typeof rule.path === 'string'
          || rule.path instanceof RegExp
        ) {
          const collector = new RateLimiterCollector(
            rule.maxRequests,
            rule.secondsPeriod,
            rule.methods
          )
          const path = (typeof rule.path === 'string')
            ? rule.path.toLowerCase()
            : rule.path

          this.#collectors.set(path, collector)
        }
        else {
          throw new Error('Rate Limiter path must be either RegExp or a string')
        }
      }
    }
  }

  /**
   * @param {HttpRequest} request
   * @returns {boolean}
   */
  #isRateLimited(request) {
    if (this.#collectors === null) {
      this.#setRateLimiters()
    }

    if (this.#collectors) {
      for (const [path, collector] of this.#collectors) {
        /**
         * Make sure the checked paths are lower case.
         * Note that 'path' should be pre-lowercase-d (for better performance),
         * so only the request's path should be converted to lower case.
         */
        const requestPath = request.url.pathname.toLowerCase()

        let pathMatch = false

        if (!path) {
          pathMatch = true
        }
        else if (typeof path === 'string') {
          if (path === '*' || path === requestPath) pathMatch = true
        }
        else if (path instanceof RegExp) {
          if (path.test(requestPath)) pathMatch = true
        }

        if (pathMatch) {
          if (collector.madeTooManyRequests(request)) {
            return true
          }
        }
      }
    }

    return false
  }
}

export { RateLimiter }
export default RateLimiter
