import { DocSchema } from 'docschema'
import { Collection } from 'mongodb'
import { Query } from './Query.js'
import { connection } from './index.js'

/**
 * @template DS
 */
class Model {
  /** @type {string} */
  databaseName = ''

  /** @type {string} */
  collectionName = ''

  /** @type {Collection} */
  collection

  /** @type {DS} */
  schema

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
    // @ts-expect-error
    return await this.collection.createIndex(keys, options)
  }

  /**
   * @param {string | Partial<DS>} index
   * @returns {Promise<boolean>}
   * @throws {MongoServerError}
   */
  async dropIndex(index) {
    // @ts-expect-error
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
    // @ts-expect-error
    return await this.collection.indexes()
  }

  /**
   * @param {Partial<DS>} filter
   * @returns {Query<DS>}
   */
  query(filter) {
    return new Query(this.collection, this.schema).query(filter)
  }

  /**
   * @param {number} amount
   * @returns {Query<DS>}
   */
  limit(amount) {
    return new Query(this.collection, this.schema).limit(amount)
  }

  /**
   * @param {...(string | string[])} fields
   * @returns {Query<DS>}
   */
  include(...fields) {
    return new Query(this.collection, this.schema).include(...fields)
  }

  /**
   * @param {...(string | string[])} fields
   * @returns {Query<DS>}
   */
  exclude(...fields) {
    return new Query(this.collection, this.schema).exclude(...fields)
  }

  /**
   * @param {number} amount
   * @returns {Query<DS>}
   */
  skip(amount) {
    return new Query(this.collection, this.schema).skip(amount)
  }

  /**
   * @param {Record<keyof DS, number>} by
   * @returns {Query<DS>}
   */
  sort(by) {
    return new Query(this.collection, this.schema).sort(by)
  }

  /**
   * @returns {Promise<number>}
   */
  count() {
    return new Query(this.collection, this.schema).count()
  }

  /**
   * @returns {Promise<boolean>}
   */
  exists() {
    return new Query(this.collection, this.schema).exists()
  }

  /**
   * @param {Partial<DS>} [query]
   * @returns {Promise<import('mongodb').DeleteResult>}
   */
  deleteMany(query) {
    return new Query(this.collection, this.schema).deleteMany(query)
  }

  /**
   * @param {Partial<DS>} [query]
   * @returns {Promise<import('mongodb').DeleteResult>}
   */
  deleteOne(query) {
    return new Query(this.collection, this.schema).deleteOne(query)
  }

  /**
   * @param {DS} documents
   * @returns {Promise<any[]>}
   */
  insertMany(documents) {
    return new Query(this.collection, this.schema).insertMany(documents)
  }

  /**
   * @param {DS} document
   * @returns {Promise<any>}
   */
  insertOne(document) {
    return new Query(this.collection, this.schema).insertOne(document)
  }

  /**
   * @returns {import('mongodb').FindCursor}
   */
  fetchCursor() {
    return new Query(this.collection, this.schema).fetchCursor()
  }

  /**
   * @param {string} id
   * @returns {Promise<Partial<DS> | null>}
   */
  fetchById(id) {
    return new Query(this.collection, this.schema).fetchById(id)
  }

  /**
   * @returns {Promise<Partial<DS>[]>}
   */
  fetchMany() {
    return new Query(this.collection, this.schema).fetchMany()
  }

  /**
   * @returns {Promise<Partial<DS> | null>}
   */
  fetchOne() {
    return new Query(this.collection, this.schema).fetchOne()
  }

  /**
   * @param {Partial<DS>} data
   * @returns {Promise<import('mongodb').UpdateResult>}
   */
  updateMany(data) {
    return new Query(this.collection, this.schema).updateMany(data)
  }

  /**
   * @param {Partial<DS>} data
   * @returns {Promise<import('mongodb').UpdateResult>}
   */
  updateOne(data) {
    return new Query(this.collection, this.schema).updateOne(data)
  }
}

export { Model }
