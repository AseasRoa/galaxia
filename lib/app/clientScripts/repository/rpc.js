/**
 * @param {''} className
 * @param {string} moduleName
 * @param {string} routesName
 * @param {any[]} constructorArgs
 * @param {string} methodName
 * @param {any[]} methodArgs
 * @param {string} ajaxVersion
 * @param {string} sessionKey
 * @returns {Promise<unknown>}
 */
async function rpc(
  className,
  moduleName,
  routesName,
  constructorArgs,
  methodName,
  methodArgs,
  ajaxVersion,
  sessionKey
) {
  const contentType = 'application/json; charset=utf-8'

  /** @type {Object<string, string>} */
  const headers = {
    'accept': contentType,
    'content-type': contentType,
    'cache-control': 'no-cache',
    'x-requested-with': 'XMLHttpRequest',
  }

  if (ajaxVersion) headers['x-ajax-version'] = ajaxVersion

  if (sessionKey) headers['x-session-key'] = sessionKey

  const method = 'POST'
  const payload = (className)
    ? [Array.from(constructorArgs), Array.from(methodArgs)]
    : Array.from(methodArgs)

  const response = await fetch(`/${moduleName}/${routesName}/${methodName}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(payload)
  })

  const responseType
    = (response.headers.get('x-response-type') ?? '').toLowerCase()

  if (response.status >= 400 && response.status < 500) {
    const data = await response.json()
    const message = data.stack || data.message || 'Unknown Error'

    // Variant 1) Existing Error class
    if (window[data.name] instanceof Error) {
      const ErrorClass = window[data.name]

      // @ts-expect-error
      throw new ErrorClass(message)
    }
    // Variant 2) Non-existent Error class
    else {
      // Construct the error
      const error = new Error(data.message)
      error.name = data.name
      error.message = data.message
      error.stack = data.stack

      throw error
    }
  }

  if (response.status === 200) {
    switch (responseType) {
      case 'error': {
        const data = await response.json()
        const message = data.message || 'Unknown Error'

        return new Error(message)
      }
      case 'json': {
        const text = await response.text()

        return (text) ? rpc.jsonParse(text) : null
      }
      case 'string': {
        return response.text()
      }
      default: {
        return response.text()
      }
    }
  }

  const errorMessage = `Internal Server Error ${response.status}`

  return new Error(errorMessage)
}

/**
 * @param {number} length
 * @returns {string}
 */
rpc.randomString = function randomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

/**
 * JSON.parse, but with Date reviver.
 *
 * Note: There are 2 copies of this function - one for the
 * server and one for the client
 *
 * @param {string} jsonString
 * @returns {any}
 */
rpc.jsonParse = function jsonParse(jsonString) {
  // starts with: 2015-04-29T22:06:55
  const reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/u
  const resultObject = JSON.parse(jsonString, (key, value) => {
    if (typeof value === 'string' && (reDateDetect.exec(value))) {
      return new Date(value)
    }

    return value
  })

  return resultObject
}

if (window) window['rpc'] = rpc
