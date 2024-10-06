import { Http2ServerResponse } from 'node:http2'
import path from 'node:path'
import stripComments from 'strip-comments'
import { AppFileManagers } from '../appFileManagers/AppFileManagers.js'
import fs from '../functions/fileSystem.js'
import { extractEsDependencies } from '../functions/urlsAndPaths.js'
import { HttpResponse } from './HttpResponse.js'

/**
 * @typedef {{
 *   absPath: string,
 *   deps: string[],
 *   hints: string,
 *   hintsArray: string[]
 * }} DepsRecord
 */

class AppStaticFilesEarlyHints {
  /** @type {AppFileManagers} */
  #appFileManagers

  /** @type {Map<string, DepsRecord>} */
  #depsMap = new Map()

  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.#appFileManagers = appFileManagers
    this.appConfig = appConfig
    this.appPaths = appPaths

    this.#watchForFileChanges()
  }

  /**
   * @param {HttpResponse} response
   * @param {string} filePath
   * @param {string} fileAbsPath
   */
  async setEarlyHints(response, filePath, fileAbsPath) {
    if (!(response.original instanceof Http2ServerResponse)) {
      return
    }

    /** @type {DepsRecord | null} */
    let depsRecord = this.#depsMap.get(filePath) ?? null

    if (!depsRecord) {
      try {
        depsRecord = await this.#processFile(filePath, fileAbsPath)
      }
      catch (e) {
        // do nothing
      }
    }

    if (depsRecord && depsRecord.hintsArray.length > 0) {
      response.original.writeEarlyHints({ link: depsRecord.hintsArray })
      // response.original.setHeader('link', depsRecord.hints)
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
    const matches = extractEsDependencies(strippedContents)

    for (const match of matches) {
      const moduleName = match[2] ?? ''
      const dep = (moduleName.startsWith('/@modules/'))
        ? moduleName
        : path.join(dirname, moduleName).replace(/\\/ug, '/')

      if (!deps.includes(dep)) {
        deps.push(dep)
      }
    }

    return deps
  }

  /**
   * @param {string} fileRelPath
   * @param {string} fileTmpAbsPath
   * @returns {Promise<DepsRecord | null>}>}
   */
  async #processFile(fileRelPath, fileTmpAbsPath) {
    /** @type {DepsRecord | null} */
    let depsRecord = null

    const stats = await fs.fileStats(fileTmpAbsPath)
    const ver = await this.#appFileManagers.getGlobalFilesVersion()

    if (stats.isFile()) {
      const deps = await this.#extractFileDeps(fileRelPath, fileTmpAbsPath)
      /** @type {string[]} */
      const hints = []

      for (const dep of deps) {
        const parsedDep = path.parse(dep)
        const { ext } = parsedDep

        if (dep.startsWith('/@modules/')) {
          // - Modules don't need version
          // - Possibly browsers treat modulepreload as preload
          const code = `<${dep}>; rel=modulepreload; as=script`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }
        else if (
          ext === '.js'
          || ext === '.mjs'
          || ext === '.cjs'
        ) {
          const code = `</${ver}${dep}>; rel=modulepreload; as=script`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }
        else if (ext === '.css') {
          const code = `</${ver}${dep}>; rel=preload; as=style`

          if (!hints.includes(code)) {
            hints.push(code)
          }
        }
      }

      this.#depsMap.set(fileRelPath, {
        absPath: fileTmpAbsPath,
        deps: deps,
        hintsArray: hints,
        hints: hints.join(', ')
      })

      depsRecord = this.#depsMap.get(fileRelPath) ?? null
    }

    return depsRecord
  }

  #watchForFileChanges() {
    if (!this.appConfig.development) return

    const watcherCallback = (fileOrigAbsPath) => {
      if (!fileOrigAbsPath.startsWith(this.appPaths.modules)) {
        return
      }

      const fileRelPath = fileOrigAbsPath.replace(this.appPaths.modules, '')
      this.#depsMap.delete(fileRelPath)
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { AppStaticFilesEarlyHints }
