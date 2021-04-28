import mongodb from 'mongodb'
import {Interface} from './Interface.js'

const MongoClient = mongodb.MongoClient

/**
 * DB connection class
 * @param {object} setup - The setup object
 * @param callback
 * @returns {Connector}
 * @constructor
 */
	// http://mongodb.github.io/node-mongodb-native/2.0/reference/connecting/connection-settings/
class Connector
{
	/**
	 * @param setup
	 * @returns {Promise<Interface>}
	 */
	async connect(setup) {
		return new Promise((resolve, reject) => {
			const defaults = {
				host     : '127.0.0.1',
				port     : 27017,
				database : 'default',
				specific : {}
			}

			const fixedSetup = {...defaults, ...setup}
			const dbName     = fixedSetup.database
			const url        = `mongodb://${fixedSetup.host}:${fixedSetup.port}`
			const options    = {useNewUrlParser : true, useUnifiedTopology : true}
			const client     = new MongoClient(url, options)

			client.connect((error) => {
				if (error)
					reject(error)
				else
					resolve(new Interface(client, dbName, 'collection'))
			})
		})
	}
}

export {Connector}