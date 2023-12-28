/**
 * @typedef {object} PackageJsonConditionalExports
 * @property {string} [node-addon]
 * @property {string} [import]
 * @property {string} [require]
 * @property {string} [default]
 */

/**
 * @see https://docs.npmjs.com/cli/v10/configuring-npm/package-json
 * @see https://nodejs.org/api/packages.html#nodejs-packagejson-field-definitions
 *
 * @typedef {object} PackageJson
 * @property {string} [name]
 * @property {string} [version]
 * @property {string} [description]
 * @property {string[]} [keywords]
 * @property {string} [homepage]
 * @property {{ url?: string, email?: string }} [bugs]
 * @property {string} [license]
 * @property {(
 *   string
 *   | { type?: string, url?: string }
 *   | (string | { type?: string, url?: string })[]
 * )} [funding]
 * @property {string[]} [files]
 * @property {string} [main]
 * @property {string} [browser]
 * @property {string | Object<string, string>} [bin]
 * @property {string | string[]} [man]
 * @property {{ bin?: string, man?: string }} [directories]
 * @property {(
 *   string
 *   | { type?: string, url?: string, directory?: string }
 * )} [repository]
 * @property {Object<string, string>} [scripts]
 * @property {Object<string, string>} [config]
 * @property {Object<string, string>} [dependencies]
 * @property {Object<string, string>} [devDependencies]
 * @property {Object<string, string>} [peerDependencies]
 * @property {Object<string, Object<string, any>>} [peerDependenciesMeta]
 * @property {string[]} [bundleDependencies]
 * @property {Object<string, string>} [optionalDependencies]
 * @property {Object<string, string | Object<string, any>>} [overrides]
 * @property {Object<string, string>} [engines]
 * @property {string[]} [os]
 * @property {string[]} [cpu]
 * @property {boolean} [private]
 * @property {Object<string, string>} [publishConfig]
 * @property {string[]} [workspaces]
 * @property {string} [packageManager]
 * @property {'module' | 'commonjs'} [type]
 * @property {(
 *   string
 *   | string[]
 *   | PackageJsonConditionalExports
 *   | Record<string, string | PackageJsonConditionalExports>
 * )} [exports]
 * @property {Object<string, string>} [imports]
 * @property {string} [module] Not supported
 */

/**
 * @see https://nodejs.org/api/packages.html#conditional-exports
 * @type {string[]}
 */
const exportsSpecificFields = ['import', 'require', 'default']

/**
 * @param {PackageJson["exports"]} exports
 * @param {boolean} es6
 * @returns {string}
 */
function extractEntryPointFromExports(exports, es6) {
  if (exports) {
    if (typeof exports === 'string') {
      return exports
    }

    if (exports instanceof Object) {
      for (const field of exportsSpecificFields) {
        if (
          (es6 && field === 'require')
          || (!es6 && field === 'import')
        ) {
          continue
        }

        if (
          typeof exports[field] === 'string'
          && exports[field]
        ) {
          return exports[field]
        }
      }
    }
  }

  return ''
}

/**
 * @param {PackageJson} packageJson
 * @param {boolean} [es6]
 * @param {boolean} [browser]
 * @returns {string}
 */
function extractEntryPoint(packageJson, es6 = true, browser = true) {
  if (!(packageJson instanceof Object)) {
    throw new Error('package.json contents is not an Object')
  }

  if (browser && typeof packageJson.browser === 'string') {
    return packageJson.browser
  }

  /*
   * When a package has an "exports" field, this will take precedence
   * over the "main" field when importing the package by name.
   */

  if (packageJson.exports instanceof Object) {
    const { exports } = packageJson
    const exportsDot = exports['.']

    let result = extractEntryPointFromExports(exportsDot, es6)

    if (!result) {
      result = extractEntryPointFromExports(exports, es6)
    }

    if (result) {
      return result
    }
  }

  if (typeof packageJson.exports === 'string') {
    return packageJson.exports
  }

  if (es6 && typeof packageJson.module === 'string') {
    return packageJson.module
  }

  if (typeof packageJson.main === 'string') {
    return packageJson.main
  }

  return ''
}

export { extractEntryPoint }
