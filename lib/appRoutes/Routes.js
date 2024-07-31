import { HttpExchange } from '../server/HttpExchange.js'
import { HttpRequest } from '../server/HttpRequest.js'
import { HttpResponse } from '../server/HttpResponse.js'

class Routes {
  /** @type {HttpRequest | null} */
  request = null

  /** @type {HttpResponse | null} */
  response = null

  /** @type {HttpExchange | null} */
  exchange = null
}

export { Routes }
