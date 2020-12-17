"use strict"

class Interface
{
	constructor(server, db, collection)
	{
		this.server     = server
		this.db         = db
		this.collection = collection
		this.lastError  = null
		this._query     = {}
		this._options   = {}

		var fn = (collection) => {
			return new Interface(this.server, this.db, collection || "default")
		}

		fn.__proto__ = this

		return fn
	}

	_resetFlags()
	{
		/*
		 The same "this" is used for all requests and that's why
		 these flags must be reset after each CRUD (Create/Read/Update/Delete) action.
		 They need to be free for the next request
		 */

		this.lastError = null
		this._query    = {}
		this._options  = {}
	}

	/**
	 * Set the desired fields to be returned
	 * @param {Array|Object|string} fields
	 * @returns {Interface}
	 */
	fields(fields)
	{
		if (typeof fields === 'string')
		{
			if (fields !== '')
			{
				fields = fields.split(" ")
			}
			else
			{
				fields = {}
			}
		}

		if (fields instanceof Array)
		{
			this._options['fields'] = {}

			if (fields.length === 0)
			{
				this._options['fields'] = undefined
			}
			else
			{
				for (var i in fields)
				{
					this._options['fields'][fields[i]] = 1
				}
			}
		}
		else if (fields instanceof Object)
		{
			this._options['fields'] = fields
		}

		return this
	}

	find(query, fields)
	{
		return this.read(query, fields)
	}

	getCollection(collection)
	{
		return this.open(collection)
	}

	getLastError()
	{
		return this.lastError
	}

	/**
	 * Insert data
	 * @param {Object} data
	 * @returns {Promise}
	 */
	insert(data)
	{
		// http://mongodb.github.io/node-mongodb-native/core/api/Server.html#insert
		return new Promise((resolve, reject) => {
			if (typeof data !== 'object')
			{
				reject(new Error("MongoDB: The first argument of \"insert()\" must be an object"))
				return false
			}
			if (data.length === 1 && !data[0])
			{
				data = [data]
			}

			escapeKeys(data)

			var namespace = this.db + '.' + this.collection // db.collection

			this.server.insert(
				namespace,
				data,
				{
					writeConcern : {w : 1},
					ordered      : true, // With ordered inserts, if an error occurs during an insert of one of the documents, MongoDB returns on error without processing the remaining documents in the array.
					checkKeys    : false // this seems to not work
				},
				(err, result) => {
					this.lastError = err

					if (err || result["result"]["ok"] !== 1)
					{
						resolve(err)
						return
					}

					if (err === null && result["result"]["ok"] === 1)
					{
						resolve(result["result"]["n"])
					}
					else
					{
						// just in case
						resolve(err)
					}
				}
			)

			// reset all flags specific to this query
			this._resetFlags()
		})
	}

	/**
	 * Set the limit option
	 * @param {number} val
	 * @returns {Interface}
	 */
	limit(val)
	{
		this._options['limit'] = val || 0

		return this
	}

	open(collection)
	{
		collection = collection || "default"

		return new Interface(this.server, this.db, collection)
	}

	options(options)
	{
		options = options || {}

		for (var i in options)
		{
			if (typeof this[i] === "function")
			{
				this[i](options[i])
			}
			else
			{
				this._options[i] = options[i]
			}
		}

		return this
	}

	query(query)
	{
		if (typeof query !== "object")
		{
			query = {}
		}

		this._query = query

		return this
	}

