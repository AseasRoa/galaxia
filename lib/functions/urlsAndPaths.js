import path from 'node:path'

const jsScriptExtensions = new Set(['.js', '.mjs'])
const tsScriptExtensions = new Set(['.ts', '.mts'])

/**
 * @param {string} esJsCode
 * @returns {RegExpExecArray[]}
 */
export function extractEsDependencies(esJsCode) {
  const matches = []

  for (const pattern of extractEsDependencies.patterns) {
    while (true) {
      const match = pattern.exec(esJsCode)

      if (match === null) {
        break
      }

      matches.push(match)
    }
  }

  return matches
}
/**
 * @see https://stackoverflow.com/questions/46967465/regex-match-text-in-either-single-or-double-quote
 * @type {RegExp[]}
 */
extractEsDependencies.patterns = [
  // For example: import { something } from 'moduleName'
  /(?:^|\n|;)import\s*(?:[\w\s{},$]*from)?\s*(["'])(([.\/]+)?(?:\\\1|(?!\1).)*)\1()/ug,
  // For example: export { something } from 'moduleName'
  /(?:^|\n|;)export\s*(?:[\w\s{},$]*from)?\s*(["'])(([.\/]+)?(?:\\\1|(?!\1).)*)\1()/ug,
  // For example: import('moduleName')
  /(?:^|[^\w])import\s*\(\s*(["'])(([.\/]+)?(?:\\\1|(?!\1).)*)\1(\s*\))/ug
]

/**
 * @param {string} path
 * @param {'/' | '\\'} slash
 * @returns {string}
 */
export function normalizePathSlashes(path, slash = '/') {
  return path
    .replace(/\\+/ug, slash) // multiple \ slashes into one
    .replace(/\/+/ug, slash) // multiple / slashes into one
}

/**
 * Remove unnecessary slashes and dots from the url path.
 * Also remove any ./ and process any ../
 * The function could work for full URLs, but it should be used for paths.
 *
 * @param {string} urlPath
 * @returns {string}
 */
export function normalizeURLPath(urlPath) {
  let thePath = urlPath

  // replace \ with /
  thePath = thePath.replace(/\\/ug, '/')

  // remove any ./ (negative lookbehind used here)
  thePath = thePath.replace(/(?<![.])(\.\/)/ug, '/')

  // replace multiple / with single /
  thePath = thePath.replace(/[\/]+/ug, '/')

  // restore the double // in https://
  thePath = thePath.replace(/^([a-z]+:\/)/um, '$1/')

  // process ../
  while (true) {
    let replaced = false

    thePath = thePath.replace(/[^.\/]+\/\.\.\//u, () => {
      replaced = true

      return ''
    })

    if (!replaced) break
  }

  return thePath
}

/**
 * Replace path separators (':', '/' or '\') with dashes ('-')
 *
 * @example
 * 'C:\folder\file.ext' => 'C--folder-file.ext'
 * 'https://example.com/file.ext' => 'https---example.com-file.ext'
 * @param {string} str
 * @param {string} [replaceValue]
 * @returns {string}
 */
export function replacePathSeparators(str, replaceValue = '-') {
  return str.replace(/[:\/\\]/ug, replaceValue)
}

/**
 * Version in the path prepends the actual path.
 * This function removes the version and returns the actual path:
 *
 * @example
 * before: /@ver12345678/the/actual/path
 * after:  /the/actual/path
 * @param {string} pathname
 * @returns {string}
 */
export function removeVersionFromPathname(pathname) {
  /**
   * The regex below also works, but it is 10 times slower
   * - return pathname.replace(/^\/@ver[^\/]+(.*)/, '$1')
   */

  if (pathname.startsWith('/@ver')) {
    const idx = pathname.indexOf('/', 5)

    if (idx > -1) {
      return pathname.substring(idx)
    }
  }

  return pathname
}

/**
 * Splits the input path by the slashes and returns an array,
 * containing each non-empty part of the input path.
 *
 * @example /dir/file.ext (or dir/file.ext) is turned into ['dir', 'file.ext'].
 * @param {string} pathToSplit
 * The input path. Could contain forward, backward or even mixed slashes.
 * @returns {string[]}
 * An array, containing each non-empty part of the input path.
 */
export function pathSplit(pathToSplit) {
  /*
   * Note: The code below works faster than doing .split and
   * then removing empty values
   */

  /**
   * Note: The method below is like 5% faster,
   * but it looks harder to understand
   *
   * @example
   * const match = /^(?:(?=[^\/\\])|[\/\\]+)(.*)/u.exec(pathToSplit)
   * if (!match) return []
   * return (match[1] ?? '').split(/[\/\\]+/ug)
   */

  /**
   * Note: I also tried 2 other methods (with loop and regexes),
   * but they were slower
   */

  const output = []
  let word = ''

  for (const char of pathToSplit) {
    // building a word
    if (char !== '/' && char !== '\\') {
      word += char
    }
    // pushing the word into the output
    else {
      if (word) {
        output.push(word)
      }

      word = '' // reset, start a new word
    }
  }

  // If the pathname does not end with /, then we have a word here
  if (word) output.push(word)

  return output
}

/**
 * @param {string} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @returns {boolean}
 * @throws {Error}
 */
export function isUnprocessedStyleFile(relativePath) {
  const parsedPath = path.parse(relativePath)
  const pathParts = pathSplit(relativePath)

  return (
    pathParts.length > 2 // Must be like ['module', 'styles', 'file.js']
    && isUnprocessedStyleFile.allowedExtensions.has(parsedPath.ext)
  )
}
isUnprocessedStyleFile.allowedExtensions
  = new Set(['.css', '.styl', '.sass', '.scss'])

/**
 * @param {string} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * @returns {boolean}
 * @throws {Error}
 */
export function isClientScript(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const parsedPath = path.parse(relativePath)

  return (
    isScriptExt(parsedPath.ext)
    && isClientPath(relativePath, dirName)
  )
}

/**
 * This function verifies whether the input path is a client
 * path (file or directory).
 *
 * The input path is allowed to contain forward or backward slashes,
 * and it's also allowed to start with or without a slash.
 *
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * The name of the dir in which the routes files are
 * @returns {boolean}
 * @throws {Error}
 */
export function isClientPath(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)

  return (
    // Must be like ['moduleName', 'clientDirName', 'File.js']
    pathParts.length >= 2
    && pathParts[1] === dirName
  )
}

/**
 * This function verifies whether the input path is a routes file.
 *
 * Routes must have JS extensions and be located in a
 * directory with certain name, or its subdirectories, so a
 * valid path would look like this:
 * /moduleName/routesDirName/File.js
 *
 * The input path is allowed to contain forward or backward slashes,
 * and it's also allowed to start with or without a slash.
 *
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * The name of the dir in which the routes files are
 * @returns {boolean}
 * @throws {Error}
 */
export function isRoutesScript(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    // Must be like ['moduleName', 'routesDirName', 'File.js']
    pathParts.length >= 3
    && pathParts[1] === dirName
    && isScriptExt(parsedPath.ext)
  )
}

/**
 * This function verifies whether the input path is a routes file.
 *
 * Routes must have JS extensions and be located in a
 * directory with certain name, or its subdirectories, so a
 * valid path would look like this:
 * /moduleName/viewDirName/File.js
 *
 * The input path is allowed to contain forward or backward slashes,
 * and it's also allowed to start with or without a slash.
 *
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * The name of the dir in which the routes files are
 * @param {Set<string>} allowedExtensions
 * @returns {boolean}
 * @throws {Error}
 */
export function isViewFile(relativePath, dirName, allowedExtensions) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    // Must be like ['moduleName', 'routesDirName', 'File.js']
    pathParts.length >= 3
    && pathParts[1] === dirName
    && allowedExtensions.has(parsedPath.ext)
  )
}

/**
 * TODO Write tests for this function
 *
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * The name of the dir in which the css files are
 * @param {string} clientDirName
 * The name of the client dir
 * @param {string} dirName
 * The name of the dir in which the css files are
 * @returns {boolean}
 */
export function isClientCssFile(relativePath, clientDirName, dirName) {
  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    // Must be like ['moduleName', 'clientDirName', 'css', 'index.css']
    pathParts.length >= 3
    && pathParts[1] === clientDirName
    && pathParts[2] === dirName
    && isClientCssFile.allowedExtensions.has(parsedPath.ext)
  )
}
isClientCssFile.allowedExtensions = new Set(['.css'])

/**
 * Publicly accessible path would be any path, except a path
 * that contains /server, for example: /module/server/anything
 *
 * @param {string | string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {Set<string>} forbiddenDirNames
 * @returns {boolean}
 */
export function isPubliclyAccessiblePath(relativePath, forbiddenDirNames) {
  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)
  const dirInModule = pathParts[1] ?? ''

  return !(forbiddenDirNames.has(dirInModule))
}

