import { pathSplit } from '../functions/urlsAndPaths.js'

/**
 * @see https://github.com/npm/normalize-package-data#rules-for-name-field
 * @type {RegExp[]}
 */
const patterns = [
  // For example: import { something } from 'moduleName'
  /((?:^|\n)import\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: export { something } from 'moduleName'
  /((?:^|\n)export\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: import('moduleName')
  /((?:^|[^\w])import\s*\(\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)(\s*\))/ug
]

/**
 * @param {string} inputCode
 * An array with patterns to apply to the replace function
 * @param {boolean} skipPathsWithDots
 * If paths starting with ./ or ../ are found, don't change them
 * @param {string} prefix
 * Prefix to prepend to the module name
 * @param {string} relativePath
 * Relative path to add after the prefix, when ./ is detected
 * @returns {{
 *   code: string,
 *   deps: string[]
 * }}
 */
function renameModulesReplacer(
  inputCode,
  skipPathsWithDots,
  prefix,
  relativePath
) {
  let code = inputCode

  /** @type {string[]} */
  const deps = []

  patterns.forEach((pattern) => {
    code = code.replace(
      pattern,
      (match, m1, m2, m3, m4, m5, m6) => {
        const slashes = m3 ?? m4 ?? m5

        if (slashes === '/') {
          return match
        }

        if (skipPathsWithDots && slashes) {
          return match
        }

        const quote = m2[0]
        const moduleName = m2.slice(1, -1)

        if (!deps.includes(moduleName)) deps.push(moduleName)

        return `${m1}${quote}${prefix}${(slashes) ? relativePath : ''}${moduleName}/${quote}${m6 ?? ''}`
      }
    )
  })

  return { code, deps }
}

/**
 * If there are import statements in the input code who are pointing
 * to a module in node_modules (no relative path, no file path), the
 * module name is prepended with /@modules/
 *
 * Also, if there are relative imports, they are prepended with
 * /@modules/%path%,where %path% is extracted from the input
 * parsed path.
 *
 * @example
 * Input code:
 * import * from 'moduleName'
 * Output code:
 * import * from '/@modules/moduleName'
 * @param {string} code
 * @param {ParsedPath} [parsedPath]
 * @returns {{
 *   code: string,
 *   deps: string[]
 * }}
 */
export function renameEsImports(code, parsedPath) {
  let relativePath = ''

  if (parsedPath) {
    const split = pathSplit(parsedPath.dir)
    const nodeModulesIndex = split.indexOf('node_modules')
    const isInNodeModules = (nodeModulesIndex > -1)

    if (isInNodeModules) {
      for (let i = nodeModulesIndex + 1; i < split.length; i++) {
        const part = split[i]

        if (part) {
          relativePath += `${part}/`
        }
      }
    }

    if (!isInNodeModules) {
      return {
        code: code,
        deps: []
      }
    }
  }

  const skipPathsWithDots = !parsedPath

  return renameModulesReplacer(
    code,
    skipPathsWithDots,
    '/@modules/',
    relativePath
  )
}
