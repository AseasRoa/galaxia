/** @typedef {import('http2').Http2ServerRequest} Request */
/** @typedef {import('http2').Http2ServerResponse} Response */
/** @typedef {import('net').Socket} Socket */
/** @typedef {import('http2').Http2SecureServer} Http2SecureServer */
/** @typedef {import('http').Http2Server} Http2Server */
/** @typedef {import('http2').ServerHttp2Session} ServerHttp2Session */

/**
 * @typedef {Object} ProcessMessage
 * @property {'heartbeat' | 'killYourself'} cmd
 */

/**
 * @typedef {Object} ServerConfigSSL
 * @property {string} key
 * @property {string} cert
 * @property {string} [ca]
 * @property {string|Array} [ciphers]
 */

/**
 * @typedef {Object<string, number>} ServerConfigPROXY
 */

/**
 * @typedef {Object} ServerConfig
 * @property {string[]} [hostNames]
 * @property {number} [httpPort]
 * @property {number} [httpsPort]
 * @property {number} [requestTimeout]
 * @property {Object<string, ServerConfigSSL>} [ssl]
 * @property {number} [redirectHttpToHttps]
 * @property {string[]} [redirectHttpToHttpsExcludePaths]
 * @property {ServerConfigPROXY} [proxy]
 */

/**
 * @typedef {Object} Config
 * @property {number|boolean} httpPort
 * @property {number|boolean} httpsPort
 * @property {number} requestTimeout
 * @property {string} hostnameFallback
 * @property {Object<string, string[]>} hostnameAliases
 * @property {string} appsPath
 * @property {string} appsConfigPath
 * @property {string} appsComponentsPath
 * @property {number} payloadMaxMb
 */

/**
 * @typedef {Object} AppConfigSSL
 * @property {string} passphrase
 * @property {string} key
 * @property {string} cert
 * @property {string} ca
 */

/**
 * @typedef {Object} AppConfig
 * @property {{string}} [mimeTypes]
 * @property {{number}} [cacheControl]
 * @property {{number}} [deflate]
 * @property {Object<string, Object<string, *>>} [databases]
 * @property {AppConfigSSL} [ssl]
 * @property {Object<string, *>} [server]
 * @property {{string}} [ajax],
 * @property {Array<string|RegExp, string>[]} urlRewrite
 */

/**
 * @typedef {Object} AppPaths
 * @property {string} root
 * @property {string} components
 * @property {string} outputDest
 */

/**
 * @typedef {Object} PathComponents
 * @property {string} component
 * @property {string} componentFolder
 * @property {string} filePath
 * @property {string} file
 * @property {string} ext
 * @property {string} queryString
 */

/**
 * @typedef {Object} QueryParams
 * @property {{}} query
 * @property {{}} queryGet
 */