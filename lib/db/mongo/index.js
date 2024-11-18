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
 * @template DS
 * @param {string} databaseName
 * @param {string} collectionName
 * @param {DS} schema
 */
function model(databaseName, collectionName, schema) {
  return new Model(databaseName, collectionName, schema)
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

/**
 * @template T
 * @param {DocSchema} docSchema
 * @returns {T}
 */
function fromSchema(docSchema) {
  // @ts-ignore
  return docSchema
}

/**
 * @template T
 * @returns {T}
 */
const typeSchema = docSchema

export { ObjectId }

export {
  collection,
  connect,
  connection,
  DocSchema,
  fromSchema,
  model,
  Model,
  typeSchema
}
