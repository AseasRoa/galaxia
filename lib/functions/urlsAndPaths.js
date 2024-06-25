import path from 'node:path'

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
 * @param {string} dirName
 * The name of the dir in which the router files are
 * @returns {boolean}
 */
export function isUnprocessedStyleFile(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  /**
   * @type {string[]}
   */
  const allowedExtensions = ['.css', '.styl', '.sass', '.scss']
  const parsedPath = path.parse(relativePath)
  const pathParts = pathSplit(relativePath)

  return (
    pathParts.length === 3 // Must be like ['module', 'styles', 'file.js']
    && pathParts[1] === dirName
    && allowedExtensions.includes(parsedPath.ext)
  )
}

/**
 * @param {string} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * @returns {boolean}
 */
export function isClientJSFile(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const allowedExtensions = ['.js', '.mjs', '.cjs']
  const parsedPath = path.parse(relativePath)

  return (
    allowedExtensions.includes(parsedPath.ext)
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
 * The name of the dir in which the router files are
 * @returns {boolean}
 */
export function isClientPath(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const pathParts = (relativePath instanceof Array)
    ? relativePath
    : pathSplit(relativePath)

  return (
    // Must be like ['moduleName', 'clientDirName', 'RouterFile.js']
    pathParts.length >= 2
    && pathParts[1] === dirName
  )
}

/**
 * This function verifies whether the input path is a router file.
 *
 * Router files must have JS extensions and be located in a
 * directory with certain name, or its subdirectories, so a
 * valid path would look like this:
 * /moduleName/routerDirName/RouterFile.js
 *
 * The input path is allowed to contain forward or backward slashes,
 * and it's also allowed to start with or without a slash.
 *
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * @param {string} dirName
 * The name of the dir in which the router files are
 * @returns {boolean}
 */
export function isRouterFile(relativePath, dirName) {
  if (!dirName) {
    throw new Error('Please, provide a dir name')
  }

  const pathParts = (relativePath instanceof Array)
    ? relativePath
    : pathSplit(relativePath)
  /** @type {string[]} */
  const allowedExtensions = ['.js', '.mjs', '.cjs']
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    // Must be like ['moduleName', 'routesDirName', 'RouterFile.js']
    pathParts.length >= 3
    && pathParts[1] === dirName
    && allowedExtensions.includes(parsedPath.ext)
  )
}

/**
 * @param {string|string[]} relativePath
 * The input path should start with the module name,
 * like this: /module/...
 * The name of the dir in which the css files are
 * @param {string} dirName
 * The name of the dir in which the css files are
 * @returns {boolean}
 */
export function isClientCssFile(relativePath, dirName) {
  const pathParts = (relativePath instanceof Array)
    ? relativePath
    : pathSplit(relativePath)
  /** @type {string[]} */
  const allowedExtensions = ['.css']
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (
    // Must be like ['moduleName', 'styles', 'index.css']
    pathParts.length === 3
    && pathParts[1] === dirName
    && allowedExtensions.includes(parsedPath.ext)
  )
}

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
  const pathParts = (relativePath instanceof Array)
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
export function isJSFile(relativePath, dirNames) {
  const jsExtensions = ['.js', '.mjs', '.cjs']
  const pathParts = (relativePath instanceof Array)
    ? relativePath
    : pathSplit(relativePath)
  const dirInModule = pathParts[1] ?? ''
  const parsedPath = path.parse(pathParts[pathParts.length - 1] ?? '')

  return (dirNames.has(dirInModule) && jsExtensions.includes(parsedPath.ext))
}

/**
 * @param {string|string[]} modulePath
 * @returns {boolean}
 */
export function isNodeModule(modulePath) {
  const allowedDirNames = ['@modules']
  const pathParts = (modulePath instanceof Array)
    ? modulePath
    : pathSplit(modulePath)

  return (
    pathParts.length === 2
    && allowedDirNames.includes(pathParts[0] ?? '')
  )
}

/**
 * If the module path is /@modules/pathName, the pathName part is extracted
 *
 * @param {string|string[]} modulePath
 * @returns {string}
 */
export function extractNodeModulePathname(modulePath) {
  const allowedDirNames = ['@modules']
  const pathParts = (modulePath instanceof Array)
    ? [...modulePath]
    : pathSplit(modulePath)

  if (
    allowedDirNames.includes(pathParts[0] ?? '')
  ) {
    pathParts.shift()

    return pathParts.join('/')
  }

  return ''
}

/**
 * @param {string} filePath
 * @returns {string}
 */
export function removeExtFromFilePath(filePath) {
  const parsed = path.parse(filePath)

  return path.join(parsed.dir, parsed.name)
}
