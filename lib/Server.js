import $http from 'http'
import $http2, {Http2ServerRequest, Http2ServerResponse} from 'http2'
import $http2proxy from './http2-proxy-new/index.js' // the new version doesn't work
import {ServerDDoSCounter} from './ServerDDoSCounter.js'
import {ServerNameIndication} from './ServerNameIndication.js'
import {ServerRequestsCounter} from './ServerRequestsCounter.js'
import './typedefs.js'

/** @type {Http2Server[]|Http2SecureServer[]} */
let SERVERS = []

/** @type {Socket[]} */
let h1ConnectionsCache = []

/** @type {Socket[] | ServerHttp2Session[]} */
let h2ConnectionsCache = []

/** @type {ServerConfig} */
let configDefault = {
	hostNames      : ['localhost'],
	httpPort       : 80,
	httpsPort      : 0,
	requestTimeout : 30,
	ssl            : {}
}

const requestsCounter = new ServerRequestsCounter(1000)
const ddosCounter     = new ServerDDoSCounter(5, 250, 10)

class Server
{
	/** @private {ServerConfig} */
	#config = {}

	/** @private {ServerNameIndication} */
	#sni

	/**
	 * @param {Object} config
	 */
	constructor(config = configDefault) {
		// todo: use spread
		for (let key in configDefault) {
			if (!(key in config)) {
				config[key] = configDefault[key]
			}
		}

		this.#config = config
		this.#sni    = new ServerNameIndication(this.#config)
	}

	/**
	 * @param {Socket} socket
	 * @private
	 */
	closeSocket(socket) {
		socket.destroy()
		socket.unref()
	}

	/**
	 * @returns {{count : number}}
	 */
	getRequestsCount() {
		return {
			count : requestsCounter.getCount()
		}
	}

	/**
	 * @returns {{http : number, https : number}}
	 */
	getSessionsCount() {
		return {
			http  : h1ConnectionsCache.length,
			https : h2ConnectionsCache.length
		}
	}

