import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { RoutesProcessor } from '../appRoutes/RoutesProcessor.js'
import {
  getHeaderAsString,
  getPostRequestParameters,
  isRequestHtml,
  isRequestXHR,
  isResponseEnded
} from '../functions/httpRequestResponse.js'
import { PublicScripts } from '../publicScripts/PublicScripts.js'
import { HttpContext } from '../server/HttpContext.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { HttpResponseFormatter } from '../server/HttpResponseFormatter.js'
import { EarlyHints } from './EarlyHints.js'
import { Layout } from './Layout.js'

class AppModules {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {EarlyHints} */
  #earlyHints

  /** @type {HttpResponseFormatter} */
  #httpResponseFormatter

  /** @type {RoutesProcessor} */
  #routesProcessor

  /** @type {Layout} */
  #layout

  /** @type {PublicScripts} */
  #publicScripts

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   * @param {EarlyHints} earlyHints
   */
  constructor(appConfig, appPaths, appFileManagers, earlyHints) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers
    this.#earlyHints = earlyHints

    this.#httpResponseFormatter = new HttpResponseFormatter({
      maxAge: this.#appConfig.maxAge,
      mimeTypes: this.#appConfig.mimeTypes
    })
    this.#publicScripts = new PublicScripts(!this.#appConfig.development)
    this.#routesProcessor = new RoutesProcessor(
      this.#appConfig, this.#appPaths, this.#appFileManagers
    )
    this.#layout = new Layout(
      this.#appConfig, this.#appPaths, this.#routesProcessor
    )
  }

  /**
   * All HTTP requests end up here.
   * In this function we route those requests to the appropriate
   * module, process the request and make the response.
   *
   * @param {HttpContext} httpContext
   * @param {string[]} explodedPathname
   */
  async processRequest(httpContext, explodedPathname) {
    const { request } = httpContext
    let isXHR = isRequestXHR(request)
    let isHTML = isRequestHtml(request)

    if ((isXHR && isHTML) || (!isXHR && !isHTML)) {
      isXHR = true
      isHTML = false
    }

    /** @type {app.QueryParams} */
    const queryParams = {
      query: await getPostRequestParameters(request),
      queryGet: request.url.searchParams
    }

    /** @type {app.ModulesAssets} */
    const modulesAssets = {
      scripts: new Map(),
      styles: new Map()
    }

    const appModulesUsed = new Set()

    /** @type {app.ChunkParams} */
    const chunkParams = {
      httpContext,
      isXHR,
      isHTML,
      queryParams,
      modulesAssets,
      appModulesUsed
    }

    if (request.method === 'GET' && !isXHR && isHTML) {
      await this.#processRequestAsHtmlPage(chunkParams, explodedPathname)
    }
    else {
      await this.#processRequestAsXhr(chunkParams, explodedPathname)
    }
  }

  /**
   * @param {app.ChunkParams} chunkParams
   * @param {string[]} explodedPathname
   * @returns {Promise<void>}
   */
  async #processRequestAsHtmlPage(chunkParams, explodedPathname) {
    const { request, response } = chunkParams.httpContext

    /** @type {string | null} */
    let html = ''

    try {
      html = await this.#layout.makeLayoutHtml(explodedPathname, chunkParams)
    }
    catch (error) {
      const development = Boolean(this.#appConfig.development)

      if (development) console.error(error)

      response.statusCode = 500

      this.#respondWithError(
        response,
        (development) ? error : new Error('Internal Server Error'),
        true,
        development
      )

      return
    }

    // TODO Html head tags worked before, but not anymore. Make them work again.
    /** @type {Object<string, (string | Array<Object<string, string>>)>} */
    const htmlHeadTags = {}

    if (html === null) {
      response.statusCode = 404
      html = 'Page Not Found'
    }
    else {
      if (isResponseEnded(response)) return

      const { appModulesUsed, modulesAssets, words } = chunkParams
      const { styles, scripts } = this.#stringifyModulesAssets(modulesAssets)
      const globalFilesVersion
        = await this.#appFileManagers.getGlobalFilesVersion()
      const baseHref = (styles !== '' || scripts !== '')
        ? `//${request.url.host}/${globalFilesVersion}/`
        : ''
      const importMap = (scripts)
        ? await this.#appFileManagers.buildImportMapScript(appModulesUsed)
        : ''
      const locale = words?.locale ?? 'en'

      html = `<!DOCTYPE html>\n<html lang="${locale}">\n`
        + '<head>\n'
        + ((baseHref !== '') ? `  <base href="${baseHref}">\n` : '')
        + ((importMap !== '') ? `  ${importMap}\n` : '')
        + objectToHtmlTags(htmlHeadTags, '  ')
        + ((styles !== '') ? `${styles}\n` : '')
        + ((scripts !== '') ? `  <script>\n${await this.#publicScripts.getScriptFromRepository('browserSupportCheck.js')}\n  </script>\n` : '')
        + ((scripts !== '') ? `  <script>\n${await this.#publicScripts.getScriptFromRepository('rpc.js')}\n  </script>\n` : '')
        + '</head>\n<body>'
        + `${html}\n`
        + ((scripts !== '') ? `${scripts}\n` : '')
        + '</body>\n</html>'

      if (this.#appConfig.server.earlyHints) {
        this.#earlyHints.writeForHtmlResponse(
          response.original,
          globalFilesVersion,
          modulesAssets
        )
      }
    }

    this.#httpResponseFormatter.setHeaders(response, 'html')

    response.end(html)
  }

  /**
   * @param {app.ChunkParams} chunkParams
   * @param {string[]} explodedPathname
   * @returns {Promise<void>}
   */
  async #processRequestAsXhr(chunkParams, explodedPathname) {
    const { request, response } = chunkParams.httpContext

    const ajaxVersion
      = (this.#appConfig.ajax.version).toString() ?? ''
    const ajaxVersionInHeader
      = getHeaderAsString(request, 'x-ajax-version') ?? ''
    const development
      = Boolean(this.#appConfig.development)

    if (ajaxVersionInHeader && ajaxVersionInHeader !== ajaxVersion) {
      const error = new Error(this.#appConfig.ajax.wrongVersionMessage)

      this.#respondWithError(response, error, true, development)
    }
    else {
      const value = await this.#routesProcessor.process(
        explodedPathname, explodedPathname, chunkParams
      )

      if (isResponseEnded(response)) return

      if (value instanceof Error) {
        // @ts-ignore
        this.#respondWithError(response, value, value?.isThrow, development)
      }
      else if (value instanceof String) {
        /*
         * String() returns a primitive.
         * new String() returns an object.
         */

        this.#httpResponseFormatter.setHeaders(response, 'txt')

        response.setHeader('x-response-type', 'string')
        response.end(value.toString())
      }
      else if (typeof value === 'string') {
        this.#httpResponseFormatter.setHeaders(response, 'txt')

        response.setHeader('x-response-type', 'string')
        response.end(value)
      }
      else {
        this.#httpResponseFormatter.setHeaders(response, 'json')

        response.setHeader('x-response-type', 'json')
        response.end(JSON.stringify(value))
      }
    }
  }

  /**
   * @param {HttpResponse} response
   * @param {Error} error
   * @param {boolean} isThrow
   * @param {boolean} development
   * If true, the stack of the actual error will be put into the response.
   * The stack contains file paths on the server.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
   * @see https://kinsta.com/blog/http-status-codes/
   */
  #respondWithError(response, error, isThrow, development) {
    const code = isThrow ? 400 : 200
    const stack = (development)
      ? (error.stack ?? '').replace(/^Error: /u, '')
      : ''

    /**
     * Set the status code. But don't change it if it was already set to
     * something different from 200 (200 is the default value anyway)
     */
    if (response.statusCode === 200) {
      response.statusCode = code
    }

    /**
     * @see https://www.iana.org/assignments/media-types/media-types.xhtml
     */
    this.#httpResponseFormatter.setHeaders(response, 'json')

    if (response.statusCode === 200) {
      response.setHeader('x-response-type', 'error')
    }

    response.end(JSON.stringify({
      code: response.statusCode,
      name: error.name,
      message: error.message,
      stack: stack
    }))
  }

  /**
   * @param {app.ModulesAssets} modulesAssets
   * @returns {{ styles: string, scripts: string }}
   */
  #stringifyModulesAssets(modulesAssets) {
    return {
      styles: this.#modulesAssetsStringifier(modulesAssets.styles),
      scripts: this.#modulesAssetsStringifier(modulesAssets.scripts)
    }
  }

  /**
   * @param {Map<string, {tag: string}>} assets
   * @returns {string}
   */
  #modulesAssetsStringifier(assets) {
    const set = new Set()

    for (const [key, asset] of assets) {
      set.add(asset.tag)
    }

    let str = ''

    for (const asset of set) {
      str += asset
    }

    return str
  }
}

