declare namespace Web {
  type Socket = import('net').Socket

  type HttpServer = import('http').Server

  type Http2Server = import('http2').Http2SecureServer

  type HttpRequest = import('http').IncomingMessage

  type Http2Request = import('http2').Http2ServerRequest

  type HttpResponse = import('http').ServerResponse

  type Http2Response = import('http2').Http2ServerResponse

  type Http2SecureServer = import('http2').Http2SecureServer

  type ServerHttp2Session = import('http2').ServerHttp2Session

  type Server = import('http').Server | import('http2').Http2SecureServer

  type Request = import('http').IncomingMessage | import('http2').Http2ServerRequest

  type Response = import('http').ServerResponse | import('http2').Http2ServerResponse
}
