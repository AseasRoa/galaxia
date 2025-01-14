import console from 'node:console'
import process from 'node:process'
import { Worker } from './Worker.js'

/**
 * This file should be run from cluster, which
 * provides the required environment variables
 */

const config = JSON.parse(process.env['galaxia'] ?? '{}')
const worker = new Worker(config)

try {
  await worker.start()
}
catch (error) {
  console.error(error)

  if (process.send) process.send({ cmd: 'shutDownWorker' })
}
