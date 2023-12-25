import { DocSchemaParser, DocSchemaValidator } from 'docschema'
import console from 'node:console'
import { join } from 'node:path'
import { Component, isTemplate } from 'paintor'
import { Views } from '../app/Views.js'
import { Words } from '../app/Words.js'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { isClass } from '../functions/utils.js'
import { HttpExchange } from '../server/HttpExchange.js'
import { HttpRequest } from '../server/HttpRequest.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { RouterCache } from './RouterCache.js'

const docSchemaParser = new DocSchemaParser()
const docSchemaValidator = new DocSchemaValidator()

/**
 * Get the first row of a JS function (or a class)
 *
 * @example
 * If the function is written like this:
 *
 * `function abc(a, b) {
 *   console.log(a)
 *   console.log(b)
 * }`
 *
 * Its first row is:
 *
 * `function abc(a, b) {`
 * @param {Function} func
 * The input JS function (or a class)
 * @returns {string}
 * Returns the first row of the function, or an
 * empty string if the input is not a function
 */
function getFirstRowOfFunction(func) {
  let firstRow = ''

  if (typeof func === 'function') {
    const fnAsString = func.toString()
    const match = /^(.*)[\r\n]/u.exec(fnAsString)

    if (match) firstRow = match?.[1] ?? ''
  }

  return firstRow
}

/**
 * @param {Function} func
 * The function (or class method)
 * @param {string} funcFile
 * The file (path) where the function is defined. It's used
 * to read the JsDoc comments.
 * @param {any[]} funcArgs
 * The arguments that will be used to call the function with
 * @returns {Promise<true|Error>}
 * @throws {TypeError}
 */
async function validateArguments(func, funcFile, funcArgs) {
  const { astCache } = validateArguments

  if (!(astCache.has(func))) {
    const isFuncClass = isClass(func)
    const firstRow = getFirstRowOfFunction(func)
    const asts = await docSchemaParser.parseFile(funcFile)

    let astFound = null

    asts.every((ast) => {
      /**
       * The row after comment might contain 'export' in the beginning.
       * However, when we get the JS function to extract the first row,
       * 'export' would not exist there, because it's not part of the
       * actual function. So we have to eliminate it here.
       *
       * @type {string}
       */
      const lineAfterComment = ast.lineAfterComment
        .trim()
        .replace(/^\s*export\s+(.*)$/u, '$1')

      if (
        (isFuncClass && lineAfterComment.startsWith('constructor'))
        || (!isFuncClass && lineAfterComment === firstRow)
      ) {
        astFound = ast

        return false
      }

      return true
    })

    astCache.set(func, astFound)
  }

  const typesAst = astCache.get(func)

  if (!typesAst) {
    /*
     * If there is no JsDoc comment associated with the function,
     * allow any arguments
     */
    return true
  }

  docSchemaValidator.validateFunctionArguments(typesAst, funcArgs)

  return true
}

/** @type {Map<Function, DocSchemaAst | null>} */
validateArguments.astCache = new Map()

