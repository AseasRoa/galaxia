/* eslint-disable max-len */

/**
 * @see https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
 */

declare namespace Assert {
  type AssertionError = import('node:assert').AssertionError
  type AssertPredicate = import('node:assert').AssertPredicate
  type CallTracker = import('node:assert').CallTracker
  type CallTrackerReportInformation = import('node:assert').CallTrackerReportInformation
}

declare namespace AsyncHooks {
  type AsyncHook = import('node:async_hooks').AsyncHook
  type AsyncLocalStorage = import('node:async_hooks').AsyncLocalStorage<any>
  type AsyncResource = import('node:async_hooks').AsyncResource
  type AsyncResourceOptions = import('node:async_hooks').AsyncResourceOptions
  type HookCallbacks = import('node:async_hooks').HookCallbacks
}

declare namespace Buffer {
  type Blob = import('node:buffer').Blob
  type BlobOptions = import('node:buffer').BlobOptions
  type Buffer = import('node:buffer').Buffer
  type TranscodeEncoding = import('node:buffer').TranscodeEncoding
}

declare namespace ChildProcess {
  type ChildProcess = import('node:child_process').ChildProcess
  type ChildProcessByStdio = import('node:child_process').ChildProcessByStdio<any, any, any>
  type ChildProcessWithoutNullStreams = import('node:child_process').ChildProcessWithoutNullStreams
  type CommonExecOptions = import('node:child_process').CommonExecOptions
  type CommonOptions = import('node:child_process').CommonOptions
  type CommonSpawnOptions = import('node:child_process').CommonSpawnOptions
  type ExecException = import('node:child_process').ExecException
  type ExecFileException = import('node:child_process').ExecFileException
  type ExecFileOptions = import('node:child_process').ExecFileOptions
  type ExecFileOptionsWithBufferEncoding = import('node:child_process').ExecFileOptionsWithBufferEncoding
  type ExecFileOptionsWithOtherEncoding = import('node:child_process').ExecFileOptionsWithOtherEncoding
  type ExecFileOptionsWithStringEncoding = import('node:child_process').ExecFileOptionsWithStringEncoding
  type ExecFileSyncOptions = import('node:child_process').ExecFileSyncOptions
  type ExecFileSyncOptionsWithBufferEncoding = import('node:child_process').ExecFileSyncOptionsWithBufferEncoding
  type ExecFileSyncOptionsWithStringEncoding = import('node:child_process').ExecFileSyncOptionsWithStringEncoding
  type ExecOptions = import('node:child_process').ExecOptions
  type ExecOptionsWithBufferEncoding = import('node:child_process').ExecOptionsWithBufferEncoding
  type ExecOptionsWithStringEncoding = import('node:child_process').ExecOptionsWithStringEncoding
  type ExecSyncOptions = import('node:child_process').ExecSyncOptions
  type ExecSyncOptionsWithBufferEncoding = import('node:child_process').ExecSyncOptionsWithBufferEncoding
  type ExecSyncOptionsWithStringEncoding = import('node:child_process').ExecSyncOptionsWithStringEncoding
  type ForkOptions = import('node:child_process').ForkOptions
  type IOType = import('node:child_process').IOType
  type MessageOptions = import('node:child_process').MessageOptions
  type MessagingOptions = import('node:child_process').MessagingOptions
  type ProcessEnvOptions = import('node:child_process').ProcessEnvOptions
  type PromiseWithChild = import('node:child_process').PromiseWithChild<any>
  type SendHandle = import('node:child_process').SendHandle
  type Serializable = import('node:child_process').Serializable
  type SerializationType = import('node:child_process').SerializationType
  type SpawnOptions = import('node:child_process').SpawnOptions
  type SpawnOptionsWithoutStdio = import('node:child_process').SpawnOptionsWithoutStdio
  type SpawnOptionsWithStdioTuple = import('node:child_process').SpawnOptionsWithStdioTuple<any, any, any>
  type SpawnSyncOptions = import('node:child_process').SpawnSyncOptions
  type SpawnSyncOptionsWithBufferEncoding = import('node:child_process').SpawnSyncOptionsWithBufferEncoding
  type SpawnSyncOptionsWithStringEncoding = import('node:child_process').SpawnSyncOptionsWithStringEncoding
  type SpawnSyncReturns = import('node:child_process').SpawnSyncReturns<any>
  type StdioNull = import('node:child_process').StdioNull
  type StdioOptions = import('node:child_process').StdioOptions
  type StdioPipe = import('node:child_process').StdioPipe
  type StdioPipeNamed = import('node:child_process').StdioPipeNamed
}

