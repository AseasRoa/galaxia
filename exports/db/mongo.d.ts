import { docSchema, DocSchema } from 'docschema'
import { Condition, ObjectId, RootFilterOperators } from 'mongodb'

export { docSchema, DocSchema, ObjectId }

declare module 'galaxia/db/mongo' {
  type MongoClient = import('mongodb').MongoClient
  type MongoServerError = import('mongodb').MongoServerError
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
  type InnerOfDocSchema<T> = T extends DocSchema<infer U> ? U : never

  export type IndexesKey<SCHEMA> = (
    SCHEMA extends Record<infer K, any>
      ? Partial<Record<(K | '_id'), 1 | -1>>
      : never
    )

  export class Model<
    SCHEMA extends Record<string, any>
  > {
    constructor(
      databaseName: string,
      collectionName: string,
      schema: DocSchema<SCHEMA>
    )

    ensureIndex(
      keys: import('mongodb').IndexSpecification,
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

    indexes(): Promise<import('mongodb').IndexDescriptionInfo[]>

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
      <K extends keyof SCHEMA>(
        fields: K[]
      ): Model<
        Pick<SCHEMA, K>
      >

      <K extends keyof SCHEMA>(
        ...fields: K[]
      ): Model<
        Pick<SCHEMA, K>
      >
    }

    /**
     * The fields to exclude from the query.
     */
    exclude: {
      <K extends keyof SCHEMA>(
        fields: K[]
      ): Model<
        Omit<SCHEMA, K>
      >

      <K extends keyof SCHEMA>(
        ...fields: K[]
      ): Model<
        Omit<SCHEMA, K>
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

  export function connect(
    uri: string
  ): Promise<MongoClient>

  export function collection(
    databaseName: string,
    collectionName: string
  ) : Collection

  export function model<SCHEMA>(
    databaseName: string,
    collectionName: string,
    docSchema: DocSchema<SCHEMA>,
  ): Model<SCHEMA>
}
