import { readFileSync } from 'node:fs'
import { createSecureContext } from 'node:tls'

/** @type {string} */
const defaultCiphers = [
  'ECDHE-ECDSA-CHACHA20-POLY1305',
  'ECDHE-RSA-CHACHA20-POLY1305',
  'ECDHE-ECDSA-AES128-GCM-SHA256',
  'ECDHE-RSA-AES128-GCM-SHA256',
  'ECDHE-ECDSA-AES256-GCM-SHA384',
  'ECDHE-RSA-AES256-GCM-SHA384',
  'DHE-RSA-AES128-GCM-SHA256',
  'DHE-RSA-AES256-GCM-SHA384',
  'ECDHE-ECDSA-AES128-SHA256',
  'ECDHE-RSA-AES128-SHA256',
  'ECDHE-ECDSA-AES128-SHA',
  'ECDHE-RSA-AES256-SHA384',
  'ECDHE-RSA-AES128-SHA',
  'ECDHE-ECDSA-AES256-SHA384',
  'ECDHE-ECDSA-AES256-SHA',
  'ECDHE-RSA-AES256-SHA',
  'DHE-RSA-AES128-SHA256',
  'DHE-RSA-AES128-SHA',
  'DHE-RSA-AES256-SHA256',
  'DHE-RSA-AES256-SHA',
  'ECDHE-ECDSA-DES-CBC3-SHA',
  'ECDHE-RSA-DES-CBC3-SHA',
  'EDH-RSA-DES-CBC3-SHA',
  'AES128-GCM-SHA256',
  'AES256-GCM-SHA384',
  'AES128-SHA256',
  'AES256-SHA256',
  'AES128-SHA',
  'AES256-SHA',
  'DES-CBC3-SHA',
  '!DSS'
].join(':')

class ServerNameIndication {
  /** @type {Object<string, Tls.SecureContextOptions>} */
  #certsDictionary = {}

  /**
   * @param {Object<string, app.SecureContextOptions>} config
   */
  constructor(config) {
    this.#certsDictionary = this.#readCerts(config)
  }

  /**
   * @param {string} hostname
   * @param {function(Error|null, Tls.SecureContext):void} callback
   * @returns {void}
   */
  createContext(hostname, callback) {
    let hostName = hostname
    let errorMessage = ''

    /*
     * If the hostname starts with "www.", but it is not found
     * in the configuration, remove the "www." part.
     */
    if (
      (!(hostName in this.#certsDictionary))
      && (hostName.startsWith('www.'))
    ) {
      hostName = hostName.substring(4)
    }

    if (!(hostName in this.#certsDictionary)) {
      errorMessage = `Unknown host ${hostName}`
    }

    const ctx = createSecureContext(this.#certsDictionary[hostName])
    const error = (errorMessage) ? new Error(errorMessage) : null

    callback(error, ctx)
  }

  /**
   * Checks whether the cert string is valid. To be valid it must only contain
   * Base64 characters or "-", which is used to describe begin and end sections
   *
   * @see https://base64.guru/learn/base64-characters
   * @param {string} string
   * @returns {boolean}
   */
  #isCertStringValid(string) {
    return string.search(/[^A-Za-z0-9+/-]/u) > -1
  }

  /**
   * Certs could be provided directly as strings, but also as file names.
   * If file name is used, replace it with the contents from the file.
   *
   * @param {Object<string, Tls.SecureContextOptions>} configOptions
   * @returns {Object<string, Tls.SecureContextOptions>}
   * @throws
   */
  #readCerts(configOptions) {
    /** @type {Object<string, Tls.SecureContextOptions>} */
    const allCerts = {}

    for (const hostname in configOptions) {
      /** @type {Tls.SecureContextOptions} */
      const inputOptions = configOptions?.[hostname] ?? {}
      /** @type {Tls.SecureContextOptions} */
      const outputOptions = {}

      // Add the options that are either strings or file paths
      for (const key in inputOptions) {
        if (key === 'ca' || key === 'key' || key === 'cert') {
          const contents = inputOptions[key] ?? ''

          if (typeof contents !== 'string') continue

          const isFilePath = (contents.search(/[.:\\]/u) > -1)

          if (isFilePath) { // Read certs from the given files
            const file = contents

            let fileContents = ''

            try {
              fileContents = readFileSync(file).toString()
            }
            catch (error) {
              throw new Error(`Failed to read SSL files for host ${hostname}: ${error.message}`)
            }

            if (!this.#isCertStringValid(fileContents)) {
              throw new Error(`Wrong file contents for ${file}`)
            }

            outputOptions[key] = fileContents
          }
          else { // Certs are likely defined as strings
            outputOptions[key] = contents
          }
        }
      }

      // Add "ciphers"
      if (!inputOptions.ciphers) {
        outputOptions.ciphers = defaultCiphers
      }
      else {
        if (typeof inputOptions.ciphers === 'string') {
          outputOptions.ciphers = inputOptions.ciphers
        }
      }

      allCerts[hostname] = outputOptions
    }

    return allCerts
  }
}

export { ServerNameIndication }
