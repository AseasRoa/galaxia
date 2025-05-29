import path from 'node:path'
import { pathSplit } from '../functions/urlsAndPaths.js'
import { RoutesProcessor } from './routes/RoutesProcessor.js'

/**
 * @callback TemplateFunction
 * @returns {Promise<string>}
 */

class Layout {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {RoutesProcessor} */
  #routesProcessor

  /** @type {string} */
  #routeFile = ''

  /** @type {Object<string, TemplateFunction> | null} */
  #routeFileExports = null

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {RoutesProcessor} routesProcessor
   */
  constructor(appConfig, appPaths, routesProcessor) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#routesProcessor = routesProcessor

    this.#routeFile = path.join(
      this.#appPaths.modules,
      this.#appConfig.dirNames.layout,
      this.#appConfig.dirNames.routes,
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

    const { html, pathParams } = result
    const chunks = this.#htmlToChunks(html, pathParams)

    let outputHtml = ''

    for (const chunk of chunks) {
      outputHtml += (typeof chunk === 'function')
        ? await chunk(chunkParams)
        : chunk
    }

    return outputHtml
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

    return (name === '') ? null : { name, remainder }
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

    const defaultClass = this.#routeFileExports?.['default']

    if (typeof defaultClass !== 'function') {
      return null
    }

    /** @type {string | null} */
    let name = ''
    let tmpName = '' // when looking for entry in exported default class

    /** @type {string[]} */
    const remainder = []

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

    return (name === '') ? null : { name, remainder }
  }

  /**
   * @param {string[]} explodedPathname
   * @param {app.ChunkParams} chunkParams
   * @returns {Promise<null | {html: string, pathParams: string[]}>}
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
      this.#appConfig.dirNames.layout,
      'index',
      entryName
    ]

    const html = await this.#routesProcessor.process(
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
    const chunks = []
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

      const chunkFn = this.#routesProcessor.process.bind(
        this.#routesProcessor,
        layoutPath,
        pathParams
      )

      chunks.push(
        string.substring(index, match.index),
        chunkFn
      )

      index = match.index + (match[0] ?? '').length
    }

    // Also push any leftover string
    if (index < string.length) {
      chunks.push(string.substring(index))
    }

    return chunks
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
      this.#routeFileExports = await import(`file://${this.#routeFile}`)
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
