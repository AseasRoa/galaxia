import { access } from 'node:fs/promises'
import inspector from 'node:inspector'
import path from 'node:path'
import process from 'node:process'

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
 * @param {number} major - Major release number.
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
 * names and extensions, and try to import it
 *
 * @param {string[]} pathsToFilesWithoutExtension
 * An array of file names to try
 * @param {string[]} [extensionsToTry]
 * An array with file extensions to try. Omit the dot!
 * @param {string} [version]
 * Used for loading different version of the file
 * @returns {Promise<{exports: *, file: string, ext: string}>}
 * Returns the exports of the imported module and info about the file
 * @throws
 * Throws an error if no file is found, or it could not be imported
 */
export async function importSomeFile(
  pathsToFilesWithoutExtension,
  extensionsToTry = ['js'],
  version = ''
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

  if (!ext) {
    throw new Error(
      `Could not find file "${pathsToFilesWithoutExtension.join('|')}.[${extensionsToTry.join('|')}]" in order to import it.`
    )
  }

  const filePath = path.join('file://', fullPath + ((version) ? `?ver=${version}` : ''))
  const exports = (await import(filePath))

  return {
    exports: exports,
    file: fullPath,
    ext: ext
  }
}

/**
 * @param {Map<*, *>} strMap
 * @returns {Object<*, *>}
 */
export function strMapToObj(strMap) {
  const obj = {}

  strMap.forEach((value, key) => {
    // @ts-ignore
    obj[key] = value
  })

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
