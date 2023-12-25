export class HttpRequest {
  headers: import('http').IncomingHttpHeaders
  httpVersion: string
  method: string
  get complete(): boolean {}
  get cookies(): Record<string, string> {}
  get remoteAddress(): string {}
  get url(): import('../server/Url.js') {}
  getCookie: (name: string) => string
  hasCookie: (name: string) => boolean
  setTimeout: (msecs: number, callback?: () => void) => void
}

export class HttpResponse {
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

export class HttpExchange {
  request: HttpRequest
  response: HttpResponse
}

export class Router {
  exchange: HttpExchange
  request: HttpRequest
  response: HttpResponse
}
