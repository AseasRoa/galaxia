// Server Types
type HttpRequest = import('./server').HttpRequest
type HttpResponse = import('./server').HttpResponse
type HttpExchange = import('./server').HttpExchange
// Server Types (Aliases)
type Request = import('./server').HttpRequest
type Response = import('./server').HttpResponse
type Exchange = import('./server').HttpExchange

declare module 'galaxia' {
  export function start(options: Galaxia.Options) : Promise<void>
  export function restart() : Promise<void>
  export { HttpExchange, HttpRequest, HttpResponse, Router } from './server'
}

declare namespace Galaxia {
  type Options = {
    // How many workers to spawn?
    // Set to 0 to spawn as many workers, as many CPU cores the system have.
    // The default value is 1.
    workersCount? : number,
    // How much time (in milliseconds) a worker can be unresponsive,
    // before a new one is created to replace it.
    // The default value is 8000.
    workersTimeout? : number,
    // Use a cluster, which will spawn one or more workers.
    // The default value is true.
    useCluster? : boolean
  }

  // eslint-disable-next-line no-undef
  type Config = Partial<app.Config>

  type Request = import('./server').HttpRequest
  type Response = import('./server').HttpResponse
  type Exchange = import('./server').HttpExchange
}

declare module 'galaxia/fileSystem' {
  export * from 'lib/functions/fileSystem.js'
  export {
    dirExists,
    dirExistsSync,
    emptyDir,
    emptyDirSync,
    ensureDir,
    ensureDirSync,
    ensureFile,
    ensureFileSync,
    fileExists,
    fileExistsSync,
    dirMtimeDeep,
    dirMtimeDeepSync,
    dirStats,
    dirStatsSync,
    fileSize,
    fileSizeSync,
    fileStats,
    fileStatsSync,
    isDir,
    isDirSync,
    isFile,
    isFileSync,
    isDirEmpty,
    isDirEmptySync,
    readDir,
    readDirSync,
    readFile,
    readFileSync,
    readJson,
    readJsonSync,
    readJson5,
    readJson5Sync,
    remove,
    deleteDir,
    deleteFile,
    removeSync,
    deleteDirSync,
    deleteFileSync,
    writeJson,
    writeJsonSync,
    writeJson5,
    writeJson5Sync,
    writeFile,
    writeFileSync
    // @ts-ignore Prevents an error when types are generated
  } from 'dist/functions/fileSystem'
}

declare module 'galaxia/docSchema' {
  export class DocSchema {
    approves(
      value: any
    ): boolean

    check(
      value: any
    ): DocSchemaCheckResult

    /**
     * @template T
     * @param {T} value Input value
     * @returns {T} The input value, if it's valid
     * @throws {ValidationError}
     */
    validate<T>(value: T): T
  }

  /**
   * @returns {DocSchema}
   * @throws {Error}
   */
  export function docSchema(): DocSchema

  export default docSchema
}

declare module 'galaxia/paintor' {
  type Elements = import('paintor').Elements
  type Statements = import('paintor/types/Statements').Statements

  type State = Record<any, any> | Array<any> | Set<any> | Map<any, any>
  type States = Record<string, State>
  type TemplateTree = Elements & Statements
  type Template = (tree : TemplateTree) => (
    void
    | string
    | HTMLElement | HTMLElement[]
    | Component | Component[]
    | Template | Template[]
    )
  type Translation = Record<string, any>

  export interface Component {
    // component: (...from: (Template | Component)[]) => Component,
    clear: () => void,
    html: (options?: { indent?:string }) => string,
    paint: (container: string | HTMLElement | HTMLElement[] | HTMLCollection) => void,
    static: (on?: boolean) => Component,
    staticHtml: (options?: { indent?:string }) => string,
    template: Template,
    useTranslations : (...translations: Translation[]) => Component,
  }

  export function component(...from: (Template | Component)[]): Component
  export function component(from: (Template | Component)[]): Component

  /**
   * @template T
   * @param {T} object Your input object or array
   * @returns {T} A proxy object/array that looks the same as the input object/array
   */
  export function state<T>(object : T) : T

  export function isTemplate(func: Template) : boolean
  export function template<T extends Template>(from: T) : T

  /**
   * @template T
   * @param {T} defaultPaths
   * One or more paths to files, exporting an object as default.
   * The file name of each path will be replaced with the user's locale, so the actual file from
   * which the translation is read could be different. But if a file for the user's locale doesn't
   * exist, the provided file name will be used.
   * @returns {Promise<Translation>}
   */
  export function fetchTranslations(...defaultPaths: string[]) : Promise<Translation[]>

  export const paintor: {
    component: typeof component,
    fetchTranslations: typeof fetchTranslations,
    state: typeof state,
    template: typeof template,
    Component: Component
  }
}

declare module 'galaxia/db/mongo' {
  import { DocSchema } from 'galaxia/docSchema'
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
      keys: (Required<SCHEMA> extends Record<infer K, any> ? Partial<Record<K, 1 | -1>> : never),
      options?: import('mongodb').CreateIndexesOptions
    ) : Promise<string>

    /**
     * @throws {MongoServerError}
     */
    async dropIndex(
      index: string | (Required<SCHEMA> extends Record<infer K, any> ? Partial<Record<K, 1 | -1>> : never)
    ): boolean

    async indexes(): {
      v: number,
      key: (SCHEMA extends Record<infer K, any> ? Partial<Record<(K | '_id'), 1 | -1>> : never),
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
    include<T extends Required<SCHEMA> extends Record<infer K, any> ? (K[] | K[][]) : never>(
      // Required<SCHEMA> helps when there are optional keys in the schema
      ...fields: T
    ): Model<Pick<SCHEMA, (T extends Array<infer V> ? V : never)>>
    // ): Model<T extends Array<infer V> ? {[P in V]: SCHEMA[P]} : never>
    /**
     * The fields to exclude from the query.
     */
    exclude<T extends Required<SCHEMA> extends Record<infer K, any> ? (K[] | K[][]) : never>(
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
    sort(by: (Required<SCHEMA> extends Record<infer K, any> ? Partial<Record<K, 1 | -1>> : never)): this

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

  export function connect(uri: string): Promise<MongoClient>
  export function collection(databaseName: string, collectionName: string) : Collection
  export function model<DS>(databaseName: string, collectionName: string, schema: DS): Model<DS>

  export { DocSchema, ObjectId }
}
