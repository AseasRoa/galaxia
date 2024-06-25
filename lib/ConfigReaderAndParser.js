import JSON5 from 'json5'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

/** @typedef {'js' | 'json' | 'json5'} SupportedFileFormats */

/** @type {SupportedFileFormats[]} */
const supportedFileFormats = ['js', 'json5', 'json']

class ConfigReaderAndParser {
  /**
   * Read configuration data from configuration file.
   * Using the provided file name, different file formats
   * are searched.
   * If file is not found, the provided defaults are returned.
   * If file is found, the missing default values are injected
   * into its data.
   *
   * @template T
   * @param {T} defaultConfig
   * The full (default) configuration data. Used to inject
   * values into the data from the file
   * @param {string} configAbsPath
   * Absolute path of the config file
   * @param {string[]} configFileNames
   * The name of the config file
   * @returns {Promise<T>}
   * @throws {Error}
   */
  async fromFile(defaultConfig, configAbsPath, configFileNames) {
    let filePath = ''
    let fileContents = ''
    let data = {}

    for (const ext of supportedFileFormats) {
      for (const configFileName of configFileNames) {
        const currentFilePath = path.join(
          configAbsPath,
          `${configFileName}.${ext}`
        )

        if (await this.#fileExists(currentFilePath)) {
          filePath = currentFilePath

          break
        }
      }

      if (!filePath) {
        continue
      }

      try {
        if (ext === 'js') {
          data = await this.#importConfigFile(filePath)
        }
        else {
          fileContents = (await readFile(filePath)).toString()
          data = this.#stringToObject(fileContents, ext)
        }
      }
      catch (error) {
        throw new Error(`Configuration file is broken (${filePath})`)
      }

      break
    }

    return this.mergeDefaults(defaultConfig, data)
  }

  /**
   * Inject missing values from full (default) configuration
   * data into a partial configuration data.
   * The function works recursively for every inner Object.
   *
   * @template T as Object<string, any>
   * @param {T} fromFullData
   * @param {Object<string, any>} toPartialData
   * @returns {T}
   * The partial data + all the other values from the full data
   * @throws {Error}
   */
  mergeDefaults(fromFullData, toPartialData) {
    /** @type {Object<string, any>} */
    // @ts-ignore
    const outputConfig = structuredClone(fromFullData)

    for (const name in outputConfig) {
      /*
       * No value is provided => the default value is used
       * (no need to go further below)
       */
      if (!(name in toPartialData)) {
        continue
      }

      const inputValue = toPartialData[name]
      const outputValue = outputConfig[name]

      if (typeof outputValue !== typeof inputValue) {
        throw new Error(
          `Wrong configuration. The value of "${name}" must be ${typeof outputValue}, but ${typeof inputValue} is provided.`
        )
      }

      // If Object or Array => populate the values from the input
      if (
        ((outputValue instanceof Object) && (inputValue instanceof Object))
        || ((outputValue instanceof Array) && (inputValue instanceof Array))
      ) {
        if (inputValue instanceof Array) {
          // When Array, accept the input value as is
          outputConfig[name] = inputValue
        }
        else if (inputValue instanceof Object) {
          if (Object.keys(outputValue).length === 0) {
            /*
             * The default value is an empty object, which means the object
             * can contain anything
             */
            outputConfig[name] = inputValue
          }
          else {
            outputConfig[name] = this.mergeDefaults(outputValue, inputValue)
          }
        }
      }
      else {
        // If primitive value => use the value from the input
        outputConfig[name] = inputValue
      }
    }

    // @ts-expect-error
    return outputConfig
  }

  /**
   * @param {string} filePath
   * @returns {Promise<boolean>}
   */
  async #fileExists(filePath) {
    try {
      await access(filePath)
    }
    catch (e) {
      return false
    }

    return true
  }

  /**
   * Use dynamic import to import the config file
   *
   * @param {string} fileAbsolutePath
   * @returns {Promise<Object<any, any>>}
   */
  async #importConfigFile(fileAbsolutePath) {
    const filePath = path.resolve(fileAbsolutePath)
    const file = path.join('file://', filePath)
    const module = await import(file)

    let output = module.default ?? {}

    if (!(output instanceof Object)) {
      output = {}
    }

    return output
  }

  /**
   * Parse a string into an object
   *
   * @param {string} contents
   * @param {SupportedFileFormats} format
   * @returns {{} | any[]}
   * @throws
   */
  #stringToObject(contents, format) {
    let output = {}

    if (!(supportedFileFormats.includes(format))) {
      throw new Error('Unsupported file format.')
    }

    /**
     * If the input variable is not Object or Array, return empty Object
     *
     * @param {any} data
     * @returns {{} | any[]}
     */
    const fixer = function(data) {
      if (data instanceof Object || data instanceof Array) {
        return data
      }

      return {}
    }

    /** @type {Record<SupportedFileFormats, function(string):{}|any[]>} */
    const parsers = {
      js: (data) => data, // Not used, because js files are imported, not parsed
      json: (data) => fixer(JSON.parse(data ?? '')),
      json5: (data) => fixer(JSON5.parse(data ?? ''))
    }

    const parser = parsers?.[format]

    if (parser) output = parser(contents)

    return output
  }
}

export { ConfigReaderAndParser }
