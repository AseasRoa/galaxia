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
    app: string,
    modules: string,
    layout: string,
    client: string,
    hooks: string,
    i18n: string,
    routes: string,
    server: string,
    css: string,
    views: string,
    dist: string
  }

  type RateLimiterRule = {
    path: string | RegExp,
    maxRequests: number,
    secondsPeriod: number,
    methods?: string[]
  }

  type UserAgentFilterRule = {
    path?: string | RegExp,
    allow?: (string | RegExp)[],
    deny?: (string | RegExp)[]
  }

  type HttpToHttpsRule = {
    hostname?: string | RegExp,
    excludePaths?: (string | RegExp)[],
    httpsPort?: number
  }

  type WebServerConfig = {
    hostNames?: string[],
    httpPort?: number,
    httpsPort?: number,
    responseTimeout?: number,
    ssl?: Record<string, SecureContextOptions>,
    redirectHttpToHttps?: boolean,
    redirectHttpToHttpsExcludePaths?: string[],
    proxy?: Record<string, number>,
    earlyHints?: boolean,
    middleware?: {
      httpToHttps?: {
        enabled?: boolean,
        rules?: HttpToHttpsRule[]
      },
      rateLimiter?: {
        enabled?: boolean,
        rules?: RateLimiterRule[]
      },
      userAgentFilter?: {
        enabled?: boolean,
        rules?: UserAgentFilterRule[]
      },
    }
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
