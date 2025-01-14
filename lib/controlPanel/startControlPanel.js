import { WorkersManager } from '../workersManager/WorkersManager.js'
import { store } from './WorkersManagerProxy.js'

/**
 * @param {WorkersManager} workersManager
 * @returns {Promise<void>}
 */
export async function startControlPanel(workersManager) {
  await workersManager.startControlPanel()
  store.workersManager = workersManager
}
