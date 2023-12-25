import console from 'node:console'
import { EventEmitter } from 'node:events'
import path from 'node:path'
import process from 'node:process'
import Watcher from 'watcher'
import {
  dirMtimeDeep,
  dirStats,
  ensureFile,
  fileExists,
  fileSize,
  readFile,
  remove
} from '../functions/fileSystem.js'
import { debounce } from '../functions/utils.js'
import { FileManagerCSS } from './FileManagerCSS.js'
import { FileManagerModules } from './FileManagerModules.js'
import { FileManagerPublicJS } from './FileManagerPublicJS.js'
import { FileManagerRoutesJS } from './FileManagerRoutesJS.js'
import { FileManagerServerJS } from './FileManagerServerJS.js'

/** @type {Map<string, {tag: string, url: string}>} */
const renderCacheForCss = new Map()

/** @type {Map<string, Map<string, {tag: string, url: string}>>} */
const renderCacheForJs = new Map()

class AppFileManagers extends EventEmitter {
  /** @type {Array<Map<string, string[]>>} */
  #depsMap = []

  /**
   * @type {{
   *   css: FileManagerCSS,
   *   routesJS: FileManagerRoutesJS,
   *   publicJS: FileManagerPublicJS,
   *   serverJS: FileManagerServerJS,
   *   modules: FileManagerModules
   * }}
   */
  #fileManagers

  /** @type {string} */
  #globalFilesVersion = ''

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {string} */
  componentsDir = ''

  /** @type {Watcher | null} */
  componentsDirWatcher = null

  /** @type {string} */
  outputDir = ''

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   */
  constructor(appConfig, appPaths) {
    super()

    this.appConfig = appConfig
    this.appPaths = appPaths
    this.componentsDir = this.appPaths.components
    this.outputDir = this.appPaths.output
    this.componentsDirWatcher = (this.appConfig.development)
      ? new Watcher(
        this.componentsDir,
        { debounce: 300, ignoreInitial: true, recursive: true }
      )
      : null

    this.#fileManagers = {
      css: new FileManagerCSS(this.appConfig, this.appPaths, this),
      publicJS: new FileManagerPublicJS(this.appConfig, this.appPaths, this),
      routesJS: new FileManagerRoutesJS(this.appConfig, this.appPaths, this),
      serverJS: new FileManagerServerJS(this.appConfig, this.appPaths, this),
      modules: new FileManagerModules(this.appConfig, this.appPaths)
    }

