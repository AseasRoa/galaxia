import { EventEmitter } from 'events'
import { isRouterFile, pathSplit } from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'

class FileManagerServerJS extends EventEmitter {
  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {AppFileManagers} */
  appFileManagers

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    super()

    this.appConfig = appConfig
    this.appPaths = appPaths
    this.appFileManagers = appFileManagers

    this.#initialize()
  }

  /**
   * @returns {void}
   */
  #initialize() {
    if (this.appConfig.development) {
      this.#watchForFileChanges()
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.appConfig.development) return

    const { routesDirName, serverFilesDirName } = this.appConfig.pathNames
    const componentsDir = this.appPaths.components

    /**
     * @param {string} fullPath
     * @returns {void}
     */
    const watcherCallback = (fullPath) => {
      const relativePath = fullPath.replace(componentsDir, '')
      const pathParts = pathSplit(relativePath)
      const isRouter = isRouterFile(relativePath, routesDirName)

      if (!isRouter && (pathParts[1] ?? '') === serverFilesDirName) {
        this.emit('updatedServerSideJs', 'server', fullPath)
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.componentsDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerServerJS }