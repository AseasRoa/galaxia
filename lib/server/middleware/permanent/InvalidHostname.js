class InvalidHostname {
  /** @type {string[]} */
  #validHostnames = []

  /**
   * @param {string[]} validHostnames
   */
  constructor(validHostnames) {
    this.#validHostnames = validHostnames
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   */
  run({ request, response }) {
    const { url } = request

    if (!this.#validHostnames.includes(url.hostname)) {
      response.statusCode = 400
      response.end('Invalid Hostname')

      return false
    }

    return true
  }
}

export { InvalidHostname }
export default InvalidHostname
