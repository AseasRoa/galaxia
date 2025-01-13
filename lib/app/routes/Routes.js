import { HttpContext } from '../../server/HttpContext.js'
import { HttpRequest } from '../../server/HttpRequest.js'
import { HttpResponse } from '../../server/HttpResponse.js'

class Routes {
  /** @type {HttpRequest | null} */
  request = null

  /** @type {HttpResponse | null} */
  response = null

  /** @type {HttpContext | null} */
  httpContext = null
}

export { Routes }
