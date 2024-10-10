import console from 'node:console'
import { EventEmitter } from 'node:events'
import { basename, sep } from 'node:path'
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
import { FileManagerClientJS } from './FileManagerClientJS.js'
import { FileManagerCSS } from './FileManagerCSS.js'
import { FileManagerModules } from './FileManagerModules.js'
import { FileManagerRoutesJS } from './FileManagerRoutesJS.js'
import { FileManagerServerJS } from './FileManagerServerJS.js'
import { ImportMaps } from './ImportMaps.js'

/** @type {Map<string, {tag: string, url: string}>} */
const renderCacheForCss = new Map()

/** @type {Map<string, Map<string, {tag: string, url: string}>>} */
const renderCacheForJs = new Map()

class AppFileManagers extends EventEmitter {
  /** @type {Watcher | null} */
  modulesDirWatcher = null

  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /**
   * @type {{
   *   css: FileManagerCSS,
   *   routesJS: FileManagerRoutesJS,
   *   clientJS: FileManagerClientJS,
   *   serverJS: FileManagerServerJS,
   *   modules: FileManagerModules
   * }}
   */
  #fileManagers

  /** @type {string} */
  #globalFilesVersion = ''

  /** @type {ImportMaps} */
  #importMaps

  /** @type {string} */
  #modulesDir = ''

  /** @type {string} */
  #outputDir = ''

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   */
  constructor(appConfig, appPaths) {
    super()

    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#modulesDir = this.#appPaths.modules
    this.#outputDir = this.#appPaths.output

    this.modulesDirWatcher = (this.#appConfig.development)
      ? new Watcher(
        this.#modulesDir,
        { debounce: 300, ignoreInitial: true, recursive: true }
      )
      : null

    this.#importMaps = new ImportMaps(this.#appPaths, this)

    this.#fileManagers = {
      css: new FileManagerCSS(
        this.#appConfig, this.#appPaths, this
      ),
      clientJS: new FileManagerClientJS(
        this.#appConfig, this.#appPaths, this, this.#importMaps
      ),
      routesJS: new FileManagerRoutesJS(
        this.#appConfig, this.#appPaths, this
      ),
      serverJS: new FileManagerServerJS(
        this.#appConfig, this.#appPaths, this
      ),
      modules: new FileManagerModules(
        this.#appConfig, this.#appPaths, this.#importMaps
      )
    }

    if (this.#appConfig.development) {
      this.#watchForFileChanges()
      this.#listenForServerJsFileChanges()
    }
  }

  /**
   * Force a specific module to be rendered
   *
   * @param {string} moduleName
   */
  async ensureModuleIsRendered(moduleName) {
    await this.getTagForJs(moduleName)
    await this.getTagForCss(moduleName)
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
      await this.#setGlobalFilesVersionFromDir(this.#outputDir)
    }

