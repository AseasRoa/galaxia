// Server Types
type HttpRequest = import('../lib/types/server').HttpRequest
type HttpResponse = import('../lib/types/server').HttpResponse
type HttpExchange = import('../lib/types/server').HttpExchange
// Server Types (Aliases)
type Request = import('../lib/types/server').HttpRequest
type Response = import('../lib/types/server').HttpResponse
type Exchange = import('../lib/types/server').HttpExchange

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
