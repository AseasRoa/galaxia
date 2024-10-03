import { HttpRequest } from '../HttpRequest.js'
import { HttpResponse } from '../HttpResponse.js'
import { RequestsCounter } from './RequestsCounter.js'
import { RequestsRateLimiter } from './RequestsRateLimiter.js'

const requestsCounterFor60seconds = new RequestsCounter(60)

class Protector {
  /** @type {app.FullConfig} */
  #appConfig

  /**
   * @type {null | Map<string | RegExp, RequestsRateLimiter>}
   */
  #rateLimiters = null

  /**
   * @param {app.FullConfig} appConfig
   */
  constructor(appConfig) {
    this.#appConfig = appConfig
  }

  /**
   * @param {HttpRequest} request
   * @param {HttpResponse} response
   * @returns {boolean} Whether the response has been ended
   */
  processRequest(request, response) {
    requestsCounterFor60seconds.addRequest()

    if (this.#isRateLimited(request)) {
      response.statusCode = 429
      response.end('Too Many Requests')

      return false
    }

    if (!this.#isUserAgentAllowed(request)) {
      response.statusCode = 403
      response.end('Forbidden')

      return false
    }

    return true
  }

  /**
   * @returns {number}
   * The amount of requests per minute
   */
  getRequestsCount() {
    return requestsCounterFor60seconds.getCount()
  }

  /**
   * @returns {void}
   * @throws {Error}
   */
  #setRateLimiters() {
    this.#rateLimiters = new Map()

    const rateLimits = this.#appConfig.server.protection.rateLimits

    if (rateLimits instanceof Array) {
      for (const rule of rateLimits) {
        if (
          rule.path instanceof RegExp
          || typeof rule.path === 'string'
        ) {
          const limiter = new RequestsRateLimiter(
            rule.maxRequests,
            rule.secondsPeriod,
            rule.methods
          )

          const path = (typeof rule.path === 'string')
            ? rule.path.toLowerCase()
            : rule.path

          this.#rateLimiters.set(path, limiter)
        }
        else {
          throw new Error('server.protection.rateLimits path must be either RegExp or a string')
        }
      }
    }
  }

  /**
   * @param {HttpRequest} request
   * @returns {boolean}
   */
  #isRateLimited(request) {
    if (this.#rateLimiters === null) {
      this.#setRateLimiters()
    }

    if (this.#rateLimiters) {
      for (const [path, limiter] of this.#rateLimiters) {
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
          if (limiter.madeTooManyRequests(request)) {
            return true
          }
        }
      }
    }

    return false
  }

  /**
   * @param {HttpRequest} request
   * @returns {boolean}
   * @throws {Error}
   */
  #isUserAgentAllowed(request) {
    let allowed = true

    const userAgentFilters = this.#appConfig.server.protection.userAgentFilters

    if (!userAgentFilters) {
      return true
    }

    if (userAgentFilters instanceof Array) {
      for (const rule of userAgentFilters) {
        if (rule instanceof Object) {
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
            throw new Error('server.protection.userAgentFilters path must be either RegExp or a string')
          }

          if (pathMatch) {
            const userAgent = request.headers['user-agent'] ?? ''

            if (rule.allow instanceof RegExp) {
              if (rule.allow.test(userAgent)) {
                allowed = true
              }
            }

            if (rule.deny instanceof RegExp) {
              if (rule.deny.test(userAgent)) {
                allowed = false
              }
            }
          }
        }
      }
    }

    return allowed
  }
}

export { Protector }
