import { DocSchema } from 'docschema'
import { Collection, MongoServerError } from 'mongodb'
import { connection } from './index.js'

/**
 * @template DS
 */
class Model {
  /** @type {string} */
  databaseName = ''

  /** @type {string} */
  collectionName = ''

  /** @type {DocSchema} */
  schema

  /** @type {Collection} */
  collection

  /** @type {import('mongodb').FindOptions} */
  #findOptions = {}

  /** @type {Partial<DS>} */
  #queryFilter = {}

  /**
   * @param {string} databaseName
   * @param {string} collectionName
   * @param {DS} schema
   */
  constructor(databaseName, collectionName, schema) {
    if (!connection) {
      throw new Error('MongoDB is not connected yet')
    }

    if (!(typeof databaseName === 'string')) {
      throw new Error('Database name must be a string')
    }

    if (!(typeof collectionName === 'string')) {
      throw new Error('Collection name must be a string')
    }

    if (!schema || !(schema instanceof DocSchema)) {
      throw new Error('schema must be an instance of DocSchema')
    }

    const db = connection.db(databaseName)
    const collection = db.collection(collectionName)

    this.databaseName = databaseName
    this.collectionName = collectionName
    this.schema = schema
    this.collection = collection
  }

  /**
   * @param {Partial<DS>} keys
   * @param {import('mongodb').CreateIndexesOptions} [options]
   * @returns {Promise<string>}
   */
  async ensureIndex(keys, options) {
    // @ts-ignore
    return await this.collection.createIndex(keys, options)
  }

  /**
   * @param {string | Partial<DS>} index
   * @returns {Promise<boolean>}
   * @throws {MongoServerError}
   */
  async dropIndex(index) {
    // @ts-ignore
    return (await this.collection.dropIndex(index)).ok === 1
  }

  /**
   * @returns {Promise<{
   *   v: number,
   *   key: Record<string, number>,
   *   name: string
   * }[]>}
   */
  async indexes() {
    // @ts-ignore
    return await this.collection.indexes()
  }

  /**
   * @param {Partial<DS>} filter
   * @returns {this}
   */
  query(filter) {
    this.#queryFilter = filter

    return this
  }

  /**
   * @param {number} amount
   * @returns {this}
   */
  limit(amount) {
    this.#findOptions.limit = amount

    return this
  }