declare namespace Cluster {
  type Address = import('node:cluster').Address
  type Cluster = import('node:cluster').Cluster
  type ClusterSettings = import('node:cluster').ClusterSettings
  type Worker = import('node:cluster').Worker
}

declare namespace Console {
  type ConsoleConstructor = import('node:console').ConsoleConstructor
  type ConsoleConstructorOptions = import('node:console').ConsoleConstructorOptions
}

declare namespace Crypto {
  type AsymmetricKeyDetails = import('node:crypto').AsymmetricKeyDetails
  type BasePrivateKeyEncodingOptions = import('node:crypto').BasePrivateKeyEncodingOptions<any>
  type BinaryLike = import('node:crypto').BinaryLike
  type BinaryToTextEncoding = import('node:crypto').BinaryToTextEncoding
  type Certificate = import('node:crypto').Certificate
  type CharacterEncoding = import('node:crypto').CharacterEncoding
  type CheckPrimeOptions = import('node:crypto').CheckPrimeOptions
  type Cipher = import('node:crypto').Cipher
  type CipherCCM = import('node:crypto').CipherCCM
  type CipherCCMOptions = import('node:crypto').CipherCCMOptions
  type CipherCCMTypes = import('node:crypto').CipherCCMTypes
  type CipherGCM = import('node:crypto').CipherGCM
  type CipherGCMOptions = import('node:crypto').CipherGCMOptions
  type CipherGCMTypes = import('node:crypto').CipherGCMTypes
  type CipherInfo = import('node:crypto').CipherInfo
  type CipherInfoOptions = import('node:crypto').CipherInfoOptions
  type CipherKey = import('node:crypto').CipherKey
  type CipherMode = import('node:crypto').CipherMode
  type Decipher = import('node:crypto').Decipher
  type DecipherCCM = import('node:crypto').DecipherCCM
  type DecipherGCM = import('node:crypto').DecipherGCM
  type DiffieHellman = import('node:crypto').DiffieHellman
  type DSAEncoding = import('node:crypto').DSAEncoding
  type DSAKeyPairKeyObjectOptions = import('node:crypto').DSAKeyPairKeyObjectOptions
  type DSAKeyPairOptions = import('node:crypto').DSAKeyPairOptions<any, any>
  type ECDH = import('node:crypto').ECDH
  type ECDHKeyFormat = import('node:crypto').ECDHKeyFormat
  type ECKeyPairKeyObjectOptions = import('node:crypto').ECKeyPairKeyObjectOptions
  type ECKeyPairOptions = import('node:crypto').ECKeyPairOptions<any, any>
  type ED448KeyPairKeyObjectOptions = import('node:crypto').ED448KeyPairKeyObjectOptions
  type ED448KeyPairOptions = import('node:crypto').ED448KeyPairOptions<any, any>
  type ED25519KeyPairKeyObjectOptions = import('node:crypto').ED25519KeyPairKeyObjectOptions
  type ED25519KeyPairOptions = import('node:crypto').ED25519KeyPairOptions<any, any>
  type Encoding = import('node:crypto').Encoding
  type GeneratePrimeOptions = import('node:crypto').GeneratePrimeOptions
  type GeneratePrimeOptionsArrayBuffer = import('node:crypto').GeneratePrimeOptionsArrayBuffer
  type GeneratePrimeOptionsBigInt = import('node:crypto').GeneratePrimeOptionsBigInt
  type Hash = import('node:crypto').Hash
  type HashOptions = import('node:crypto').HashOptions
  type Hmac = import('node:crypto').Hmac
  type JsonWebKey = import('node:crypto').JsonWebKey
  type JsonWebKeyInput = import('node:crypto').JsonWebKeyInput
  type JwkKeyExportOptions = import('node:crypto').JwkKeyExportOptions
  type KeyExportOptions = import('node:crypto').KeyExportOptions<any>
  type KeyFormat = import('node:crypto').KeyFormat
  type KeyLike = import('node:crypto').KeyLike
  type KeyObject = import('node:crypto').KeyObject
  type KeyObjectType = import('node:crypto').KeyObjectType
  type KeyPairKeyObjectResult = import('node:crypto').KeyPairKeyObjectResult
  type KeyPairSyncResult = import('node:crypto').KeyPairSyncResult<any, any>
  type KeyType = import('node:crypto').KeyType
  type LargeNumberLike = import('node:crypto').LargeNumberLike
  type LegacyCharacterEncoding = import('node:crypto').LegacyCharacterEncoding
  type PrivateKeyInput = import('node:crypto').PrivateKeyInput
  type PublicKeyInput = import('node:crypto').PublicKeyInput
  type RandomUUIDOptions = import('node:crypto').RandomUUIDOptions
  type RSAKeyPairKeyObjectOptions = import('node:crypto').RSAKeyPairKeyObjectOptions
  type RSAKeyPairOptions = import('node:crypto').RSAKeyPairOptions<any, any>
  type RsaPrivateKey = import('node:crypto').RsaPrivateKey
  type RSAPSSKeyPairKeyObjectOptions = import('node:crypto').RSAPSSKeyPairKeyObjectOptions
  type RSAPSSKeyPairOptions = import('node:crypto').RSAPSSKeyPairOptions<any, any>
  type RsaPublicKey = import('node:crypto').RsaPublicKey
  type ScryptOptions = import('node:crypto').ScryptOptions
  type SecureHeapUsage = import('node:crypto').SecureHeapUsage
  type Sign = import('node:crypto').Sign
  type SigningOptions = import('node:crypto').SigningOptions
  type SignKeyObjectInput = import('node:crypto').SignKeyObjectInput
  type SignPrivateKeyInput = import('node:crypto').SignPrivateKeyInput
  type Verify = import('node:crypto').Verify
  type VerifyKeyObjectInput = import('node:crypto').VerifyKeyObjectInput
  type VerifyPublicKeyInput = import('node:crypto').VerifyPublicKeyInput
  // type webcrypto = import('node:crypto').webcrypto
  type X448KeyPairKeyObjectOptions = import('node:crypto').X448KeyPairKeyObjectOptions
  type X448KeyPairOptions = import('node:crypto').X448KeyPairOptions<any, any>
  type X509Certificate = import('node:crypto').X509Certificate
  type X509CheckOptions = import('node:crypto').X509CheckOptions
  type X25519KeyPairKeyObjectOptions = import('node:crypto').X25519KeyPairKeyObjectOptions
  type X25519KeyPairOptions = import('node:crypto').X25519KeyPairOptions<any, any>
}

