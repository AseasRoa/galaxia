import console from 'node:console'
import path from 'node:path'
import url from 'node:url'
import { Worker } from '../worker/Worker.js'
import { WorkersManager } from './WorkersManager.js'

const currentFilename = url.fileURLToPath(import.meta.url)
const currentDirname = path.dirname(currentFilename)

/**
 * This value must be set before the class is used
 *
 * @type {WorkersManager | null}
 */
let workersManager = null

/**
 * @param {WorkersManager} manager
 */
async function startRemoteController(manager) {
  workersManager = manager

  const worker = new Worker({
    appPath: path.join(path.dirname(currentDirname), 'controlPanel'),
    devMode: false, // manager.development,
    heartbeatInterval: 1000,
    showInitialMessages: true
  })

  await worker.start()
}

/**
 * @param {string} message
 */
function print(message) {
  process.stdout.write(`\n${message}\n`)
}

class WorkersManagerRemoteController {
  /**
   *
   */
  constructor() {
    if (!workersManager) {
      // throw new Error(`Workers Manager is not set`)
    }
  }

  /**
   * @returns {WorkersManager | null}
   */
  get workersManager() {
    return workersManager
  }

  /**
   * @returns {Promise<boolean>}
   */
  async restartWorkers() {
    if (!workersManager) {
      throw new Error('workersManager must be set')
    }

    if (workersManager.isRestarting) {
      print('The server is currently restarting!')

      return false
    }

    print(
      'RESTARTING SERVER (please wait until you see "SERVER RESTARTED").'
    )

    const result = await workersManager.restartWorkers()

    if (result) {
      print('SERVER RESTARTED')
    }
    else {
      console.error('SERVER FAILED TO RESTART')
    }

    return result
  }

  /**
   * @returns {Promise<void>}
   */
  async shutDownWorkers() {
    if (!workersManager) {
      throw new Error('workersManager must be set')
    }

    print('SHUTTING DOWN SERVER (please wait until you see "SERVER DOWN").')

    await workersManager.shutDownWorkers()

    print('SERVER DOWN')
  }

  /**
   * @returns {(
   *  Promise<Array<{workerId: number, memoryUsage: NodeJS.MemoryUsage}>>
   * )}
   */
  async workersMemoryUsage() {
    if (!workersManager) {
      throw new Error('workersManager must be set')
    }

    return workersManager.workersStats()
  }
}

export { WorkersManagerRemoteController, startRemoteController }
