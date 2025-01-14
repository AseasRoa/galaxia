import { Routes } from './app/routes/Routes.js'
import { startControlPanel } from './controlPanel/startControlPanel.js'
import fs from './functions/fileSystem.js'
import { isNodeJSVersionAtLeast } from './functions/utils.js'
import { HttpContext } from './server/HttpContext.js'
import { HttpRequest } from './server/HttpRequest.js'
import { HttpResponse } from './server/HttpResponse.js'
import { WorkersManager } from './workersManager/WorkersManager.js'

/**
 * @param {number} major
 * @param {number} minor
 * @param {number} patch
 * @throws
 */
function nodeJSValidate(major, minor, patch) {
  if (!isNodeJSVersionAtLeast(major, minor, patch)) {
    throw new Error(
      `NodeJS is old. At least version ${major}.${minor}.${patch} is required.`
    )
  }
}

/**
 * @see https://node.green/
 * 16.8.0 version because of .at()
 */
nodeJSValidate(16, 8, 0)

/** @type {WorkersManager | null} */
let workersManager = null

/**
 * Restart the service.
 *
 * @returns {Promise<void>}
 */
async function restart() {
  if (!workersManager) {
    throw new Error('Not started')
  }

  await workersManager.restartWorkers()
}

/**
 * Start the service. If it's already started, it will be restarted.
 *
 * @param {GalaxiaOptions} [options]
 * @returns {Promise<void>}
 */
async function start(options) {
  if (workersManager) {
    await restart()

    return
  }

  workersManager = new WorkersManager(options)

  await workersManager.start()

  if (workersManager.options.useCluster) {
    await startControlPanel(workersManager)
  }
}

export {
  fs, HttpContext, HttpRequest, HttpResponse, restart, Routes, start
}

export default {
  fs, HttpContext, HttpRequest, HttpResponse, restart, Routes, start
}