	/**
	 * @param {Http2ServerRequest} request
	 * @param {Http2ServerResponse} response
	 * @param {function(Http2ServerRequest, Http2ServerResponse):void} onRequest
	 * @private
	 */
	httpRequest(request, response, onRequest) {
		requestsCounter.addRequest()

		if (ddosCounter.tooManyRequests(request)) {
			response.statusCode = 429
			response.end('Too Many Requests')

			return
		}

		const host = request.authority

		/*
		 If the hostname starts with www and is not found in the configuration,
		 redirect to the naked domain
		  */
		if (
			(host.substr(0, 4) === 'www.')
			&& (this.#config.hostNames.indexOf(host) === -1)
		) {
			response.statusCode = 302

			response.setHeader('Cache-Control', 'max-age=0')
			response.setHeader('Connection', 'Keep-Alive')
			response.setHeader('Content-Type', 'text/html; charset=iso-8859-1')
			//response.setHeader('Keep-Alive', 'timeout=500, max=5')
			response.setHeader('Location', '//' + host.substr(4) + request.url)
			response.end()

			return
		}

		// Wrong host name
		if (this.#config.hostNames.indexOf(host) === -1) {
			response.statusCode = 404

			response.write(`${host} can't be found here`)
			response.end()

			return
		}

		// Request timeout
		if (this.#config.requestTimeout) {
			const timeoutMs = this.#config.requestTimeout * 1000

			response.setTimeout(timeoutMs, () => {

				if (response.finished === false) {
					/*
						There is a problem with status code 408,
						because browsers keep repeating the request. More info below.
						https://github.com/dvonlehman/express-request-proxy/issues/19
					 */
					response.statusCode = 504

					response.end()
				}
			})
		}

		// Proxy
		// todo
		if ('proxy' in this.#config) {
			let proxyConfig = this.#config.proxy
			let path        = (request.url || '')

			for (let key in proxyConfig) {
				if (path.indexOf(key) === 0) {
					$http2proxy.web(request, response, {
							hostname : 'localhost',
							port     : proxyConfig[key],
							protocol : 'http:',
							//proxyName : url,
							path     : path,
							timeout  : this.#config.requestTimeout * 1000,
							method   : request.method
						}, this.proxyDefaultWebHandler // defaultWebHandler is not mandatory
					)

					return
				}
			}
		}

		// todo: .protocol doesn't seem to exist anymore
		if (response.protocol === 'ws') {
			//response.write('world')
			return
		}

		onRequest(request, response)
	}

	/**
	 * @param {Http2Server} server
	 * @private
	 */
	httpServerExtraWork(server) {
		SERVERS.push(server)

		server.on('connection', (socket) => {
			h1ConnectionsCache.push(socket)
		})

		/**
		 * Find destroyed sessions and remove them from the cache array
		 */
		function cleanupSessionsCache() {
			h1ConnectionsCache = h1ConnectionsCache.filter((el) => {
				return el.destroyed !== true
			})
		}

		function closeSessions() {
			for (let key in h1ConnectionsCache) {
				h1ConnectionsCache[key].setKeepAlive(false)
				h1ConnectionsCache[key].unref()
			}
		}

		// clean the list of sessions, remove those for which 'destroyed' is true
		setInterval(cleanupSessionsCache, 1000)

		server.shutDownGracefully = (callback) => {
			// prevent the server from receiving new connections
			server.close(() => {
				cleanupSessionsCache()
				callback()
			})

			// gracefully close all opened sessions
			closeSessions()

			setInterval(closeSessions, 1000)
		}
	}

	/**
	 * @param {Http2Server|Http2SecureServer} server
	 * @private
	 */
	httpsServerExtraWork(server) {
		SERVERS.push(server)

		/**
		 * @param {ServerHttp2Session} session
		 */
		function onSession(session) {
			//log('session on ' + process.pid)
			h2ConnectionsCache.push(session)

			session.setTimeout(2 * 60 * 1000)

			session.on('timeout', () => {
				//console.log('session timeout')
			})
		}

		function onTimeout() {
			console.log('Server inactivity timeout')
		}

		server.on('session', onSession)
		server.on('timeout', onTimeout)

		/**
		 * Find destroyed sessions and remove them from the cache array
		 */
		function cleanupSessionsCache() {
			h2ConnectionsCache = h2ConnectionsCache.filter((el) => {
				return el.destroyed !== true
			})
		}

		function closeSessions() {
			for (let key in h2ConnectionsCache) {
				if (h2ConnectionsCache[key].close) h2ConnectionsCache[key].close()
			}
		}

		function destroySockets() {
			for (let key in h2ConnectionsCache) {
				if (h2ConnectionsCache[key].destroy) h2ConnectionsCache[key].destroy()
			}
		}

		// clean the list of sessions, remove those for which 'destroyed' is true
		setInterval(cleanupSessionsCache, 1000)

		server.shutDownGracefully = (callback) => {
			// prevent the server from receiving new connections
			server.close(() => {
				cleanupSessionsCache()
				callback()
			})

			// gracefully close all opened sessions
			closeSessions()

			setInterval(closeSessions, 1000)
			setTimeout(() => {
				destroySockets()
			}, this.#config.requestTimeout * 1000)
		}
	}

	/**
	 *
	 * @param err
	 * @param req
	 * @param res
	 * @private
	 */
	proxyDefaultWebHandler(err, req, res) {
		if (err) {
			console.error('proxy error', err)
			//finalhandler(req, res)(err)
			res.statusCode = 200
			res.end('Oops, some error happened')
		}
	}

	/**
	 *
	 * @param err
	 * @param req
	 * @param socket
	 * @param head
	 * @private
	 */
	proxyDefaultWsHandler(err, req, socket, head) {

		//h2ConnectionsCache.push(socket)
		//socket.setKeepAlive(false)

		if (err) {
			//console.error('ws proxy error', err)
			socket.destroy()
		}
	}

	/**
	 * @param {Http2ServerRequest} request
	 * @param {Http2ServerResponse} response
	 * @param {number} statusCode
	 * @private
	 */
	redirectResponse(request, response, statusCode = 301) {
		response.statusCode = statusCode
		response.setHeader('Location', `${request.scheme}://${request.authority}`)
		response.end()
	}

	/**
	 * @param {Function} callback
	 * @private
	 */
	shutDownGracefully(callback) {
		let serversToStop = SERVERS.length

		for (let i in SERVERS) {

			SERVERS[i].shutDownGracefully(() => {
				serversToStop--

				if (serversToStop === 0) {

					if (typeof callback === 'function')
						callback()

					process.exit(4)
				}
			})
		}
	}

	/**
	 *
	 * @param onReady
	 * @param onRequest
	 * @returns {Http2SecureServer}
	 * @public
	 */
	startSecureServer({onReady, onRequest}) {
		const options = {
			allowHTTP1  : true,
			SNICallback : (hostname, callback) => {
				this.#sni.createContext(hostname, callback)
			}
		}

		const server = $http2.createSecureServer(options)

		server.on('error', (err) => console.error(err))

		server.on('request', (request, response) => {
			this.httpRequest(request, response, onRequest)
		})

		server.on('upgrade', this.wsRequest.bind(this))

		server.listen(this.#config.httpsPort || 443, () => {
			onReady(server)
		})

		this.httpsServerExtraWork(server)

		return server
	}

	/**
	 * @param onReady
	 * @param onRequest
	 * @public
	 */
	startServer({onReady, onRequest}) {
		const server = $http.createServer()

		server.on('connection', (socket) => {

			socket.on('timeout', () => {
				this.closeSocket(socket)
			})

			socket.on('end', () => {
				this.closeSocket(socket)
			})

			socket.on('close', () => {
				this.closeSocket(socket)
			})
		})

		server.on('error', (err) => console.error(err))

		server.on('upgrade', this.wsRequest.bind(this))

		server.on('request', (request, response) => {
			// HTTP to HTTPS redirect
			if (this.#config.redirectHttpToHttps) {
				if (
					!(this.#config.redirectHttpToHttpsExcludePaths instanceof Array)
					|| this.#config.redirectHttpToHttpsExcludePaths.indexOf(request.url) === -1
				) {
					this.redirectResponse(request, response)

					return // stop everything request right here
				}
			}

			this.httpRequest(request, response, onRequest)
		})

		server.listen(this.#config.httpPort || 80, () => {
			onReady(server)
		})

		this.httpServerExtraWork(server)

		return server
	}

	/**
	 *
	 * @param {Request} request
	 * @param {Socket} socket
	 * @param {Buffer} head
	 * @private
	 */
	wsRequest(request, socket, head) {
		let isSecureConnection = Boolean('ssl' in socket)

		if (isSecureConnection)
			h2ConnectionsCache.push(socket)
		else
			h1ConnectionsCache.push(socket)

		const host = request.authority

		// proxy?
		if ('proxy' in this.#config) {
			if (!host) return

			const proxyConfig = this.#config.proxy
			//let url         = host + (req.originalUrl || req.url || '')
			const url         = (request.originalUrl || request.url || '')

			for (let key in proxyConfig) {
				if (url.indexOf(key) === 0) {
					$http2proxy.ws(request, socket, head, {
						hostname : 'localhost',
						port     : proxyConfig[key]
						//protocol : 'http',
						//proxyName : url,
						//path     : url
					}, this.proxyDefaultWsHandler)

					return
				}
			}
		}
	}
}

export {Server}