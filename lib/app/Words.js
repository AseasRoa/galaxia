import JSON5 from 'json5'
import path from 'node:path'
import { format } from 'node:util'
import { fileExists, readFile } from '../functions/fileSystem.js'
import { HttpRequest } from '../server/HttpRequest.js'

/**
 * @typedef {Object<string, string>} TranslationMap
 */

/** @type {Map<string, Map<string, Map<string, TranslationMap>>>} */
const cache = new Map()
const defaults = Object.freeze({
  locale: 'en'
})

/**
 * This is used to translate words.
 *
 * - For each HTTP request a new instance of it is created.
 *   The preferred locale is extracted from the request object
 *   automatically.
 * - There should be one .json file per locale. It's name should
 *   be like this - %locale name%.json.
 * - Inside the file, the keys are the words and the values are
 *   the translations.
 * - Files are cached
 */
class Words {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {string} */
  #moduleName = ''

  /** @type {HttpRequest} */
  #request

  /** @type {string} */
  #locale = ''

  /** @type {TranslationMap} */
  #translations = {}

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {string} moduleName
   * @param {HttpRequest} request
   */
  constructor(appConfig, appPaths, moduleName, request) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#moduleName = moduleName
    this.#request = request
    this.#locale = this.#getPreferredLocale(this.#request)
  }

  /**
   * @returns {string}
   */
  get locale() {
    return this.#locale
  }

  /**
   * Return a function that is a proxy to the 'translate'
   * function of the class.
   * This is needed, so that 'this' in the 'translate'
   * function works properly.
   *
   * @returns {Promise<TranslateFunction>}
   */
  async getTranslateFunction() {
    this.#translations = await this.getTranslation()

    return (...strings) => this.#translate(...strings)
  }

  /**
   * @returns {Promise<TranslationMap>}
   */
  async getTranslation() {
    const locale = this.#locale
    const { host } = this.#request.url
    const moduleName = this.#moduleName

    // If needed, Load the data from the file into the local cache
    if (cache.get(host)?.get(moduleName)?.get(locale) === undefined) {
      if (!cache.has(host)) {
        cache.set(host, new Map())
      }

      if (!cache.get(host)?.has(moduleName)) {
        cache.get(host)?.set(moduleName, new Map())
      }

      if (!cache.get(host)?.get(moduleName)?.has(locale)) {
        const translation = await this.#readTranslation(moduleName, locale)

        cache.get(host)?.get(moduleName)?.set(locale, translation)
      }
    }

    // @ts-ignore
    return cache.get(host)?.get(moduleName)?.get(locale)
  }

  /**
   * Get the preferred locale from the request,
   * but only the first part of it, without the variant.
   * For example, if the locale is 'en-us', return 'en'
   *
   * @param {HttpRequest} request
   * @returns {string}
   */
  #getPreferredLocale(request) {
    if (!request?.headers) {
      return defaults.locale
    }

    const header = (request.headers['accept-language'] ?? '').toLowerCase()
    const pattern = /,\s*([a-z0-9-]+)/ug // matches anything like en-us
    const match = pattern.exec(`, ${header}`)

    let preferredLocale = ''

    if (match) {
      const fullLocale = (match[1] ?? '') // en-us
      const localeParts = fullLocale.split('-') // ['en', 'us']

      preferredLocale = localeParts[0] ?? ''
    }

    preferredLocale ||= defaults.locale

    return preferredLocale
  }

  /**
   * Reads the contents of the JSON file in which the translations are
   *
   * @param {string} moduleName
   * @param {string} locale
   * @returns {Promise<TranslationMap>}
   * The contents of the file, or empty Object if the file doesn't exist
   */
  async #readTranslation(moduleName, locale) {
    const fromJson = await this.#readTranslationFromJson(moduleName, locale)
    const fromJs = await this.#readTranslationFromJs(moduleName, locale)

    return { ...fromJson, ...fromJs }
  }

  /**
   * @param {string} moduleName
   * @param {string} locale
   * @returns {Promise<TranslationMap>}
   */
  async #readTranslationFromJs(moduleName, locale) {
    /** @type {TranslationMap} */
    let output = {}

    const fileWithoutExt = path.normalize(
      `${this.#appPaths.modules}`
      + `/${moduleName}`
      + `/${this.#appConfig.dirNames.i18n}`
      + `/${locale}`
    )

    const fileExtensions = ['.js', '.mjs']

    for (const ext of fileExtensions) {
      const file = `${fileWithoutExt}${ext}`

      try {
        if (await fileExists(file)) {
          const obj = (await import(`file://${file}`)).default

          if (obj instanceof Object) {
            output = { ...output, ...obj }
          }
        }
      }
      catch (error) {
        if (error instanceof Error) {
          /*
           * The file where the error happens is not reported
           * in the error, so add it
           */
          error.message += ` (at file ${file})`

          console.error(error)
        }
      }
    }

    return output
  }

  /**
   * @param {string} moduleName
   * @param {string} locale
   * @returns {Promise<TranslationMap>}
   */
  async #readTranslationFromJson(moduleName, locale) {
    /** @type {TranslationMap} */
    let output = {}

    const fileWithoutExt = path.normalize(
      `${this.#appPaths.modules}`
      + `/${moduleName}`
      + `/${this.#appConfig.dirNames.i18n}`
      + `/${locale}`
    )

    const fileExtensions = ['.json', '.json5']

    for (const ext of fileExtensions) {
      const file = `${fileWithoutExt}${ext}`

      try {
        if (await fileExists(file)) {
          const contents = (await readFile(file)).toString('utf8')
          const obj = JSON5.parse(contents)

          if (obj instanceof Object) {
            output = { ...output, ...obj }
          }
        }
      }
      catch (error) {
        if (error instanceof Error) {
          /*
           * The file where the error happens is not reported
           * in the error, so add it
           */
          error.message += ` (at file ${file})`

          console.error(error)
        }
      }
    }

    return output
  }

  /**
   * This function should behave like NodeJS format(),
   *
   * @param {...string} strings
   * @returns {string}
   */
  #translate(...strings) {
    const translatedStrings = strings.map(
      (string) => this.#translateString(string, this.#locale)
    )

    // no need to format, return the string as is
    if (translatedStrings.length === 1) {
      return translatedStrings[0] ?? ''
    }

    return format(...translatedStrings)
  }

  /**
   * @param {string} string
   * @param {string} locale
   * @returns {string}
   */
  #translateString(string, locale) {
    /*
     * 1) The string can be translated
     */
    if (string in this.#translations) {
      return this.#translations[string] ?? ''
    }

    /*
     * 2) The string can not be translated, but
     * it's the default locale and there is no
     * translation, so just return the string
     */
    if (locale === defaults.locale) {
      return string
    }

    /*
     * 3) The string still can not be translated,
     * now try to translate it with the default locale
     */
    return this.#translateString(string, defaults.locale)
  }
}

export { Words }
