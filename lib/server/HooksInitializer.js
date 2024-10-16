import { isClass } from '../functions/utils.js'
import { InvalidHostname } from './middleware/permanent/InvalidHostname.js'
import { RequestsCounter } from './middleware/permanent/RequestsCounter.js'
import { ResponseTimeout } from './middleware/permanent/ResponseTimeout.js'
import { WWWRedirect } from './middleware/permanent/WWWRedirect.js'

/**
 * @callback HookRunFn
 * @param {HttpContext} httpContext
 * @returns {boolean}
 */

class HooksInitializer {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {RequestsCounter} */
  requestsCounter = new RequestsCounter(60)

  /**
   * @param {app.FullConfig} appConfig
   */
  constructor(appConfig) {
    this.#appConfig = appConfig
  }

  /**
   * @returns {Promise<HookRunFn[]>}
   */
  async initialize() {
    /** @type {HookRunFn[]} */
    const hooksToRun = [
      this.requestsCounter.addRequest.bind(this.requestsCounter)
    ]

    /**
     * key: Config rule
     * value: Class name
     *
     * @type {Object<string, string>}
     */
    const map = {
      httpToHttps: 'HttpToHttps',
      userAgentFilter: 'UserAgentFilter',
      rateLimiter: 'RateLimiter'
    }

    for (const ruleName in map) {
      const className = map[ruleName]

      if (
        !(ruleName in this.#appConfig.server.middleware)
        || !(this.#appConfig.server.middleware[ruleName] instanceof Object)
      ) {
        throw new Error('Missing or wrong rule')
      }

      if (this.#appConfig.server.middleware[ruleName].enabled) {
        const filePath = `./middleware/optional/${className}.js`
        const exports = (await import(filePath))

        if (!(typeof exports === 'object')) {
          throw new Error(`Middleware ${filePath} does not have exports.`)
        }

        // @ts-ignore
        const ImportedClass = exports[className] ?? exports.default

        if (!isClass(ImportedClass)) {
          throw new Error(`Middleware ${filePath} does not export a class.`)
        }

        // @ts-ignore
        const { rules } = this.#appConfig.server.middleware[ruleName]
        const instance = new ImportedClass(rules)

        hooksToRun.push(
          instance.run.bind(instance)
        )
      }
    }

    const configHostnames = this.#appConfig.server?.hostNames ?? []

    // .www redirect
    const wwwRedirect = new WWWRedirect(configHostnames)
    hooksToRun.push(wwwRedirect.run.bind(wwwRedirect))

    // Invalid hostname
    const invalidHostname = new InvalidHostname(configHostnames)
    hooksToRun.push(invalidHostname.run.bind(invalidHostname))

    // Set response timeout
    if (this.#appConfig.server.responseTimeout) {
      const timeoutMs = this.#appConfig.server.responseTimeout * 1000
      const responseTimeout = new ResponseTimeout(timeoutMs)
      hooksToRun.push(responseTimeout.run.bind(responseTimeout))
    }

    return hooksToRun
  }
}

export { HooksInitializer }
