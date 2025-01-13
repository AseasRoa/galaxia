import { open, readFile, stat } from 'node:fs/promises'
import { parse, sep } from 'node:path'
import { promisify } from 'node:util'
import zlib from 'node:zlib'
import { EarlyHints } from '../app/EarlyHints.js'
import { FileManagers } from '../app/fileManagers/FileManagers.js'
import { getCompressionAlgorithmName } from '../functions/utils.js'
import { HttpContext } from './HttpContext.js'
import { HttpResponse } from './HttpResponse.js'
import { HttpResponseFormatter } from './HttpResponseFormatter.js'
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
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /** @type {EarlyHints} */
  #earlyHints

  /** @type {StaticFilesCache} */
  #filesCache

  /** @type {HttpResponseFormatter} */
  #httpResponseFormatter

  /** @type {number} */
  #wholeFileSizeLimit = 3 * 1024 * 1024 // 3MB

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   * @param {EarlyHints} earlyHints
   */
  constructor(appConfig, appPaths, appFileManagers, earlyHints) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths

    this.#httpResponseFormatter = new HttpResponseFormatter({
      maxAge: this.#appConfig.maxAge,
      mimeTypes: this.#appConfig.mimeTypes
    })

    this.#filesCache = new StaticFilesCache()
    this.#appFileManagers = appFileManagers
    this.#earlyHints = earlyHints
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string} modulePath
   * @returns {Promise<void>}
   */
  async deliverNodeModule(httpContext, modulePath) {
    try {
      const result = await this.#appFileManagers.getNodeModuleFile(modulePath)

      await this.#deliverFile(
        httpContext,
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
       * if (this.#appConfig.development) console.error(error)
       */

      this.#respond404(httpContext.response)
    }
  }

  /**
   * TODO Optimize this functionality. Seems that variables
   * TODO are created and stats are calculated every time.
   *
   * @param {HttpContext} httpContext
   * @param {string} filePath
   * @param {boolean} [tryDirectFile]
   */
  async deliverStaticFile(httpContext, filePath, tryDirectFile = true) {
    const tmpFile = this.#appPaths.output + sep + filePath
    const directFile = (tryDirectFile)
      ? this.#appPaths.modules + sep + filePath
      : undefined

    const { error, file, fileStats } = (directFile)
      ? await this.#getSomeFileStats(tmpFile, directFile)
      : await this.#getSomeFileStats(tmpFile)

    if (!error && file && fileStats && fileStats.isFile()) {
      if (this.#appConfig.server.earlyHints) {
        await this.#earlyHints.writeForFileResponse(
          httpContext.response,
          filePath,
          file
        )
      }

      await this.#deliverFile(
        httpContext,
        file,
        fileStats,
        false,
        ''
      )
    }
    else {
      this.#respond404(httpContext.response)
    }
  }

  /**
   * @param {HttpContext} httpContext
   * @param {string} fileAbsolutePath
   * @param {FileSystem.Stats} fileStats
   * @param {boolean} isModuleFile
   * @param {string} moduleFileContents
   * @returns {Promise<void>}
   */
  async #deliverFile(
    httpContext,
    fileAbsolutePath,
    fileStats,
    isModuleFile,
    moduleFileContents
  ) {
    const { request, response } = httpContext
    const { httpVersion } = request
    const cacheIndex = fileAbsolutePath
    const fileMtime = fileStats.mtime
    const fileMtimeUTC = Math.floor((fileMtime.getTime() / 1000))
    const modifiedSince = request.headers['if-modified-since'] ?? ''
    const modifiedSinceUTC = (modifiedSince)
      ? Math.floor((new Date(modifiedSince).getTime()) / 1000)
      : 0
    const parsedPath = parse(fileAbsolutePath)

    this.#httpResponseFormatter.setHeaders(
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
      await this.#deliverFileInChunks(httpContext, parsedPath)
    }
    /**
     * 3) Normal transfer - the whole file is sent in 1 piece
     * Files could be modified and/or minified (JS or CSS)!
     */
    else {
      await this.#deliverFileInEntirety(
        httpContext,
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
   * @param {HttpContext} httpContext
   * @param {ParsedPath} parsedPath
   * @returns {Promise<void>}
   */
  async #deliverFileInChunks(httpContext, parsedPath) {
    const { request, response } = httpContext
    const compressionAlgorithm = getCompressionAlgorithmName(
      request.headers['accept-encoding'] ?? ''
    )
    const fileExtension = parsedPath.ext.substring(1)
    const compressionLevel = this.#getCompressionLevel(fileExtension)
    const encoding = 'utf8'
    const fileHandle = await open(
      parsedPath.dir + sep + parsedPath.base,
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
      this.#httpResponseFormatter.setContentEncoding(
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
   * @param {HttpContext} httpContext
   * @param {ParsedPath} parsedPath
   * @param {boolean} isModuleFile
   * @param {string} moduleFileContents
   * @param {string} index
   * @param {FileSystem.Stats} fileStats
   * @returns {Promise<void>}
   */
  async #deliverFileInEntirety(
    httpContext,
    parsedPath,
    isModuleFile,
    moduleFileContents,
    index,
    fileStats
  ) {
    const { request, response } = httpContext
    const compressionAlgorithm = getCompressionAlgorithmName(
      request.headers['accept-encoding'] ?? ''
    )
    const fileExtension = parsedPath.ext.substring(1)
    const { mtime, size } = fileStats

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
        : await readFile(parsedPath.dir + sep + parsedPath.base)

      // Use compression?
      if (compressionAlgorithm && compressionLevel > 0) {
        const compressionFunction
          = this.#getCompressionFunction(compressionAlgorithm)

        data = await compressionFunction(data, { level: compressionLevel })

        this.#httpResponseFormatter.setContentEncoding(
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

    let level = this.#appConfig.compressionLevels?.[fileExtension] ?? 0

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
