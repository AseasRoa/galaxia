import path from 'node:path'
// @ts-ignore
import stripComments from 'strip-comments'
import Watcher from 'watcher'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import fs from '../functions/fileSystem.js'
import { HttpResponse } from './HttpResponse.js'

/**
 * @typedef {{
 *   absPath: string,
 *   deps: string[],
 *   hints: string,
 *   hintsArray: string[]
 * }} DepsRecord
 */
/**
 * @see https://github.com/npm/normalize-package-data#rules-for-name-field
 * @type {RegExp[]}
 */
const patterns = [
  // For example: import { something } from 'moduleName'
  /((?:^|\n|;)import\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?[^']+'|"([.\/]+)?[^"]+"|`([.\/]+)?[^`]+`)()/ug,
  // For example: export { something } from 'moduleName'
  /((?:^|\n|;)export\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?[^']+'|"([.\/]+)?[^"]+"|`([.\/]+)?[^`]+`)()/ug,
  // For example: import('moduleName')
  /((?:^|[^\w])import\s*\(\s*)('([.\/]+)?[^']+'|"([.\/]+)?[^"]+"|`([.\/]+)?[^`]+`)(\s*\))/ug
]

class AppStaticFilesDepsMap {
  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {Map<string, DepsRecord>} */
  #depsMap = new Map()

  /** @type {app.Config} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /**
   * @param {app.Config} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.#appFileManagers = appFileManagers
    this.appConfig = appConfig
    this.appPaths = appPaths
  }

  /**
   * @param {HttpResponse} response
   * @param {string} filePath
   * @param {string} fileAbsPath
   */
  async setEarlyHints(response, filePath, fileAbsPath) {
    /** @type {DepsRecord | null} */
    let depsRecord = this.#depsMap.get(fileAbsPath) ?? null

    if (!depsRecord) {
      try {
        depsRecord = await this.#processFile(filePath, fileAbsPath, true)
      }
      catch (e) {
        // do nothing
      }
    }

    if (depsRecord && depsRecord.hintsArray.length > 0) {
      response.original.writeEarlyHints({ link: depsRecord.hintsArray })
      response.original.setHeader('link', depsRecord.hints)
    }
  }

  /**
   * @param {string} filePath
   * @param {string} fileAbsPath
   * @returns {Promise<string[]>}
   * @throws {Error} If the file does not exist
   */
  async #extractFileDeps(filePath, fileAbsPath) {
    /** @type {string[]} */
    const deps = []
    const buffer = await fs.readFile(fileAbsPath)

    /** @type {string} */
    const contents = buffer.toString()
    const strippedContents = stripComments(contents)
    const dirname = path.dirname(filePath)

    patterns.forEach((pattern) => {
      while (true) {
        const match = pattern.exec(strippedContents)

        if (match === null) {
          break
        }

        const moduleName = (match[2] ?? '').slice(1, -1)
        const dep = (moduleName.startsWith('/@modules/'))
          ? moduleName
          : path.join(dirname, moduleName).replace(/\\/ug, '/')

        if (!deps.includes(dep)) {
          deps.push(dep)
        }
      }
    })

    return deps
  }

  /**
   * @param {string} filePath
   * @param {string} fileAbsPath
   * @param {boolean} watchFileForChanges
   * @returns {Promise<DepsRecord | null>}>}
   */
  async #processFile(filePath, fileAbsPath, watchFileForChanges) {
    /** @type {DepsRecord | null} */
    let depsRecord = null

    const stats = await fs.fileStats(fileAbsPath)
    const ver = await this.#appFileManagers.getGlobalFilesVersion()

    if (stats.isFile()) {
      const deps = await this.#extractFileDeps(filePath, fileAbsPath)
      /** @type {string[]} */
      const hints = []

      for (const dep of deps) {
        const parsedDep = path.parse(dep)
        const ext = parsedDep.ext

        if (dep.startsWith('/@modules/')) {
          // Modules don't need version

          const code = `<${dep}>; rel="modulepreload"; as="script"`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }
        else if (
          ext === '.js'
          || ext === '.mjs'
          || ext === '.cjs'
        ) {
          const code = `</${ver}${dep}>; rel="modulepreload"; as="script"`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }

        else if (ext === '.css') {
          const code = `</${ver}${dep}>; rel="preload"; as="style"`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }
      }

      this.#depsMap.set(fileAbsPath, {
        absPath: fileAbsPath,
        deps: deps,
        hintsArray: hints,
        hints: hints.join(', ')
      })

      depsRecord = this.#depsMap.get(fileAbsPath) ?? null

      if (watchFileForChanges) {
        this.#watchForFileChanges(fileAbsPath)
      }
    }

    return depsRecord
  }

  /**
   * @param {string} fileAbsPath
   */
  #watchForFileChanges(fileAbsPath) {
    if (!this.appConfig.development) return

    const watcherCallback = async() => {
      this.#depsMap.delete(fileAbsPath)
    }

    const watcher = new Watcher(
      fileAbsPath, { debounce: 300, ignoreInitial: true, recursive: true }
    )

    for (const event of ['add', 'change', 'unlink']) {
      watcher.on(event, watcherCallback.bind(this))
    }
  }
}

export { AppStaticFilesDepsMap }
