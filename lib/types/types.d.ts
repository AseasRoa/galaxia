/**
 * @see https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
 */

// https://nodejs.org/api/path.html#pathparsepath
type ParsedPath = import('path').ParsedPath

type TranslateFunction = (...args : string[]) => string

type CompressionAlgorithmName = '' | 'br' | 'deflate' | 'gzip'

type EnvironmentVariables = {
  // Absolute path of the app
  appPath : string,
  // Is development mode?
  devMode : boolean,
  // Worker heartbeat, in milliseconds
  heartbeatInterval : number,
  showInitialMessages : boolean
}

type CssFilesManagerConfig = {
  inputPathName : string,
  inputFileName : string,
  outputFileName : string
}

type WorkerStats = {
  workerId : number,
  workerPid : number,
  cpuUsage : NodeJS.CpuUsage,
  memoryUsage : NodeJS.MemoryUsage,
  server : ServerStats
}

type ServerStats = {
  requestsCount : number,
  connectionsCount : number,
  connectionsCountHttp1 : number,
  connectionsCountHttp2 : number
}
