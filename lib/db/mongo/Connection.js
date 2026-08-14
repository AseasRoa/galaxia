import { DocSchema } from 'docschema'
import { Db, MongoClient } from 'mongodb'
import { Model } from './Model.js'

/**
 * @template {Record<string, any>} SCHEMA
 */
class Connection {
  /** @type {MongoClient} */
  #client

  /**
   * @param {string} uri
   * @param {import('mongodb').MongoClientOptions} options
   */
  constructor(uri, options = {}) {
    this.#client = new MongoClient(uri, options)
  }

  /**
   * @returns {Promise<void>}
   */
  async connect() {
    await this.#client.connect()
  }

  /**
   * @param {string} databaseName
   * @returns {Db}
   */
  db(databaseName) {
    return this.#client.db(databaseName)
  }

  /**
   * @param {string} databaseName
   * @param {string} collectionName
   * @param {DocSchema<SCHEMA>} docSchema
   * @returns {Model}
   */
  model(databaseName, collectionName, docSchema) {
    const db = this.db(databaseName)
    const collection = db.collection(collectionName)

    if (!(typeof databaseName === 'string')) {
      throw new Error('Database name must be a string')
    }

    if (!(typeof collectionName === 'string')) {
      throw new Error('Collection name must be a string')
    }

    if (!docSchema || !(docSchema instanceof DocSchema)) {
      throw new Error('schema must be an instance of DocSchema')
    }

    return new Model(collection, docSchema)
  }
}

export { Connection }