    return this.#globalFilesVersion
  }

  /**
   * @param {string[]} appModulesUsed
   * @returns {Promise<string>}
   */
  async buildImportMapScript(appModulesUsed) {
    return this.#importMaps.buildImportMapScript(appModulesUsed)
  }

  /**
   * @param {string} modulePath
   * @returns {Promise<{
   *   code: string,
   *   path: string,
   *   parsedPath: ParsedPath,
   *   stats: FileSystem.Stats
   * }>}
   */
  async getNodeModuleFile(modulePath) {
    await this.#importMaps.ensureUniqueImportsAreLoaded('')

    const moduleFile
      = await this.#fileManagers.modules.getModuleFile(modulePath)

    return moduleFile
  }

  /**
   * Get rendered html link for a given module, to be used
   * in the output html code.
   *
   * @param {string} moduleName
   * @returns {Promise<{tag: string, url: string}>}
   * HTML code that is used in the <head> section to load the
   * bundle css file, or to put the contents there if the size
   * is small enough.
   */
  async getTagForCss(moduleName) {
    let data = renderCacheForCss.get(moduleName)

    if (data === undefined) {
      data = {
        tag: '',
        url: ''
      }

      /**
       * Reset global version for production for each module.
       * Only needed in production, because in dev mode there is
       * another mechanism to refresh the version.
       */
      if (!this.#appConfig.development) this.#globalFilesVersion = ''

      const { inputDirName, outputFileName }
        = this.#fileManagers.css.cssFilesManagerConfig
      const outputFile
        = this.#outputDir + sep
        + moduleName + sep
        + inputDirName + sep
        + outputFileName + '.css'

      await this.#fileManagers.css.renderModule(moduleName)

      if (await fileExists(outputFile)) {
        const size = await fileSize(outputFile)
        const ver = await this.getGlobalFilesVersion()
        const url = `${moduleName}/${inputDirName}/${outputFileName}.css`
        const verUrl = `/${ver}/${url}`

        /*
         * If the file is small enough, it's better
         * to include it into the initial html code
         */

        if (!this.#appConfig.development && size <= 32 * 1024) {
          const contents = (await readFile(outputFile)).toString()

          data.tag = `  <style data-href="${verUrl}">${contents}</style>\n`
        }
        else {
          data.url = url
          data.tag = `  <link rel="stylesheet" type="text/css" href="${verUrl}"/>\n`
        }
      }

      renderCacheForCss.set(moduleName, data)
    }

    return data
  }

  /**
   * Get rendered html link for a given module,
   * to be used in the output html code
   *
   * @param {string} moduleName
   * @param {string} [entryName]
   * @returns {Promise<{tag: string, url: string}>}
   */
  async getTagForJs(moduleName, entryName = '') {
    let data = renderCacheForJs.get(moduleName)?.get(entryName)

    if (data === undefined) {
      data = {
        tag: '',
        url: ''
      }

      /**
       * Reset global version for production for each module.
       * Only needed in production, because in dev mode there is
       * another mechanism to refresh the version.
       */
      if (!this.#appConfig.development) this.#globalFilesVersion = ''

      await this.#fileManagers.serverJS.renderModule(moduleName)
      await this.#fileManagers.clientJS.renderModule(moduleName)
      await this.#fileManagers.routesJS.renderModule(moduleName)

      const outputFile = await this.#pickOutputFile(
        moduleName, this.#appConfig.dirNames.client, entryName
      )

      if (outputFile) {
        const ver = await this.getGlobalFilesVersion()
        const url = `${moduleName}/${this.#appConfig.dirNames.client}/${basename(outputFile)}`
        const verUrl = `/${ver}/${url}`

        // Don't use inline JS, because relative paths are not working properly
        // const size = await fileSize(outputFile)
        // if (!this.#appConfig.development && size <= 32 * 1024) {
        //   const contents = (await readFile(outputFile)).toString()
        //   data.tag = '  <script type="module" '
        //     + `defer data-src="${verUrl}">${contents}</script>\n`
        // }

        data.url = url
        data.tag = `  <script type="module" defer src="${verUrl}"></script>`
      }

      if (!renderCacheForJs.get(moduleName)) {
        renderCacheForJs.set(moduleName, new Map())
      }

      renderCacheForJs.get(moduleName)?.set(entryName, data)
    }

    return data
  }

  /**
   * @param {string} moduleName
   * @param {string} jsFileName JS file name, but without the extension
   * @returns {Promise<app.ImportsCacheItem>}
   */
  async importRoutesFile(moduleName, jsFileName) {
    return this.#fileManagers.routesJS.importFile(moduleName, jsFileName)
  }

  /**
   * @param {string} moduleName
   * @param {string} viewName
   * @param {Object<*,*>} data
   * @returns {Promise<string>}
   */
  async applyView(moduleName, viewName, data) {
    return this.#fileManagers.serverJS.applyView(moduleName, viewName, data)
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
    ]

    managers.forEach((manager) => {
      manager.on('file', () => {
        debounceRestartServer()
      })
    })
  }

  /**
   * @param {string} moduleName
   * @param {string} dirName
   * @param {string} [entryName]
   * @returns {Promise<string>}
   */
  async #pickOutputFile(moduleName, dirName, entryName = '') {
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
    const filesToQueryDir = this.#modulesDir + sep + moduleName + sep + dirName
    const filesToQueryNoExt = [
      (additionalName) ? filesToQueryDir + sep + '_' + additionalName : '',
      (additionalName) ? filesToQueryDir + sep + additionalName : '',
      filesToQueryDir + sep + 'index',
    ]

    const extensions = ['.js', '.mjs']
    const inputFile = await pickFirstExistingFile(filesToQueryNoExt, extensions)

    let outputFile = ''

    if (inputFile) {
      // Replace the source dir with the output dir
      outputFile
        = this.#outputDir + inputFile.substring(this.#modulesDir.length)

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
    const mtime = this.#appConfig.development
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
    const versionFile = dir + sep + '__version_file'

    await ensureFile(versionFile)
    await remove(versionFile)

    await this.#setGlobalFilesVersionFromDir(dir)
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.#appConfig.development) return

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

      await this.#updateGlobalFilesVersion(this.#outputDir)

      this.emit('versionUpdate', this.#globalFilesVersion, fullPath)
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.modulesDirWatcher?.on(event, watcherCallback.bind(this))
    }
  }
}

/**
 * @param {string[]} files
 * @param {string[]} extensions
 * @returns {Promise<string>}
 */
async function pickFirstExistingFile(files, extensions) {
  for (const ext of extensions) {
    for (const file of files) {
      if (!file) {
        continue
      }

      const fileWithExt = file + ext

      if (await fileExists(fileWithExt)) {
        return fileWithExt
      }
    }
  }

  return ''
}

export { AppFileManagers }
