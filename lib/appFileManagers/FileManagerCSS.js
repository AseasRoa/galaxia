/**
 * (Generate CSS Files)
 * - This module is used to automatically render output CSS files
 *   for each of the app components.
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
import { renameEsImports } from '../codeModifiers/renameEsImports.js'
import {
  dirMtimeDeep,
  ensureDirSync,
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
   * @type {app.Config}
   */
  appConfig

  /**
   * @type {app.Paths}
   */
  appPaths

  /** @type {AppFileManagers} */
  appFileManagers

  /**
   * An array with component names, who are considered global for
   * the styles.
   * This means that the styles located in them could be used from
   * other components.
   *
   * @type {string[]}
   * TODO Remove this. I don't like that this is hardcoded here.
   */
  componentNamesForGlobalUsage = ['.global']

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
     * The name of the directory (in any component) in which
     * the unprocessed files are expected to be
     */
    inputDirName: 'styles.css',
    /*
     * The name of the generated file
     * (will be appended with .css and .min.css)
     */
    outputFileName: 'styles'
  }

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
   * render all raw files into output .css files
   *
   * @param {string} componentName
   * @param {boolean} [forceRender]
   * Usually render happens when the input's dir mtime is > than
   * the mtime of the output file. Set this to true to force render,
   * even if both times are equal or reverse.
   * @returns {Promise<number>}
   * Returns version - a timestamp (in ms) of the output file
   */
  async renderComponent(componentName, forceRender = false) {
    const outputDir = this.appPaths.output
    const { indexFileName, inputDirName, outputFileName }
      = this.cssFilesManagerConfig
    const inputDir = join(this.appPaths.components, componentName, inputDirName)
    const outputFile = join(outputDir, componentName, `${outputFileName}.css`)

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
      const cssCode = await cssTranspiler.transpileDir(inputDir, indexFileName)

      if (cssCode) {
        await writeFile(
          outputFile,
          (this.appConfig.development)
            ? cssCode
            : await this.#modifyFileContents(
              cssCode,
              {
                renameEsImports: true,
                minify: true
              }
            )
        )
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
   */
  #initialize() {
    ensureDirSync(this.appPaths.output)
    this.#watchForFileChanges()
  }

  /**
   * Transpile/minify the input string
   *
   * @param {string} string
   * @param {{minify: boolean, renameEsImports: boolean}} options
   * @returns {Promise<string>}
   */
  async #modifyFileContents(string, options) {
    let output = string

    /** Put modifications below */

    if (options.renameEsImports) {
      output = renameEsImports(output).code
    }

    if (options.minify) output = await minifyCSS(output)

    return output
  }

  /**
   * @returns {Promise<void>}
   */
  async #renderAllComponents() {
    const componentsDir = this.appPaths.components
    const items = await readDir(componentsDir)

    for (const componentName of items) {
      if (await isDir(componentsDir, componentName)) {
        await this.renderComponent(componentName)
      }
    }
  }

  /**
   * @returns {void}
   */
  #watchForFileChanges() {
    if (!this.appConfig.development) return

    const componentsDir = this.appPaths.components

    /**
     * @param {string} fullPath
     * @returns {Promise<void>}
     */
    const watcherCallback = async(fullPath) => {
      const { inputDirName } = this.cssFilesManagerConfig
      const relativePath = fullPath.replace(componentsDir, '')
      const pathParts = pathSplit(relativePath)
      const isUnprocessed = isUnprocessedStyleFile(relativePath, inputDirName)

      if (isUnprocessed) {
        const componentName = pathParts[0] ?? ''

        if (this.componentNamesForGlobalUsage.includes(componentName)) {
          await this.#renderAllComponents()
        }
        else {
          await this.renderComponent(componentName, true)
        }
      }
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.appFileManagers.componentsDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { FileManagerCSS }