class RouterProcessor {
  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.#appFileManagers = appFileManagers
  }

  /**
   * TODO this method needs refactoring
   *
   * @param {string[]} layoutPath
   * @param {string[]} pathParams
   * @param {app.ChunkParams} chunkParams
   * @returns {Promise<any|Error>}
   */
  async process(layoutPath, pathParams, chunkParams) {
    const { request, response } = chunkParams.exchange
    const { isHTML } = chunkParams
    const { queryParams } = chunkParams
    const { componentsAssets } = chunkParams
    const [
      componentName = 'index',
      routerFileName = 'index',
      ioMethodName = 'index'
    ] = layoutPath

    const { routesDirName } = this.appConfig.pathNames

    // Import the io module
    let moduleExport = null
    let ioModulePath = ''

    const pathToRouterFileWithoutExt = join(
      this.appPaths.components,
      componentName,
      routesDirName,
      routerFileName
    )

    try {
      const imported = await this.#appFileManagers.importRouterFile(
        componentName, routerFileName
      )

      moduleExport = imported.exports
      ioModulePath = imported.file
    }
    catch (error) {
      console.error(error)

      return new Error(
        'Could not load'
        + ` "/${componentName}/${routesDirName}/${routerFileName}"`
        + ` in order to load method "${ioMethodName}()".`
      )
    }

    const className = request.headers['x-class-name'] ?? ''
    const exports = (className)
      // @ts-ignore
      ? moduleExport[className]
      : moduleExport.default ?? moduleExport
    const dataFormat = this.#dataFormat(request)

    let returnedValue = null
    let exportedCallables = null

    // The module exports a class?
    if (isClass(exports)) {
      const routerCache = new RouterCache(request, 5 * 60 * 1000)

      exportedCallables = (
        componentName === this.appConfig.pathNames.routesDirName
      )
        ? null // no cache for layout
        : null

      if (!exportedCallables) {
        // constructor arguments
        const query = (dataFormat === 'class') ? queryParams.query?.[0] : []
        const constructorArgs = Array.from(
          (query instanceof Array) ? query : []
        )

        try {
          await validateArguments(exports, ioModulePath, constructorArgs)
        }
        catch (error) {
          if (error instanceof Error) {
            error.message = `/${componentName}/${routerFileName} > constructor: ${error.message}`
            // @ts-ignore
            error.isThrow = true
            returnedValue = error
          }
        }

        // eslint-disable-next-line new-cap
        exportedCallables = new exports(...constructorArgs)

        exportedCallables.request = request
        exportedCallables.response = response
        exportedCallables.exchange = new HttpExchange(request, response)

        routerCache.setClassInstance(
          pathToRouterFileWithoutExt, exportedCallables
        )
      }
    }
    // The module exports multiple functions?
    else if (typeof exports === 'object') {
      exportedCallables = exports
    }

    if (!(returnedValue instanceof Error)) {
      const routerMethod = exportedCallables[ioMethodName]

      if (typeof routerMethod !== 'function') {
        return new Error(`Router method <b>${ioMethodName}</b> for component <b>${componentName}</b> does not exist!`)
      }

      // Call the function
      try {
        const methodArgs = this.#prepareMethodArguments(
          isHTML, dataFormat, queryParams, pathParams, request, response
        )

        await validateArguments(routerMethod, ioModulePath, methodArgs)

        returnedValue = await routerMethod.apply(exportedCallables, methodArgs)
      }
      catch (error) {
        if (error instanceof Error) {
          // An error was thrown instead of returning a value

          console.error(error)

          // @ts-ignore
          error.isThrow = true
          returnedValue = error
        }
        else {
          /*
           * A string was thrown, which is considered as alternative
           * of returning an error + the ability to throw only the
           * message, without stack
           */

          const actualError = new Error(error)

          // @ts-ignore
          actualError.isThrow = true
          actualError.stack = ''
          returnedValue = actualError
        }
      }
    }

    return this.#processReturnedValue(
      request,
      returnedValue,
      componentName,
      ioMethodName,
      isHTML,
      componentsAssets
    )
  }

  /**
   * @param {string} componentName
   * @param {string} ioMethodName
   * @param {string} locale
   * @param {app.ComponentsAssets} componentsAssets
   * @returns {Promise<void>}
   */
  async #addComponentsAssets(
    componentName, ioMethodName, locale, componentsAssets
  ) {
    componentsAssets.scripts.set(
      `${componentName}.${ioMethodName}`,
      await this.#appFileManagers.getTagForJs(componentName, ioMethodName)
    )

    componentsAssets.styles.set(
      componentName,
      await this.#appFileManagers.getTagForCss(componentName)
    )
  }

  /**
   * @param {HttpRequest} request
   * @returns {'' | 'class'}
   */
  #dataFormat(request) {
    const dataFormat = String(request.headers['x-data-format'] ?? '')

    if (dataFormat === '' || dataFormat === 'class') {
      return dataFormat
    }

    return ''
  }

  /**
   * @param {boolean} isHTML
   * @param {string} dataFormat
   * @param {app.QueryParams} queryParams
   * @param {string[]} pathParams
   * @param {HttpRequest} request
   * @param {HttpResponse} response
   * @returns {any[]}
   */
  #prepareMethodArguments(
    isHTML, dataFormat, queryParams, pathParams, request, response
  ) {
    /**
     * Method/function arguments
     *
     * @type {any[]}
     */
    let args = []

    const exchange = new HttpExchange(request, response)

    if (isHTML) {
      /**
       * This array will also work as an object (with non-numeric keys)
       *
       * @type {any[]}
       */
      const params = []

      for (const key in pathParams) {
        params[key] = pathParams[key]
      }

      for (const key in queryParams.queryGet) {
        if (!(key in params)) {
          // @ts-ignore
          params[key] = queryParams.queryGet[key]
        }
      }

      args = [params]
    }
    else {
      const query = (dataFormat === 'class')
        ? queryParams.query?.[1]
        : queryParams.query

      args = Array.from((query instanceof Array) ? query : [])

      // Inject the exchange object into the request parameters
      if (
        args.length > 0
        && args[0] instanceof Object
        && args[0]?.constructor?.name === 'Object'
      ) {
        if (!('exchange' in args[0])) args[0].exchange = exchange
      }
    }

    // Inject the exchange object at the end as a separate parameter
    args.push(exchange)

    return args
  }

  /**
   * @param {HttpRequest} request
   * @param {*} returnedValue
   * @param {string} componentName
   * @param {string} ioMethodName
   * @param {boolean} isHTML
   * @param {app.ComponentsAssets} componentsAssets
   * @returns {Promise<*>}
   */
  async #processReturnedValue(
    request,
    returnedValue,
    componentName,
    ioMethodName,
    isHTML,
    componentsAssets
  ) {
    if (returnedValue instanceof Error) {
      return returnedValue
    }

    if (
      typeof returnedValue === 'function'
      || returnedValue instanceof Component
      || isTemplate(returnedValue)
    ) {
      /*
       * When a function is returned, it means that a View must be used.
       * The data for the View is the value that is returned when the function
       * is called.
       */

      const words = new Words(
        this.appConfig,
        this.appPaths,
        componentName,
        request
      )
      const requestView = new Views(
        this.appConfig,
        this.appPaths,
        componentName,
        words
      )

      let html = ''

      try {
        html = await requestView.generateHtml(returnedValue)
      }
      catch (error) {
        console.error(`Could not generate view for /${componentName}/${ioMethodName}`)

        throw error
      }

      if (isHTML) {
        await this.#addComponentsAssets(
          componentName, ioMethodName, words.locale, componentsAssets
        )
      }

      return html
    }

    if (isHTML && typeof returnedValue === 'string') {
      const words = new Words(
        this.appConfig,
        this.appPaths,
        componentName,
        request
      )

      await this.#addComponentsAssets(
        componentName, ioMethodName, words.locale, componentsAssets
      )

      return returnedValue
    }

    /*
     * When page is requested and the returned value is Object or Array,
     * then we try to load the file from the views dir
     */
    if (
      isHTML
      && !(returnedValue instanceof Error)
      && (returnedValue instanceof Object || returnedValue instanceof Array)
    ) {
      const words = new Words(
        this.appConfig,
        this.appPaths,
        componentName,
        request
      )
      const requestView = new Views(
        this.appConfig,
        this.appPaths,
        componentName,
        words
      )

      const imported = await this.#appFileManagers.importViewFile(
        componentName, ioMethodName
      )

      const { exports } = imported

      const funcOrString = exports[ioMethodName] ?? exports.default ?? ''

      const data = (returnedValue instanceof Object) ? returnedValue : {}
      const html = (typeof funcOrString === 'string')
        ? funcOrString
        : await requestView.generateHtml(funcOrString, data)

      return html
    }

    if (returnedValue instanceof Object || returnedValue instanceof Array) {
      return returnedValue
    }

    return returnedValue
  }
}

export { RouterProcessor }