import console from 'node:console'
import { WorkersManager } from '../workersManager/WorkersManager.js'

/**
 * This value must be set before the class instantiation
 *
 * @type {{ workersManager: WorkersManager | null }}
 */
const store = { workersManager: null }

/**
 * @param {string} message
 * @returns {void}
 */
function print(message) {
  process.stdout.write(`\n${message}\n`)
}

class WorkersManagerProxy {
  /** @type {WorkersManager} */
  #workersManager

  constructor() {
    if (!store.workersManager) {
      throw new Error('Workers manager must be set')
    }

    this.#workersManager = store.workersManager
  }

  /**
   * @returns {WorkersManager | null}
   */
  get workersManager() {
    return this.#workersManager
  }

  /**
   * @returns {Promise<boolean>}
   */
  async restartWorkers() {
    if (this.#workersManager.isRestarting) {
      print('The server is currently restarting!')

      return false
    }

    print(
      'RESTARTING SERVER (please wait until you see "SERVER RESTARTED").'
    )

    const result = await this.#workersManager.restartWorkers()

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
    print('SHUTTING DOWN SERVER (please wait until you see "SERVER DOWN").')
    await this.#workersManager.shutDownWorkers()
    print('SERVER DOWN')
  }

  /**
   * @returns {(
   *  Promise<Array<{workerId: number, memoryUsage: NodeJS.MemoryUsage}>>
   * )}
   */
  workersMemoryUsage() {
    return this.#workersManager.workersStats()
  }
}

export { store, WorkersManagerProxy }
