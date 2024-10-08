import { fileExists } from '../functions/fileSystem.js'
import { HttpContext } from '../server/HttpContext.js'

/** @type {Map<string, Function[] | null>} */
const hooksCacheFuncs = new Map()

class Hooks {
  /**
   * @param {HttpContext} httpContext
   * @param {string} hooksFilePath
   * @returns {Promise<HttpContext>}
   */
  async run(httpContext, hooksFilePath) {
    // 1: Collect hooks
    if (!(hooksCacheFuncs.has(hooksFilePath))) {
      if (!await fileExists(hooksFilePath)) {
        hooksCacheFuncs.set(hooksFilePath, null)
      }
      else {
        const exported = await import(hooksFilePath)
        const funcs = []

        for (const name in exported) {
          if (exported[name] instanceof Function) {
            funcs.push(exported[name])
          }
        }

        hooksCacheFuncs.set(hooksFilePath, funcs)
      }
    }

    // 2: Run hooks
    const funcs = hooksCacheFuncs.get(hooksFilePath)

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