declare namespace DataGram {
  type BindOptions = import('node:dgram').BindOptions
  type RemoteInfo = import('node:dgram').RemoteInfo
  type Socket = import('node:dgram').Socket
  type SocketOptions = import('node:dgram').SocketOptions
  type SocketType = import('node:dgram').SocketType
}

declare namespace DiagnosticsChannel {
  type Channel = import('node:diagnostics_channel').Channel
  type ChannelListener = import('node:diagnostics_channel').ChannelListener
}

declare namespace Dns {
  type AnyAaaaRecord = import('node:dns').AnyAaaaRecord
  type AnyARecord = import('node:dns').AnyARecord
  type AnyCnameRecord = import('node:dns').AnyCnameRecord
  type AnyMxRecord = import('node:dns').AnyMxRecord
  type AnyNaptrRecord = import('node:dns').AnyNaptrRecord
  type AnyNsRecord = import('node:dns').AnyNsRecord
  type AnyPtrRecord = import('node:dns').AnyPtrRecord
  type AnyRecord = import('node:dns').AnyRecord
  type AnyRecordWithTtl = import('node:dns').AnyRecordWithTtl
  type AnySoaRecord = import('node:dns').AnySoaRecord
  type AnySrvRecord = import('node:dns').AnySrvRecord
  type AnyTxtRecord = import('node:dns').AnyTxtRecord
  type CaaRecord = import('node:dns').CaaRecord
  type LookupAddress = import('node:dns').LookupAddress
  type LookupAllOptions = import('node:dns').LookupAllOptions
  type LookupOneOptions = import('node:dns').LookupOneOptions
  type LookupOptions = import('node:dns').LookupOptions
  type MxRecord = import('node:dns').MxRecord
  type NaptrRecord = import('node:dns').NaptrRecord
  // type promises = import('node:dns').promises
  type RecordWithTtl = import('node:dns').RecordWithTtl
  type ResolveOptions = import('node:dns').ResolveOptions
  type Resolver = import('node:dns').Resolver
  type ResolverOptions = import('node:dns').ResolverOptions
  type ResolveWithTtlOptions = import('node:dns').ResolveWithTtlOptions
  type SoaRecord = import('node:dns').SoaRecord
  type SrvRecord = import('node:dns').SrvRecord

