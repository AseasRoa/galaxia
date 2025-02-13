import { IncomingMessage, ServerResponse } from 'http'
import { Http2ServerRequest, Http2ServerResponse } from 'http2'

class HttpResponse {
  /** @type {ServerResponse | Http2ServerResponse} */
  original

  /** @type {IncomingMessage | Http2ServerRequest} */
  originalRequest

  /**
   * @param {ServerResponse | Http2ServerResponse} response
   */
  constructor(response) {
    // Properties, same as the original request

    // Different properties
    this.original = response
    this.originalRequest = response.req
  }

  /**
   * @returns {boolean}
   */
  get headersSent() {
    return this.original.headersSent
  }

  /**
   * @returns {number}
   */
  get statusCode() {
    return this.original.statusCode
  }

  /**
   * @param {number} statusCode
   */
  set statusCode(statusCode) {
    this.original.statusCode = statusCode
  }

  /**
   * This method signals to the server that all the response headers and body
   * have been sent; that server should consider this message complete.
   * The method, `response.end()`, MUST be called on each response.
   *
   * If `data` is specified, it is equivalent to calling
   * `response.write(data, encoding)` followed by `response.end(callback)`.
   *
   * If `callback` is specified, it will be called when the response stream
   * is finished.
   *
   * @param {string | Uint8Array} [data]
   * @param {BufferEncoding} [encoding]
   * @param {() => void} [callback]
   * @returns {this}
   */
  end(data = '', encoding = 'utf8', callback = undefined) {
    this.original.end(data, encoding, callback)

    return this
  }

  /**
   * Gets the value of HTTP header with the given name. If such a name doesn't
   * exist in message, it will be `undefined`.
   *
   * @param {string} name Header name
   * @returns {number | string | string[] | undefined}
   */
  getHeader(name) {
    return this.original.getHeader(name)
  }

  /**
   * Returns an array of names of headers of the outgoing outgoingMessage. All
   * names are lowercase.
   *
   * @returns {string[]}
   */
  getHeaderNames() {
    return this.original.getHeaderNames()
  }

  /**
   * Returns a shallow copy of the current outgoing headers. Since a shallow
   * copy is used, array values may be mutated without additional calls to
   * various header-related HTTP module methods. The keys of the returned
   * object are the header names and the values are the respective header
   * values. All header names are lowercase.
   *
   * The object returned by the `outgoingMessage.getHeaders()` method does
   * not prototypically inherit from the JavaScript Object. This means that
   * typical Object methods such as `obj.toString()`, `obj.hasOwnProperty()`,
   * and others are not defined and will not work.
   *
   * ```js
   * outgoingMessage.setHeader('Foo', 'bar');
   * outgoingMessage.setHeader('Set-Cookie', ['foo=bar', 'bar=baz']);
   *
   * const headers = outgoingMessage.getHeaders();
   * // headers === { foo: 'bar', 'set-cookie': ['foo=bar', 'bar=baz'] }
   * ```
   *
   * @returns {import('http').OutgoingHttpHeaders}
   */
  getHeaders() {
    return this.original.getHeaders()
  }

  /**
   * Returns `true` if the header identified by `name` is currently set in the
   * outgoing headers. The header name is case-insensitive.
   *
   * ```js
   * const hasContentType = outgoingMessage.hasHeader('content-type');
   * ```
   *
   * @param {string} name Header name
   * @returns {boolean}
   */
  hasHeader(name) {
    return this.original.hasHeader(name)
  }

  /**
   * Removes a header that is queued for implicit sending.
   *
   * ```js
   * outgoingMessage.removeHeader('Content-Encoding');
   * ```
   *
   * @param {string} name Header name
   * @returns {void}
   */
  removeHeader(name) {
    this.original.removeHeader(name)
  }

  /**
   * Sets a single header value for the header object.
   *
   * @param {string} name
   * @param {string | number | string[]} value
   * @returns {this}
   */
  setHeader(name, value) {
    this.original.setHeader(name, value)

    return this
  }

  /**
   * Once a socket is associated with the message and is connected,
   * socket.setTimeout() will be called with msecs as the first parameter.
   *
   * @param {number} msecs
   * @param {(() => void)} [callback] Optional function to be called
   * when a timeout occurs. Same as binding to the timeout event.
   */
  setTimeout(msecs, callback) {
    this.original.setTimeout(msecs, callback)
  }

  /**
   * If this method is called and `response.writeHead()` has not been called,
   * it will switch to implicit header mode and flush the implicit headers.
   *
   * This sends a chunk of the response body. This method may
   * be called multiple times to provide successive parts of the body.
   *
   * In the `http` module, the response body is omitted when the
   * request is a HEAD request. Similarly, the `204` and `304` responses
   * _must not_ include a message body.
   *
   * `chunk` can be a string or a buffer. If `chunk` is a string,
   * the second parameter specifies how to encode it into a byte stream.
   * By default, the `encoding` is `'utf8'`. `callback` will be called when
   * this chunk of data is flushed.
   *
   * This is the raw HTTP body and has nothing to do with higher-level multipart
   * body encodings that may be used.
   *
   * The first time `response.write()` is called, it will send the buffered
   * header information and the first chunk of the body to the client.
   * The second time `response.write()` is called, Node.js assumes data will
   * be streamed, and sends the new data separately. That is, the response is
   * buffered up to the first chunk of the body.
   *
   * @param {string | Buffer | Uint8Array} chunk
   * @param {BufferEncoding} [encoding]
   * @param {(err: Error) => void} [callback]
   * @returns {boolean}
   * Returns `true` if the entire data was flushed successfully to the kernel
   * buffer. Returns `false` if all or part of the data was queued in user
   * memory. `'drain'` will be emitted when the buffer is free again.
   */
  write(chunk, encoding = 'utf8', callback = undefined) {
    // @ts-expect-error
    return this.original.write(chunk, encoding, callback)
  }

  /**
   * Sends a status `100 Continue` to the client, indicating that the request
   * body should be sent.
   */
  writeContinue() {
    this.original.writeContinue()
  }
}

export { HttpResponse }
