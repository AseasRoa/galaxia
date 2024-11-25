import { sep } from 'node:path'
import { importSomeFile } from '../functions/utils.js'
import { HttpContext } from './HttpContext.js'

class HooksRunner {
  /** @type {Map<string, Function[] | null>} */
  #hooksCacheFuncs = new Map()

  /** @type {string[]} */
  #fileExtensionsToTry = ['js']

  constructor() {
    this.#startCleanupInterval(30 * 60 * 1000)
  }

  /**
   * Run specified hooks. Note that the request and/or response
   * in the http context can be modified.
   *
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {string} moduleName App module name or empty string for global
   * @param {'static' | 'dynamic'} hooksType
   * @param {HttpContext} httpContext
   * @returns {Promise<boolean>}
   */
  async runFromModule(appConfig, appPaths, moduleName, hooksType, httpContext) {
    const hooksDir = (moduleName)
      ? (
        appPaths.modules + sep
        + moduleName + sep
        + appConfig.dirNames.hooks
      )
      : (
        appPaths.root + sep
        + appConfig.dirNames.app + sep
        + appConfig.dirNames.hooks
      )

    // Global hooks first
    const next = await this.runFromDir(hooksDir, hooksType, httpContext)

    if (next === false) {
      return false
    }

    // Module hooks
    return this.runFromDir(hooksDir, hooksType, httpContext)
  }

  /**
   * Run specified hooks. Note that the request and/or response
   * in the http context can be modified.
   *
   * @param {string} hooksDir
   * @param {'static' | 'dynamic'} hooksType
   * @param {HttpContext} httpContext
   * @returns {Promise<boolean>}
   */
  async runFromDir(hooksDir, hooksType, httpContext) {
    const hooksFileWithoutExt = hooksDir + sep + hooksType

    // 1: Collect hooks
    if (!(this.#hooksCacheFuncs.has(hooksFileWithoutExt))) {
      const result = await importSomeFile(
        [hooksFileWithoutExt + '.hooks'],
        this.#fileExtensionsToTry,
        '',
        false
      )

      if (result.file === '') {
        this.#hooksCacheFuncs.set(hooksFileWithoutExt, null)
      }
      else {
        const { exports } = result
        const funcs = []

        for (const name in exports) {
          if (exports[name] instanceof Function) {
            funcs.push(exports[name])
          }
        }

        this.#hooksCacheFuncs.set(
          hooksFileWithoutExt,
          funcs.length > 0 ? funcs : null
        )
      }
    }

    // 2: Run hooks
    const funcs = this.#hooksCacheFuncs.get(hooksFileWithoutExt)

    if (funcs) {
      return this.runFuncs(funcs, httpContext)
    }

    return false
  }

  /**
   * @param {Function[]} funcs
   * @param {HttpContext} httpContext
   * @returns {Promise<boolean>}
   */
  async runFuncs(funcs, httpContext) {
    for (const func of funcs) {
      if (!(typeof func === 'function')) {
        return false
      }

      // Run the hook
      const result = await func(httpContext)

      if (
        result === false
        || httpContext.response.original.writableEnded
      ) {
        return false
      }
    }

    return true
  }

  /**
   * @param {Function[]} funcs
   * @param {HttpContext} httpContext
   * @returns {boolean}
   */
  runFuncsSync(funcs, httpContext) {
    for (const func of funcs) {
      if (!(typeof func === 'function')) {
        return false
      }

      // Run the hook
      const result = func(httpContext)

      if (
        result === false
        || httpContext.response.original.writableEnded
      ) {
        return false
      }
    }

    return true
  }

  /**
   * When non-existent hooks dir is being processed, the data
   * written in the cache is null. Then, if the same dir has
   * to be processed again, it's easier to work with that null.
   * However, this means that the cache could be filled with
   * null data if many different non-existent dirs are tried
   * (in case of an attack for example). That's why the cache
   * has to be cleaned from time to time.
   *
   * @param {number} intervalMs
   */
  #startCleanupInterval(intervalMs) {
    setInterval(() => {
      for (const [key, value] of this.#hooksCacheFuncs) {
        if (!value) {
          this.#hooksCacheFuncs.delete(key)
        }
      }
    }, intervalMs)
  }
}

export { HooksRunner }
