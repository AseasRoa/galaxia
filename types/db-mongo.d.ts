declare module 'galaxia/db/mongo' {
  import { DocSchema } from 'types/docschema/types'
  import { Condition, ObjectId, RootFilterOperators } from 'mongodb'

  type MongoClient = import('mongodb').MongoClient
  type Collection = import('mongodb').Collection

  type QueryFilter<T> = {
    [P in keyof T]?: T[P] | (Condition<T[P]> & RootFilterOperators<T>)
  }

  // Required<SCHEMA> helps when there are optional keys in the schema
  type ArrayUnionFromSchema<SCHEMA> = (
    Required<SCHEMA> extends Record<infer K, unknown> ? K[] : never
  )
  type UnionFromArray<T> = (
    T extends Array<infer U> ? UnionFromArray<U> : T
  )
  //type UnionFromArray<ARR_T extends Readonly<unknown[]>> = ARR_T[number]

  export class Model<SCHEMA> {
    constructor(
      databaseName: string,
      collectionName: string,
      schema: SCHEMA
    )

    ensureIndex(
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
    dropIndex(
      index:
        string
        | (
          Required<SCHEMA> extends Record<infer K, any>
            ? Partial<Record<K, 1 | -1>>
            : never
        )
    ): Promise<boolean>

    indexes(): Promise<{
      v: number,
      key: (
        SCHEMA extends Record<infer K, any>
          ? Partial<Record<(K | '_id'), 1 | -1>>
          : never
      ),
      name: string
    }[]>

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
    include: {
      <T extends ArrayUnionFromSchema<SCHEMA>>(
        ...fields: T
      ): Model<
        // @ts-expect-error
        Pick<SCHEMA, UnionFromArray<T>>
      >

      <T extends ArrayUnionFromSchema<SCHEMA>>(
        ...fields: T[]
      ): Model<
        // @ts-expect-error
        Pick<SCHEMA, UnionFromArray<T>>
      >
    }

    /**
     * The fields to exclude from the query.
     */
    exclude: {
      <T extends ArrayUnionFromSchema<SCHEMA>>(
        ...fields: T
      ): Model<
        Omit<SCHEMA, UnionFromArray<T>>
      >

      <T extends ArrayUnionFromSchema<SCHEMA>>(
        ...fields: T[]
      ): Model<
        Omit<SCHEMA, UnionFromArray<T>>
      >
    }

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
    count(): Promise<number>

    exists(): Promise<boolean>

    deleteMany(query?: Partial<SCHEMA>): Promise<import('mongodb').DeleteResult>
    deleteOne(query?: Partial<SCHEMA>): Promise<import('mongodb').DeleteResult>

    insertMany(documents: SCHEMA | SCHEMA[]): Promise<any[]>
    insertOne(document: SCHEMA): Promise<any>

    /**
     * Selects documents in a collection or view and returns a cursor to the
     * selected documents.
     */
    fetchCursor(): import('mongodb').FindCursor

    fetchById(id: string) : Promise<SCHEMA | null>
    fetchMany(): Promise<SCHEMA[]>
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
    fetchOne() : Promise<SCHEMA | null>

    updateMany(data: Partial<SCHEMA>): Promise<import('mongodb').UpdateResult>
    updateOne(data: Partial<SCHEMA>): Promise<import('mongodb').UpdateResult>
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
