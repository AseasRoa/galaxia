import $os from 'os'
import $path from 'path'
import {URL} from 'url'
import $components from './Component.js'
import $config from './config.js'
import {selectDatabaseDriver} from './db-drivers/index.js'
import {StaticFiles} from './StaticFiles.js'
import './typedefs.js'

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = $path.dirname(__filename)

global.databases = {}

/**
 *
 * @param {string} databaseID
 * @returns {Interface}
 */
function selectDatabase(databaseID = '') {
	return global.databases[databaseID]
}

global.selectDatabase = selectDatabase

/**
 * @param {URL} url
 * @returns {{}}
 */
function getQueryGETParameters(url) {
	let output = {}

	url.searchParams.forEach((value, name) => {
		output[name] = value
	})

	return output
}

/**
 * @param {URL} url
 * @param {Request} request
 * @param {function} callback
 */
function getRequestParameters(url, request, callback) {
	/** @type {QueryParams} */
	let output = {
		query    : {},
		queryGet : getQueryGETParameters(url)
	}

	if (request.method === 'GET') {
		callback(output)
	}
	else {
		let body          = ''
		let ended         = false
		let contentLength = -1

		// For Chrome and SSL POST requests, the first request is done perfectly,
		// but after 12 second the following request doesn't fire the "end" event.
		// That's why I'm going to get the content length from the request and end it.
		if (typeof request.headers['content-length'] === 'string') {
			contentLength = parseInt(request.headers['content-length'])
		}

		/**
		 * @param {string} body
		 * @param {Function} callback
		 */
		function end(body, callback) {
			try {
				output.query = JSON.parse(body)

			} catch {
			}

			callback(output)
		}

		function onData(chunk) {
			body += chunk

			if (
				(contentLength === 0)
				|| (contentLength > 0 && body.length >= contentLength)
			) {
				if (ended === false) {
					ended = true
					request.off('end', onEnd)
					request.setTimeout(0)

					end(body, callback)
				}

				return
			}

			// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
			if (body.length > 1e6) {
				// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
				request.connection.destroy()
			}
		}

		function onEnd() {
			if (ended === false) {
				ended = true

				end(body, callback)
			}
		}

		request.on('data', onData)
		request.on('end', onEnd)

	}
}

/**
 * @param {Object} rules
 */
async function loadDatabases(rules) {
	let databases = {}

	for (let dbIndex in rules) {
		let driverName = rules[dbIndex].driver

		if (!driverName) {
			throw new Error(`No database driver defined for "${dbIndex}" in configuration!`)
		}

		try {
			const dbDriver = selectDatabaseDriver(driverName)

			databases[dbIndex] = await dbDriver.connect(rules[dbIndex])
		} catch (e) {
			throw new Error(`Database driver "${driverName}" for "${dbIndex}" was not found!`)
		}
	}

	return databases
}

/**
 * Remove unnecessary slashes and dots from the url path
 * @param {string} path
 * @returns {string}
 */
function normalizeURLPath(path) {
	// replace \ with /
	path = path.replace(/\\/g, '/')

	// remove any ./ (negative lookbehind used here)
	path = path.replace(/(?<![.])(\.\/)/g, '/')

	// replace multiple / with single /
	path = path.replace(/[\/]+/g, '/')

	// process ../
	while (true) {
		let replaced = false

		path = path.replace(/[^.\/]+\/\.\.\//, function() {
			replaced = true
			return ''
		})

		if (replaced === false) break
	}

	return path
}

class App
{
	/** @type {AppConfig} */
	appConfig = {
		test         : 1,
		mimeTypes    : {},
		cacheControl : {},
		deflate      : {},
		databases    : {},
		ajax         : {},
		proxy        : {},
		urlRewrite   : []
	}
	appName   = ''
	appPath   = ''
	/** @type {AppPaths} */
	appPaths
	develop   = true
	staticFiles

	/**
	 * @param {string} path
	 * @param {boolean} develop
	 * @returns {{}}
	 */
	constructor(path, develop) {
		path = $path.resolve(path)

		this.develop = develop || true
		this.appPath = path
		this.appName = $path.basename(this.appPath)
	}

