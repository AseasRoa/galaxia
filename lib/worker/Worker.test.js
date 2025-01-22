import os from 'node:os'
import path from 'node:path'
import { afterAll, afterEach, beforeEach, describe, expect, test } from 'vitest'
import { ensureDir, remove } from '../functions/fileSystem.js'
import { Worker } from './Worker.js'

const outputDir = path.join(os.tmpdir(), 'galaxia-test-app')

describe('Worker starter', () => {
  beforeEach(async() => {
    await ensureDir(outputDir, 'app', 'modules')
  })

  afterEach(async() => {
    await remove(outputDir)
  })

  afterAll(() => {
    // process.exit()
  })

  test('should start and stop a server in development mode', async() => {
    const worker = new Worker({
      appPath: outputDir,
      devMode: true,
      heartbeatInterval: 1000,
      showInitialMessages: true
    })

    const servers = await worker.start()

    expect(servers.length).toBe(1)

    await worker.stop()
  })

  test('should start and stop a server in production mode', async() => {
    const worker = new Worker({
      appPath: outputDir,
      devMode: false,
      heartbeatInterval: 1000,
      showInitialMessages: true
    })

    const servers = await worker.start()

    expect(servers.length).toBe(1)

    await worker.stop()
  })
})
