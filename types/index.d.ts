import './exports/docschema.d.ts'
import './exports/paintor.d.ts'
import './exports/fileSystem.d.ts'
import './exports/db-mongo.d.ts'

// Server Types
type HttpRequest = import('../lib/types/server').HttpRequest
type HttpResponse = import('../lib/types/server').HttpResponse
type HttpExchange = import('../lib/types/server').HttpExchange
// Server Types (Aliases)
type Request = import('../lib/types/server').HttpRequest
type Response = import('../lib/types/server').HttpResponse
type Exchange = import('../lib/types/server').HttpExchange

declare module 'galaxia' {
  export function start(options: Galaxia.Options) : Promise<void>
  export function restart() : Promise<void>
  export { HttpExchange, HttpRequest, HttpResponse, Router } from '../lib/types/server'
}

declare namespace Galaxia {
  type Options = {
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

  // eslint-disable-next-line no-undef
  type Config = Partial<app.Config>

  type Request = import('../lib/types/server').HttpRequest
  type Response = import('../lib/types/server').HttpResponse
  type Exchange = import('../lib/types/server').HttpExchange
}
