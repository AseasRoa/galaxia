declare namespace app {
  type DeepRequired<T> = {
    [P in keyof T]-?: DeepRequired<T[P]>
  }

  type SecureContextOptions = {
    key: string,
    cert: string,
    ca?: string,
    ciphers?: string
  }

  type Paths = {
    root: string,
    modules: string,
    output: string
  }

  type DirNames = {
    layout: string,
    client: string,
    routes: string,
    server: string,
    styles: string,
    views: string,
    i18n: string
  }

  type RequestsRateLimitsRule = {
    path: string | RegExp,
    maxRequests: number,
    secondsPeriod: number,
    methods?: string[]
  }

  type WebServerConfig = {
    hostNames?: string[],
    httpPort?: number,
    httpsPort?: number,
    requestTimeout?: number,
    requestsRateLimits?: RequestsRateLimitsRule[],
    ssl?: Record<string, SecureContextOptions>,
    redirectHttpToHttps?: boolean,
    redirectHttpToHttpsExcludePaths?: string[],
    proxy?: Record<string, number>,
    earlyHints?: boolean
  }

  export type Config = GalaxiaConfig

  export type FullConfig = DeepRequired<Config>

  type QueryParameters = Record<string, any>

  type QueryParams = {
    query: QueryParameters,
    queryGet: QueryParameters
  }

  export type ModulesAssets = {
    styles: Map<string, { tag: string, url: string }>,
    scripts: Map<string, { tag: string, url: string }>
  }

  export type ChunkParams = {
    exchange: import('../server/HttpExchange').HttpExchange
    isXHR: boolean,
    isHTML: boolean,
    queryParams: QueryParams,
    modulesAssets: ModulesAssets,
    appModulesUsed: string[] // Contains the names of app modules, used for rendering the whole page
  }

  export type ImportsCacheItem = {
    exports: any,
    file: string,
    ext: string
  }
}
