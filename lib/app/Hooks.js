import { sep } from 'node:path'
import { fileExists } from '../functions/fileSystem.js'
import { HttpContext } from '../server/HttpContext.js'

class Hooks {
  /** @type {Map<string, Function[] | null>} */
  #hooksCacheFuncs = new Map()

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
    const hooksFile = hooksDir + sep + hooksType + '.hooks.js'

    // 1: Collect hooks
    if (!(this.#hooksCacheFuncs.has(hooksFile))) {
      if (!await fileExists(hooksFile)) {
        this.#hooksCacheFuncs.set(hooksFile, null)
      }
      else {
        const exported = await import(hooksFile)
        const funcs = []

        for (const name in exported) {
          if (exported[name] instanceof Function) {
            funcs.push(exported[name])
          }
        }

        this.#hooksCacheFuncs.set(hooksFile, funcs)
      }
    }

    // 2: Run hooks
    const funcs = this.#hooksCacheFuncs.get(hooksFile)

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
