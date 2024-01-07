declare module 'galaxia/db/mongo' {
  import { DocSchema } from './docschema/types.d.ts'
  import { Condition, MongoServerError, ObjectId, RootFilterOperators } from 'mongodb'

  type MongoClient = import('mongodb').MongoClient
  type Collection = import('mongodb').Collection

  type QueryFilter<T> = {
    [P in keyof T]?: T[P] | (Condition<T[P]> & RootFilterOperators<T>)
  }

  export class Model<SCHEMA> {
    constructor(
      databaseName: string,
      collectionName: string,
      schema: SCHEMA
    ) : this

    async ensureIndex(
      keys: (
        Required<SCHEMA> extends Record<infer K, any>
          ? Partial<Record<K, 1 | -1>>
          : never
      ),
      options?: import('mongodb').CreateIndexesOptions
    ) : Promise<string>

    /**
     * @throws {MongoServerError}
     */
    async dropIndex(
      index:
        string
        | (
          Required<SCHEMA> extends Record<infer K, any>
            ? Partial<Record<K, 1 | -1>>
            : never
        )
    ): boolean

    async indexes(): {
      v: number,
      key: (
        SCHEMA extends Record<infer K, any>
          ? Partial<Record<(K | '_id'), 1 | -1>>
          : never
      ),
      name: string
    }[]

    query(
      filter: QueryFilter<SCHEMA>
    ): this

    /**
     * Sets the limit of documents returned in the query.
     */
    limit(amount: number): this

    /**
     * The fields to include in the query.
     */
    include<
      T extends Required<SCHEMA> extends Record<infer K, any>
        ? (K[] | K[][])
        : never
    >(
      // Required<SCHEMA> helps when there are optional keys in the schema
      ...fields: T
    ): Model<Pick<SCHEMA, (T extends Array<infer V> ? V : never)>>
    // ): Model<T extends Array<infer V> ? {[P in V]: SCHEMA[P]} : never>
    /**
     * The fields to exclude from the query.
     */
    exclude<
      T extends Required<SCHEMA> extends Record<infer K, any>
        ? (K[] | K[][])
        : never
    >(
      // Required<SCHEMA> helps when there are optional keys in the schema
      ...fields: T
    ): Model<Omit<SCHEMA, (T extends Array<infer V> ? V : never)>>

    /**
     * Set to skip N documents ahead in your query (useful for pagination).
     */
    skip(amount: number): this

    /**
     * Set to sort the documents coming back from the query.
     */
    sort(
      by: (
        Required<SCHEMA> extends Record<infer K, any>
          ? Partial<Record<K, 1 | -1>>
          : never
      )
    ): this

    /**
     * Returns an integer for the number of documents that match the query of the
     * collection or view. This method is available for use in Transactions.
     */
    async count(): Promise<number>

    async exists(): Promise<boolean>

    async deleteMany(query?: Partial<SCHEMA>): Promise<import('mongodb').DeleteResult>
    async deleteOne(query?: Partial<SCHEMA>): Promise<import('mongodb').DeleteResult>

    async insertMany(documents: SCHEMA | SCHEMA[]): Promise<any[]>
    async insertOne(document: SCHEMA): Promise<any>

    /**
     * Selects documents in a collection or view and returns a cursor to the
     * selected documents.
     */
    fetchCursor(): import('mongodb').FindCursor

    async fetchById(id: string) : Promise<SCHEMA | null>
    async fetchMany(): Promise<SCHEMA[]>
    /**
     * Returns one document that satisfies the specified query criteria on the
     * collection or view.
     *
     * If multiple documents satisfy the query, this method returns the first
     * document according to the natural order which reflects the order of
     * documents on the disk. In capped collections, natural order is the
     * same as insertion order. If no document satisfies the query, the
     * method returns null.
     */
    async fetchOne() : Promise<SCHEMA | null>

    async updateMany(data: Partial<SCHEMA>): Promise<import('mongodb').UpdateResult>
    async updateOne(data: Partial<SCHEMA>): Promise<import('mongodb').UpdateResult>
  }

  /**
   * This function returns back the input schema, but this
   * allows for changing the type of the schema from
   * DocSchema to the @enum of the schema.
   *
   * @example
   * /** @type {MySchema} * /
   * const MySchemaTyped = fromSchema(MySchema)
   */
  export function fromSchema<T>(docSchema: DocSchema): T

  export function typeSchema<T>(): T

  export function connect(
    uri: string
  ): Promise<MongoClient>

  export function collection(
    databaseName: string,
    collectionName: string
  ) : Collection

  export function model<DS>(
    databaseName: string,
    collectionName: string,
    schema: DS
  ): Model<DS>

  export { DocSchema, ObjectId }
}