  // dns/promises
  type ResolverPromise = import('node:dns/promises').Resolver
}

declare namespace Domain {
  type Domain = import('node:domain').Domain
}

declare namespace Events {
  type Abortable = import('node:events').Abortable
  type EventEmitter = import('node:events').EventEmitter
}

declare namespace FileSystem {
  type BigIntOptions = import('node:fs').BigIntOptions
  type BigIntStats = import('node:fs').BigIntStats
  type BufferEncodingOption = import('node:fs').BufferEncodingOption
  type CopyOptions = import('node:fs').CopyOptions
  type Dir = import('node:fs').Dir
  type Dirent = import('node:fs').Dirent
  type EncodingOption = import('node:fs').EncodingOption
  type FSWatcher = import('node:fs').FSWatcher
  type MakeDirectoryOptions = import('node:fs').MakeDirectoryOptions
  type Mode = import('node:fs').Mode
  type NoParamCallback = import('node:fs').NoParamCallback
  type ObjectEncodingOptions = import('node:fs').ObjectEncodingOptions
  type OpenDirOptions = import('node:fs').OpenDirOptions
  type OpenMode = import('node:fs').OpenMode
  type PathLike = import('node:fs').PathLike
  type PathOrFileDescriptor = import('node:fs').PathOrFileDescriptor
  // type promises = import('node:fs').promises
  type ReadPosition = import('node:fs').ReadPosition
  type ReadStream = import('node:fs').ReadStream
  type ReadSyncOptions = import('node:fs').ReadSyncOptions
  type ReadVResult = import('node:fs').ReadVResult
  type RmDirOptions = import('node:fs').RmDirOptions
  type RmOptions = import('node:fs').RmOptions
  type StatOptions = import('node:fs').StatOptions
  type Stats = import('node:fs').Stats
  type StatsBase = import('node:fs').StatsBase<any>
  type StatSyncFn = import('node:fs').StatSyncFn
  type StatSyncOptions = import('node:fs').StatSyncOptions
  type StatWatcher = import('node:fs').StatWatcher
  // type symlink = import('node:fs').symlink
  type TimeLike = import('node:fs').TimeLike
  type WatchEventType = import('node:fs').WatchEventType
  type WatchFileOptions = import('node:fs').WatchFileOptions
  type WatchListener = import('node:fs').WatchListener<any>
  type WatchOptions = import('node:fs').WatchOptions
  type WriteFileOptions = import('node:fs').WriteFileOptions
  type WriteStream = import('node:fs').WriteStream
  type WriteVResult = import('node:fs').WriteVResult

  // fs/promises
  type CreateReadStreamOptions = import('node:fs/promises').CreateReadStreamOptions
  type CreateWriteStreamOptions = import('node:fs/promises').CreateWriteStreamOptions
  type FileChangeInfo = import('node:fs/promises').FileChangeInfo<any>
  type FileHandle = import('node:fs/promises').FileHandle
  type FileReadOptions = import('node:fs/promises').FileReadOptions
  type FileReadResult = import('node:fs/promises').FileReadResult<any>
  type FlagAndOpenMode = import('node:fs/promises').FlagAndOpenMode
}

/*
declare namespace Globals {
  type AbortController = globalThis.AbortController
  type AbortSignal = globalThis.AbortSignal
}
*/

declare namespace Http {
  type Agent = import('node:http').Agent
  type AgentOptions = import('node:http').AgentOptions
  type ClientRequest = import('node:http').ClientRequest
  type ClientRequestArgs = import('node:http').ClientRequestArgs
  type IncomingHttpHeaders = import('node:http').IncomingHttpHeaders
  type IncomingMessage = import('node:http').IncomingMessage
  type InformationEvent = import('node:http').InformationEvent
  type OutgoingHttpHeader = import('node:http').OutgoingHttpHeader
  type OutgoingHttpHeaders = import('node:http').OutgoingHttpHeaders
  type OutgoingMessage = import('node:http').OutgoingMessage
  type RequestListener = import('node:http').RequestListener
  type RequestOptions = import('node:http').RequestOptions
  type Server = import('node:http').Server
  type ServerOptions = import('node:http').ServerOptions
  type ServerResponse = import('node:http').ServerResponse
}

