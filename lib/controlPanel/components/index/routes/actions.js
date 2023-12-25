import {
  WorkersManagerRemoteController
} from '../../../../workersManager/WorkersManagerRemoteController.js'

const remoteController = new WorkersManagerRemoteController()

/**
 * @returns {Promise<void>}
 */
export async function restart() {
  await remoteController.restartWorkers()
}

/**
 * @returns {Promise<void>}
 */
export async function shutDownWorkers() {
  await remoteController.shutDownWorkers()
}

/**
 * @returns {Promise<number>}
 */
export async function workersCount() {
  return remoteController.workersManager?.workersCount() ?? 0
}

/**
 * @returns {Promise<WorkerStats[] | null>}
 */
export async function workersStats() {
  return (await remoteController.workersManager?.workersStats()) ?? null
}

export default {
  restart, shutDownWorkers, workersCount, workersStats
}