  /**
   * @param {...(string | string[])} fields
   * @returns {this}
   */
  include(...fields) {
    this.#findOptions.projection = {}

    this.#fillProjectionFields(fields, this.#findOptions.projection, 1)

    // If include fields are specified, but _id is not, the result is
    // that _id is automatically included. I don't think this is
    // rational, so exclude it.
    if (
      Object.keys(this.#findOptions.projection).length > 0
      && !('_id' in this.#findOptions.projection)
    ) {
      this.#findOptions.projection['_id'] = 0
    }

    return this
  }

  /**
   * @param {...(string | string[])} fields
   * @returns {this}
   */
  exclude(...fields) {
    this.#findOptions.projection = {}

    this.#fillProjectionFields(fields, this.#findOptions.projection, 0)

    return this
  }

  /**
   * @param {number} amount
   * @returns {this}
   */
  skip(amount) {
    this.#findOptions.skip = amount

    return this
  }

  /**
   * @param {Record<keyof DS, number>} by
   * @returns {this}
   */
  sort(by) {
    // @ts-ignore
    this.#findOptions.sort = by

    return this
  }

  /**
   * @returns {Promise<number>}
   */
  async count() {
    const count = await this.collection.countDocuments(
      this.#queryFilter,
      this.#findOptions
    )

    this.#resetFindOptions()

    return count
  }

  /**
   * @returns {Promise<boolean>}
   */
  async exists() {
    const count = await this.count()

    return count > 0
  }

  /**
   * @param {Partial<DS>} [query]
   * @returns {Promise<import('mongodb').DeleteResult>}
   */
  async deleteMany(query) {
    const result = await this.collection.deleteMany(query ?? this.#queryFilter)

    this.#resetDeleteOptions()

    return result
  }

  /**
   * @param {Partial<DS>} [query]
   * @returns {Promise<import('mongodb').DeleteResult>}
   */
  async deleteOne(query) {
    const result = await this.collection.deleteOne(query ?? this.#queryFilter)

    this.#resetDeleteOptions()

    return result
  }

  /**
   * @param {DS} documents
   * @returns {Promise<any[]>}
   */
  async insertMany(documents) {
    if (!(documents instanceof Object)) {
      throw new Error('The input value must be an object, or an array of objects')
    }

    const documentsToInsert = (documents instanceof Array)
      ? documents
      : [documents]

    for (const document of documentsToInsert) {
      this.schema.validate(document)
    }

    const output = []
    const result = await this.collection.insertMany(documentsToInsert)

    for (const key in result.insertedIds) {
      output.push(result.insertedIds[key])
    }

    return output
  }

  /**
   * @param {DS} document
   * @returns {Promise<any>}
   */
  async insertOne(document) {
    const result = await this.insertMany(document)

    return result[0] ?? null
  }

  /**
   * @returns {import('mongodb').FindCursor}
   */
  fetchCursor() {
    const findCursor = this.collection.find(
      this.#queryFilter,
      this.#findOptions
    )

    this.#resetFindOptions()

    // @ts-ignore
    return findCursor
  }

  /**
   * @param {string} id
   * @returns {Promise<Partial<DS> | null>}
   */
  async fetchById(id) {
    const document = await this.collection.findOne(
      // @ts-ignore
      { _id: id },
      this.#findOptions
    )

    if (this.schema && !this.#findOptions.projection && document) {
      this.schema.validate(document)
    }

    this.#resetFindOptions()

    // @ts-ignore
    return document
  }

  /**
   * @returns {Promise<Partial<DS>[]>}
   */
  async fetchMany() {
    return this.fetchCursor().toArray()
  }

  /**
   * @returns {Promise<Partial<DS> | null>}
   */
  async fetchOne() {
    const document = await this.collection.findOne(
      this.#queryFilter,
      this.#findOptions
    )

    if (this.schema && !this.#findOptions.projection && document) {
      this.schema.validate(document)
    }

    this.#resetFindOptions()

    // @ts-ignore
    return document
  }

  /**
   * @param {Partial<DS>} data
   * @returns {Promise<import('mongodb').UpdateResult>}
   */
  async updateMany(data) {
    const document = await this.collection.updateMany(
      this.#queryFilter,
      { $set: data }
    )

    this.#resetUpdateOptions()

    return document
  }

  /**
   * @param {Partial<DS>} data
   * @returns {Promise<import('mongodb').UpdateResult>}
   */
  async updateOne(data) {
    const document = await this.collection.updateOne(
      this.#queryFilter,
      { $set: data }
    )

    this.#resetUpdateOptions()

    return document
  }

  /**
   * @param {(string | string[])[]} input
   * @param {Record<string, number>} output
   * @param {number} valueToSet
   */
  #fillProjectionFields(input, output, valueToSet) {
    if (!(input instanceof Array)) {
      throw new Error('The input value must be an Array')
    }

    for (const value of input) {
      if (value instanceof Array) {
        this.#fillProjectionFields(value, output, valueToSet)
      }
      else if (typeof value === 'string') {
        output[value] = valueToSet
      }
      else {
        throw new TypeError('Field must be string')
      }
    }
  }

  /**
   * @returns {void}
   */
  #resetDeleteOptions() {
    this.#queryFilter = {}
  }

  /**
   * @returns {void}
   */
  #resetFindOptions() {
    this.#queryFilter = {}
    this.#findOptions = {}
  }

  /**
   * @returns {void}
   */
  #resetUpdateOptions() {
    this.#queryFilter = {}
  }
}

export { Model }
