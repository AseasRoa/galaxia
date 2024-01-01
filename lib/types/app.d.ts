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

  export type PartialConfig = {
    development?: boolean | -1,
    // The name of the app
    name?: string,
    // Expiration time (for the browser's cache) for each file type, in seconds
    maxAge?: Record<string, number>,
    // Compression level for each file type, from -1 to 9
    compressionLevels?: Record<string, number>,
    // Custom mime type for each file type
    mimeTypes?: Record<string, string>,
    server?: WebServerConfig,
    nodeModules?: { whitelist: string[] },
    ajax?: { version: string, wrongVersionMessage: string },
    // URL rewrite rules
    urlRewrite?: Record<string, string>,
    dirNames?: DirNames
  }

  export type Config = DeepRequired<PartialConfig>

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
    modulesAssets: ModulesAssets
  }

  export type ImportsCacheItem = {
    exports: any,
    file: string,
    ext: string
  }
}
