"use strict"

import $fs from "fs"
import $zlib from "zlib"
import $components from "./components.mjs"
import $config from "./config.mjs"
import $jsonfile from "../jsonfile.mjs"
import $os from "os"
import $path from "path"
import $url from "url"
import dbDrivers from "./db-drivers/index.mjs"

const __filename = new URL(import.meta.url).href.replace("file:///", "")
const __dirname  = $path.dirname(__filename)

const __tmpdir = $os.tmpdir() + $path.sep + "nodejs-galaxia" + $path.sep + "public-" + ((process.develop === true) ? "dev" : "prod")

global.databases       = {}
let STATIC_FILES_CACHE = {} // to store some small files in memory and serve them directly
let MIME_TYPES         = {
	"css"  : "text/css",
	"js"   : "application/javascript",
	"htm"  : "text/html",
	"html" : "text/html",
	"txt"  : "text/plain",
	"php"  : "text/x-php",
	"json" : "application/json",
	"xml"  : "application/xml",
	"swf"  : "application/x-shockwave-flash",
	"flv"  : "video/x-flv",
	"png"  : "image/png",
	"jpe"  : "image/jpeg",
	"jpeg" : "image/jpeg",
	"jpg"  : "image/jpeg",
	"gif"  : "image/gif",
	"bmp"  : "image/bmp",
	"ico"  : "image/vnd.microsoft.icon",
	"tiff" : "image/tiff",
	"tif"  : "image/tiff",
	"svg"  : "image/svg+xml",
	"svgz" : "image/svg+xml",
	"woff" : "application/x-font-woff",
	"zip"  : "application/zip",
	"rar"  : "application/x-rar-compressed",
	"exe"  : "application/x-msdownload",
	"msi"  : "application/x-msdownload",
	"cab"  : "application/vnd.ms-cab-compressed",
	"map"  : "application/json"
}

/**
 *
 * @param {string} databaseID
 *
 * @returns {Interface}
 */
function selectDatabase(databaseID = "")
{
	return global.databases[databaseID]
}

global.selectDatabase = selectDatabase

function end(request, body, callback)
{
	try
	{
		request.query = JSON.parse(body)

	} catch (e)
	{
		request.query = {}
	}

	callback(request.query)
}

/**
 * @param {Object} request
 * @param {function} callback
 */
function getRequestParameters(request, callback)
{
	if (request.method !== "GET")
	{
		let body          = ""
		let ended         = false
		let contentLength = -1

		// For Chrome and SSL POST requests, the first request is done perfectly,
		// but after 12 second the following request doesn't fire the "end" event.
		// That's why I'm going to get the content length from the request and end it.
		if (typeof request.headers["content-length"] === "string")
		{
			contentLength = parseInt(request.headers["content-length"])
		}

		function onData(chunk)
		{
			body += chunk

			if (
				contentLength === 0
				|| (contentLength > 0 && body.length >= contentLength)
			)
			{
				if (ended === false)
				{
					ended = true
					request.off("end", onEnd)
					request.setTimeout(0)
					end(request, body, callback)
				}

				return
			}

			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 1e6)
			{
				// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
				request.connection.destroy()
			}
		}

		function onEnd()
		{
			if (ended === false)
			{
				ended = true

				end(request, body, callback)
			}
		}

		request.on("end", onEnd).on("data", onData)
	}
	else
	{
		let query = $url.parse(request.url, true)["query"]

		request.queryGet = {}
		request.query    = {}

		for (let q in query)
		{
			request.queryGet[q] = query[q]
			request.query[q]    = query[q]
		}

		callback()
	}
}

/**
 * @param {Object} rules
 * @param {function} callback
 */
