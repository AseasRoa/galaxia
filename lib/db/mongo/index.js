import { DocSchema, docSchema } from 'docschema'
import { ObjectId } from 'mongodb'
import { delay } from '../../functions/utils.js'
import { Connection } from './Connection.js'
import { Model } from './Model.js'
import { staticData } from './staticData.js'

/**
 * @param {string} uri
 * @returns {Promise<Connection>}
 */
async function connect(uri) {
  if (staticData.connection) {
    return staticData.connection
  }

  staticData.connection = await connection(uri)

  return staticData.connection
}

/**
 * @param {string} uri
 * @returns {Promise<Connection>}
 * @throws {Error}
 */
async function connection(uri) {
  try {
    const conn = new Connection(uri)
    await conn.connect()

    return conn
  }
  catch(error) {
    // Note: instanceof MongoParseError doesn't work
    if (error.constructor.name === 'MongoParseError') {
      throw new Error(`MongoDB: ${error.message}`, { cause: error })
    }

    const reconnectMs = 10_000

    console.error(`MongoDB: ${error.message}. Trying to reconnect in ${reconnectMs / 1000} seconds`)

    await delay(reconnectMs)

    return connection(uri)
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
  if (!staticData.connection) {
    throw new Error('MongoDB is not connected yet')
  }

  return staticData.connection.model(databaseName, collectionName, docSchema)
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

  return db.collection(collectionName)
}

export {
  collection,
  connect,
  connection,
  docSchema,
  DocSchema,
  model,
  Model,
  ObjectId
}
