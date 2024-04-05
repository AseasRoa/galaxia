import { HttpRequest } from './HttpRequest.js'
import { HttpResponse } from './HttpResponse.js'

class HttpExchange {
  /** @type {HttpRequest} */
  request

  /** @type {HttpResponse} */
  response

  /**
   * @param {HttpRequest} request
   * @param {HttpResponse} response
   */
  constructor(request, response) {
    this.request = request
    this.response = response
  }
}

export { HttpExchange }
