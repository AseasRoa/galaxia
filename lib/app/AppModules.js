import console from 'node:console'
import { Http2ServerResponse } from 'node:http2'
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
import { HttpExchange } from '../server/HttpExchange.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { HttpResponseFormatter } from '../server/HttpResponseFormatter.js'
import { Layout } from './Layout.js'
import { Words } from './Words.js'

class AppModules {
  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {AppFileManagers} */
  #appFileManagers

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
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.appConfig = appConfig
    this.appPaths = appPaths

    this.#httpResponseFormatter = new HttpResponseFormatter({
      maxAge: this.appConfig.maxAge,
      mimeTypes: this.appConfig.mimeTypes
    })

    this.#publicScripts = new PublicScripts(!this.appConfig.development)
    this.#appFileManagers = appFileManagers
    this.#routesProcessor = new RoutesProcessor(
      this.appConfig, this.appPaths, this.#appFileManagers
    )
    this.#layout = new Layout(
      this.appConfig, this.appPaths, this.#routesProcessor
    )
  }

  /**
   * Force a specific module to be rendered
   *
   * @param {string} moduleName
   */
  async ensureModuleIsRendered(moduleName) {
    await this.#appFileManagers.ensureModuleIsRendered(moduleName)
  }

  /**
   * All HTTP requests end up here.
   * In this function we route those requests to the appropriate
   * module, process the request and make the response.
   *
   * @param {HttpExchange} exchange
   * @param {string[]} explodedPathname
   */
  async processRequest(exchange, explodedPathname) {
    const { request } = exchange
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

    const appModulesUsed = []

    /** @type {app.ChunkParams} */
    const chunkParams = {
      exchange,
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
    const { modulesAssets } = chunkParams
    const { request, response } = chunkParams.exchange

    /** @type {string | null} */
    let html = ''

    try {
      html = await this.#layout.makeLayoutHtml(explodedPathname, chunkParams)
    }
    catch (error) {
      const development = Boolean(this.appConfig.development)

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

    const { appModulesUsed } = chunkParams

    // TODO Html head tags worked before, but not anymore. Make them work again.
    /** @type {Object<string, (string | Array<Object<string, string>>)>} */
    const htmlHeadTags = {}

    if (html === null) {
      response.statusCode = 404
      html = 'Page Not Found'
    }
    else {
      const globalFilesVersion
        = await this.#appFileManagers.getGlobalFilesVersion()
      const words = new Words(this.appConfig, this.appPaths, '', request)
      const { locale } = words

      if (isResponseEnded(response)) return

      const { styles, scripts } = this.#stringifyModulesAssets(modulesAssets)
      const baseHref = `//${request.url.host}/${globalFilesVersion}/`
      const importMap = await this.#buildImportMap(appModulesUsed)

      html = `<!DOCTYPE html>\n<html lang="${locale ?? 'en'}">\n`
        + '<head>\n'
        + `  <base href="${baseHref}">\n`
        + '  <meta charset="utf-8">\n'
        + `${objectToHtmlTags(htmlHeadTags, '  ')}`
        + `${styles}\n`
        + importMap
        + `  <script>\n${await this.#publicScripts.getScriptFromRepository('browserSupportCheck.js')}\n  </script>\n`
        + `  <script>\n${await this.#publicScripts.getScriptFromRepository('rpc.js')}\n  </script>\n`
        + '</head>\n<body>'
        + `${html}\n`
        + `${scripts}\n`
        + '</body>\n</html>'

      if (
        this.appConfig.server.earlyHints
        && response.original instanceof Http2ServerResponse
      ) {
        this.#sendEarlyHints(
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
    const { request, response } = chunkParams.exchange

    const ajaxVersion
      = (this.appConfig.ajax.version).toString() ?? ''
    const ajaxVersionInHeader
      = getHeaderAsString(request, 'x-ajax-version') ?? ''
    const development
      = Boolean(this.appConfig.development)

    if (ajaxVersionInHeader && ajaxVersionInHeader !== ajaxVersion) {
      const error = new Error(this.appConfig.ajax.wrongVersionMessage)

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
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
   *
   * @param {string[]} appModulesUsed
   * @returns {Promise<string>}
   */
  async #buildImportMap(appModulesUsed) {
    let importMap = ''

    importMap = '<script type="importmap">'

    const items = { imports: {} }

    const globalDeps = await this.#appFileManagers.getImports('')

    for (const dep of globalDeps) {
      items.imports[dep] = '/@modules/' + dep
    }

    /**
     * @param {string} moduleName
     * @param {Object<string, string>} imports
     * @param {string[]} appliedModules Used to remember which modules were
     * parsed and prevent endless loop when two modules use each other
     * @returns {Promise<void>}
     */
    const applyImports = async(moduleName, imports, appliedModules = []) => {
      if (appliedModules.includes(moduleName)) {
        return
      }

      const moduleImports = await this.#appFileManagers.getImports(moduleName)

      for (const dep of moduleImports) {
        if (dep.startsWith('*')) {
          await applyImports(dep.substring(1), imports, appliedModules)
        }
        else {
          imports[dep] = '/@modules/' + dep
        }

        appliedModules.push(moduleName)
      }
    }

    for (const moduleName of appModulesUsed) {
      await applyImports(moduleName, items.imports)
    }

    importMap += JSON.stringify(items) + '</script>'

    return importMap
  }

  /**
   * Use the following command to see the 103 response in action:
   * curl -X GET -I http://example.com
   *
   * To test Early Hints, in Chrome reload the page by right-clicking
   * on the Reload icon and click 'Empty Cache and Hard Reload'.
   *
   * @see https://3perf.com/blog/link-rels/#modulepreload
   * @see https://datatracker.ietf.org/doc/html/rfc8297
   * @see https://developer.chrome.com/blog/early-hints/
   * @see https://newsbeezer.com/norwayeng/chrome-first-with-early-hints-support-should-make-webpages-load-even-faster/
   * @param {Http2ServerResponse} response
   * @param {string} ver
   * @param {app.ModulesAssets} modulesAssets
   */
  #sendEarlyHints(response, ver, modulesAssets) {
    /** @type {string[]} */
    const links = []

    modulesAssets.styles.forEach((asset) => {
      if (asset.url) {
        const code = `</${ver}/${asset.url}>; rel="preload"; as="style"`

        if (!links.includes(code)) links.push(code)
      }
    })

    modulesAssets.scripts.forEach((asset) => {
      if (asset.url) {
        const code = `</${ver}/${asset.url}>; rel="modulepreload"; as="script"`

        if (!links.includes(code)) links.push(code)
      }
    })

    response.writeEarlyHints({ link: links })
    response.setHeader('link', links.join(', '))
  }

  /**
   * @param {app.ModulesAssets} modulesAssets
   * @returns {{ styles: string, scripts: string }}
   */
  #stringifyModulesAssets(modulesAssets) {
    /**
     * @param {Map<string, {tag: string}>} assets
     * @returns {string}
     */
    const stringifier = (assets) => {
      const set = new Set()

      assets.forEach((asset) => (set.add(asset.tag)))

      let str = ''

      set.forEach((asset) => (str += asset))

      return str
    }

    return {
      styles: stringifier(modulesAssets.styles),
      scripts: stringifier(modulesAssets.scripts)
    }
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
    else if (tagContents instanceof Array) {
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
