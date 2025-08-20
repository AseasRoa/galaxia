declare namespace app {
  type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>
  }

  type Paths = {
    root: string,
    modules: string,
    output: string
  }

  export type Config = GalaxiaConfig

  export type FullConfig = DeepRequired<Config>

  type QueryParameters = Record<string, any>

  type QueryParams = {
    query: QueryParameters,
    queryGet: URLSearchParams
  }

  export type ModulesAssets = {
    styles: Map<string, { tag: string, url: string }>,
    scripts: Map<string, { tag: string, url: string }>
  }

  export type ChunkParams = {
    httpContext: import('../server/HttpContext').HttpContext
    isXHR: boolean,
    isHTML: boolean,
    queryParams: QueryParams,
    modulesAssets: ModulesAssets,
    appModulesUsed: Set<string>, // Contains the names of app modules, used for rendering the whole page
    words?: import('../app/routes/Words').Words,
  }

  export type ImportsCacheItem = {
    exports: any,
    file: string,
    ext: string
  }
}
