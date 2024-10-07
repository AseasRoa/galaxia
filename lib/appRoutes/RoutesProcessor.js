import { DocSchemaParser, DocSchemaValidator, ValidationError } from 'docschema'
import console from 'node:console'
import { join } from 'node:path'
import { isComponent, isTemplate } from 'paintor'
import { Hooks } from '../app/Hooks.js'
import { Views } from '../app/Views.js'
import { Words } from '../app/Words.js'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { isClass } from '../functions/utils.js'
import { HttpExchange } from '../server/HttpExchange.js'
import { HttpRequest } from '../server/HttpRequest.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { RoutesCache } from './RoutesCache.js'

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
 * @param {boolean} isHTML
 * @returns {Promise<true|Error>}
 * @throws {ValidationError}
 */
async function validateArguments(func, funcFile, funcArgs, isHTML) {
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

  if (
    isHTML
    && typesAst.elements.param.length === 0
    && funcArgs.length === 1
    && Array.isArray(funcArgs[0])
    && funcArgs[0].length === 0
  ) {
    return true
  }

  const result = docSchemaValidator.checkFunctionArguments(
    typesAst, funcArgs, true
  )

  if (!result.pass) {
    const error = new ValidationError(result.message)

    error.message = result.message
    error.pass = result.pass

    throw error
  }

  return true
}

/** @type {Map<Function, Ast | null>} */
validateArguments.astCache = new Map()

class RoutesProcessor {
  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {Hooks} */
  #hooks

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.#appFileManagers = appFileManagers
    this.#hooks = new Hooks()
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
    const { modulesAssets } = chunkParams
    const [
      moduleName = 'index',
      routesFileName = 'index',
      routesMethodName = 'index'
    ] = layoutPath

    if (!chunkParams.appModulesUsed.includes(moduleName)) {
      chunkParams.appModulesUsed.push(moduleName)
    }

    const routesDirName = this.appConfig.dirNames.routes
    const hooksDirName = this.appConfig.dirNames.hooks

    // Hooks
    // TODO un-hardcode the paths below, put them into configuration
    const pathToHooksFile = join(
      this.appPaths.modules,
      moduleName,
      hooksDirName,
      'dynamic.hooks.js'
    )