	/**
	 * @param {string} PathComponents
	 * @return {string}
	 * @private
	 */
	getOutputFilesDirectory(pathComponents) {
		return $path.join(
			$os.tmpdir(),
			'nodejs-galaxia',
			'public-' + ((this.develop === true) ? 'dev' : 'prod'),
			pathComponents.replace(/[:\/\\]/g, '-')
		)
	}

	/**
	 * @return {Object<string, *>}
	 */
	getServerConfig() {
		return this.appConfig.server
	}

	/**
	 * Add field request.pathname
	 * @param {Request} request
	 * @return {URL}
	 */
	getURL(request) {
		let requestPath = request.url // Something like: /pathname?key=value

		for (let rule of this.appConfig.urlRewrite) {
			if (!(rule instanceof Array)) continue

			requestPath = requestPath.replace(rule[0], rule[1])
		}

		return new URL(requestPath, `${request.scheme}://${request.authority}`)
	}

	/**
	 * @param {string} fileAbsolutePath
	 * @returns {AppConfig}
	 * @private
	 */
	async importAppConfig(fileAbsolutePath) {
		fileAbsolutePath = $path.resolve(fileAbsolutePath)

		const file = $path.join('file://', fileAbsolutePath, 'config.js')

		try {
			let module = await import(file)
			let output = module.default

			this.appConfig = {...this.appConfig, ...output}
		} catch (e) {
			//console.error(e)
		}

		return this.appConfig
	}

	/**
	 * The official function that would be used after databases are loaded
	 *
	 * @param {Request} request
	 * @param {Response} response
	 */
	async parseRequest(request, response) {
		const url = this.getURL(request)

		let pathComponents = this.pathComponents(url)

		// 1) request type: .../file.ext?variable=value
		if (pathComponents.file) {
			await this.staticFiles.parseStaticFile(url, pathComponents, request, response)
			return
		}

		// 2) request type: not a file, not ending with slash, so add slash and redirect
		/* commented on 08 April 2021
		if (0 && request.pathname[request.pathname.length - 1] !== '/')
		{
			response.statusCode = 301
			response.setHeader('Location', '//' + host + request.pathname + '/' + '?' + request.queryString)

			response.end()

			return
		}

		 */

		// 3) request type: module
		getRequestParameters(url, request, (queryParams) => {
			new $components.parseRequest(request, response, url, queryParams, this.appConfig, this.appPaths)
		})
	}

	/**
	 * @param {URL} url
	 * @returns {PathComponents}
	 * @private
	 */
	pathComponents(url) {
		/** @type {PathComponents} */
		let pathnameComponents = {
			component       : '',
			componentFolder : '',
			filePath        : '',
			file            : '',
			ext             : '',
			queryString     : ''
		}

		const pathname = normalizeURLPath(url.pathname)

		/*
			If the pathname is this: /component/path1/path2/path3/filename.ext

			[1] => component
			[2] => path1
			[3] => path2/path3/filename
			[4] => filename
			[5] => ext
		 */
		const match = pathname.match(/^(?:\/(?<component>[^\s?&.\/]+))?(?:\/(?<componentFolder>[^\s?&.\/]+))?(?:(?<filePath>[^\s?&.]+))?(?:\/(?<file>[^\s?&\/]+)\.(?<ext>\w+))?(?<queryString>\?.*)?$/)

		for (let key in match.groups)
			if (key in pathnameComponents)
				pathnameComponents[key] = match.groups[key] || ''

		return pathnameComponents
	}

	/**
	 * @return {Promise<void>}
	 */
	async start() {
		let pathConfig     = `${this.appPath}/${$config.appsConfigPath}`
		let pathComponents = $path.resolve(`${this.appPath}/${$config.appsComponentsPath}`)

		await this.importAppConfig(pathConfig)

		this.appPaths = {
			root       : this.appPath,
			components : pathComponents,
			outputDest : this.getOutputFilesDirectory(pathComponents)
		}

		this.staticFiles = new StaticFiles(this.appConfig, this.appPaths)

		global.databases = await loadDatabases(this.appConfig.databases || {})

	}
}

export {App}