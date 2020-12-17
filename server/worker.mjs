"use strict"

import $path from "path"
import $ipc from "./ipc.mjs"
import $cluster from "cluster"
import $util from "util"
import $config from "./config.mjs"
import $server from "./server.mjs"
import $app from "./app.mjs"
import $prototype from "../prototype.mjs"
import $synchronator from "synchronator"

import {Console} from "console"

const __filename = new URL(import.meta.url).href.replace("file:///", "")
const __dirname  = $path.dirname(__filename)

class Worker
{
	constructor()
	{
		this.app    = null
		this.server = null

		if (!process.env["GALAXIA_APP_PATH"])
		{
			return global
		}

		process["develop"] = (process.env["GALAXIA_DEVELOPMENT_MODE"] === "true")
		let appPath        = process.env["GALAXIA_APP_PATH"]
		let app            = this.createApp(appPath)
		let appConfig      = this.getAppConfiguration(app)

		let server = new $server(appConfig)

		this.app    = app
		this.server = server

		this.startHeartBeat(1000)
		this.setupGlobals()
		this.startServers()
		this.setupIPC()
	}

	createApp(path)
	{
		// delayed require, because the global variables must be set first
		//let $app = require("./app.js")

		return new $app(path)
	}

	getAppConfiguration(app)
	{
		return app.config["server"]
	}

	/**
	 * Send heartbeat data to the parent cluster on a regular interval
	 *
	 * @param {number} interval
	 */
	startHeartBeat(interval = 1000)
	{
		if ($cluster.isWorker && !global.v8debug)
		{
			setInterval(() => {
				process.send({
					cmd    : "heartbeat",
					worker : $cluster.worker.id
				})
			}, interval)
		}
	}

	setupGlobals()
	{
		//-- automatically download required modules from NPM
		// TODO: 1) to kill the worker after the module is really installed; 2) the new function does not share the same properties as the original
		if (0 && process["develop"] === true)
		{
			let r   = require
			require = function (n) {
				try
				{
					return r(n)
				} catch (e)
				{
					if (n[0] === ".")
					{
						throw e
					}
					else
					{
						r("child_process")
						.exec("npm install " + n + " -g", {cwd : __dirname /* working dir */}, function (err, body) {
							try
							{
								console.warn('Module "' + n + '"" not found, try to install. Restarting worker...\n' + body)
								$cluster.worker.kill()
								//return;
								return r(n)
							} catch (e)
							{
								console.error(e)
							}
						})
					}
				}
			}
		}

		let customConsole = new Console({stdout : process.stdout, stderr : process.stderr})

		//-- console colors
		let colors = [
			["warn", "\x1b[35m"],
			["error", "\x1b[31m"],
			["log", "\x1b[0m"]
		]

		colors.forEach((pair) => {

			let method = pair[0]
			let color  = pair[1]
			let reset  = "\x1b[0m"

			console[method] = function () // this must be "function ()"
			{
				let txt = "\x1b[37m[" + new Date().toTimeString().split(" ")[0] + "]\n" + color + reset + color

				for (let i in arguments)
				{
					if (typeof arguments[i] === "object")
					{
						if (0)
						{
							try
							{
								txt += JSON.stringify(arguments[i], null, "\t")
							} catch (e)
							{
								// In case of error like "Converting Circular structure to JSON"
								txt += $util.inspect(arguments[i], {showHidden : true, depth : null, colors : true})
							}
						}
						else
						{
							txt += reset
							txt += $util.inspect(arguments[i], {showHidden : true, depth : null, colors : true})
						}
					}
					else
					{
						txt += arguments[i]
					}
				}

				txt += reset
				txt += "\n"

				process.stdout.write(txt)
			}
		})

		//-- requires
		let prototype       = $prototype
		global.Synchronator = $synchronator // My beloved Synchronator!

		global.log    = customConsole.log//.bind(this, '\x1b[43m%s\x1b[0m')
		global.server = {
			config    : $config,
			databases : {},
			infodata  : {apps : {}}
		}
	}

	startServers()
	{
		let onReady = (server) => {
			let httpWord = ("secureProtocol" in server) ? "HTTPS" : "HTTP"

			console.info(`${httpWord} listen on ${server.address().address}:${server.address().port} (process id ${process.pid})`)
		}

		/**
		 * @param {Object} request
		 * @param {Object} response
		 */
		let onRequest = (request, response) => {
			this.app.parseRequest(request, response)
		}

		this.server.startServer({onReady, onRequest})
		this.server.startSecureServer({onReady, onRequest})
	}

	setupIPC()
	{
		let processSuicide = () => {
			this.server.shutDownGracefully(() => {
				process.exit(4)
			})
		}

		let ipcCallbacks = {}

		process.on("message", (msg) => {

			// 1: uid is used when we request answer using inline callback
			if (msg["uid"])
			{
				let callback = ipcCallbacks[msg["uid"]] || undefined
				delete ipcCallbacks[msg["uid"]]

				if (callback)
				{
					callback(msg["response"])
				}
			}

			// 2: messages that were not requested
			else if (msg["cmd"] === "killYourself")
			{
				processSuicide()
			}
		})

		/**
		 * @return {Promise}
		 */
		global.server.checkRestarting = () => {
			return new Promise((resolve) => {
				$ipc.send("check-restarting", resolve)
			})
		}

		/**
		 * Global function to gracefully restart the server
		 *
		 * @return {Promise}
		 */
		global.server.restart = function () {
			return new Promise((resolve) => {
				$ipc.send("check-restarting", (response) => {
					if (response === true)
					{
						let errmsg = "Be patient, the server is currently restarting..."

						console.warn(errmsg)

						resolve(new Error(errmsg))
					}
					else
					{
						$ipc.send("restart", () => {
							resolve(true)
						})
					}
				})
			})
		}

		global.server.shutDown = function () {
			console.warn("Shutting Down")

			processSuicide(() => {
				$ipc.send("killYourself")
				console.warn("Server Down")
			})
		}

		/**
		 * @return {Object}
		 */
		global.server.getSessionsCount = () => {
			return this.server.getSessionsCount()
		}

		global.server.getRequestsCount = () => {
			return this.server.getRequestsCount()
		}

		if (0)
		{
			setInterval(() => {
				console.log(global.server.getSessionsCount())
			}, 1000)
		}

		/**
		 * Test for server restart
		 */
		if (0)
		{
			setTimeout(() => {
				global.server.restart()
			}, 10000)
		}

		process.on("uncaughtException", (error) => {
			console.info(error)
			global.server.restart()
		})

	}
}

export default new Worker()