    this.#depsMap = [
      this.#fileManagers.modules.depsMap,
      this.#fileManagers.publicJS.depsMap,
      this.#fileManagers.routesJS.depsMap,
    ]

    if (this.appConfig.development) {
      this.#watchForFileChanges(this.componentsDir)
      this.#listenForServerJsFileChanges()
    }
  }

  /**
   * @returns {Array<Map<string, string[]>>}
   */
  get depsMap() {
    return this.#depsMap
  }

  /**
   * Force a specific component to be rendered
   *
   * @param {string} componentName
   */
  async ensureComponentIsRendered(componentName) {
    await this.getTagForJs(componentName)
    await this.getTagForCss(componentName)
  }

  /**
   * Get a version string to be used as a prefix to cached
   * files requested from the browser. Such files could be
   * .js or .css files.
   *
   * @returns {Promise<string>}
   */
  async getGlobalFilesVersion() {
    if (!this.#globalFilesVersion) {
      await this.#setGlobalFilesVersionFromDir(this.outputDir)
    }

    return this.#globalFilesVersion
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<{
   *   code: string,
   *   path: string,
   *   parsedPath: ParsedPath,
   *   stats: FileSystem.Stats
   * }>}
   */
  async getModuleFile(moduleName) {
    return this.#fileManagers.modules.getModuleFile(moduleName)
  }

  /**
   * Get rendered html link for a given component, to be used
   * in the output html code.
   *
   * @param {string} componentName
   * @returns {Promise<{tag: string, url: string}>}
   * HTML code that is used in the <head> section to load the
   * bundle css file, or to put the contents there if the size
   * is small enough.
   */
  async getTagForCss(componentName) {
    let data = renderCacheForCss.get(componentName)

    if (data === undefined) {
      data = {
        tag: '',
        url: ''
      }

      /**
       * Reset global version for production for each component.
       * Only needed in production, because in dev mode there is
       * another mechanism to refresh the version.
       */
      if (!this.appConfig.development) this.#globalFilesVersion = ''

      const { outputFileName } = this.#fileManagers.css.cssFilesManagerConfig
      const outputFile = path.join(
        this.outputDir,
        componentName,
        `${outputFileName}.css`
      )

      await this.#fileManagers.css.renderComponent(componentName)

      if (await fileExists(outputFile)) {
        const size = await fileSize(outputFile)
        const ver = await this.getGlobalFilesVersion()
        const url = `${componentName}/${outputFileName}.css`
        const verUrl = `/${ver}/${url}`

        /*
         * If the file is small enough, it's better
         * to include it into the initial html code
         */

        if (!this.appConfig.development && size <= 32 * 1024) {
          const contents = (await readFile(outputFile)).toString()

          data.tag = `  <style data-href="${verUrl}">${contents}</style>\n`
        }
        else {
          data.url = url
          data.tag = `  <link rel="stylesheet" type="text/css" href="${verUrl}"/>\n`
        }
      }

      renderCacheForCss.set(componentName, data)
    }

    return data
  }

  /**
   * Get rendered html link for a given component,
   * to be used in the output html code
   *
   * @param {string} componentName
   * @param {string} [entryName]
   * @returns {Promise<{tag: string, url: string}>}
   */
  async getTagForJs(componentName, entryName = '') {
    let data = renderCacheForJs.get(componentName)?.get(entryName)

    if (data === undefined) {
      data = {
        tag: '',
        url: ''
      }

      /**
       * Reset global version for production for each component.
       * Only needed in production, because in dev mode there is
       * another mechanism to refresh the version.
       */
      if (!this.appConfig.development) this.#globalFilesVersion = ''

      await this.#fileManagers.publicJS.renderComponent(componentName)
      await this.#fileManagers.routesJS.renderComponent(componentName)

      const outputFile = await this.#pickOutputFile(
        componentName, this.appConfig.pathNames.clientDirName, entryName
      )

      if (outputFile) {
        const size = await fileSize(outputFile)
        const ver = await this.getGlobalFilesVersion()
        const url = `${componentName}/${this.appConfig.pathNames.clientDirName}/${path.basename(outputFile)}`
        const verUrl = `/${ver}/${url}`

        // Don't use inline JS, because relative paths are not working properly
        if (0 && !this.appConfig.development && size <= 32 * 1024) {
          const contents = (await readFile(outputFile)).toString()

          data.tag = `  <script type="module" defer data-src="${verUrl}">${contents}</script>\n`
        }
        else {
          data.url = url
          data.tag = `  <script type='module' defer src="${verUrl}"></script>`
        }
      }

      if (!renderCacheForJs.get(componentName)) {
        renderCacheForJs.set(componentName, new Map())
      }

      renderCacheForJs.get(componentName)?.set(entryName, data)
    }

    return data
  }

  /**
   * @param {string} componentName
   * @param {string} jsFileName JS file name, but without the extension
   * @returns {Promise<app.ImportsCacheItem>}
   */
  async importRouterFile(componentName, jsFileName) {
    return this.#fileManagers.routesJS.importFile(componentName, jsFileName)
  }

  /**
   * @param {string} componentName
   * @param {string} jsFileName JS file name, but without the extension
   * @returns {Promise<app.ImportsCacheItem>}
   */
  async importViewFile(componentName, jsFileName) {
    return this.#fileManagers.routesJS.importViewFile(componentName, jsFileName)
  }

  /**
   * @returns {void}
   */
  #listenForServerJsFileChanges() {
    /**
     * Because it's possible to have many successive watch events,
     * caused by multiple files and directories (when copying,
     * deleting and so on), use this timeout to make it so the restart
     * happens after multiple events.
     */
    const debounceRestartServer = debounce(() => {
      this.#restartServer(false)
    }, 100)

    const managers = [
      this.#fileManagers.serverJS,
      this.#fileManagers.routesJS,
      this.#fileManagers.publicJS
    ]

    managers.forEach((manager) => {
      manager.on('updatedServerSideJs', () => {
        debounceRestartServer()
      })
    })
  }

  /**
   * @param {string} componentName
   * @param {string} dirName
   * @param {string} [entryName]
   * @returns {Promise<string>}
   */
  async #pickOutputFile(componentName, dirName, entryName = '') {
    /**
     * Replace any "/" with ".". It can contain "/" when this is
     * an entry for the layout.
     */
    const additionalName = entryName.replace(/[\/\\]/ug, '.')

    /**
     * Use the source dir, not the output dir, because
     * the output dir could contain undeleted files with names
     * that no longer match any file in the source directory.
     */
    const filesToQueryDir = path.join(
      this.componentsDir, componentName, dirName
    )
    const filesToQueryNoExt = [
      (additionalName)
        ? path.join(filesToQueryDir, `index.${additionalName}`)
        : '',
      path.join(filesToQueryDir, 'index'),
      (additionalName)
        ? path.join(filesToQueryDir, `${componentName}.${additionalName}`)
        : '',
      path.join(filesToQueryDir, `${componentName}`),
    ]

    let inputFile = ''

    const extensions = ['.js', '.mjs']

    for (const ext of extensions) {
      const filesToQuery = filesToQueryNoExt.map((file) => `${file}${ext}`)

      inputFile = await pickFirstExistingFile(filesToQuery)

      if (inputFile) {
        break
      }
    }

    let outputFile = ''

    if (inputFile) {
      // Replace the source dir with the output dir
      outputFile
        = this.outputDir + inputFile.substring(this.componentsDir.length)

      // The output file should exist, but check it just in case
      if (!(await fileExists(outputFile))) {
        outputFile = ''
      }
    }

    return outputFile
  }

  /**
   * @param {boolean} [gracefully]
   * @returns {void}
   */
  #restartServer(gracefully = true) {
    if (!process.send) {
      console.error('The process cannot be restarted, because it was not spawned with an IPC channel')

      return
    }

    process?.send({
      cmd: 'silentRestart',
      params: { gracefully }
    })
  }

  /**
   * Sets the global file version property with a string that is
   * calculated from the mtime of the input directory.
   *
   * @param {string} dir
   * @returns {Promise<void>}
   */
  async #setGlobalFilesVersionFromDir(dir) {
    const mtime = this.appConfig.development
      ? (await dirStats(dir)).mtime
      : (await dirMtimeDeep(dir))

    this.#globalFilesVersion = `@ver${Math.round(mtime.getTime() / 1000)}`
  }

  /**
   * Update mtime of the input dir, then set the global file version
   * property. The input dir should be a global dir in which all files
   * (who need the version string) are placed. Because the dir is
   * persistent, its mtime remains the same whenever the app is restarted.
   * It only needs to be updated when any file (or dir) in it is updated.
   *
   * @param {string} dir
   * @returns {Promise<void>}
   */
  async #updateGlobalFilesVersion(dir) {
    /*
     * Write and delete a temporary file, so that the mtime
     * of the output dir is updated. Then, get that mtime.
     */
    const versionFile = path.join(dir, '__version_file')

    await ensureFile(versionFile)
    await remove(versionFile)

    await this.#setGlobalFilesVersionFromDir(dir)
  }

  /**
   * @param {string} componentsDir
   */
  #watchForFileChanges(componentsDir) {
    if (!this.appConfig.development) return

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      if (fullPath.endsWith('__version_file')) {
        return
      }

      renderCacheForCss.clear()
      renderCacheForJs.clear()

      await this.#updateGlobalFilesVersion(this.outputDir)

      this.emit('versionUpdate', this.#globalFilesVersion, fullPath)
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.componentsDirWatcher?.on(event, watcherCallback.bind(this))
    }
  }
}

/**
 * @param {string[]} files
 * @returns {Promise<string>}
 */
async function pickFirstExistingFile(files) {
  for (const file of files) {
    if (file && await fileExists(file)) {
      return file
    }
  }

  return ''
}

export { AppFileManagers }
