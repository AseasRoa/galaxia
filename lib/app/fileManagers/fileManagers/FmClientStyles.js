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
import { sep } from 'node:path'
import { minifyCSS } from '../../../codeModifiers/codeMinifiers.js'
import { CssTranspiler } from '../../../codeModifiers/CssTranspiler/CssTranspiler.js'
import {
  dirExistsSync,
  isDir,
  readDir,
  remove,
  setTimes,
  writeFile
} from '../../../functions/fileSystem.js'
import { isUnprocessedStyleFile, pathSplit } from '../../../functions/urlsAndPaths.js'
import { FileManagers } from '../FileManagers.js'
import { getPathMtime } from './functions/common.js'

const cssTranspiler = new CssTranspiler()

class FmClientStyles extends EventEmitter {
  /** @type {CssFilesManagerConfig} */
  cssFilesManagerConfig = {
    /*
     * The relative path from the module dir to the input bundle file
     */
    inputPathName: '', // 'client/css',
    /*
     * The name of the main unprocessed file that is going to be
     * processed by the transpiler. Other files with the same
     * extension would be transpiled if they are somehow included
     * in this file.
     * Do not include file extension here. The extension is
     * selected somewhere else.
     */
    inputFileName: 'bundle',
    /*
     * The name of the generated file
     * (will be appended with .css and .min.css)
     */
    outputFileName: 'bundle'
  }

  /**
   * @type {app.FullConfig}
   */
  #appConfig

  /**
   * @type {app.Paths}
   */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /**
   * An array with module names, who are considered global for
   * the styles.
   * This means that the styles located in them could be used from
   * other modules.
   *
   * @type {Set<string>}
   * TODO Remove this. I don't like that this is hardcoded here.
   */
  #moduleNamesForGlobalUsage = new Set(['@common'])

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    super()

    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers

    this.cssFilesManagerConfig.inputPathName
      = this.#appConfig.dirNames.client + sep
      + this.#appConfig.dirNames.css

    this.#initialize()
  }

  /**
   * Render all raw files into output bundle .css file
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
    const { inputFileName, inputPathName, outputFileName }
      = this.cssFilesManagerConfig
    const inputDir
      = this.#appPaths.modules + sep
      + moduleName + sep
      + inputPathName
    const outputDir
      = this.#appPaths.output + sep
      + moduleName + sep
      + inputPathName
    const outputFile = outputDir + sep + outputFileName + '.css'

    const inputDirMtime = await getPathMtime(inputDir)
    const outputFileMtime = await getPathMtime(outputFile)

    if (forceRender || inputDirMtime > outputFileMtime) {
      let cssCode = await cssTranspiler.transpileDir(inputDir, inputFileName)

      if (cssCode) {
        cssCode = (this.#appConfig.development)
          ? cssCode
          : await this.#modifyFileContents(cssCode, { minify: true })

        await writeFile(outputFile, cssCode)
        await setTimes(outputFile, inputDirMtime / 1000, inputDirMtime / 1000)
      }
      else {
        await remove(outputFile)
      }
    }

    const version = Math.round(outputFileMtime / 1000)

    return version
  }

  /**
   * @returns {void}
   * @throws {Error}
   */
  #initialize() {
    if (!(dirExistsSync(this.#appPaths.output))) {
      throw new Error(`Output dir not found: ${this.#appPaths.output}`)
    }

    if (this.#appConfig.development) {
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
   * @param {boolean} [forceRender]
   * @returns {Promise<void>}
   */
  async #renderAllModules(forceRender = false) {
    const modulesDir = this.#appPaths.modules
    const items = await readDir(modulesDir)

    for (const moduleName of items) {
      if (await isDir(modulesDir, moduleName)) {
        await this.renderModule(moduleName, forceRender)
      }
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.#appConfig.development) return

    const modulesDir = this.#appPaths.modules

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const relativePath = fullPath.replace(modulesDir, '')
      const pathParts = pathSplit(relativePath)
      const isUnprocessed = isUnprocessedStyleFile(relativePath)

      if (isUnprocessed) {
        const moduleName = pathParts[0] ?? ''

        if (this.#moduleNamesForGlobalUsage.has(moduleName)) {
          await this.#renderAllModules(true)
        }
        else {
          await this.renderModule(moduleName, true)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FmClientStyles }
