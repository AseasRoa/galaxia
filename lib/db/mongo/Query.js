import { DocSchema, DocSchemaValidator, ValidationError } from 'docschema'
import { Collection } from 'mongodb'

const docSchemaValidator = new DocSchemaValidator()

/**
 * @template DS
 */
class Query {
  /** @type {import('mongodb').FindOptions} */
  #findOptions = {}

  /** @type {Partial<DS>} */
  #queryFilter = {}

  /** @type {Collection} */
  collection

  /** @type {DocSchema} */
  schema

  /**
   * @param {Collection} collection
   * @param {DS} schema
   */
  constructor(collection, schema) {
    this.collection = collection
    // @ts-expect-error
    this.schema = schema
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
    // @ts-expect-error
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
    const result = await this.collection.deleteMany(
      query ?? this.#queryFilter
    )

    this.#resetDeleteOptions()

    return result
  }

  /**
   * @param {Partial<DS>} [query]
   * @returns {Promise<import('mongodb').DeleteResult>}
   */
  async deleteOne(query) {
    const result = await this.collection.deleteOne(
      query ?? this.#queryFilter
    )

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

    const documentsToInsert = (Array.isArray(documents))
      ? documents
      : [documents]

    for (const document of documentsToInsert) {
      const ast = this.schema.ast
      docSchemaValidator.validate(ast, document, true)
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

    return findCursor
  }

  /**
   * @param {string} id
   * @returns {Promise<Partial<DS> | null>}
   */
  async fetchById(id) {
    const document = await this.collection.findOne(
      // @ts-expect-error
      { _id: id },
      this.#findOptions
    )

    if (this.schema && !this.#findOptions.projection && document) {
      this.#validateDocument(document)
    }

    this.#resetFindOptions()

    // @ts-expect-error
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
      this.#validateDocument(document)
    }

    this.#resetFindOptions()

    // @ts-expect-error
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
   * @throws {Error}
   */
  #fillProjectionFields(input, output, valueToSet) {
    if (!Array.isArray(input)) {
      throw new Error('The input value must be an Array')
    }

    for (const value of input) {
      if (Array.isArray(value)) {
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

  #resetDeleteOptions() {
    this.#queryFilter = {}
  }

  #resetFindOptions() {
    this.#queryFilter = {}
    this.#findOptions = {}
  }

  #resetUpdateOptions() {
    this.#queryFilter = {}
  }

  /**
   * @param {any} document
   * @throws {ValidationError}
   */
  #validateDocument(document) {
    const result = this.schema.check(document)

    if (result.pass === false) {
      const error = new ValidationError(
        `Failed result validation of the following MongoDB query: ${JSON.stringify(this.#queryFilter)}.\n${result.message}`
      )

      for (const key in result) {
        if (key !== 'message') {
          error[key] = result[key]
        }
      }

      throw error
    }
  }
}

export { Query }
