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
  server?: app.WebServerConfig,
  nodeModules?: { whitelist: string[] },
  ajax?: { version: string, wrongVersionMessage: string },
  // URL rewrite rules
  urlRewrite?: Record<string, string>,
  dirNames?: app.DirNames
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

class Url {
  host: string
  get hostname(): string {}
  get origin(): string {}
  pathname: string
  get port(): string {}
  protocol: string
  search: string
  get searchParams(): URLSearchParams {}
}

class HttpRequest {
  headers: import('http').IncomingHttpHeaders
  httpVersion: string
  method: string
  get complete(): boolean {}
  get cookies(): Record<string, string> {}
  get remoteAddress(): string {}
  get url(): Url {}
  getCookie: (name: string) => string
  hasCookie: (name: string) => boolean
  setTimeout: (msecs: number, callback?: () => void) => void
}

class HttpResponse {
  get headersSent(): boolean {}
  get statusCode(): number {}
  set statusCode(): number {}
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

class HttpExchange {
  request: HttpRequest
  response: HttpResponse
}

class Routes {
  exchange: HttpExchange
  request: HttpRequest
  response: HttpResponse
}

type Request = HttpRequest
type Response = HttpResponse
type Exchange = HttpExchange

declare namespace Galaxia {
  type Options = GalaxiaOptions
  type Config = GalaxiaConfig

  type Request = HttpRequest
  type Response = HttpResponse
  type Exchange = HttpExchange
}

declare module 'galaxia' {
  export function start(options: GalaxiaOptions) : Promise<void>
  export function restart() : Promise<void>

  export class Routes {
    exchange: HttpExchange
    request: HttpRequest
    response: HttpResponse
  }
}