function loadDatabases(rules, callback)
{
	let driversFolder = `${__dirname}/db-drivers`
	let databases     = {}

	// if no databases => callback and exit
	if (!rules)
	{
		setTimeout(function () { // because the callback must be var databases = {}asyncronous
			callback({})
		}, 0)
		return
	}

	// some databases in the list, try to load them

	let databasesCount = Object.keys(rules).length // all databases to be loaded
	let counter        = 0 // counts how many databases were loaded

	if (databasesCount === 0)
	{
		callback(null, databases)
	}

	for (let dbIndex in rules)
	{
		let driverName = rules[dbIndex]["driver"]
		let driverFile = $path.resolve(`${driversFolder}/${driverName}/index.js`)

		// Check if the "driver" key is defined
		if (!driverName)
		{
			console.error(`No database driver defined for "${dbIndex}" in configuration!`)

			continue
		}

		// Try to load the requested driver
		let database = null

		try
		{
			database = dbDrivers[driverName]
		} catch (e)
		{
			console.error(`Database driver "${driverName}" for "${dbIndex}" was not found!`)
			console.error(e)

			continue
		}

		// add database to the list
		new database(rules[dbIndex], (err, db) => {

			if (err)
			{
				console.error(`Failed to load database driver: ${this.name}`)
			}
			else
			{
				counter++

				databases[dbIndex] = db

				if (counter >= databasesCount)
				{
					callback(null, databases)
				}
			}
		})
	}
}

/**
 * @param {string} configPath
 */
function getUrlRouteRules(configPath)
{
	let ret  = {}
	let file = $path.resolve(`${configPath}/url-route.json`)

	try
	{
		if ($fs.lstatSync(file).isFile())
		{
			ret = $jsonfile.readFileSync(file, {stripComments : true})
		}
	} catch (e)
	{
	}

	return ret
}

/**
 * @param {string} configPath
 */
function getUrlRewriteRules(configPath)
{
	let ret  = {}
	let file = `${configPath}/url-rewrite.json`

	try
	{
		if ($fs.lstatSync(file).isFile())
		{
			ret = $jsonfile.readFileSync(file, {stripComments : true})
		}
	} catch (e)
	{
	}

	for (let i in ret)
	{
		let regex   = i
		let pattern = "^/(.*?)/([gimy]*)$"
		let match   = regex.match(new RegExp(pattern))

		if (match)
		{
			try
			{
				regex = new RegExp(match[1], match[2])
			} catch (e)
			{
				console.error("in file " + file)
				console.error(e)

				continue
			}
		}

		ret[i] = {
			regex   : regex,
			replace : ret[i]
		}
	}

	return ret
}

/**
 * @param {Object} response
 */
function responseErrorPage(response)
{
	let statusCode = 404

	response.statusCode = statusCode
	response.end(`<html><body>Error ${statusCode}</body></html>`)
}

/**
 * Add field request.pathname
 *
 * @param {Object} request
 * @param {Object} rewriteRules
 *
 * @return {Object}
 */
function doUrlRewrite(request, rewriteRules)
{
	for (let i = 0, keys = Object.keys(rewriteRules); i < keys.length; i++)
	{
		let transform = request.url.replace(
			rewriteRules[keys[i]]["regex"],
			rewriteRules[keys[i]]["replace"]
		)

		let idx = transform.indexOf("?")

		if (idx === -1) idx = transform.indexOf("&")

		if (idx === -1)
		{
			request.pathname = transform
		}
		else
		{
			request.pathname = transform.substr(0, idx)
		}

		if (transform !== request.url)
		{
			request.url = transform

			break
		}
	}

	return request
}

