import $fs from 'fs'
import $fsp from 'fs/promises'
import $path from 'path'
import $zlib from 'zlib'
import {mimeTypes} from './mimeTypes.js'

let STATIC_FILES_CACHE = {} // to store some small files in memory and serve them directly

/**
 * @param {string} file
 * @returns {Promise<boolean>}
 * @private}
 */
function fileExists(file) {
	return new Promise((resolve) => {
		$fs.stat(file, (error) => {
			resolve(!error)
		})
	})
}

class StaticFiles
{
	/** @type {AppConfig} */
	appConfig
	/** @type {AppPaths} */
	appPaths

	constructor(appConfig, appPaths) {
		this.appConfig = appConfig
		this.appPaths  = appPaths
	}

	/**
	 * @param {URL} url
	 * @param {Request} request
	 * @param {Response} response
	 * @param {Stats} stat
	 * @param {string} fileAbsolutePath
	 * @returns {Promise<void>}
	 */
	async deliverFile(url, request, response, stat, fileAbsolutePath) {
		const parsedFile    = $path.parse(fileAbsolutePath)
		const fileExtension = parsedFile.ext

		let headers          = {}
		let cacheIndex       = fileAbsolutePath + url.search
		let mtime            = stat.mtime
		let utcModifiedSince = Math.floor((new Date(request.headers['if-modified-since']).getTime()) / 1000)
		let utcMtime         = Math.floor((mtime.getTime() / 1000))

		this.headersSetContentType(headers, fileExtension)
		this.headersSetCacheControl(headers, fileExtension, mtime)

		if (utcModifiedSince === utcMtime) {
			response.statusCode = 304

			for (let headerName in headers) {
				response.setHeader(headerName, headers[headerName])
			}

			response.end()

			if (STATIC_FILES_CACHE[cacheIndex]) {
				delete STATIC_FILES_CACHE[cacheIndex]
			}

			return
		}

		let acceptEncoding = request.headers['accept-encoding'] || ''
		let method         = ''

		if (acceptEncoding.indexOf('gzip') > -1) method = 'gzip'
		else if (acceptEncoding.indexOf('deflate') > -1) method = 'deflate'
		else if (acceptEncoding.indexOf('br') > -1) method = 'brotli'

		// 1) Normal transfer - the whole file is sent in 1 piece
		if (stat.size < (3 * 1024 * 1024)) {
			// try to get the file from the cache
			if (
				1
				&& STATIC_FILES_CACHE[cacheIndex]
				&& STATIC_FILES_CACHE[cacheIndex][method]
				&& STATIC_FILES_CACHE[cacheIndex][method].mtime.valueOf() === mtime.valueOf()) // === doesn't work here
			{
				let headers = STATIC_FILES_CACHE[cacheIndex][method].headers
				let data    = STATIC_FILES_CACHE[cacheIndex][method].data

				for (let headerName in headers) {
					response.setHeader(headerName, headers[headerName])
				}

				response.end(data)
			}
			else {
				$fs.readFile(fileAbsolutePath, (err, data) => {
					if (method && typeof this.appConfig.deflate[fileExtension] === 'number') {
						let options = {level : this.appConfig.deflate[fileExtension]}

						headers['Content-Encoding'] = method

						$zlib[method](data, options, (err, data) => {

							for (let headerName in headers) {
								response.setHeader(headerName, headers[headerName])
							}

							response.end(data)

							STATIC_FILES_CACHE[cacheIndex]         = STATIC_FILES_CACHE[cacheIndex] || {}
							STATIC_FILES_CACHE[cacheIndex][method] = {
								mtime   : mtime,
								headers : headers,
								data    : data
							}
						})
					}
					else {
						for (let headerName in headers) {
							response.setHeader(headerName, headers[headerName])
						}

						response.end(data)

						STATIC_FILES_CACHE[cacheIndex]         = STATIC_FILES_CACHE[cacheIndex] || {}
						STATIC_FILES_CACHE[cacheIndex][method] = {
							mtime   : mtime,
							headers : headers,
							data    : data
						}
					}
				})
			}
		}
		// 2) Chunked transfer
		else {
			const encoding   = 'utf8'
			const readStream = $fs.createReadStream(fileAbsolutePath, {
				flags         : 'r',
				encoding      : null,
				highWaterMark : 64 * 1024,
				bufferSize    : 64 * 1024,
				autoClose     : true
			})

			for (let headerName in headers)
				response.setHeader(headerName, headers[headerName])

			// 1) deflate, gzip, brotli
			if (method && typeof this.appConfig.deflate[fileExtension] === 'number') {
				response.setHeader('content-encoding', method)

				let zlibOptions = {level : this.appConfig.deflate[fileExtension]}

				let pipe

				switch (method) {
					case 'gzip' : {
						pipe = readStream.pipe($zlib.createGzip(zlibOptions))
						break
					}
					case 'deflate' : {
						pipe = readStream.pipe($zlib.createDeflate(zlibOptions))
						break
					}
					case 'brotli' : {
						pipe = readStream.pipe($zlib.createBrotliCompress())
						break
					}
				}

				pipe.on('data', (data) => {
					response.write(data, encoding)
				})

				pipe.on('end', () => {
					response.end()
				})
			}
			// no compression
			else {
				readStream.on('data', (data) => {
					response.write(data, encoding, () => {
						readStream.resume()
					})
					readStream.pause()
				})

				readStream.on('end', () => {
					response.end()
				})
			}
		}
	}