declare namespace Http2 {
  type AlternativeServiceOptions = import('node:http2').AlternativeServiceOptions
  type ClientHttp2Session = import('node:http2').ClientHttp2Session
  type ClientHttp2Stream = import('node:http2').ClientHttp2Stream
  type ClientSessionOptions = import('node:http2').ClientSessionOptions
  type ClientSessionRequestOptions = import('node:http2').ClientSessionRequestOptions
  type Http2SecureServer = import('node:http2').Http2SecureServer
  type Http2Server = import('node:http2').Http2Server
  type Http2ServerRequest = import('node:http2').Http2ServerRequest
  type Http2ServerResponse = import('node:http2').Http2ServerResponse
  type Http2Session = import('node:http2').Http2Session
  type Http2Stream = import('node:http2').Http2Stream
  type IncomingHttpHeaders = import('node:http2').IncomingHttpHeaders
  type IncomingHttpStatusHeader = import('node:http2').IncomingHttpStatusHeader
  type OutgoingHttpHeaders = import('node:http2').OutgoingHttpHeaders
  type SecureClientSessionOptions = import('node:http2').SecureClientSessionOptions
  type SecureServerOptions = import('node:http2').SecureServerOptions
  type SecureServerSessionOptions = import('node:http2').SecureServerSessionOptions
  type ServerHttp2Session = import('node:http2').ServerHttp2Session
  type ServerHttp2Stream = import('node:http2').ServerHttp2Stream
  type ServerOptions = import('node:http2').ServerOptions
  type ServerSessionOptions = import('node:http2').ServerSessionOptions
  type ServerStreamFileResponseOptions = import('node:http2').ServerStreamFileResponseOptions
  type ServerStreamFileResponseOptionsWithError = import('node:http2').ServerStreamFileResponseOptionsWithError
  type ServerStreamResponseOptions = import('node:http2').ServerStreamResponseOptions
  type SessionOptions = import('node:http2').SessionOptions
  type SessionState = import('node:http2').SessionState
  type Settings = import('node:http2').Settings
  type StatOptions = import('node:http2').StatOptions
  type StreamPriorityOptions = import('node:http2').StreamPriorityOptions
  type StreamState = import('node:http2').StreamState
}

declare namespace Https {
  type Agent = import('node:https').Agent
  type AgentOptions = import('node:https').AgentOptions
  type RequestOptions = import('node:https').RequestOptions
  type Server = import('node:https').Server
  type ServerOptions = import('node:https').ServerOptions
}

declare namespace Inspector {
  type InspectorNotification = import('node:inspector').InspectorNotification<any>
  type Session = import('node:inspector').Session
}

declare namespace Module {
  type SourceMap = import('node:module').SourceMap
  type SourceMapPayload = import('node:module').SourceMapPayload
  type SourceMapping = import('node:module').SourceMapping
}

declare namespace Net {
  type AddressInfo = import('node:net').AddressInfo
  type BlockList = import('node:net').BlockList
  type ConnectOpts = import('node:net').ConnectOpts
  type IpcNetConnectOpts = import('node:net').IpcNetConnectOpts
  type IpcSocketConnectOpts = import('node:net').IpcSocketConnectOpts
  type IPVersion = import('node:net').IPVersion
  type ListenOptions = import('node:net').ListenOptions
  type LookupFunction = import('node:net').LookupFunction
  type NetConnectOpts = import('node:net').NetConnectOpts
  type OnReadOpts = import('node:net').OnReadOpts
  type Server = import('node:net').Server
  type ServerOpts = import('node:net').ServerOpts
  type Socket = import('node:net').Socket
  type SocketAddress = import('node:net').SocketAddress
  type SocketAddressInitOptions = import('node:net').SocketAddressInitOptions
  type SocketConnectOpts = import('node:net').SocketConnectOpts
  type SocketConstructorOpts = import('node:net').SocketConstructorOpts
  type TcpNetConnectOpts = import('node:net').TcpNetConnectOpts
  type TcpSocketConnectOpts = import('node:net').TcpSocketConnectOpts
}

declare namespace Os {
  type CpuInfo = import('node:os').CpuInfo
  type NetworkInterfaceBase = import('node:os').NetworkInterfaceBase
  type NetworkInterfaceInfo = import('node:os').NetworkInterfaceInfo
  type NetworkInterfaceInfoIPv4 = import('node:os').NetworkInterfaceInfoIPv4
  type NetworkInterfaceInfoIPv6 = import('node:os').NetworkInterfaceInfoIPv6
  type SignalConstants = import('node:os').SignalConstants
  type UserInfo = import('node:os').UserInfo<any>
}

