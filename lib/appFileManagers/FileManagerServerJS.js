import { EventEmitter } from 'events'
import { isRouterFile, pathSplit } from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'

class FileManagerServerJS extends EventEmitter {
  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {AppFileManagers} */
  appFileManagers

  /**
   * @param {app.FullConfig} appConfig
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

    const modulesDir = this.appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {void}
     */
    const watcherCallback = (fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')
      const pathParts = pathSplit(relativePath)
      const isRouter = isRouterFile(
        relativePath,
        this.appConfig.dirNames.routes
      )

      if (
        !isRouter
        && (
          (pathParts[1] ?? '') === this.appConfig.dirNames.server
          || (pathParts[1] ?? '') === this.appConfig.dirNames.i18n
        )
      ) {
        this.emit('updatedServerSideJs', 'server', fullPath)
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerServerJS }
