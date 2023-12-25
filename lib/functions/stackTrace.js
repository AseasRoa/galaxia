/**
 * @see https://www.digitalocean.com/community/tutorials/js-stack-trace
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
 *
 * @type {RegExp[]}
 */
const patterns = [
  // V8: at ClassName.methodName (/path/fileName.js:10:20)
  /at (.+) \((.+):(\d+):(\d+)\)$/u,
  // V8: at /path/fileName.js:10:20
  /at ()(.+):(\d+):(\d+)$/u,
  // FF30: trace@/path/fileName.js:10:20
  /(.*)@(.+):(\d+):(\d+)$/u,
  // FF14 to DD29: trace@/path/fileName.js:10
  /(.*)@(.+):(\d+)()$/u,
]

/**
 * @param {string} stackLine
 * @returns {null | string[]}
 */
function parseStackLine(stackLine) {
  /** @type {null | string[]} */
  let match = null

  for (const pattern of patterns) {
    match = pattern.exec(stackLine ?? '')

    if (match) break
  }

  if (!match) {
    return null
  }

  return match
}

/**
 * @param {string} fileURI
 * @returns {string}
 */
function getPathFromFileURI(fileURI) {
  /**
   * Unix:
   *   file://localhost/etc/fstab
   *   file:///etc/fstab
   * KDE:
   *   file:/etc/fstab
   * Windows:
   *   file:///c:/WINDOWS/clock.avi
   *
   * @see https://en.wikipedia.org/wiki/File_URI_scheme
   *
   * @type {RegExpExecArray | null}
   */
  const match = /^file:(?:\/\/\/([a-zA-Z]:[\\\/].*)|\/*(\/.+))/u
    .exec(fileURI.trim())

  return match?.[1] ?? match?.[2] ?? fileURI
}

/**
 * This function works in V8 and Firefox
 *
 * @param {number} level
 * @returns {{
 *   fileName: string,
 *   lineNumber: number
 *   columnNumber: number
 * } | null}
 * @throws {Error}
 */
function stackTrace(level = 1) {
  /** @type {string[]} */
  let stack = []

  try {
    throw new Error('')
  }
  catch (error) {
    if (error instanceof Error) {
      stack = (error.stack ?? '')
        .replaceAll('\r', '')
        .split('\n')
        .map((line) => line.trim())

      /*
       * Remove the first value if it stars with Error,
       * and remove the second line, because it leads
       * to the current function.
       */
      stack = stack.splice((stack[0] ?? '').startsWith('Error') ? 2 : 1)
    }
  }

  if (!stack[level]) {
    return null
  }

  const parsed = parseStackLine(stack[level] ?? '')

  if (!parsed) {
    return null
  }

  const fileName = getPathFromFileURI(parsed[2] ?? '')

  return {
    fileName: decodeURI(fileName),
    lineNumber: parseInt(parsed[3] ?? '0'),
    columnNumber: parseInt(parsed[4] ?? '0')
  }
}

export default stackTrace

export { getPathFromFileURI, parseStackLine, stackTrace }