/**
 * Publicly accessible path would be any path, except a path
 * that contains /server, for example: /module/server/anything
 *
 * @param {string | string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {Set<string>} dirNames
 * @returns {boolean}
 */
export function isScriptFile(relativePath, dirNames) {
  const pathParts = (Array.isArray(relativePath))
    ? relativePath
    : pathSplit(relativePath)
  const dirInModule = pathParts[1] ?? ''
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    dirNames.has(dirInModule)
    && isScriptExt(parsedPath.ext)
  )
}

/**
 * Checks whether the input string is a valid
 * file extension for script files (JS or TS)
 *
 * @param {string} ext
 * @returns {boolean}
 */
export function isScriptExt(ext) {
  return jsScriptExtensions.has(ext) || tsScriptExtensions.has(ext)
}

/**
 * Checks whether the input string is a valid
 * file extension for script files (JS or TS)
 *
 * @param {string} ext
 * @returns {boolean}
 */
export function isTsExt(ext) {
  return tsScriptExtensions.has(ext)
}

/**
 * @param {string|string[]} modulePath
 * @returns {boolean}
 */
export function isNodeModule(modulePath) {
  const pathParts = (Array.isArray(modulePath))
    ? modulePath
    : pathSplit(modulePath)

  return (
    pathParts.length === 2
    && isNodeModule.allowedDirNames.has(pathParts[0] ?? '')
  )
}
isNodeModule.allowedDirNames = new Set(['@modules'])

/**
 * @param {string} inputPath
 * @returns {boolean}
 */
export function isFilePath(inputPath) {
  /**
   * The fastest way to detect this seems to be regex.
   * I tried node's path.parse(), which is 2 times slower.
   * I also tried reversed for loop, which is even slower.
   */
  return /\.[\w]+$/u.test(inputPath)
}

/**
 * If the module path is /@modules/pathName, the pathName part is extracted
 *
 * @param {string|string[]} modulePath
 * @returns {string}
 */
export function extractNodeModulePathname(modulePath) {
  const pathParts = (Array.isArray(modulePath))
    ? [...modulePath]
    : pathSplit(modulePath)

  if (
    extractNodeModulePathname.allowedDirNames.has(pathParts[0] ?? '')
  ) {
    pathParts.shift()

    return pathParts.join('/')
  }

  return ''
}
extractNodeModulePathname.allowedDirNames
  = new Set(['@modules'])

/**
 * @param {string} filePath
 * @returns {string}
 */
export function removeExtFromFilePath(filePath) {
  const parsed = path.parse(filePath)

  return parsed.dir + path.sep + parsed.name
}
