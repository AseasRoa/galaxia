"use strict"

import $mongodb from "mongodb"
import Interface from "./Interface.mjs"

var MongoClient = $mongodb.MongoClient

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

		const url    = `mongodb://${setup["host"]}:${setup["port"]}`
		const dbName = setup["database"]
		const client = new MongoClient(url, {useNewUrlParser : true, useUnifiedTopology : true})

		client.connect((err, client) => {

			if (typeof callback === "function")
			{
				callback(err, new Interface(client, dbName, "collection"))
			}
			/**
			 db.collection('projects').findOne({user_id : 1}, {}, function (err, document) {
				log(document)
			})
			 */
		})
	}

	open(collection)
	{
		collection = collection || "default"

		return new Interface(this.server, this.db, collection)
	}
}

export default Connector