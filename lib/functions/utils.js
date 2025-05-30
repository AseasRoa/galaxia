import console from 'node:console'
import { access } from 'node:fs/promises'
import inspector from 'node:inspector'
import process from 'node:process'
import { setGetValueByIndex } from './set.js'

/**
 * @returns {boolean}
 */
export function isDevelopmentMode() {
  // Check 1
  for (const argv of process.argv) {
    if (argv === '-p' || argv === '--production') {
      return false
    }

    if (argv === '-d' || argv === '--development') {
      return true
    }
  }

  // Check 2
  return process.env['NODE_ENV'] === 'development'
}

/**
 * Detect whether NodeJS runs in debug mode
 *
 * @see https://nodejs.org/api/inspector.html#inspectorurl
 * @returns {boolean}
 */
export function isDebugMode() {
  return inspector.url() !== undefined
}

/**
 * @see https://docs.npmjs.com/about-semantic-versioning
 * @param {number} major Major release number.
 * @param {number} [minor]
 * Minor release number. If not provided, any minor release number is matched.
 * @param {number} [patch]
 * Patch release number. If not provided, any patch release number is matched.
 * @returns {boolean}
 */
export function isNodeJSVersionAtLeast(major, minor, patch) {
  const current = process.versions.node
    .split('.')
    .map((value) => parseInt(value))
  const required = [major, minor, patch]

  if (current.length !== 3) return false

  for (let i = 0; i < current.length; i++) {
    const currentNumber = current[i] ?? 0
    const requiredNumber = required[i] ?? 0

    if (currentNumber > requiredNumber) return true

    if (currentNumber < requiredNumber) return false
  }

  return true
}

/**
 * @see https://zaiste.net/posts/javascript-class-function/
 * @param {Function} func
 * @returns {boolean}
 */
export function isClass(func) {
  /*
   * There is this code, but it is slower:
   *
   * if (typeof func !== 'function') {
   *   return false
   * }
   *
   * const descriptors = Object.getOwnPropertyDescriptors(func)
   *
   * return ('length' in descriptors)
   *   && ('name' in descriptors)
   *   && ('prototype' in descriptors)
   *   && (descriptors['prototype']?.writable === false)
   */

  // The string version seems to be in fact much faster
  return typeof func === 'function'
    && /^class\s/u.test(Function.prototype.toString.call(func))
}

/**
 * Search for a file with name and extension as any combination from the input
 * names and extensions, and return its path
 *
 * @param {string[]} pathsToFilesWithoutExtension
 * An array of file names to try
 * @param {string[]} [extensionsToTry]
 * An array with file extensions to try. Omit the dot!
 * @param {boolean} [throwError]
 * @returns {Promise<{file: string, ext: string}>}
 * Returns file name
 * @throws
 * Throws an error if no file is found
 */
export async function pickSomeFile(
  pathsToFilesWithoutExtension,
  extensionsToTry = ['js'],
  throwError = true
) {
  let ext = ''
  let fullPath = ''

  for (const pathToFile of pathsToFilesWithoutExtension) {
    for (const extTry of extensionsToTry) {
      try {
        fullPath = `${pathToFile}.${extTry}`

        await access(fullPath)

        ext = extTry

        break
      }
      catch {
        // continue
      }
    }

    if (ext) break
  }

  if (throwError && !ext) {
    throw new Error(
      `Could not find file "${pathsToFilesWithoutExtension.join('|')}.[${extensionsToTry.join('|')}]".`
    )
  }

  return {
    file: fullPath,
    ext: ext
  }
}

/**
 * Search for a file with name and extension as any combination from the input
 * names and extensions, and try to import it
 *
 * @param {string[]} pathsToFilesWithoutExtension
 * An array of file names to try
 * @param {string[]} [extensionsToTry]
 * An array with file extensions to try. Omit the dot!
 * @param {string} [version]
 * Used for loading different version of the file
 * @param {boolean} [throwError]
 * @returns {Promise<{exports: *, file: string, ext: string}>}
 * Returns the exports of the imported module and info about the file
 * @throws
 * Throws an error if no file is found, or it could not be imported
 */
export async function importSomeFile(
  pathsToFilesWithoutExtension,
  extensionsToTry = ['js'],
  version = '',
  throwError = true
) {
  const { file, ext } = await pickSomeFile(
    pathsToFilesWithoutExtension,
    extensionsToTry,
    throwError
  )

  if (throwError === false && file === '') {
    return { exports: undefined, file: '', ext: '' }
  }

  const fileVersion = (version) ? `?ver=${version}` : ''
  const filePath = `file://${file}${fileVersion}`
  let exports = undefined

  if (throwError) {
    exports = (await import(filePath))
  }
  else {
    try {
      exports = (await import(filePath))
    }
    catch (error) { /* empty */ }
  }

  return { exports, file, ext }
}

