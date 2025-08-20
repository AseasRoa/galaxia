/* eslint-disable max-len */

declare namespace Buffer {
  type Buffer = import('node:buffer').Buffer
}

declare namespace Cluster {
  type Worker = import('node:cluster').Worker
}

declare namespace FileSystem {
  type Stats = import('node:fs').Stats

  // fs/promises
  type CreateReadStreamOptions = import('node:fs/promises').CreateReadStreamOptions
}

declare namespace Stream {
  type Duplex = import('node:stream').Duplex}

declare namespace Tls {
  type SecureContext = import('node:tls').SecureContext
  type SecureContextOptions = import('node:tls').SecureContextOptions
}

declare namespace Zlib {
  type BrotliCompress = import('node:zlib').BrotliCompress
  type BrotliDecompress = import('node:zlib').BrotliDecompress
  type BrotliOptions = import('node:zlib').BrotliOptions
  type CompressCallback = import('node:zlib').CompressCallback
  type Deflate = import('node:zlib').Deflate
  type DeflateRaw = import('node:zlib').DeflateRaw
  type Gunzip = import('node:zlib').Gunzip
  type Gzip = import('node:zlib').Gzip
  type Inflate = import('node:zlib').Inflate
  type InflateRaw = import('node:zlib').InflateRaw
  type InputType = import('node:zlib').InputType
  type Unzip = import('node:zlib').Unzip
  type Zlib = import('node:zlib').Zlib
  type ZlibOptions = import('node:zlib').ZlibOptions
  type ZlibParams = import('node:zlib').ZlibParams
  type ZlibReset = import('node:zlib').ZlibReset
}
