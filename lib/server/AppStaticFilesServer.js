import { open, readFile, stat } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { promisify } from 'node:util'
import zlib from 'node:zlib'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import { AppStaticFilesDepsMap } from './AppStaticFilesDepsMap.js'
import { HttpExchange } from './HttpExchange.js'
import { HttpRequest } from './HttpRequest.js'
import { HttpResponse } from './HttpResponse.js'
import { ServerResponseFormatter } from './ServerResponseFormatter.js'
import { StaticFilesCache } from './StaticFilesCache.js'

/**
 * @callback ZlibCompressionFunction
 * @param {Zlib.InputType} buf
 * @param {Zlib.BrotliOptions | Zlib.ZlibOptions} [options]
 * @returns {Promise<Buffer>}
 */

/**
 * @typedef ZlibCompressionOptions
 * @type {import('zlib').ZlibOptions | import('zlib').BrotliOptions}
 */

/**
 * @typedef SomeFileStats
 * @type {object}
 * @property {null|Error} error
 * @property {null|FileSystem.Stats} fileStats
 * @property {string} file
 */

class AppStaticFilesServer {
  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {AppStaticFilesDepsMap} */
  #appStaticFilesDepsMap

  /** @type {StaticFilesCache} */
  #filesCache

  /** @type {ServerResponseFormatter} */
  #serverResponseFormatter

  /** @type {number} */
  #wholeFileSizeLimit = 3 * 1024 * 1024 // 3MB

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

