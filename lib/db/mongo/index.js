import { DocSchema, docSchema } from 'docschema'
import { MongoClient, ObjectId } from 'mongodb'
import { delay } from '../../functions/utils.js'
import { Model } from './Model.js'
import { staticData } from './staticData.js'

/**
 * @param {string} uri
 * @returns {Promise<MongoClient | void>}
 */
async function connect(uri) {
  if (staticData.connection) {
    return staticData.connection
  }

  try {
    const client = new MongoClient(uri)
    staticData.connection = await client.connect()

    return staticData.connection
  }
  catch (error) {
    // Note: instanceof MongoParseError doesn't work
    if (error.constructor.name === 'MongoParseError') {
      throw new Error(`MongoDB: ${error.message}`, { cause: error })
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
  if (!staticData.connection) {
    throw new Error('MongoDB is not connected yet')
  }

  const db = staticData.connection.db(databaseName)
  const collection = db.collection(collectionName)

  return collection
}

const { connection } = staticData

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
