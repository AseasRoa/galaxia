import { EventEmitter } from 'events'
import { parse, sep } from 'node:path'
import { dirExists, readDir } from '../functions/fileSystem.js'
import {
  isRoutesFile,
  isViewFile,
  pathSplit
} from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'
import { applyTemplate, compileFile } from './viewCompilers/viewCompilers.js'

class FileManagerServerJS extends EventEmitter {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {Map<string, { ext: string, template: Function | null }>} */
  #viewsCache = new Map()

  #supportedViewExtensions = [
    '.html', '.md', '.ejs', '.pug', '.handlebars'
  ]

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    super()

    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers

    this.#initialize()
  }

  /**
   * @param {string} moduleName
   * @param {string} viewName
   * @param {Object<*,*>} data
   * @returns {Promise<string>}
   */
  async applyView(moduleName, viewName, data) {
    const viewKey = this.#makeViewKey(moduleName, viewName)
    let record = this.#viewsCache.get(viewKey)

    if (record === undefined) {
      record = { ext: '', template: null }

      const dir
        = this.#appPaths.modules + sep
        + moduleName + sep
        + this.#appConfig.dirNames.views

      if (!(await dirExists(dir))) {
        return ''
      }

      const scanDir = await readDir(dir)

      for (const fileName of scanDir) {
        const inputFile = dir + sep + fileName
        const parsedPath = parse(inputFile)

        if (parsedPath.name === viewName) {
          if (this.#supportedViewExtensions.includes(parsedPath.ext)) {
            record.ext = parsedPath.ext
            record.template = await compileFile(inputFile)

            break
          }
        }
      }

      this.#viewsCache.set(viewKey, record)
    }

    if (record && record.template) {
      const html = await applyTemplate(record.ext, record.template, data)

      return html
    }

    return ''
  }

  /**
   * Render all raw files into output .js files
   *
   * @param {string} moduleName
   * @returns {Promise<void>}
   * @throws
   * An error if the module dir doesn't exist
   */
  async renderModule(moduleName) {
    const inputDir = this.#appPaths.modules
    const moduleDir = inputDir + sep + moduleName

    if (!(await dirExists(moduleDir))) {
      throw new Error(`Module directory "${moduleDir}" doesn't exist.`)
    }
  }

  /**
   * @returns {void}
   */
  #initialize() {
    if (this.#appConfig.development) {
      this.#watchForFileChanges()
    }
  }

  /**
   * @param {string} moduleName
   * @param {string} viewName
   * @returns {string}
   */
  #makeViewKey(moduleName, viewName) {
    return moduleName + '|' + viewName
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.#appConfig.development) return

    const modulesDir = this.#appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {void}
     */
    const watcherCallback = (fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')
      const pathParts = pathSplit(relativePath)
      const isRoutes = isRoutesFile(
        relativePath,
        this.#appConfig.dirNames.routes
      )
      const isView = isViewFile(
        relativePath,
        this.#appConfig.dirNames.views,
        this.#supportedViewExtensions
      )

      if (
        !isRoutes
        && !isView
        && (
          (pathParts[1] ?? '') === this.#appConfig.dirNames.server
          || (pathParts[1] ?? '') === this.#appConfig.dirNames.i18n
        )
      ) {
        this.emit('file', 'server', fullPath)
      }

      if (isView) {
        if (pathParts.length >= 3) {
          const parsedPath = parse(fullPath)
          const viewKey = this.#makeViewKey(pathParts[0] ?? '', parsedPath.name)

          this.#viewsCache.delete(viewKey)

          this.emit('updatedServerSideView', 'view', fullPath)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerServerJS }
