/**
 * Parse options.
 *
 * @typedef ParseOptions
 * @type {object}
 * @property {(str: string) => string | undefined} [decode]
 * Specifies a function that will be used to decode a
 * [cookie-value](https://datatracker.ietf.org/doc/html/rfc6265#section-4.1.1).
 * Since the value of a cookie has a limited character set
 * (and must be a simple string), this function can be used to decode
 * a previously-encoded cookie value into a JavaScript string.
 * The default function is the global `decodeURIComponent`, wrapped in
 * a `try..catch`. If an error is thrown it will return the cookie's original
 * value. If you provide your own encode/decode scheme you must ensure errors
 * are appropriately handled.
 */

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {ParseOptions} [options]
 * @returns {Record<string, (string | undefined)>}
 */
export function parse(str, options,) {
  /** @type {Record<string, (string | undefined)>} */
  const cookies = {}
  const len = str.length

  // RFC 6265 sec 4.1.1, RFC 2616 2.2 defines a cookie name
  // consists of one char minimum, plus '='.
  if (len < 2) return cookies

  const decodeFn = (typeof options?.decode === 'function')
    ? options.decode
    : decode
  let index = 0

  do {
    const eqIdx = str.indexOf('=', index)

    if (eqIdx === -1) {
      break // No more cookie pairs.
    }

    const colonIdx = str.indexOf(';', index)
    const endIdx = (colonIdx === -1) ? len : colonIdx

    if (eqIdx > endIdx) {
      // backtrack on prior semicolon
      index = str.lastIndexOf(';', eqIdx - 1) + 1
      continue
    }

    const keyStartIdx = startIndex(str, index, eqIdx)
    const keyEndIdx = endIndex(str, eqIdx, keyStartIdx)
    const key = str.slice(keyStartIdx, keyEndIdx)

    // only assign once
    if (!Object.hasOwn(cookies, key)) {
      const valStartIdx = startIndex(str, eqIdx + 1, endIdx)
      const valEndIdx = endIndex(str, endIdx, valStartIdx)
      const value = decodeFn(str.slice(valStartIdx, valEndIdx))

      cookies[key] = value
    }

    index = endIdx + 1
  } while (index < len)

  return cookies
}

/**
 * @param {string} str
 * @param {number} index
 * @param {number} max
 * @returns {number}
 */
function startIndex(str, index, max) {
  do {
    const code = str.charCodeAt(index)

    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) {
      return index
    }

    index += 1
  } while (index < max)

  return max
}

/**
 * @param {string} str
 * @param {number} index
 * @param {number} min
 * @returns {number}
 */
function endIndex(str, index, min) {
  while (index > min) {
    index -= 1

    const code = str.charCodeAt(index)

    if (code !== 0x20 /*   */ && code !== 0x09 /* \t */) {
      return index + 1
    }
  }

  return min
}

/**
 * URL-decode string value. Optimized to skip native call when no %.
 *
 * @param {string} str
 * @returns {string}
 */
function decode(str) {
  if (str.indexOf('%') === -1) {
    return str
  }

  try {
    return decodeURIComponent(str)
  }
  catch (e) {
    return str
  }
}