    this.#serverResponseFormatter = new ServerResponseFormatter({
      maxAge: this.appConfig.maxAge,
      mimeTypes: this.appConfig.mimeTypes
    })

    this.#filesCache = new StaticFilesCache()
    this.#appFileManagers = appFileManagers

    this.#appStaticFilesDepsMap = new AppStaticFilesDepsMap(
      this.appConfig,
      this.appPaths,
      this.#appFileManagers
    )
  }

  /**
   * @param {HttpExchange} exchange
   * @param {string} moduleName
   * @returns {Promise<void>}
   */
  async parseNodeModule(exchange, moduleName) {
    try {
      const result = await this.#appFileManagers.getModuleFile(moduleName)

      await this.#deliverFile(
        exchange,
        result.path,
        result.stats,
        true,
        result.code
      )
    }
    catch (error) {
      /*
       * It's not a good idea to throw on not existing module.
       * Only show an error on development mode.
       * if (this.appConfig.development) console.error(error)
       */

      this.#respond404(exchange.response)
    }
  }

  /**
   * @param {HttpExchange} exchange
   * @param {string} filePath
   * @param {boolean} [tryDirectFile]
   */
  async parseStaticFile(exchange, filePath, tryDirectFile = true) {
    const tmpFile = join(this.appPaths.output, filePath)
    const directFile = (tryDirectFile)
      ? join(this.appPaths.modules, filePath)
      : undefined

    const { error, file, fileStats } = (directFile)
      ? await this.#getSomeFileStats(tmpFile, directFile)
      : await this.#getSomeFileStats(tmpFile)

    if (!error && file && fileStats) {
      if (this.appConfig.server.earlyHints) {
        await this.#appStaticFilesDepsMap.setEarlyHints(
          exchange.response,
          filePath,
          file
        )
      }

      await this.#deliverFile(
        exchange,
        file,
        fileStats,
        false,
        ''
      )
    }
    else {
      this.#respond404(exchange.response)
    }
  }

  /**
   * @param {HttpExchange} exchange
   * @param {string} fileAbsolutePath
   * @param {FileSystem.Stats} fileStats
   * @param {boolean} isModuleFile
   * @param {string} moduleFileContents
   * @returns {Promise<void>}
   */
  async #deliverFile(
    exchange,
    fileAbsolutePath,
    fileStats,
    isModuleFile,
    moduleFileContents
  ) {
    const { request, response } = exchange
    const { httpVersion } = request
    const cacheIndex = fileAbsolutePath
    const fileMtime = fileStats.mtime
    const fileMtimeUTC = Math.floor((fileMtime.getTime() / 1000))
    const modifiedSince = request.headers['if-modified-since'] ?? ''
    const modifiedSinceUTC = (modifiedSince)
      ? Math.floor((new Date(modifiedSince).getTime()) / 1000)
      : 0
    const parsedPath = parse(fileAbsolutePath)

    this.#serverResponseFormatter.setHeaders(
      response,
      parsedPath.ext,
      fileMtime
    )

    /**
     * 1) 304 Not Modified
     */
    if (modifiedSinceUTC === fileMtimeUTC) {
      response.statusCode = 304
      response.end()
    }
    /**
     * 2) Chunked transfer (only available in HTTP 1.1)
     * Files not modified!
     */
    else if (
      !isModuleFile
      && httpVersion === '1.1'
      && fileStats.size > this.#wholeFileSizeLimit
    ) {
      await this.#deliverFileInChunks(exchange, parsedPath)
    }
    /**
     * 3) Normal transfer - the whole file is sent in 1 piece
     * Files could be modified and/or minified (JS or CSS)!
     */
    else {
      await this.#deliverFileInEntirety(
        exchange,
        parsedPath,
        isModuleFile,
        moduleFileContents,
        cacheIndex,
        fileStats
      )
    }
  }

  /**
   * HTTP 1.1 only!
   * Note: HTTP/2 doesn't support HTTP 1.1's chunked transfer encoding
   * mechanism, as it provides its own, more efficient, mechanisms for data
   * streaming.
   *
   * @param {HttpExchange} exchange
   * @param {ParsedPath} parsedPath
   * @returns {Promise<void>}
   */
  async #deliverFileInChunks(exchange, parsedPath) {
    const { request, response } = exchange
    const compressionAlgorithm = getCompressionAlgorithmName(request)
    const fileExtension = parsedPath.ext.substring(1)
    const compressionLevel = this.#getCompressionLevel(fileExtension)
    const encoding = 'utf8'
    const fileHandle = await open(
      join(parsedPath.dir, parsedPath.base),
      'r'
    )
    /** @type {FileSystem.CreateReadStreamOptions} */
    const readStreamOptions = {
      autoClose: true,
      encoding: null,
      highWaterMark: 64 * 1024
    }

    const readStream = fileHandle.createReadStream(readStreamOptions)

    const onEnd = () => response.end()

    // 1) Use compression
    if (compressionAlgorithm && compressionLevel > 0) {
      this.#serverResponseFormatter.setContentEncoding(
        response,
        compressionAlgorithm
      )

      /** @type {Zlib.ZlibOptions} */
      const zlibOptions = {
        level: compressionLevel
      }

      const pipe = getPipe(readStream, compressionAlgorithm, zlibOptions)

      /**
       * @param {Buffer|string} data
       */
      const onData = (data) => {
        // @ts-ignore
        response.write(data, encoding)
      }

      pipe.on('data', onData)
      pipe.on('end', onEnd)
    }
    // No compression
    else {
      /**
       * @param {Buffer|string} data
       */
      const onData = (data) => {
        // @ts-ignore
        response.write(data, encoding, () => {
          readStream.resume()
        })
        readStream.pause()
      }

      readStream.on('data', onData)
      readStream.on('end', onEnd)
    }
  }

  /**
   * @param {HttpExchange} exchange
   * @param {ParsedPath} parsedPath
   * @param {boolean} isModuleFile
   * @param {string} moduleFileContents
   * @param {string} index
   * @param {FileSystem.Stats} fileStats
   * @returns {Promise<void>}
   */
  async #deliverFileInEntirety(
    exchange, parsedPath, isModuleFile, moduleFileContents, index, fileStats
  ) {
    const { request, response } = exchange
    const compressionAlgorithm = getCompressionAlgorithmName(request)
    const fileExtension = parsedPath.ext.substring(1)
    const { mtime } = fileStats
    const { size } = fileStats

    /** @type {Buffer|string} */
    let data = Buffer.alloc(0)

    const cachedFile = this.#filesCache.get(index, compressionAlgorithm, mtime)

    if (cachedFile) {
      for (const headerName in cachedFile.headers) {
        const headerValue = cachedFile.headers[headerName]

        if (headerName.startsWith(':') || headerValue === undefined) {
          continue
        }

        response.setHeader(headerName, headerValue)
      }

      data = cachedFile.data
    }
    else {
      const compressionLevel = this.#getCompressionLevel(fileExtension)

      data = (isModuleFile)
        ? moduleFileContents
        : await readFile(join(parsedPath.dir, parsedPath.base))

      // Use compression?
      if (compressionAlgorithm && compressionLevel > 0) {
        const compressionFunction
          = this.#getCompressionFunction(compressionAlgorithm)

        data = await compressionFunction(data, { level: compressionLevel })

        this.#serverResponseFormatter.setContentEncoding(
          response,
          compressionAlgorithm
        )
      }

      const headers = response.getHeaders()

      this.#filesCache.set(
        index,
        compressionAlgorithm,
        { mtime, headers, data, size }
      )
    }

    response.end(data)
  }

  /**
   * @param {string} compressionMethod
   * @returns {ZlibCompressionFunction}
   */
  #getCompressionFunction(compressionMethod) {
    let compressionFunction = zlib.deflate

    switch (compressionMethod) {
      case 'br':
        compressionFunction = zlib.brotliCompress

        break
      case 'deflate':
        compressionFunction = zlib.deflate

        break
      case 'gzip':
        compressionFunction = zlib.gzip

        break
    }

    return promisify(compressionFunction)
  }

  /**
   * From the app's configuration, get the compression level for the given
   * file extension
   *
   * @see http://expressjs.com/en/resources/middleware/compression.html
   * @param {string} fileExtension
   * @returns {number} A number between 0 and Z_BEST_COMPRESSION (which is 9)
   */
  #getCompressionLevel(fileExtension) {
    const highestLevel = zlib.constants.Z_BEST_COMPRESSION // 9

    let level = this.appConfig.compressionLevels?.[fileExtension] ?? 0

    if (level < 0) level = 0

    if (level > highestLevel) level = highestLevel

    return level
  }

  /**
   * Try to return Stats of the first file in the input array.
   * If this file is missing, try the second file... continue until success.
   * Or, if there is no success, return the error of the last file.
   *
   * @param {...string} files
   * @returns {Promise<SomeFileStats>}
   */
  async #getSomeFileStats(...files) {
    /** @type {Error|null} */
    let error = null
    let file = ''
    let fileStats = null

    for (file of files) {
      if (!file) {
        continue
      }

      try {
        error = null
        fileStats = await stat(file)

        break
      }
      catch (e) {
        error = e
      }
    }

    return { error, file, fileStats }
  }

  /**
   * @param {HttpResponse} response
   * @param {string} [message]
   * @returns {void}
   */
  #respond404(response, message = '404 Not Found') {
    const html = `<html lang="en"><body>${message}</body></html>`

    response.statusCode = 404
    response.end(html) // The string is not used when the request is for a file
  }
}

