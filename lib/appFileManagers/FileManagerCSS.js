/**
 * (Generate CSS Files)
 * - This module is used to automatically render output CSS files
 *   for each of the app modules.
 * - The input files are to be used in CSS preprocessor(s) and
 *   turned into output .css files.
 *
 * (Watch For Changes)
 * - Input dirs are watched for changes and if something in them
 *   is changed, the output .css files are re-rendered.
 */

import { EventEmitter } from 'events'
import { join } from 'node:path'
import { minifyCSS } from '../codeModifiers/codeMinifiers.js'
import { CssTranspiler } from '../codeModifiers/CssTranspiler/CssTranspiler.js'
import {
  dirExistsSync,
  dirMtimeDeep,
  fileStats,
  isDir,
  readDir,
  remove,
  writeFile
} from '../functions/fileSystem.js'
import { isUnprocessedStyleFile, pathSplit } from '../functions/urlsAndPaths.js'
import { AppFileManagers } from './AppFileManagers.js'

const cssTranspiler = new CssTranspiler()

class FileManagerCSS extends EventEmitter {
  /**
   * @type {app.FullConfig}
   */
  appConfig

  /**
   * @type {app.Paths}
   */
  appPaths

  /** @type {AppFileManagers} */
  appFileManagers

  /**
   * An array with module names, who are considered global for
   * the styles.
   * This means that the styles located in them could be used from
   * other modules.
   *
   * @type {string[]}
   * TODO Remove this. I don't like that this is hardcoded here.
   */
  moduleNamesForGlobalUsage = ['@global']

  /** @type {CssFilesManagerConfig} */
  cssFilesManagerConfig = {
    /*
     * The name of the main unprocessed file that is going to be
     * processed by the transpiler. Other files with the same
     * extension would be transpiled if they are somehow included
     * in this file.
     * Do not include file extension here. The extension is
     * selected somewhere else.
     */
    indexFileName: 'index',
    /*
     * The name of the directory (in any module) in which
     * the unprocessed files are expected to be
     */
    inputDirName: '', // 'styles',
    /*
     * The name of the generated file
     * (will be appended with .css and .min.css)
     */
    outputFileName: 'bundle'
  }

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

    this.cssFilesManagerConfig.inputDirName = this.appConfig.dirNames.styles

    this.#initialize()
  }

  /**
   * render all raw files into output .css files
   *
   * @param {string} moduleName
   * @param {boolean} [forceRender]
   * Usually render happens when the input's dir mtime is > than
   * the mtime of the output file. Set this to true to force render,
   * even if both times are equal or reverse.
   * @returns {Promise<number>}
   * Returns version - a timestamp (in ms) of the output file
   */
  async renderModule(moduleName, forceRender = false) {
    const { indexFileName, inputDirName, outputFileName }
      = this.cssFilesManagerConfig
    const inputDir = join(this.appPaths.modules, moduleName, inputDirName)
    const outputDir = this.appPaths.output
    const outputFile = join(
      outputDir,
      moduleName,
      inputDirName,
      `${outputFileName}.css`
    )

    // Get modify times
    let inputDirMtime = new Date(0)
    let outputFileMtime = new Date(0)

    try {
      inputDirMtime = (await dirMtimeDeep(inputDir))
      outputFileMtime = (await fileStats(outputFile)).mtime
    }
    catch (error) {
      // nothing here
    }

    // Generate output file when the output file is old
    if (forceRender || inputDirMtime.getTime() > outputFileMtime.getTime()) {
      let cssCode = await cssTranspiler.transpileDir(inputDir, indexFileName)

      if (cssCode) {
        cssCode = (this.appConfig.development)
          ? cssCode
          : await this.#modifyFileContents(cssCode, { minify: true })

        await writeFile(outputFile, cssCode)
      }
      else {
        await remove(outputFile)
      }
    }

    const version = Math.round(outputFileMtime.getTime() / 1000)

    return version
  }

  /**
   * @returns {void}
   * @throws {Error}
   */
  #initialize() {
    if (!(dirExistsSync(this.appPaths.output))) {
      throw new Error(`Output dir not found: ${this.appPaths.output}`)
    }

    if (this.appConfig.development) {
      this.#watchForFileChanges()
    }
  }

  /**
   * Transpile/minify the input string
   *
   * @param {string} string
   * @param {{minify: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(string, options) {
    let output = string

    /** Put modifications below */

    if (options.minify) output = await minifyCSS(output)

    return output
  }

  /**
   * @returns {Promise<void>}
   */
  async #renderAllModules() {
    const modulesDir = this.appPaths.modules
    const items = await readDir(modulesDir)

    for (const moduleName of items) {
      if (await isDir(modulesDir, moduleName)) {
        await this.renderModule(moduleName)
      }
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
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const { inputDirName } = this.cssFilesManagerConfig
      const relativePath = fullPath.replace(modulesDir, '')
      const pathParts = pathSplit(relativePath)
      const isUnprocessed = isUnprocessedStyleFile(relativePath, inputDirName)

      if (isUnprocessed) {
        const moduleName = pathParts[0] ?? ''

        if (this.moduleNamesForGlobalUsage.includes(moduleName)) {
          await this.#renderAllModules()
        }
        else {
          await this.renderModule(moduleName, true)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerCSS }
