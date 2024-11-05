import fsp from 'node:fs/promises'
import path from 'node:path'

/** @typedef {'js' | 'json' | 'json5'} SupportedFileFormats */

/** @type {Set<SupportedFileFormats>} */
const supportedFileFormats = new Set(['js', 'json5', 'json'])

class ConfigReaderAndParser {
  /** @type {any} */
  #json5 = null

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

      if (ext === 'json5') {
        // Import on demand, because the chance is that JSON5 is not even used
        this.#json5 = await import('json5')
      }

      try {
        if (ext === 'js') {
          data = await this.#importConfigFile(filePath)
        }
        else {
          fileContents = (await fsp.readFile(filePath)).toString()
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
        Array.isArray(outputValue)
        && Array.isArray(inputValue)
      ) {
        // When Array, accept the input value as is
        outputConfig[name] = inputValue
      }
      else if (
        !Array.isArray(outputValue)
        && outputValue instanceof Object
        && inputValue instanceof Object
      ) {
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
      await fsp.access(filePath)

      return true
    }
    catch (error) {
      return false
    }
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

    return (module.default instanceof Object)
      ? module.default
      : {}
  }

  /**
   * Parse a string into an object
   *
   * @param {string} contents
   * @param {SupportedFileFormats} format
   * @returns {Object<any, any> | any[]}
   * @throws
   */
  #stringToObject(contents, format) {
    if (!(supportedFileFormats.has(format))) {
      throw new Error('Unsupported file format.')
    }

    /** @type {any} */
    let output = {}

    switch (format) {
      case 'js': {
        output = this.#parseJS(contents)
        break
      }
      case 'json': {
        output = this.#parseJSON(contents)
        break
      }
      case 'json5': {
        output = this.#parseJSON5(contents)
        break
      }
    }

    return (output instanceof Object) ? output : {}
  }

  /**
   * Not parsed, because js files are imported
   *
   * @param {any} data
   * @returns {any}
   */
  #parseJS(data) {
    return data
  }

  /**
   * @param {any} data
   * @returns {any}
   */
  #parseJSON(data) {
    return JSON.parse(data)
  }

  /**
   * @param {any} data
   * @returns {any}
   */
  #parseJSON5(data) {
    const JSON5 = this.#json5

    if (
      JSON5 instanceof Object
      && typeof JSON5.parse === 'function'
    ) {
      return JSON5.parse(data ?? '')
    }

    return {}
  }
}

export { ConfigReaderAndParser }