	/**
	 * Read data from the database
	 * @param {Object|string} query
	 * @param {Array|Object|string} fields
	 * @returns {Promise}
	 */
	read(query, fields = {})
	{
		return new Promise((resolve) => {
			query = query || this._query

			if (typeof query === "string")
			{
				query = {"_id" : query}
			}

			var namespace = this.db + "." + this.collection

			this._options.skip  = this._options["skip"] || 0
			this._options.find  = namespace
			this._options.query = query
			this._options.limit = (typeof this._options.limit === "number") ? this._options.limit : 1

			var batchSize = this._options.limit === 1 ? 1 : 1000

			if (fields)
			{
				this.fields(fields)
			}

			// http://mongodb.github.io/node-mongodb-native/core/api/Server.html#cursor
			var cursor = this.server.cursor(
				namespace,
				this._options,
				{
					batchSize  : batchSize,
					transforms : {doc : unescapeKeys}
				}
			)

			if (this._options.limit === 1)
			{
				cursor.next(function (err, document) {
					if (err) document = undefined

					resolve(document)
				})
			}
			else
			{
				cursorToArray(cursor, undefined, (err, data) => {
					this.lastError = err

					if (err)
					{
						resolve(err)

						return
					}

					resolve(data)
				})
			}

			this._options = {}
		})
	}

	/**
	 * Read one document only
	 * @param {Object|string} query
	 * @param {Array|Object|string} fields
	 * @returns {Promise}
	 */
	readOne(query, fields = {})
	{
		this._options["limit"] = 1

		return this.read(query, fields)
	}

	/**
	 * Remove data from the database
	 * @param {Object} query - Input query
	 * @param {Object} fields - Which fields to remove
	 * @returns {Promise}
	 */
	remove(query, fields)
	{
		// http://mongodb.github.io/node-mongodb-native/core/api/Server.html#remove
		return new Promise((resolve, reject) => {
			if (typeof query !== "object")
			{
				reject(new Error("MongoDB: The first argument of \"remove()\" must be an object"))
				return false
			}

			var namespace       = this.db + "." + this.collection // db.collection
			this._options.limit = (typeof this._options.limit === "number") ? this._options.limit : 1

			var action = "remove"

			var u = null

			if (fields)
			{
				action = "update"

				fields = anyDataToFieldsData(fields)

				u = {"$unset" : fields}
			}

			if (this._options["fields"])
			{
				action = "update"

				fields = fields || {}

				for (var i in this._options["fields"])
				{
					fields[i] = this._options["fields"][i]
				}

				u = {"$unset" : fields}
			}

			this.server[action](
				namespace,
				[{
					q     : query,
					u     : u,
					limit : this._options.limit
				}],
				this._options,
				(err, result) => {
					this.lastError = err

					if (err || result["result"]["ok"] !== 1)
					{
						resolve(err)
						return
					}

					if (err === null && result["result"]["ok"] === 1)
					{
						resolve(result["result"]["n"])
					}
					else
					{
						// just in case
						resolve(err)
					}
				}
			)

			// reset all flags specific to this query
			this._resetFlags()
		})
	}

	/**
	 * Select database and collection
	 * @param {string} dbname
	 * @param {string} collection
	 * @returns {Interface}
	 */
	selectDatabase(dbname, collection)
	{
		this.db    = dbname
		collection = collection || this.collection

		return new Interface(this.server, this.db, collection)
	}

	/**
	 * Set the option to skip
	 * @param val
	 * @returns {Interface}
	 */
	skip(val)
	{
		this._options["skip"] = val || 0

		return this
	}

	/**
	 * Set the option to sort
	 * @param val
	 * @returns {Interface}
	 */
	sort(val)
	{
		this._options["sort"] = val || null

		return this
	}

