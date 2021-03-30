class Interface
{
	#lastError = null

	constructor(client, dbName, collectionName)
	{
		this.client            = client
		this.dbName            = dbName
		this.db                = client.db(dbName)
		this.collectionName    = collectionName
		this.currentCollection = this.db.collection(collectionName)
		this._limit            = 0
		this._sort             = {}
	}

	get lastError()
	{
		return this.#lastError
	}

	set lastError(error)
	{
		this.#lastError = error
	}

	/**
	 * http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#countDocuments
	 *
	 * @param {Object} query
	 * @param {Object=} options
	 *
	 * @return {Promise}
	 */
	documentsCount(query, options)
	{
		return this.currentCollection.countDocuments(query, options)
	}

	getIndexes()
	{
		return this.currentCollection.indexes()
	}

	/**
	 * @param {Object} filter
	 * @return {Promise}
	 */
	deleteMany(filter)
	{
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				resolve(result.result.ok === 1)
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection.deleteMany(filter)
			.then(resolveCallback, rejectCallback)
		})
	}

	/**
	 * @param {Object} filter
	 *
	 * @return {Promise}
	 */
	deleteOne(filter)
	{
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				resolve(result.result.ok === 1)
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection.deleteOne(filter)
			.then(resolveCallback, rejectCallback)
		})
	}

	/**
	 * Drops the current collection
	 *
	 * @returns {Promise} - (resolve only) Returns true if dropped or the collection didn't exist, otherwise false.
	 */
	drop()
	{
		this.lastError = null

		return new Promise((resolve) => {

			let resolveCallback = (result) => {
				if (result === true)
				{
					resolve(true)
				}
				else
				{
					resolve(false)
				}
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.db.collection(
				this.collectionName,
				{strict : true},
				(result) => {
					// this callback is for the 'strict' mode.
					// If the collection exists, null is returned
					if (result instanceof Error)
					{
						// the collection is gone anyway
						resolve(true)
					}
					else
					{
						this.currentCollection.drop()
						.then(resolveCallback, rejectCallback)
					}
				}
			)
		})
	}

	/**
	 * @param {string} collectionName
	 * @return {Interface}
	 */
	getCollection(collectionName)
	{
		return new Interface(this.client, this.dbName, collectionName)
	}

	/**
	 * @param {Array} arrayOfDocuments
	 *
	 * @return {Promise} Returns object of inserted IDs on success or false on failure
	 */
	insertMany(arrayOfDocuments)
	{
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				if (result.result.ok === 1)
				{
					resolve(result.insertedIds)
				}
				else
				{
					resolve(false)
				}
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection.insertMany(arrayOfDocuments, {
				forceServerObjectId : true,
				j                   : false
			})
			.then(resolveCallback, rejectCallback)
		})
	}

	/**
	 * @param {Object} document
	 * @return {Promise} Returns the inserted ID as an object on success or false on failure
	 */
	insertOne(document)
	{

		/*
		try
		{

			let result = this.currentCollection.insertOne(document)
			console.log(result)

			return result

		} catch (e)
		{
			this.lastError = error
			return false
		}

		return false

		 */
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				if (result.result.ok === 1)
				{
					resolve(true)
				}
				else
				{
					resolve(false)
				}
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection.insertOne(document, {
				forceServerObjectId : true,
				j                   : false
			})
			.then(resolveCallback, rejectCallback)
		})
	}

	limit(value)
	{
		this._limit = value

		return this
	}

	/**
	 * @param {Object} query
	 * @param {Object=} projection
	 * @return {Promise}
	 */
	readMany(query, projection)
	{
		let result = this.currentCollection.find(query, {projection : projection})
		.sort(this._sort)
		.limit(this._limit)
		.toArray()

		this.resetOptions()

		return result
	}

	/**
	 * @param {Object} query
	 * @param {Object=} projection
	 * @return {Promise|null}
	 */
	readOne(query, projection)
	{
		let result = this.currentCollection.findOne(
			query,
			{
				projection : projection,
				sort       : this._sort
			}
		)

		this.resetOptions()

		return result
	}

	resetOptions()
	{
		this._limit = 0
		this._sort  = {}
	}

	selectDatabase(dbName, collectionName)
	{
		return new Interface(this.client, dbName, collectionName)
	}

	sort(value)
	{
		this._sort = value

		return this
	}

	/**
	 * Unset fields from many documents
	 *
	 * @param {Object} filter
	 * @param {Object|Array} fields
	 * @return {Promise} The number of modified documents
	 */
	unsetMany(filter, fields)
	{
		let fieldsToUnset = {}

		if (fields instanceof Array)
		{
			for (let i = 0; i < fields.length; i++)
			{
				fieldsToUnset[fields[i]] = ''
			}
		}
		else if (fields instanceof Object)
		{
			fieldsToUnset = fields
		}

		return new Promise((resolve) => {
			var retval = this.currentCollection.updateMany(filter, {'$unset' : fieldsToUnset})

			retval.then((result) => {
				resolve(result.result.nModified)
			})
		})
	}

	/**
	 * Unset fields from one document
	 *
	 * @param {Object} filter
	 * @param {Object|Array} fields
	 * @return {Promise} The number of modified documents
	 */
	unsetOne(filter, fields)
	{
		let fieldsToUnset = {}

		if (fields instanceof Array)
		{
			for (let i = 0; i < fields.length; i++)
			{
				fieldsToUnset[fields[i]] = ''
			}
		}
		else if (fields instanceof Object)
		{
			fieldsToUnset = fields
		}

		return new Promise((resolve) => {
			var retval = this.currentCollection.updateOne(filter, {'$unset' : fieldsToUnset})

			retval.then((result) => {
				resolve(result.result.nModified)
			})
		})
	}

	/**
	 * @param {Object} filter
	 * @param {Object} update
	 * @return {Promise} The number of modified documents
	 */
	updateOne(filter, update)
	{
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				resolve(result.result.nModified)
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection.updateOne(filter, {'$set' : update})
			.then(resolveCallback, rejectCallback)
		})
	}

	/**
	 * @param {Object} filter
	 * @param {Object} update
	 * @return {Promise}
	 */
	upsertOne(filter, update)
	{
		this.lastError = null

		return new Promise((resolve) => {
			let resolveCallback = (result) => {
				resolve(result.result.ok === 1)
			}

			let rejectCallback = (error) => {
				this.lastError = error
				resolve(false)
			}

			this.currentCollection
			.updateOne(filter, {'$set' : update}, {upsert : true})
			.then(resolveCallback, rejectCallback)
		})
	}
}

export default Interface