declare namespace Path {
  type FormatInputPathObject = import('node:path').FormatInputPathObject
  type ParsedPath = import('node:path').ParsedPath
  type PlatformPath = import('node:path').PlatformPath
}

declare namespace PerfHooks {
  type CreateHistogramOptions = import('node:perf_hooks').CreateHistogramOptions
  type EntryType = import('node:perf_hooks').EntryType
  type EventLoopMonitorOptions = import('node:perf_hooks').EventLoopMonitorOptions
  type EventLoopUtilityFunction = import('node:perf_hooks').EventLoopUtilityFunction
  type EventLoopUtilization = import('node:perf_hooks').EventLoopUtilization
  type Histogram = import('node:perf_hooks').Histogram
  type IntervalHistogram = import('node:perf_hooks').IntervalHistogram
  type MarkOptions = import('node:perf_hooks').MarkOptions
  type MeasureOptions = import('node:perf_hooks').MeasureOptions
  type NodeGCPerformanceDetail = import('node:perf_hooks').NodeGCPerformanceDetail
  type Performance = import('node:perf_hooks').Performance
  type PerformanceEntry = import('node:perf_hooks').PerformanceEntry
  type PerformanceNodeTiming = import('node:perf_hooks').PerformanceNodeTiming
  type PerformanceObserver = import('node:perf_hooks').PerformanceObserver
  type PerformanceObserverCallback = import('node:perf_hooks').PerformanceObserverCallback
  type PerformanceObserverEntryList = import('node:perf_hooks').PerformanceObserverEntryList
  type RecordableHistogram = import('node:perf_hooks').RecordableHistogram
  type TimerifyOptions = import('node:perf_hooks').TimerifyOptions
}

declare namespace Process {
}

declare namespace Punycode {
  type ucs2 = import('node:punycode').ucs2
}

declare namespace QueryString {
  type ParsedUrlQuery = import('node:querystring').ParsedUrlQuery
  type ParsedUrlQueryInput = import('node:querystring').ParsedUrlQueryInput
  type ParseOptions = import('node:querystring').ParseOptions
  type StringifyOptions = import('node:querystring').StringifyOptions
}

declare namespace Readline {
  type AsyncCompleter = import('node:readline').AsyncCompleter
  type Completer = import('node:readline').Completer
  type CompleterResult = import('node:readline').CompleterResult
  type CursorPos = import('node:readline').CursorPos
  type Direction = import('node:readline').Direction
  type Interface = import('node:readline').Interface
  type Key = import('node:readline').Key
  type ReadLine = import('node:readline').ReadLine
  type ReadLineOptions = import('node:readline').ReadLineOptions
}

declare namespace Repl {
  type Recoverable = import('node:repl').Recoverable
  type REPLCommand = import('node:repl').REPLCommand
  type REPLCommandAction = import('node:repl').REPLCommandAction
  type REPLEval = import('node:repl').REPLEval
  type ReplOptions = import('node:repl').ReplOptions
  type REPLServer = import('node:repl').REPLServer
  type REPLWriter = import('node:repl').REPLWriter
}

declare namespace Stream {
  type Duplex = import('node:stream').Duplex
  type DuplexOptions = import('node:stream').DuplexOptions
  type FinishedOptions = import('node:stream').FinishedOptions
  type PassThrough = import('node:stream').PassThrough
  type Pipe = import('node:stream').Pipe
  type PipelineCallback = import('node:stream').PipelineCallback<any>
  type PipelineDestination = import('node:stream').PipelineDestination<any, any>
  type PipelineDestinationIterableFunction = import('node:stream').PipelineDestinationIterableFunction<any>
  type PipelineDestinationPromiseFunction = import('node:stream').PipelineDestinationPromiseFunction<any, any>
  type PipelineOptions = import('node:stream').PipelineOptions
  type PipelinePromise = import('node:stream').PipelinePromise<any>
  type PipelineSource = import('node:stream').PipelineSource<any>
  type PipelineSourceFunction = import('node:stream').PipelineSourceFunction<any>
  type PipelineTransform = import('node:stream').PipelineTransform<any, any>
  type PipelineTransformSource = import('node:stream').PipelineTransformSource<any>
  type Readable = import('node:stream').Readable
  type ReadableOptions = import('node:stream').ReadableOptions
  type Stream = import('node:stream').Stream
  type StreamOptions = import('node:stream').StreamOptions<any>
  type Transform = import('node:stream').Transform
  type TransformCallback = import('node:stream').TransformCallback
  type TransformOptions = import('node:stream').TransformOptions
  type Writable = import('node:stream').Writable
  type WritableOptions = import('node:stream').WritableOptions

