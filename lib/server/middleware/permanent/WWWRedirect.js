/**
 * www. redirection for host names, not defined with www. in the config
 */
class WWWRedirect {
  /**
   * List of hostnames, intended to be used by the app.
   * WWW redirect will happen if the request hostname
   * starts with www and is not located in this list.
   *
   * Assuming the request hostname is www.example.com, then:
   * - Redirect happens if the list is ['example.com']
   * - No redirect if the list is ['example.com', 'www.example.com']
   *
   * @type {Set<string>}
   */
  #usedHostnames

  /**
   * @param {string[]} usedHostnames
   */
  constructor(usedHostnames) {
    this.#usedHostnames = new Set(usedHostnames)
  }

  /**
   * @param {HttpContext} httpContext
   * @returns {boolean} Whether to continue to the next middleware
   */
  run({ request, response }) {
    const { url } = request

    if (!this.#usedHostnames.has(url.hostname)) {
      if (url.host.startsWith('www.')) {
        const location = `//${url.host.substring(4)}${url.pathname}${url.search}`

        response.statusCode = 302
        response.setHeader('cache-control', 'max-age=0')
        response.setHeader('content-type', 'text/html; charset=UTF-8')
        response.setHeader('location', location)
        response.end()

        return false
      }
    }

    return true
  }
}

export { WWWRedirect }
export default WWWRedirect