    const exchange = await this.#hooks.run(
      chunkParams.exchange, pathToHooksFile
    )

    if (exchange.response.original.writableEnded) {
      return ''
    }

    // Import the routes module
    let moduleExport = null
    let routesModulePath = ''

    const pathToRoutesFileWithoutExt = join(
      this.appPaths.modules,
      moduleName,
      routesDirName,
      routesFileName
    )

    try {
      const imported = await this.#appFileManagers.importRoutesFile(
        moduleName, routesFileName
      )

      moduleExport = imported.exports
      routesModulePath = imported.file
    }
    catch (error) {
      console.error(error)

      return new Error(
        'Could not load'
        + ` "/${moduleName}/${routesDirName}/${routesFileName}"`
        + ` in order to load method "${routesMethodName}()".`
      )
    }

    let exports = null

    if (routesFileName === '' || routesFileName === 'index') {
      exports = moduleExport.default ?? moduleExport
    }
    else {
      // 1) Check for a single exported class
      const keys = Object.keys(moduleExport)

      if (keys.length === 1) {
        const className = keys[0] ?? ''

        if (isClass(moduleExport[className])) {
          exports = moduleExport[className]
        }
      }

      // 2) Otherwise
      if (!exports) {
        exports = moduleExport.default ?? moduleExport
      }
    }

    const isClassExports = isClass(exports)

    let returnedValue = null
    let exportedCallables = null

    // The module exports a class?
    if (isClass(exports)) {
      const routesCache = new RoutesCache(request, 5 * 60 * 1000)

      exportedCallables = (
        moduleName === routesDirName
      )
        ? null // no cache for layout
        : null

      if (!exportedCallables) {
        // constructor arguments
        const query = (isClassExports) ? queryParams.query?.[0] : []
        const constructorArgs = Array.from(
          (Array.isArray(query)) ? query : []
        )

        try {
          await validateArguments(
            exports, routesModulePath, constructorArgs, isHTML
          )
        }
        catch (error) {
          if (error instanceof Error) {
            error.message = `/${moduleName}/${routesFileName} > constructor: ${error.message}`
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

        routesCache.setClassInstance(
          pathToRoutesFileWithoutExt, exportedCallables
        )
      }
    }
    // The module exports multiple functions?
    else if (typeof exports === 'object') {
      exportedCallables = exports
    }

    if (!(returnedValue instanceof Error)) {
      const routesMethod = exportedCallables[routesMethodName]

      if (typeof routesMethod !== 'function') {
        return new Error(`Routes method '${routesMethodName}' for app module '${moduleName}' does not exist!`)
      }

      // Call the function
      try {
        const methodArgs = this.#prepareMethodArguments(
          isHTML, isClassExports, queryParams, pathParams, request, response
        )

        await validateArguments(
          routesMethod, routesModulePath, methodArgs, isHTML
        )

        returnedValue = await routesMethod.apply(exportedCallables, methodArgs)
      }
      catch (error) {
        if (error instanceof Error) {
          // An error was thrown instead of returning a value

          const development = Boolean(this.appConfig.development)

          if (development) console.error(error)

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
      moduleName,
      routesMethodName,
      isHTML,
      modulesAssets
    )
  }

  /**
   * @param {string} moduleName
   * @param {string} routesMethodName
   * @param {string} locale
   * @param {app.ModulesAssets} modulesAssets
   * @returns {Promise<void>}
   */
  async #addModulesAssets(
    moduleName, routesMethodName, locale, modulesAssets
  ) {
    let asset = await this.#appFileManagers.getTagForJs(
      moduleName,
      routesMethodName
    )

    if (asset.url !== '') {
      modulesAssets.scripts.set(
        `${moduleName}.${routesMethodName}`,
        asset
      )
    }

    asset = await this.#appFileManagers.getTagForCss(moduleName)

    if (asset.url !== '') {
      modulesAssets.styles.set(
        moduleName,
        asset
      )
    }
  }

  /**
   * @param {boolean} isHTML
   * @param {boolean} isClassExports
   * @param {app.QueryParams} queryParams
   * @param {string[]} pathParams
   * @param {HttpRequest} request
   * @param {HttpResponse} response
   * @returns {any[]}
   */
  #prepareMethodArguments(
    isHTML, isClassExports, queryParams, pathParams, request, response
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

      for (const [key, value] of queryParams.queryGet) {
        if (!(key in params)) {
          // @ts-ignore
          params[key] = value
        }
      }

      args = [params]

      // Inject the exchange object at the end as a separate parameter
      if (!isClassExports) args.push(exchange)
    }
    else {
      const query = (isClassExports)
        ? queryParams.query?.[1]
        : queryParams.query

      args = Array.from((Array.isArray(query)) ? query : [])
    }

    return args
  }

  /**
   * @param {HttpRequest} request
   * @param {*} returnedValue
   * @param {string} moduleName
   * @param {string} routesMethodName
   * @param {boolean} isHTML
   * @param {app.ModulesAssets} modulesAssets
   * @returns {Promise<*>}
   */
  async #processReturnedValue(
    request,
    returnedValue,
    moduleName,
    routesMethodName,
    isHTML,
    modulesAssets
  ) {
    if (returnedValue instanceof Error) {
      return returnedValue
    }

    if (
      typeof returnedValue === 'function'
      || isComponent(returnedValue)
      || isTemplate(returnedValue)
    ) {
      /*
       * When a function is returned, it means that a View must be used.
       * The data for the View is the value that is returned when the function
       * is called.
       */

      const words = new Words(
        this.appConfig, this.appPaths, moduleName, request
      )
      const views = new Views(words)

      let html = ''

      try {
        html = await views.generateHtml(returnedValue)
      }
      catch (error) {
        console.error(`Could not generate view for /${moduleName}/${routesMethodName}`)

        throw error
      }

      if (isHTML) {
        await this.#addModulesAssets(
          moduleName, routesMethodName, words.locale, modulesAssets
        )
      }

      return html
    }

    if (isHTML && typeof returnedValue === 'string') {
      const words = new Words(
        this.appConfig, this.appPaths, moduleName, request
      )

      await this.#addModulesAssets(
        moduleName, routesMethodName, words.locale, modulesAssets
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
      && (
        returnedValue instanceof Object
        // Useless, because Array is also Object
        // || Array.isArray(returnedValue)
      )
    ) {
      const data = (returnedValue instanceof Object) ? returnedValue : {}
      const html = await this.#appFileManagers.applyView(
        moduleName,
        routesMethodName,
        data
      )

      return html
    }

    if (
      returnedValue instanceof Object
      // Useless, because Array is also Object
      // || Array.isArray(returnedValue)
    ) {
      return returnedValue
    }

    return returnedValue
  }
}

export { RoutesProcessor }
