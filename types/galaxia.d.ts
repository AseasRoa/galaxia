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

type SecureContextOptions = {
  key: string,
  cert: string,
  ca?: string,
  ciphers?: string
}

type HttpToHttpsRule = {
  hostname?: string | RegExp,
  excludePaths?: (string | RegExp)[],
  httpsPort?: number
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

type GalaxiaConfig = {
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

type GalaxiaOptions = {
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

declare class Url {
  host: string
  readonly hostname: string
  readonly origin: string
  pathname: string
  readonly port: string
  protocol: string
  search: string
  readonly searchParams: URLSearchParams
}

declare class HttpRequest {
  headers: import('http').IncomingHttpHeaders
  httpVersion: string
  method: string
  original: import('http').IncomingMessage | import('http2').Http2ServerRequest
  readonly complete: boolean
  readonly cookies: Record<string, string>
  readonly remoteAddress: string
  readonly url: Url
  getCookie: (name: string) => string
  hasCookie: (name: string) => boolean
  setTimeout: (msecs: number, callback?: () => void) => void
}

declare class HttpResponse {
  readonly headersSent: boolean
  statusCode: number
  original: import('http').ServerResponse | import('http2').Http2ServerResponse
  end: (data?: string, encoding?: BufferEncoding, callback?: () => void) => HttpResponse
  getHeader: (name: string) => number | string | string[] | undefined
  getHeaderNames: () => string[]
  getHeaders: () => import('http').OutgoingHttpHeaders
  hasHeader: (name: string) => boolean
  removeHeader: (name: string) => void
  setHeader: (name: string, value: string | number | string[]) => HttpResponse
  setTimeout: (msecs: number, callback?: () => void) => void
  write: (chunk: string | Buffer | Uint8Array, encoding? : BufferEncoding, callback?: (err: Error) => void) => boolean
  writeContinue: () => void
}

declare class HttpContext {
  request: HttpRequest
  response: HttpResponse
}

declare class Routes {
  httpContext: HttpContext
  request: HttpRequest
  response: HttpResponse
}

declare namespace Galaxia {
  export type Options = GalaxiaOptions
  export type Config = GalaxiaConfig
  // export type HttpRequest = HttpRequest
  // export type HttpResponse = HttpResponse
  // export type HttpContext = HttpContext
}

declare module 'galaxia' {
  export function start(options: GalaxiaOptions) : Promise<void>
  export function restart() : Promise<void>

  export class Routes {
    httpContext: HttpContext
    request: HttpRequest
    response: HttpResponse
  }
}
