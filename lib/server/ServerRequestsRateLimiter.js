import { HttpRequest } from './HttpRequest.js'

/**
 * @typedef {object} CollectedData
 * @property {number} firstRequestTime
 * @property {number} requests
 * @property {number} blockedUntil
 */

class ServerRequestsRateLimiter {
  /** @type {Map<string, CollectedData>} */
  collectedData = new Map()

  /** @type {number} */
  maxRequests = 0

  /** @type {string[]} */
  methods = []

  /** @type {number} */
  secondsPeriod = 0

  /**
   * @param {number} [maxRequests]
   * If the requests count for a seconds period is bigger than this number,
   * the IP address will be flagged
   * @param {number} [secondsPeriod]
   * The period for which the requests are counted
   * @param {string[]} [methods]
   */
  constructor(maxRequests = 250, secondsPeriod = 5, methods = []) {
    this.secondsPeriod = secondsPeriod
    this.maxRequests = maxRequests
    this.methods = methods.map((method) => method.toUpperCase())

    if (secondsPeriod < 1) {
      throw new Error(`The minimum amount of seconds is 1, but ${secondsPeriod} is provided.`)
    }

    this.#startCleanupProcess()
  }

  /**
   * @param {HttpRequest} request
   * @returns {boolean}
   */
  tooManyRequests(request) {
    if (this.methods.length > 0 && !(this.methods.includes(request.method))) {
      return false
    }

    const ip = request.remoteAddress

    if (!ip) {
      return true
    }

    // Allow localhost
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      return false
    }

    const time = new Date().getTime()

    if (!this.collectedData.has(ip)) {
      this.collectedData.set(ip, {
        firstRequestTime: time,
        requests: 0,
        blockedUntil: 0
      })
    }

    const data = this.collectedData.get(ip)

    if (!data) {
      // This can never be reached, but it's here because of eslint
      return false
    }

    if (time > (data.firstRequestTime + (this.secondsPeriod * 1000))) {
      // reset
      data.firstRequestTime = time
      data.requests = 0
    }

    data.requests += 1

    const tooManyRequests = (data.requests > this.maxRequests)

    return tooManyRequests
  }

  /**
   * Cleanup old collected data at certain interval
   */
  #startCleanupProcess() {
    let cleanupInterval = this.secondsPeriod * 2 * 1000

    if (cleanupInterval < 10000) {
      cleanupInterval = 10000
    }

    setInterval(() => {
      const time = new Date().getTime()

      this.collectedData.forEach((data, ip) => {
        if (time > (data.firstRequestTime + (this.secondsPeriod * 1000))) {
          this.collectedData.delete(ip)
        }
      })
    }, cleanupInterval)
  }
}

export { ServerRequestsRateLimiter }
