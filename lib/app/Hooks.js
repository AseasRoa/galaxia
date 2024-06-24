import { fileExists } from '../functions/fileSystem.js'
import { HttpExchange } from '../server/HttpExchange.js'

/** @type {Map<string, Function[] | null>} */
const hooksCacheFuncs = new Map()

class Hooks {
  /**
   * @param {HttpExchange} exchange
   * @param {string} hooksFilePath
   * @returns {Promise<HttpExchange>}
   */
  async run(exchange, hooksFilePath) {
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
        await func(exchange)

        // Break on finished response
        if (exchange.response.original.writableEnded) {
          break
        }
      }
    }

    return exchange
  }
}

export { Hooks }
