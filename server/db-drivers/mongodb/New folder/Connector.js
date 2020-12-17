"use strict"

var $core     = require("mongodb-core")
var Interface = require("./Interface")

/**
 * DB connecion class
 * @param {object} setup - The setup object
 * @param callback
 * @returns {Connector}
 * @constructor
 */
	// http://mongodb.github.io/node-mongodb-native/2.0/reference/connecting/connection-settings/
class Connector
{
	constructor(setup, callback)
	{
		// if the function was called without "new"
		if (this instanceof Connector === false)
		{
			return new Connector(setup, callback)
		}

		/** @type {string} */ this.name = "MongoDB"
		/** @type {Object} */ this.server = {} // the server connection
		/** @type {string} */ this.db = "" // the current database name

		var defaults = {
			host     : "127.0.0.1",
			port     : 27017,
			database : "default",
			specific : {}
		}

		if (!(setup instanceof Object))
		{
			console.error(new Error("The \"setup\" parameter should be object"))

			setup = {}
		}

		for (var i in defaults)
		{
			if (!(i in setup))
			{
				setup[i] = defaults[i]
			}
		}

		this.connect(setup, (err, server, db) => {
			this.server = server
			this.db     = db || ""

			if (typeof callback === "function") callback.apply(this, err)
		})
	}

	/**
	 * http://mongodb.github.io/node-mongodb-native/core/driver/reference/connecting/connection-settings/
	 * @param {Object} options
	 * @param callback
	 */
	connect(options, callback)
	{
		var dbname = options["database"]

		var server = new $core.Server({
			host              : options["host"],
			port              : options["port"],
			reconnect         : true,
			reconnectInterval : 1000
		})

		server.on("error", function (error) {
			callback(error)
		})

		server.on("connect", function (server) {
			// Execute the ismaster command
			server.command("system.$cmd", {ismaster : true}, function (err, result) {

				if (err)
				{
					server.destroy()
					throw err
				}

				if (typeof callback === "function")
				{
					callback(err, server, dbname)
				}
			})
		})

		server.on("close", function (error) {
			console.error(error)
		})

		var interval = setInterval(function () {
			var state = server.s.pool.state || server.s.state

			if (state === "connected" || state === "connected")
			{
				clearTimeout(interval)
				return
			}

			console.log("MongoDB: " + state)

			if (state === "destroyed")
			{
				clearTimeout(interval)

				callback(new Error("MongoDB failed to load"), server, dbname)
			}
		}, 1000)

		server.connect()
	}

	open(collection)
	{
		collection = collection || "default"

		return new Interface(this.server, this.db, collection)
	}
}

module.exports = Connector