  // stream/web
  type BufferSource = import('node:stream/web').BufferSource
  type ByteLengthQueuingStrategy = import('node:stream/web').ByteLengthQueuingStrategy
  type CountQueuingStrategy = import('node:stream/web').CountQueuingStrategy
  type QueuingStrategy = import('node:stream/web').QueuingStrategy
  type QueuingStrategyInit = import('node:stream/web').QueuingStrategyInit
  type QueuingStrategySize = import('node:stream/web').QueuingStrategySize
  type ReadableByteStreamController = import('node:stream/web').ReadableByteStreamController
  type ReadableByteStreamControllerCallback = import('node:stream/web').ReadableByteStreamControllerCallback
  type ReadableStream = import('node:stream/web').ReadableStream
  type ReadableStreamController = import('node:stream/web').ReadableStreamController<any>
  type ReadableStreamDefaultController = import('node:stream/web').ReadableStreamDefaultController
  type ReadableStreamDefaultReadDoneResult = import('node:stream/web').ReadableStreamDefaultReadDoneResult
  type ReadableStreamDefaultReader = import('node:stream/web').ReadableStreamDefaultReader
  type ReadableStreamDefaultReadResult = import('node:stream/web').ReadableStreamDefaultReadResult<any>
  type ReadableStreamDefaultReadValueResult = import('node:stream/web').ReadableStreamDefaultReadValueResult<any>
  type ReadableStreamErrorCallback = import('node:stream/web').ReadableStreamErrorCallback
  type ReadableStreamGenericReader = import('node:stream/web').ReadableStreamGenericReader
  type ReadableWritablePair = import('node:stream/web').ReadableWritablePair
  type StreamPipeOptions = import('node:stream/web').StreamPipeOptions
  type TextDecoderOptions = import('node:stream/web').TextDecoderOptions
  type TextDecoderStream = import('node:stream/web').TextDecoderStream
  type TextEncoderStream = import('node:stream/web').TextEncoderStream
  type Transformer = import('node:stream/web').Transformer
  type TransformerFlushCallback = import('node:stream/web').TransformerFlushCallback<any>
  type TransformerStartCallback = import('node:stream/web').TransformerStartCallback<any>
  type TransformerTransformCallback = import('node:stream/web').TransformerTransformCallback<any, any>
  type TransformStream = import('node:stream/web').TransformStream
  type TransformStreamDefaultController = import('node:stream/web').TransformStreamDefaultController
  type UnderlyingByteSource = import('node:stream/web').UnderlyingByteSource
  type UnderlyingSink = import('node:stream/web').UnderlyingSink
  type UnderlyingSinkAbortCallback = import('node:stream/web').UnderlyingSinkAbortCallback
  type UnderlyingSinkCloseCallback = import('node:stream/web').UnderlyingSinkCloseCallback
  type UnderlyingSinkStartCallback = import('node:stream/web').UnderlyingSinkStartCallback
  type UnderlyingSinkWriteCallback = import('node:stream/web').UnderlyingSinkWriteCallback<any>
  type UnderlyingSource = import('node:stream/web').UnderlyingSource
  type UnderlyingSourceCancelCallback = import('node:stream/web').UnderlyingSourceCancelCallback
  type UnderlyingSourcePullCallback = import('node:stream/web').UnderlyingSourcePullCallback<any>
  type UnderlyingSourceStartCallback = import('node:stream/web').UnderlyingSourceStartCallback<any>
  type WritableStream = import('node:stream/web').WritableStream
  type WritableStreamDefaultController = import('node:stream/web').WritableStreamDefaultController
  type WritableStreamDefaultWriter = import('node:stream/web').WritableStreamDefaultWriter
}

declare namespace StringDecoder {
  type StringDecoder = import('node:string_decoder').StringDecoder
}

declare namespace Timers {
  type TimerOptions = import('node:timers').TimerOptions
}