	update()
	{
		var upsert = this._upsert || false

		// http://mongodb.github.io/node-mongodb-native/core/api/Server.html#update
		return new Promise((resolve, reject) => {
			var query = this._query
			var data  = null

			if (typeof arguments[0] === "object")
			{
				if (typeof arguments[1] === "object")
				{
					// (query, data...)
					query = arguments[0] || this._query
					data  = arguments[1]

					if (typeof arguments[2] === "object")
					{
						// (query, data, options...)
						this._options = arguments[2]
					}
				}
				else
				{
					// (query...)
					data = arguments[0]
				}
			}

			if (!data)
			{
				reject(new Error("MongoDB: Input attributes for \"update()\" are not correct"))
				return false
			}

			if (typeof data !== "object" || data === null)
			{
				reject(new Error("MongoDB: The first argument of \"update()\" must be an object"))
				return false
			}

			if (!this._query)
			{
				reject(new Error("MongoDB: No query"))
				return false
			}

			//escapeKeys(data)

			var namespace = this.db + "." + this.collection // db.collection

			this._options.writeConcern   = this._options.writeConcern || {}
			this._options.writeConcern.w = this._options.writeConcern.w || 1 // 1 = write to disk, 0 = write to RAM first
			this._options.writeConcern.j = this._options.writeConcern.j || false // wait to write to journal

			this._options.multi           = this._options.multi || this._options.multiple || false
			this._options.ordered         = true // execute the inserts in order or out of order
			this._options.ignoreUndefined = false

			/*
			if (data["data"] && data["data"]["blocks"] && Object.keys(data["data"]["blocks"]).length == 0)
			{
				log(data["data"])
			}
			*/

			this.server.update(
				namespace,
				[{
					q     : query,
					u     : {"$set" : data},
					multi : this._options.multi
				}],
				this._options,
				(err, result) => {
					this.lastError = err

					if (err || result["result"]["ok"] !== 1)
					{
						resolve(err)
						return
					}

					if (upsert && result["result"]["n"] === 0)
					{
						this.insert(data).then(
							(result) => {
								resolve(result)
							},
							(err) => {
								reject(err)
							}
						)

						return
					}

					resolve(result["result"]["nModified"])
				}
			)

			// reset all flags specific to this query
			this._resetFlags()
		})
	}

	upsert(query, data)
	{
		this._upsert = true

		var retval = this.update(query, data)

		this._upsert = false

		return retval
	}
}

// This is iterator for the cursor
function cursorForEach(cursor, callback)
{
	cursor.next(function (err, doc) {

		if (doc === null || err) return

		var ret = callback(doc)

		if (ret !== undefined)
		{
			return
		}

		if (typeof ret === "object")
		{
			// TO DO: update document
		}

		cursorForEach(cursor, callback)
	})
}

var count = 0

// this function converts cursor into an array
function cursorToArray(cursor, data, callback)
{
	data = data || []

	cursor.next(function (err, doc) {

		if (doc === null || err) return callback(err, data)

		data.push(doc)

		cursorToArray(cursor, data, callback)
	})
}

function escapeKeys(obj)
{
	if (obj === null | typeof obj !== "object") return false

	var keys   = Object.keys(obj)
	var length = keys.length

	for (let i = 0; i < length; i++)
	{
		var key1 = keys[i]
		var key2 = key1.replace(/\$/g, "\\u0024").replace(/\./g, "\\u002e")

		if (key1.length !== key2.length)
		{
			obj[key2] = obj[key1]
			delete obj[key1]
		}

		escapeKeys(obj[key2])
	}

	return true
}

function unescapeKeys(obj)
{
	if (obj === null || typeof obj !== "object")
	{
		return obj
	}

	var keys   = Object.keys(obj)
	var length = keys.length

	for (let i = 0; i < length; i++)
	{
		var key1 = keys[i]
		var key2 = key1.replace(/\\u0024/g, "$").replace(/\\u002e/g, ".")

		if (key1.length !== key2.length)
		{
			obj[key2] = obj[key1]
			delete obj[key1]
		}

		unescapeKeys(obj[key2])
	}

	return obj
}

function anyDataToFieldsData(data)
{
	if (typeof data === "string")
	{
		if (data !== "")
		{
			data = data.split(" ")
		}
		else
		{
			data = {}
		}
	}

	if (data instanceof Array)
	{
		var tmp = {}
		for (var i in data) tmp[data[i]] = 1
		data = tmp
	}

	return data
}

/*
var obj = {"test": 123, "test.test": [{"dd.dd":123}]}
console.time("1")
for (var i=0; i<100000; i++)
{
	escapeKeys(obj)
	//unescapeKeys(obj)
}

console.timeEnd("1")
log(obj)
*/

module.exports = Interface