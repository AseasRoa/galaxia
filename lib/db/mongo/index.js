import { DocSchema, docSchema } from 'docschema'
import { MongoClient, ObjectId } from 'mongodb'
import { delay } from '../../functions/utils.js'
import { Model } from './Model.js'

/** @type {MongoClient | null} */
let connection = null

/**
 * @param {string} uri
 * @returns {Promise<MongoClient | void>}
 */
async function connect(uri) {
  if (connection) {
    return connection
  }

  try {
    const client = new MongoClient(uri)
    connection = await client.connect()

    return connection
  }
  catch (error) {
    // Note: instanceof MongoParseError doesn't work
    if (error.constructor.name === 'MongoParseError') {
      throw new Error(`MongoDB: ${error.message}`)
    }

    const reconnectMs = 5000

    console.error(`MongoDB: ${error.message}. Trying to reconnect in ${reconnectMs / 1000} seconds`)

    await delay(reconnectMs)

    return connect(uri)
  }
}

/**
 * @template {Record<string, any>} SCHEMA
 * @param {string} databaseName
 * @param {string} collectionName
 * @param {DocSchema<SCHEMA>} docSchema
 * @returns {Model<SCHEMA>}
 */
function model(databaseName, collectionName, docSchema) {
  return new Model(databaseName, collectionName, docSchema)
}

/**
 * @param {string} databaseName
 * @param {string} collectionName
 * @returns {import('mongodb').Collection}
 * @throws {Error}
 */
function collection(databaseName, collectionName) {
  if (!connection) {
    throw new Error('MongoDB is not connected yet')
  }

  const db = connection.db(databaseName)
  const collection = db.collection(collectionName)

  return collection
}

export { ObjectId }

export {
  collection,
  connect,
  connection,
  docSchema,
  DocSchema,
  model,
  Model,
}