declare namespace Tls {
  type Certificate = import('node:tls').Certificate
  type CipherNameAndProtocol = import('node:tls').CipherNameAndProtocol
  type CommonConnectionOptions = import('node:tls').CommonConnectionOptions
  type ConnectionOptions = import('node:tls').ConnectionOptions
  type DetailedPeerCertificate = import('node:tls').DetailedPeerCertificate
  type EphemeralKeyInfo = import('node:tls').EphemeralKeyInfo
  type KeyObject = import('node:tls').KeyObject
  type PeerCertificate = import('node:tls').PeerCertificate
  type PSKCallbackNegotation = import('node:tls').PSKCallbackNegotation
  type PxfObject = import('node:tls').PxfObject
  type SecureContext = import('node:tls').SecureContext
  type SecureContextOptions = import('node:tls').SecureContextOptions
  type SecurePair = import('node:tls').SecurePair
  type SecureVersion = import('node:tls').SecureVersion
  type Server = import('node:tls').Server
  type TlsOptions = import('node:tls').TlsOptions
  type TLSSocket = import('node:tls').TLSSocket
  type TLSSocketOptions = import('node:tls').TLSSocketOptions
}

declare namespace TraceEvents {
  type CreateTracingOptions = import('node:trace_events').CreateTracingOptions
  type Tracing = import('node:trace_events').Tracing
}

declare namespace Tty {
  type Direction = import('node:tty').Direction
  type ReadStream = import('node:tty').ReadStream
  type WriteStream = import('node:tty').WriteStream
}

declare namespace Url {
  type URL = import('node:url').URL
  type Url = import('node:url').Url
  type URLFormatOptions = import('node:url').URLFormatOptions
  type UrlObject = import('node:url').UrlObject
  type URLSearchParams = import('node:url').URLSearchParams
  type UrlWithParsedQuery = import('node:url').UrlWithParsedQuery
  type UrlWithStringQuery = import('node:url').UrlWithStringQuery
}

declare namespace Util {
  type CustomInspectFunction = import('node:util').CustomInspectFunction
  type CustomPromisify = import('node:util').CustomPromisify<any>
  type CustomPromisifyLegacy = import('node:util').CustomPromisifyLegacy<any>
  type CustomPromisifySymbol = import('node:util').CustomPromisifySymbol<any>
  type DebugLogger = import('node:util').DebugLogger
  type DebugLoggerFunction = import('node:util').DebugLoggerFunction
  type EncodeIntoResult = import('node:util').EncodeIntoResult
  type InspectOptions = import('node:util').InspectOptions
  type InspectOptionsStylized = import('node:util').InspectOptionsStylized
  type Style = import('node:util').Style
  type TextDecoder = import('node:util').TextDecoder
  type TextEncoder = import('node:util').TextEncoder
}

declare namespace V8 {
  type DefaultDeserializer = import('node:v8').DefaultDeserializer
  type DefaultSerializer = import('node:v8').DefaultSerializer
  type Deserializer = import('node:v8').Deserializer
  type DoesZapCodeSpaceFlag = import('node:v8').DoesZapCodeSpaceFlag
  type HeapCodeStatistics = import('node:v8').HeapCodeStatistics
  type HeapInfo = import('node:v8').HeapInfo
  type HeapSpaceInfo = import('node:v8').HeapSpaceInfo
  type Serializer = import('node:v8').Serializer
}

declare namespace Vm {
  type BaseOptions = import('node:vm').BaseOptions
  type CompileFunctionOptions = import('node:vm').CompileFunctionOptions
  type Context = import('node:vm').Context
  type CreateContextOptions = import('node:vm').CreateContextOptions
  type MeasureMemoryMode = import('node:vm').MeasureMemoryMode
  type MeasureMemoryOptions = import('node:vm').MeasureMemoryOptions
  type MemoryMeasurement = import('node:vm').MemoryMeasurement
  type RunningScriptOptions = import('node:vm').RunningScriptOptions
  type Script = import('node:vm').Script
  type ScriptOptions = import('node:vm').ScriptOptions
}

declare namespace Wasi {
  type WASI = import('node:wasi').WASI
  type WASIOptions = import('node:wasi').WASIOptions
}

declare namespace WorkerThreads {
  type BroadcastChannel = import('node:worker_threads').BroadcastChannel
  type MessageChannel = import('node:worker_threads').MessageChannel
  type MessagePort = import('node:worker_threads').MessagePort
  type ResourceLimits = import('node:worker_threads').ResourceLimits
  type Serializable = import('node:worker_threads').Serializable
  type TransferListItem = import('node:worker_threads').TransferListItem
  type Worker = import('node:worker_threads').Worker
  type WorkerOptions = import('node:worker_threads').WorkerOptions
  type WorkerPerformance = import('node:worker_threads').WorkerPerformance
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