/**
 * Extract the preferred compression algorithm from a request, if any
 *
 * @param {HttpRequest} request
 * The Request object
 * @param {CompressionAlgorithmName[]} [allowedAlgorithms]
 * An array of allowed algorithm names, sorted by preference
 * (the first one is the most preferred one)
 * @returns {CompressionAlgorithmName}
 * The name of the algorithm that best matches the preferences
 * of the client and the allowed algorithms. If no match can be
 * found, an empty string is returned.
 */
function getCompressionAlgorithmName(
  request,
  allowedAlgorithms = ['br', 'gzip', 'deflate']
) {
  /** @type {CompressionAlgorithmName} */
  let preferredAlgorithm = ''

  // accept-encoding could be like: deflate, gzip;q=1.0, *;q=0.5
  const acceptEncoding = (request.headers['accept-encoding'] instanceof Array)
    ? request.headers['accept-encoding'].join(',')
    : (request.headers['accept-encoding'] ?? '').toString()
  const pattern = /(^|,)\s*(?<method>[a-z*]+)(?:;q=(?<q>[\d.]+))?/ugm

  // Build a map of algorithms
  /**
   * The keys of the map are the quality values (q=). If no quality
   * value is present, the value of 1 is used, because maximum
   * preference is assumed.
   *
   * The values are arrays of algorithm names who have the same
   * quality value.
   *
   * @type {Map<number, string[]>}
   */
  const acceptEncodingMap = new Map()
  let match = null

  while ((match = pattern.exec(acceptEncoding)) !== null) {
    const method = match?.groups?.['method'] ?? ''
    const quality = parseFloat(match?.groups?.['q'] ?? '') || 1
    const algorithms = acceptEncodingMap.get(quality) ?? []

    algorithms.push(method)
    acceptEncodingMap.set(quality, algorithms)
  }

  /*
   * Note: The map is presumably sorted, so that the first key-value
   * pair should be for algorithms with quality of 1.
   */

  /*
   * Walk through the values of the map, to find the compression
   * algorithm that best matches the preferences of the client and
   * the list of allowed algorithms (where the first value is the
   * most preferred one)
   */
  acceptEncodingMap.forEach((algorithms) => {
    allowedAlgorithms.every((algorithm) => {
      if (algorithms.includes(algorithm)) {
        preferredAlgorithm = algorithm

        return false
      }

      return true
    })
  })

  return preferredAlgorithm
}

/**
 * @param {import('fs').ReadStream} readStream
 * @param {string} compressionAlgorithm
 * @param {ZlibCompressionOptions} [compressionOptions]
 * @returns {NodeJS.WritableStream}
 */
function getPipe(readStream, compressionAlgorithm, compressionOptions) {
  let compressFunction = zlib.createGzip

  switch (compressionAlgorithm) {
    case 'gzip':
      compressFunction = zlib.createGzip

      break
    case 'deflate':
      compressFunction = zlib.createDeflate

      break
    case 'br':
      compressFunction = zlib.createBrotliCompress

      break
  }

  /** @type {NodeJS.WritableStream} */
  const stream = compressFunction(compressionOptions)

  return readStream.pipe(stream)
}

export { AppStaticFilesServer }
