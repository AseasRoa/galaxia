import { HttpRequest } from '../server/HttpRequest.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { jsonParse } from './utils.js'

/**
 * @param {HttpRequest} request
 * @returns {boolean}
 */
export function isRequestXHR(request) {
  const xhrHeader = getHeaderAsString(request, 'x-requested-with')

  return Boolean(xhrHeader.toLowerCase() === 'xmlhttprequest')
}

/**
 * @param {HttpRequest} request
 * @returns {boolean}
 */
export function isRequestHtml(request) {
  const acceptHeader = getHeaderAsString(request, 'accept')

  return request.method === 'GET' || acceptHeader.startsWith('text/html')
}

/**
 * Checks whether the response has ended (its .end() was called)
 *
 * @param {HttpResponse} response
 * @returns {boolean}
 */
export function isResponseEnded(response) {
  return response.original.writableEnded
}

/**
 * @param {HttpRequest} request
 * @param {string} headerName
 * @returns {string}
 */
export function getHeaderAsString(request, headerName) {
  const header = request.headers?.[headerName]

  return (typeof header === 'string')
    ? header
    : (header ?? '').toString()
}

/**
 * Read parameters of POST request.
 * In case the request is not POST, an empty object is returned.
 * TODO Move this functionality in Request
 *
 * @param {HttpRequest} request
 * @returns {Promise<Object<string, any>>}
 */
export function getPostRequestParameters(request) {
  return new Promise((resolve) => {
    const requestOriginal = request.original
    let query = {}

    if (requestOriginal.method === 'GET') {
      resolve(query)
    }
    else {
      let body = ''
      let ended = false
      let contentLength = -1

      /*
       * For Chrome and SSL POST requests, the first request is done perfectly,
       * but after 12 second the following request doesn't fire the "end"
       * event.
       * That's why I'm going to get the content length from the request and
       * end it.
       */
      if (typeof requestOriginal.headers['content-length'] === 'string') {
        contentLength = parseInt(requestOriginal.headers['content-length'])
      }

      /**
       * @param {string} strBody
       */
      const parseAndResolve = function(strBody) {
        try {
          query = jsonParse(strBody)
        }
        catch {
          // do nothing here
        }

        resolve(query)
      }

      /**
       * @returns {void}
       */
      const onEnd = function() {
        if (ended) {
          return
        }

        ended = true

        parseAndResolve(body)
      }

      /**
       * @param {Buffer | string} chunk
       * @returns {void}
       */
      const onData = function(chunk) {
        body += chunk

        if (
          (contentLength === 0)
          || (contentLength > 0 && body.length >= contentLength)
        ) {
          if (!ended) {
            ended = true
            requestOriginal.removeListener('end', onEnd)
            requestOriginal.setTimeout(0)

            parseAndResolve(body)
          }

          return
        }

        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
          // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
          requestOriginal.socket.destroy()
        }
      }

      requestOriginal.addListener('data', onData)
      requestOriginal.addListener('end', onEnd)
    }
  })
}