	/**
	 * Try to return Stats of the first file in the input array.
	 * If this file is missing, try the second file... continue until success.
	 * Or, if there is no success, return the error of the last file.
	 * @param {string[]} filesArray
	 * @return {Promise<{error:Error|null, stat:Stats|null, file:string}>}
	 * @private
	 */
	async getSomeFileStats(filesArray) {
		/** @type {Error|null} */
		let error = null
		let file  = ''
		let stat  = null

		for (file of filesArray) {
			try {
				error = null
				stat  = await $fsp.stat(file)
				break
			} catch (e) {
				error = e
			}
		}

		return {error, file, stat}
	}

	/**
	 *
	 * @param {{}} headers
	 * @param {string} ext
	 * @param {Date} timeModified
	 * @private
	 */
	headersSetCacheControl(headers, ext, timeModified) {
		let seconds = this.appConfig.cacheControl[ext]

		if (seconds === undefined)
			return

		if (seconds === 0)
			headers['cache-control'] = 'no-cache, no-store, must-revalidate' // HTTP 1.1.

		headers['accept-ranges'] = 'bytes'
		headers['cache-control'] = 'public, max-age=' + seconds
		headers['last-modified'] = timeModified.toUTCString()
		//response.setHeader('Vary', 'Accept-Encoding,User-Agent')
		headers['vary']          = 'Accept-Encoding,User-Agent'
		headers['expires']       = new Date(new Date().getTime() + (seconds * 1000)).toUTCString()
	}

	/**
	 * @param {{}} headers
	 * @param {string} ext
	 * @private
	 */
	headersSetContentType(headers, ext) {
		headers['content-type'] = this.appConfig.mimeTypes[ext] || mimeTypes[ext] || 'text/plain'
	}

	/**
	 * @param {URL} url
	 * @param {pathComponents} pathComponents
	 * @param {Request} request
	 * @param {Response} response
	 * @returns {Promise<boolean>}
	 */
	async parseStaticFile(url, pathComponents, request, response) {

		let c = pathComponents

		c.component = c.component || 'index'

		const allowedFolders            = ['public', 'script', 'stylesheet']
		const defaultAllowedFolderIndex = 0
		const isIOFile                  = (
			c.componentFolder === ''
			&& c.filePath === ''
			&& c.file.substr(-3) === '.io'
			&& (c.ext === 'js' || c.ext === 'mjs')
		)

		if (
			!isIOFile
			&& allowedFolders.indexOf(c.componentFolder) === -1
		) {
			c.filePath        = c.componentFolder + ((c.filePath) ? '/' + c.filePath : '')
			c.componentFolder = allowedFolders[defaultAllowedFolderIndex]
		}

		const filePath = $path.join(
			c.component,
			c.componentFolder,
			c.filePath,
			c.file + '.' + c.ext
		)

		const directFile = $path.join(
			this.appPaths.components,
			filePath
		)

		const tmpFile = $path.join(
			this.appPaths.outputDest,

			filePath.replace(/[\\\/]/g, '-')
		)

		let {error, file, stat} = await this.getSomeFileStats([tmpFile, directFile])

		if (error) {
			this.responseErrorPage(response)
			console.error(error)
		}
		else {
			this.deliverFile(url, request, response, stat, file)
		}

		return true
	}

	/**
	 * @param {Response} response
	 */
	responseErrorPage(response) {
		let statusCode = 404

		response.statusCode = statusCode
		response.end(`<html><body>Error ${statusCode}</body></html>`)
	}
}

export {StaticFiles}