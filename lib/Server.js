import $http2proxy from './http2-proxy-new/index.js' // the new version doesn't work
import $http from 'http'
import $http2 from 'http2'
import $fs from 'fs'
import $tls from 'tls'
import $ddosProtection from './ddosProtection.js'
import $requestsCounter from './requestsCounter.js'

let SERVERS            = []
let h1ConnectionsCache = []
let h2ConnectionsCache = []

let ddosProtection = new $ddosProtection(5, 200, 10)
let configDefault  = {
	'hostNames'      : ['localhost'],
	'httpPort'       : 80,
	'requestTimeout' : 30
}

let requestsCounter = new $requestsCounter()

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

class Server
{
	#config = {}
	#certs  = {}

	/**
	 *
	 * @param {Object} config
	 */
	constructor(config)
	{
		if (!(config instanceof Object))
		{
			config = configDefault
		}

		for (let key in configDefault)
		{
			if (!(key in config))
			{
				config[key] = configDefault[key]
			}
		}

		if (typeof config['hostNames'] === 'string')
		{
			config['hostNames'] = [config['hostNames']]
		}

		this.#config = config
	}

	SNICallback(hostname, cb)
	{
		// if the hostname starts with www., but it's not found in the configuration,
		// remove the www. part and it will be tried like that
		if (
			(this.#config['hostNames'].indexOf(hostname) === -1)
			&& (hostname.substr(0, 4) === 'www.')
		)
		{
			hostname = hostname.substr(4)
		}

		if (this.#config['hostNames'].indexOf(hostname) === -1)
		{
			console.error('Unknown host ' + hostname)
		}
		else if (!(hostname in this.#certs))
		{
			if (
				!(this.#config['ssl'] instanceof Object)
				|| !(hostname in this.#config['ssl'])
			)
			{
				console.error(`SSL is not configured for host ${hostname}`)
			}
			else
			{

				let ssl = this.#config['ssl'][hostname]

				try
				{
					this.#certs[hostname] = {}
					let keys              = ['ciphers', 'ca', 'key', 'cert']

					if (!('ciphers' in ssl) && defaultCiphers)
					{
						ssl['ciphers'] = defaultCiphers
					}

					for (let i in keys)
					{
						let key = keys[i]

						if (key === 'ciphers')
						{
							if (key in ssl)
							{
								if (ssl[key] instanceof Array)
								{
									this.#certs[hostname][key] = ssl[key].join(':')
								}
								else
								{
									this.#certs[hostname][key] = ssl[key]
								}
							}
						}
						else if (key in ssl)
						{
							this.#certs[hostname][key] = $fs.readFileSync(ssl[key])
						}
					}
				} catch (error)
				{
					console.error(`Failed to read SSL files for host ${hostname}`)
					console.error(error)
				}
			}
		}

		const ctx = $tls.createSecureContext(this.#certs[hostname])

		// Compatibility with old versions of node
		if (cb)
		{
			cb(null, ctx)
		}
		else
		{
			return ctx
		}
	}

	httpRequest({request, response, onRequest})
	{
		requestsCounter.addRequest()

		if (ddosProtection.tooManyRequests(request))
		{
			response.statusCode = 429
			response.end('Too Many Requests')

			return
		}

		let host   = request.authority || request.headers.host || ''
		let config = this.#config

		if (!(this.#config['hostNames'] instanceof Array))
		{
			response.statusCode = 404

			response.write(`Missing "hostNames" configuration`)
			response.end()

			return
		}

		/*
		 If the hostname starts with www and is not found in the configuration,
		 redirect to the naked domain
		  */
		if (
			(host.substr(0, 4) === 'www.')
			&& (this.#config['hostNames'].indexOf(host) === -1)
		)
		{
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
		if (this.#config['hostNames'] instanceof Array && this.#config['hostNames'].indexOf(host) === -1)
		{
			response.statusCode = 404

			response.write(`${host} can't be found here`)
			response.end()

			return
		}

		// Request timeout
		if (config['requestTimeout'])
		{
			let timeoutMs = config['requestTimeout'] * 1000

			response.setTimeout(timeoutMs, () => {

				if (response.finished === false)
				{
					/*
						There is a problem with status code 408,
						because browsers keep repeating the request. More info below.
						https://github.com/dvonlehman/express-request-proxy/issues/19
					 */
					response.statusCode = 504

					response.end()
				}

				//console.log('request timeout')
			})
		}

		// Proxy
		if ('proxy' in this.#config)
		{
			let proxyConfig = this.#config['proxy']
			let url         = (request.originalUrl || request.url || '')

			for (let key in proxyConfig)
			{
				if (url.indexOf(key) === 0)
				{
					$http2proxy.web(request, response, {
							hostname : 'localhost',
							port     : proxyConfig[key],
							protocol : 'http:',
							//proxyName : url,
							path     : url,
							timeout  : config['requestTimeout'] * 1000,
							method   : request.method
						}, this.proxyDefaultWebHandler // defaultWebHandler is not mandatory
					)

					return
				}
			}
			/*
			$http2proxy.web(
				request,
				response,
				{
					hostname : 'localhost',
					port     : config['httpsPort'],
					protocol : 'https',
					//proxyName : url,
					//path     : key,
					timeout  : config['requestTimeout'] * 1000,
					//method   : request.method,
					onReq    : (req, {headers}) => {
						headers['x-forwarded-for']   = request.socket.remoteAddress
						headers['x-forwarded-proto'] = request.socket.encrypted ? 'https' : 'http'
						headers['x-forwarded-host']  = host
					}
				},
				this.proxyDefaultWebHandler // defaultWebHandler is not mandatory
			)
			*/
		}

		if (response.protocol === 'ws')
		{
			//response.write('world')
			return
		}

		onRequest(request, response)
	}

	httpServerExtraWork(server)
	{
		SERVERS.push(server)

		server.on('connection', (socket) => {
			h1ConnectionsCache.push(socket)
		})

		/**
		 * Find destroyed sessions and remove them from the cache array
		 */
		function cleanupSessionsCache()
		{
			h1ConnectionsCache = h1ConnectionsCache.filter(function (el) {
				return el.destroyed !== true
			})
		}

		function closeSessions()
		{
			for (let key in h1ConnectionsCache)
			{
				//h1ConnectionsCache[key].setTimeout(10)
				h1ConnectionsCache[key].setKeepAlive(false)
				h1ConnectionsCache[key].unref()
				//h1ConnectionsCache[key].destroy()
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

	httpsServerExtraWork(server)
	{
		SERVERS.push(server)

		server.on('session', (session) => {
			//log('session on ' + process.pid)
			h2ConnectionsCache.push(session)

			session.setTimeout(2 * 60 * 1000)

			session.on('timeout', () => {
				//console.log('session timeout')
			})
		})

		server.on('timeout', () => {
			console.log('Server inactivity timeout')
		})

		/**
		 * Find destroyed sessions and remove them from the cache array
		 */
		function cleanupSessionsCache()
		{
			h2ConnectionsCache = h2ConnectionsCache.filter((el) => {
				return el.destroyed !== true
			})
		}

		function closeSessions()
		{
			for (let key in h2ConnectionsCache)
			{
				if (h2ConnectionsCache[key].close) h2ConnectionsCache[key].close()
			}
		}

		function destroySockets()
		{
			for (let key in h2ConnectionsCache)
			{
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
			}, this.#config['requestTimeout'] * 1000)
		}
	}

	proxyDefaultWebHandler(err, req, res)
	{
		if (err)
		{
			console.error('proxy error', err)
			//finalhandler(req, res)(err)
			res.statusCode = 200
			res.end('Oops, some error happened')
		}
	}

	proxyDefaultWsHandler(err, req, socket, head)
	{

		//h2ConnectionsCache.push(socket)
		//socket.setKeepAlive(false)

		if (err)
		{
			//console.error('ws proxy error', err)
			socket.destroy()
		}
	}

	redirectResponse(request, response, statusCode = 301)
	{
		response.statusCode = statusCode
		response.setHeader('Location', 'https://' + request.headers.host + request.url)
		response.end()
	}

	wsRequest(req, socket, head)
	{
		let isSecureConnection = 'ssl' in socket

		if (isSecureConnection)
		{
			h2ConnectionsCache.push(socket)
		}
		else
		{
			h1ConnectionsCache.push(socket)
		}

		let host = req.authority || req.headers.host || ''

		// proxy?
		if ('proxy' in this.#config)
		{

			if (!host) return

			let proxyConfig = this.#config.proxy
			//let url         = host + (req.originalUrl || req.url || '')
			let url         = (req.originalUrl || req.url || '')

			for (let key in proxyConfig)
			{
				if (url.indexOf(key) === 0)
				{
					$http2proxy.ws(req, socket, head, {
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

	startSecureServer({onReady, onRequest})
	{
		if (!('httpsPort' in this.#config))
		{
			return
		}

		const options = {
			allowHTTP1  : true,
			SNICallback : (hostname, cb) => {
				return this.SNICallback(hostname, cb)
			}
		}
		const server  = $http2.createSecureServer(options)

		server.on('error', (err) => console.error(err))
		server.on('request', (request, response) => {
			this.httpRequest({request, response, onRequest})
		})
		server.on('upgrade', this.wsRequest.bind(this))

		server.listen(this.#config['httpsPort'] || 443, () => {
			onReady(server)
		})

		this.httpsServerExtraWork(server)

		return server
	}

	startServer({onReady, onRequest})
	{
		if (!('httpPort' in this.#config))
		{
			return
		}

		const server = $http.createServer()

		function closeSocket(socket)
		{
			socket.destroy()
			socket.unref()
		}

		server.on('connection', (socket) => {

			socket.on('timeout', () => {
				closeSocket(socket)
			})

			socket.on('end', () => {
				closeSocket(socket)
			})

			socket.on('close', () => {
				closeSocket(socket)
			})
		})

		server.on('error', (err) => console.error(err))

		server.on('upgrade', this.wsRequest.bind(this))

		server.on('request', (request, response) => {
			// HTTP to HTTPS redirect
			if (this.#config['redirectHttpToHttps'])
			{
				if (
					!(this.#config['redirectHttpToHttpsExcludePaths'] instanceof Array)
					|| this.#config['redirectHttpToHttpsExcludePaths'].indexOf(request.url) === -1
				)
				{
					this.redirectResponse(request, response)

					return // stop everything request right here
				}
			}

			this.httpRequest({request, response, onRequest})
		})

		server.listen(this.#config['httpPort'] || 80, () => {
			onReady(server)
		})

		this.httpServerExtraWork(server)

		return server
	}

	shutDownGracefully(callback)
	{
		let serversToStop = SERVERS.length

		for (let i in SERVERS)
		{
			SERVERS[i].shutDownGracefully(() => {
				serversToStop--
				if (serversToStop === 0)
				{
					if (typeof callback === 'function') callback()
					process.exit(4)
				}
			})
		}
	}

	getSessionsCount()
	{
		return {
			http  : h1ConnectionsCache.length,
			https : h2ConnectionsCache.length
		}
	}

	getRequestsCount()
	{
		return {
			count : requestsCounter.getCount()
		}
	}
}

export default Server