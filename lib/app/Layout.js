import path from 'node:path'
import { RouterProcessor } from '../appRouter/RouterProcessor.js'
import { pathSplit } from '../functions/urlsAndPaths.js'

/**
 * @callback TemplateFunction
 * @returns {Promise<string>}
 */

class Layout {
  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {RouterProcessor} */
  #ioProcessor

  /** @type {string} */
  #routeFile = ''

  /**
   * @type {Object<string, TemplateFunction> | null}
   */
  #routeFileExports = null

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {RouterProcessor} ioProcessor
   */
  constructor(appConfig, appPaths, ioProcessor) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.#ioProcessor = ioProcessor
    this.#routeFile = path.join(
      this.appPaths.components,
      this.appConfig.pathNames.layoutDirName,
      this.appConfig.pathNames.routesDirName,
      '/index.js'
    )
  }

  /**
   * @param {string[]} explodedPathname
   * @param {app.ChunkParams} chunkParams
   * @returns {Promise<string | null>}
   * Returns null if method not found, which technically means Page Not Found
   */
  async makeLayoutHtml(explodedPathname, chunkParams) {
    const result = await this.#getRawLayoutHtmlAndParams(
      explodedPathname, chunkParams
    )

    if (result === null) {
      return null
    }

    const { html: layoutHtml, pathParams } = result

    const parts = this.#htmlToChunks(layoutHtml, pathParams)

    let html = ''

    for (const part of parts) {
      html += (typeof part === 'function') ? await part(chunkParams) : part
    }

    return html
  }

  /**
   * Search for a function in one of the named exports
   *
   * @param {string[]} explodedPathname
   * @returns {null | {name: string, remainder: string[]}}
   * Returns null if not found
   */
  #findEntryFunctionInExports(explodedPathname) {
    if (!this.#routeFileExports) {
      return null
    }

    /** @type {string} */
    let name = ''
    let tmpName = ''

    /** @type {string[]} */
    const remainder = []

    for (const item of explodedPathname) {
      tmpName = (!tmpName)
        ? item
        : tmpName + item.charAt(0).toUpperCase() + item.slice(1)

      if (!this.#routeFileExports[tmpName]) {
        remainder.push(item)

        continue
      }

      name = tmpName
      remainder.length = 0
    }

    return name ? { name, remainder } : null
  }

  /**
   * Search for a method in a class, exported as 'default' in the exports
   *
   * @param {string[]} explodedPathname
   * @returns {null | {name: string, remainder: string[]}}
   * Returns null if not found
   */
  #findEntryMethodInDefaultClass(explodedPathname) {
    if (!this.#routeFileExports) {
      return null
    }

    /** @type {string | null} */
    let name = ''

    /** @type {string[]} */
    const remainder = []

    const defaultClass = this.#routeFileExports?.['default']

    if (typeof defaultClass === 'function') {
      let tmpName = '' // when looking for entry in exported default class

      for (const item of explodedPathname) {
        tmpName = (!tmpName)
          ? item
          : `${tmpName}/${item}`

        if (!Object.hasOwn(defaultClass.prototype, tmpName)) {
          remainder.push(item)

          continue
        }

        name = tmpName
        remainder.length = 0
      }
    }

    return name ? { name, remainder } : null
  }

  /**
   * @param {string[]} explodedPathname
   * @param {app.ChunkParams} chunkParams
   * @returns {Promise<{html: string, pathParams: string[]} | null>}
   * Returns null if no callable function is found
   * @throws {TypeError} When the callable method returns wrong type
   */
  async #getRawLayoutHtmlAndParams(explodedPathname, chunkParams) {
    const routeFileExports
      = this.#routeFileExports ?? (await this.#importRouteFile())

    if (!routeFileExports) {
      return null
    }

    /*
     * Find exported function, or a method in the exported default class.
     * At this moment we only care whether such function/method exists,
     * and we only need its name.
     */
    const result = this.#findEntryMethodInDefaultClass(explodedPathname)
      ?? this.#findEntryFunctionInExports(explodedPathname)

    if (!result) {
      // No callable function found
      return null
    }

    const entryName = result.name
    const pathParams = result.remainder

    const layoutPath = [
      this.appConfig.pathNames.layoutDirName,
      'index',
      entryName
    ]
    const html = await this.#ioProcessor.process(
      layoutPath, pathParams, chunkParams
    )

    if (html instanceof Error) {
      throw html
    }

    if (typeof html !== 'string') {
      throw new TypeError(`${entryName}() in ${this.#routeFile} must return a string, but returns ${typeof html} instead.`)
    }

    return { html, pathParams }
  }

  /**
   * Split the input html code into an array of chunks, each
   * containing either a string (html code) or a function,
   * which would later generate html code when executed.
   *
   * @param {string} string
   * @param {string[]} pathParams
   * @returns {(string | Function)[]}
   * @throws {Error} When a path is not correct
   */
  #htmlToChunks = (string, pathParams) => {
    /** @type {(string | Function)[]} */
    const parts = []
    const pattern = /<slot>([^<>]+)<\/slot>/ug

    let index = 0

    while (true) {
      const match = pattern.exec(string)

      if (match === null) {
        break
      }

      const pathToSplit = match[1] ?? ''

      let layoutPath = pathSplit(pathToSplit)

      if (layoutPath.length === 0 || layoutPath.length > 3) {
        throw new Error(`Path "${pathToSplit}" is not correct`)
      }

      if (layoutPath.length === 1) {
        layoutPath = [
          layoutPath[0] ?? 'index',
          'index'
        ]
      }
      else if (layoutPath.length === 2) {
        layoutPath = [
          layoutPath[0] ?? 'index',
          'index',
          layoutPath[1] ?? 'index'
        ]
      }

      /**
       * @param {app.ChunkParams} chunkParams
       * @returns {Promise<*|Error>}
       */
      const chunkFn = async(chunkParams) => await this.#ioProcessor.process(
        layoutPath, pathParams, chunkParams
      )

      parts.push(string.substring(index, match.index))
      parts.push(chunkFn)

      index = match.index + (match[0] ?? '').length
    }

    // Also push any leftover string
    if (index < string.length) {
      parts.push(string.substring(index))
    }

    return parts
  }

  /**
   * @returns {Promise<Object<string, TemplateFunction> | null>}
   * @throws
   */
  async #importRouteFile() {
    if (this.#routeFileExports) {
      return this.#routeFileExports
    }

    this.#routeFileExports = null

    try {
      this.#routeFileExports = await import(path.join('file://', this.#routeFile))
    }
    catch (error) {
      // do nothing

      if (error instanceof SyntaxError) {
        throw error
      }
    }

    return this.#routeFileExports
  }
}

export { Layout }