function deliverFile(request, response, stat, path, ext, config)
{
	let headers = {}

	let getHeaders = () => {
		return headers
	}

	let setHeaders = {
		"mime-types"    : (ext) => {
			let mime = config["mimeTypes"][ext]

			mime = (mime !== undefined) ? mime : "text/plain"

			headers["content-type"] = mime
		},
		"cache-control" : (ext, mTime) => {
			let seconds = config["cacheControl"][ext]

			if (seconds === undefined)
			{
				return
			}

			if (seconds === 0)
			{
				headers["cache-control"] = "no-cache, no-store, must-revalidate" // HTTP 1.1.
				//response.setHeader("Expires", "0") // Proxies.
			}

			headers["accept-ranges"] = "bytes"
			headers["cache-control"] = "public, max-age=" + seconds
			headers["last-modified"] = mTime.toGMTString()
			//response.setHeader("Vary", "Accept-Encoding,User-Agent")
			headers["vary"]          = "Accept-Encoding,User-Agent"
			headers["expires"]       = new Date(new Date().getTime() + (seconds * 1000)).toGMTString()
		}
	}

	let cacheIndex    = path + "?" + (request.queryString || "")
	let mtime         = stat["mtime"]
	let utc_mod_since = Math.floor((new Date(request.headers["if-modified-since"]).getTime()) / 1000)
	let utc_mtime     = Math.floor((mtime.getTime() / 1000))

	if (utc_mod_since === utc_mtime)
	{
		setHeaders["mime-types"](ext)
		setHeaders["cache-control"](ext, mtime)

		response.statusCode = 304

		let headers = getHeaders()

		for (let headerName in headers)
		{
			response.setHeader(headerName, headers[headerName])
		}

		response.end()

		if (STATIC_FILES_CACHE[cacheIndex])
		{
			delete STATIC_FILES_CACHE[cacheIndex]
		}

		return
	}

	let acceptEncoding = request.headers["accept-encoding"]

	if (!acceptEncoding)
	{
		acceptEncoding = ""
	}

	let method  = null
	let method2 = null

	if (acceptEncoding.indexOf("gzip") > -1)
	{
		method  = "gzip"
		method2 = "Gzip"
	}
	else if (acceptEncoding.indexOf("deflate") > -1)
	{
		method  = "deflate"
		method2 = "Deflate"
	}

	// 1) Normal transfer - the whole file is sent in 1 piece
	if (stat["size"] < (3 * 1024 * 1024))
	{
		//setHeaders["eTag"](response, eTag)
		setHeaders["mime-types"](ext)
		setHeaders["cache-control"](ext, mtime)

		if (
			1
			&& STATIC_FILES_CACHE[cacheIndex]
			&& STATIC_FILES_CACHE[cacheIndex][method]
			&& STATIC_FILES_CACHE[cacheIndex][method].mtime.valueOf() === mtime.valueOf()) // === doesn't work here
		{
			let headers = STATIC_FILES_CACHE[cacheIndex][method].headers
			let data    = STATIC_FILES_CACHE[cacheIndex][method].data

			for (let headerName in headers)
			{
				response.setHeader(headerName, headers[headerName])
			}

			response.end(data)
		}
		else
		{
			$fs.readFile(path, (err, data) => {
				if (method && typeof config["deflate"][ext] === "number")
				{
					if (0)
					{
						response = response.compressionLevel(config["deflate"][ext])
					}
					else
					{
						let headers = getHeaders()
						let options = {level : config["deflate"][ext]}

						headers["Content-Encoding"] = method

						$zlib[method](data, options, (err, data) => {

							for (let headerName in headers)
							{
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
				}
				else
				{
					let headers = getHeaders()

					for (let headerName in headers)
					{
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
	else
	{
		let raw = $fs.createReadStream(path, {
			flags         : "r",
			encoding      : null,
			highWaterMark : 64 * 1024,
			bufferSize    : 64 * 1024,
			autoClose     : true
		})

		//setHeaders["eTag"](response, eTag)
		setHeaders["mime-types"](ext)
		setHeaders["cache-control"](ext, mtime)

		// 1) deflate, gzip
		if (method && typeof config["deflate"][ext] === "number")
		{
			response.setHeader("content-encoding", method)

			let headers = getHeaders()

			for (let headerName in headers)
			{
				response.setHeader(headerName, headers[headerName])
			}

			let r = raw.pipe($zlib["create" + method2]({level : config["deflate"][ext]}))

			r.on("data", (data) => {
				response.write(data)
			})

			r.on("end", () => {
				response.end()
			})
		}
		else
		{
			let headers = getHeaders()

			for (let headerName in headers)
			{
				response.setHeader(headerName, headers[headerName])
			}

			raw.on("data", (data) => {
				response.write(data, undefined, () => {
					raw.resume()
				})
				raw.pause()
			})

			raw.on("end", () => {
				response.end()
			})
		}
	}
}

/**
 * @param {string} path
 *
 * @return {string}
 */
function normalizeURLPath(path)
{
	// replace \ with /
	path = path.replace(/\\/g, "/")

	// remove any ./ (negative lookbehind used here)
	path = path.replace(/(?<![.])(\.\/)/g, "/")

	// replace multiple / with single /
	path = path.replace(/[\/]+/g, "/")

	// process ../
	while (true)
	{
		let replaced = false

		path = path.replace(/[^.\/]+\/\.\.\//, function () {
			replaced = true
			return ""
		})

		if (replaced === false) break
	}

	return path
}

class App
{
	constructor(path)
	{
		this.config = {}

		path = $path.resolve(path)

		// read config files
		let pathConfig = `${path}/${$config["appsConfigPath"]}`

		this.appName      = $path.basename(path)
		this.config       = this.readConfigFile(pathConfig)
		this.routeRules   = getUrlRouteRules(pathConfig)
		this.rewriteRules = getUrlRewriteRules(pathConfig)

		this.config["appName"]              = this.appName
		this.config["pathRoot"]             = path
		this.config["pathComponents"]       = $path.resolve(`${path}/${$config["appsComponentsPath"]}`)
		this.config["routeRules"]           = this.routeRules
		this.config["outputFilesDirectory"] = __tmpdir + $path.sep + this.config["pathComponents"]
		.replace(new RegExp($path.sep.replace("\\", "\\\\"), "g"), "-")
		.replace(/:/g, "-")

		return this.createHost(path)
	}

	readConfigFile(path)
	{
		path = $path.resolve(path)

		// defaults
		let defaults =
				 {
					 "mimeTypes"    : MIME_TYPES,
					 "cacheControl" : {},
					 deflate        : {}
				 }

		let ret  = {}
		let file = path + "/config.json"

		try
		{
			if ($fs.lstatSync(file).isFile())
			{
				ret = $jsonfile.readFileSync(file, {stripComments : true})
			}
		} catch
		{
			// It's OK if the file is is missing
		}

		for (let i in defaults)
		{
			if (ret[i] === undefined)
			{
				ret[i] = defaults[i]
			}
		}

		return ret
	}

	/**
	 * @param {string} path
	 * @param {boolean} isStatic
	 *
	 * @return {Object}
	 */
	createHost(path, isStatic = false)
	{
		let host = {}


		// create databases instances
		global.databases = {}

		if (!isStatic)
		{
			loadDatabases(this.config["databases"], (err, result) => {

				global.databases = result

				// replace the dummy function with the official
				// slight delay is required if no databases
				setImmediate(() => {
						host.parseRequest = this.parseRequest.bind(this)
					}
				)
			})
		}

		host = {
			config          : this.config,
			parseRequest    : this.parseRequestDummy,
			parseStaticFile : this.parseStaticFile,
			ssl             : this.config["ssl"],
			proxy           : this.config["proxy"]
		}

		return host
	}

	parseStaticFile(appID, request, response)
	{
		let pathname = normalizeURLPath(request.pathname)
		if (pathname === "/script/index.js") pathname = "/index" + pathname
		//let match    = pathname.match(/\/([^\?\&\/]+)(?:\/([^\?\&\/]+))?(?:\/([^\?\&]+))?\/([^\?\&]+)\.(\w+)/)
		let match = pathname.match(/(?:\/(?<componentName>[^?&\/]+))?(?:\/(?<componentFolderName>[^?&\/]+))?(?:\/(?<filePathName>[^?&]+))?\/(?<fileName>[^?&]+)\.(?<extensionName>\w+)/)

		/*
			If the pathname is this: /component/path1/path2/path3/filename.ext

			[1] => component
			[2] => path1
			[3] => path2/path3/filename
			[4] => filename
			[5] => ext
		 */

		if (match === null)
		{
			// no match was found for the normal pattern, but there is another pattern for io.js files, so check it now
			match = pathname.match(/\/(?<componentName>[^?&\/]+)(?<componentFolderName>)(?<filePathName>)\/(?<fileName>io)\.(?<extensionName>js)/)

			if (match === null)
			{
				return false
			}
		}

		let componentName       = match.groups.componentName || "index"
		let componentFolderName = match.groups.componentFolderName || ""
		let filePathName        = match.groups.filePathName || ""
		let fileName            = match.groups.fileName || ""
		let extensionName       = match.groups.extensionName || ""

		if (!extensionName)
		{
			return false
		}

		let allowedFolders            = ["script", "public", "stylesheet"]
		let defaultAllowedFolderIndex = 0

		let isIOFile = (
			componentFolderName === ""
			&& filePathName === ""
			&& fileName.substr(-3) === ".io"
			&& (extensionName === "js" || extensionName === "mjs")
		)

		if (!isIOFile && allowedFolders.indexOf(componentFolderName) === -1)
		{
			filePathName        = componentFolderName + ((filePathName) ? "/" + filePathName : "")
			componentFolderName = allowedFolders[defaultAllowedFolderIndex]
		}

		let directFile = $path.resolve(
			$config["apps-path"] + "/"
			+ appID + ""
			+ $config["appsComponentsPath"] + "/"
			+ componentName + "/"
			+ ((componentFolderName) ? componentFolderName + "/" : "")
			+ ((filePathName) ? filePathName + "/" : "")
			+ fileName + "." + extensionName
		)

		let tmpFile = $path.resolve(
			this.config["outputFilesDirectory"] + "/"
			+ componentName + "-"
			+ ((componentFolderName) ? componentFolderName + "-" : "")
			+ ((filePathName) ? filePathName.replace(/[\\\/]/g, "-") + "-" : "")
			+ fileName + "." + extensionName
		)

		try
		{
			$fs.stat(tmpFile, (error, stat) => {
				if (error)
				{
					$fs.stat(directFile, (error, stat) => {
						if (error)
						{
							responseErrorPage(response)
						}
						else
						{
							deliverFile(request, response, stat, directFile, extensionName, this.config)
						}
					})
				}
				else
				{
					deliverFile(request, response, stat, tmpFile, extensionName, this.config)
				}
			})
		} catch (error)
		{
			console.error(e)
		}

		return true
	}

	/**
	 * Initial dummy function used to catch requests until the official function overwrites it
	 *
	 * @param {Object} request
	 * @param {Object} response
	 */
	parseRequestDummy(request, response)
	{
		// print simple page with message and make the page to auto reload
		response.setHeader("content-type", "text/html")
		response.write('<meta http-equiv="refresh" content="5;">')
		response.write("Please, wait...")
		response.end()
	}

	/**
	 * The official function that would be used after databases are loaded
	 *
	 * @param {Object} request
	 * @param {Object} response
	 */
	parseRequest(request, response)
	{
		let host      = request.headers.host
		let doRewrite = (Object.keys(this.rewriteRules).length > 0)

		if (doRewrite === true)
		{
			request = doUrlRewrite(request, this.rewriteRules)
		}

		// 1) request type: .../file.ext?variable=value
		if (this.parseStaticFile(this.appName, request, response) !== false)
		{
			return
		}

		// 2) request type: not a file, not ending with slash, so add slash and redirect
		if (0 && request.pathname[request.pathname.length - 1] !== "/")
		{
			response.statusCode = 301
			response.setHeader("Location", "//" + host + request.pathname + "/" + "?" + request.queryString)

			response.end()

			return
		}

		// 3) request type: module
		getRequestParameters(request, () => {
			new $components.parseRequest(request, response, this.config)
		})
	}
}

export default App