import { sep } from 'node:path'
import { importSomeFile } from '../functions/utils.js'
import { HttpContext } from '../server/HttpContext.js'

class Hooks {
  /** @type {Map<string, Function[] | null>} */
  #hooksCacheFuncs = new Map()

  /** @type {string[]} */
  #fileExtensionsToTry = ['js']

  /**
   * Run specified hooks. Note that the request and/or response
   * in the http context can be modified.
   *
   * @param {string} hooksDir
   * @param {'static' | 'dynamic'} hooksType
   * @param {HttpContext} httpContext
   * @returns {Promise<HttpContext>}
   */
  async run(hooksDir, hooksType, httpContext) {
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

        this.#hooksCacheFuncs.set(hooksFileWithoutExt, funcs)
      }
    }

    // 2: Run hooks
    const funcs = this.#hooksCacheFuncs.get(hooksFileWithoutExt)

    if (funcs) {
      for (const func of funcs) {
        // Run the hook
        await func(httpContext)

        // Break on finished response
        if (httpContext.response.original.writableEnded) {
          break
        }
      }
    }

    return httpContext
  }
}

export { Hooks }