/**
 * Convert object into HTML code. The input data should contain
 * tag names and their attributes.
 *
 * ::: Example 1 :::
 * {title : 'someTitle'} is converted to <title>someTitle</title>
 *
 * ::: Example 2 :::
 * {
 *    meta: [
 *       {name: 'description', content: 'someContent'},
 *       {name: 'keywords', content: 'someKeywords'}
 *    ]
 * }
 * is converted to:
 *    <meta name='description' content='someContent'>
 *    <meta name='keywords' content='someKeywords'>
 *
 * @param {Object<string, (string | Array<Object<string, string>>)>} object
 * The input data to be converted into HTML code
 * @param {string} [indentSpace]
 * @returns {string}
 */
function objectToHtmlTags(object, indentSpace = '') {
  let html = ''

  if (!(object instanceof Object)) {
    return html
  }

  for (const tagName in object) {
    const tagContents = object[tagName]

    if (typeof tagContents === 'string') {
      html += `${indentSpace}<${tagName}>${tagContents}</${tagName}>\n`
    }
    else if (Array.isArray(tagContents)) {
      let attributesHtml = ''

      for (const attributes of tagContents) {
        if (attributes instanceof Object) {
          let currentAttribute = ''

          for (const name in attributes) {
            const value = (attributes[name] ?? '').replace(/"/ug, '')

            currentAttribute += `${name}="${value}" `
          }

          attributesHtml += `${indentSpace}<${tagName} ${currentAttribute.trim()}>\n`
        }
      }

      html += attributesHtml
    }
  }

  return html
}

export { AppModules }
