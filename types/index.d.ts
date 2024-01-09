// Globals
import './global.d.ts'

// DocSchema
import './exports/docschema/global.d.ts'
import './exports/docschema.d.ts'

// Paintor
import './exports/paintor/global.d.ts'
import './exports/paintor.d.ts'

// FileSystem
import './exports/fileSystem.d.ts'

// Database
import './exports/db-mongo.d.ts'

declare module 'galaxia' {
  export function start(options: GalaxiaOptions) : Promise<void>
  export function restart() : Promise<void>
  export { HttpExchange, HttpRequest, HttpResponse, Router } from '../lib/types/server'
}

declare namespace Galaxia {
  type Options = GalaxiaOptions
  type Config = GalaxiaConfig

  type Request = import('../lib/types/server').HttpRequest
  type Response = import('../lib/types/server').HttpResponse
  type Exchange = import('../lib/types/server').HttpExchange
}