/**
 * @param {Map<*, *>} strMap
 * @returns {Object<*, *>}
 */
export function strMapToObj(strMap) {
  const obj = {}

  for (const [ key, value ] of strMap) {
    obj[key] = value
  }

  return obj
}

/**
 * @template K, V
 * @param {Object<K, V>} obj
 * @returns {Map<K, V>}
 */
export function objToStrMap(obj) {
  const strMap = new Map()

  for (const key in obj) {
    strMap.set(key, obj[key])
  }

  return strMap
}

/**
 * @param {string} string
 * @param {string} character
 * @returns {number}
 */
export function stringCharacterOccurrences(string, character) {
  return string.split(character).length - 1
}

/**
 * @param {string} string
 * The input string
 * @param {number} charsCount
 * How many chars to trim on one side.
 * The actual chars removed would be double on that number.
 * @returns {*}
 */
export function stringTrimChars(string, charsCount = 1) {
  return string.substring(charsCount, string.length - charsCount)
}

/**
 * @param {Map<string, *>} strMap
 * @param {(this:any, key: string, value: any) => any} [replacer]
 * @param {string | number} [space]
 * @returns {string}
 */
export function strMapToJson(strMap, replacer, space) {
  return JSON.stringify(strMapToObj(strMap), replacer, space)
}

/**
 * @param {string} jsonStr
 * @returns {Map<string, *>}
 */
export function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr))
}

/**
 * Generate a random string, containing lowercase letters,
 * uppercase letters and number
 *
 * @param {number} length
 * @returns {string}
 */
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  let result = ''

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

/**
 * Delay the execution of the input callback for milliseconds.
 *
 * @see https://www.youtube.com/watch?v=cjIswDCKgu0
 * @template T
 * @param {(function(...[T]): void)} callback
 * @param {number} [delay]
 * @returns {(function(...[T]): void)}
 */
export function debounce(callback, delay = 1000) {
  /** @type {NodeJS.Timeout | number} */
  let timeout = 0

  return (...args) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

/**
 * JSON.parse, but with Date reviver.
 *
 * Note: There are 2 copies of this function - one for the server
 * and one for the client
 *
 * @param {string} jsonString
 * @returns {any}
 */
export function jsonParse(jsonString) {
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

/**
 * @param {number} ms
 * @returns {Promise<unknown>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Extract the preferred compression algorithm from a request, if any
 *
 * @param {string | string[]} acceptEncodingHeader
 * The "accept-encoding" header of the HTTP request.
 * Could be like: deflate, gzip;q=1.0, *;q=0.5
 * @param {Set<CompressionAlgorithmName>} [allowedAlgorithms]
 * An array of allowed algorithm names.
 * @returns {CompressionAlgorithmName}
 * The name of the algorithm that best matches the preferences
 * of the client and the allowed algorithms. If no match can be
 * found, an empty string is returned.
 * - deflate: Slightly faster than GZIP.
 * - gzip: More reliable due to its additional headers and
 * checksum.
 * - br: Specifically designed for text compression. Well-suited
 * for delivering pre-compressed assets, as it can compress files
 * at its highest level (11) and then have the origin server pick
 * them up whenever requested. GZIP is generally faster than Brotli,
 * especially for dynamic content. This is because GZIP has a simpler
 * compression algorithm and is widely supported by browsers and servers.
 */
export function getCompressionAlgorithmName(
  acceptEncodingHeader,
  allowedAlgorithms = new Set(['br', 'deflate', 'gzip' ])
) {
  // More likely a string
  const acceptEncoding = (Array.isArray(acceptEncodingHeader))
    ? acceptEncodingHeader.join(',')
    : (acceptEncodingHeader ?? '').toString()

  // If no Accept-Encoding header field is in the request,
  // any content coding is considered acceptable by the user agent.
  if (acceptEncoding === '') {
    return setGetValueByIndex(allowedAlgorithms, 0) ?? ''
  }

  let match = null
  const pattern = /(?:,|^) *([a-z*]+)(?:;q=([\d.]+))?/ug

  while ((match = pattern.exec(acceptEncoding)) !== null) {
    const method = match[1] ?? ''
    const quality = parseFloat(match[2] || '1')

    if (
      quality > 0.0
      // @ts-expect-error
      && allowedAlgorithms.has(method)
    ) {
      // @ts-expect-error
      return method
    }
  }

  return ''
}
