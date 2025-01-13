import { ServerResponse } from 'http'
import { Http2ServerResponse } from 'node:http2'
import path from 'node:path'
import stripComments from 'strip-comments'
import fs from '../functions/fileSystem.js'
import {
  extractEsDependencies,
  isScriptExt
} from '../functions/urlsAndPaths.js'
import { HttpResponse } from '../server/HttpResponse.js'
import { FileManagers } from './fileManagers/FileManagers.js'

/**
 * @typedef {{
 *   absPath: string,
 *   deps: string[],
 *   hints: string,
 *   hintsArray: string[]
 * }} DepsRecord
 */

class EarlyHints {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /** @type {Map<string, DepsRecord>} */
  #depsMap = new Map()

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers

    this.#watchForFileChanges()
  }

  /**
   * Write Early Hints for Html response
   *
   * Dev notes:
   * - Early Hints does not work on HTTP/1.1 or earlier
   *
   * - Use the following command to see the 103 response in action:
   * curl -X GET -I http://example.com
   *
   * - To test Early Hints, in Chrome reload the page by right-clicking
   * on the Reload icon and click 'Empty Cache and Hard Reload'.
   *
   * - Test Early Hints in the browser by calling performance.getEntries().
   * In the results initiatorType should be early-hints
   *
   * @see https://developer.chrome.com/docs/web-platform/early-hints
   * @see https://www.debugbear.com/blog/resource-hints-rel-preload-prefetch-preconnect#the-crossorigin-attribute
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/modulepreload
   * @see https://calendar.perfplanet.com/2022/103-early-hints/
   * @see https://3perf.com/blog/link-rels/#modulepreload
   * @see https://datatracker.ietf.org/doc/html/rfc8297
   * @see https://developer.chrome.com/blog/early-hints/
   * @see https://newsbeezer.com/norwayeng/chrome-first-with-early-hints-support-should-make-webpages-load-even-faster/
   * @param {ServerResponse | Http2ServerResponse} response
   * @param {string} ver
   * @param {app.ModulesAssets} modulesAssets
   */
  writeForHtmlResponse(response, ver, modulesAssets) {
    // Seems that Early Hints are ignored by browsers on HTTP/1.1
    if (!(response instanceof Http2ServerResponse)) {
      return
    }

    const hintsCount = modulesAssets.styles.size + modulesAssets.scripts.size
    /** @type {string[]} */
    const links = new Array(hintsCount)
    let idx = 0

    modulesAssets.styles.forEach((asset) => {
      links[idx] = `</${ver}/${asset.url}>; rel=preload; as=style`
      idx += 1
    })

    /**
     * Important: When the initial HTML page is being sent, it contains
     * importmap script, containing import maps, used in the scripts.
     * For that reason, we only want to download the scripts and run
     * them only after the initial HTML is processed.
     *
     * Links with rel="modulepreload" are similar to those with
     * rel="preload". The main difference is that preload just
     * downloads the file and stores it in the cache, while
     * modulepreload gets the module, parses and compiles it,
     * and puts the results into the module map so that it is
     * ready to execute.
     */
    modulesAssets.scripts.forEach((asset) => {
      links[idx] = `</${ver}/${asset.url}>; rel=preload; as=script`
      idx += 1
    })

    /**
     * The "Link" header appears in dev tools only when setHeader()
     * is used here. This is misleading, because even when setHeader()
     * is not used, early hints are still sent with the "103 Early Hints"
     * partial response. This can be seen with curl (look in the function
     * description).
     */
    // response.setHeader('link', links.join(', '))
    response.writeEarlyHints({ link: links })
  }

  /**
   * Write Early Hints for file response
   *
   * @param {HttpResponse} response
   * @param {string} filePath
   * @param {string} fileAbsPath
   */
  async writeForFileResponse(response, filePath, fileAbsPath) {
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
        else if (isScriptExt(ext)) {
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
    if (!this.#appConfig.development) return

    const watcherCallback = (fileOrigAbsPath) => {
      if (!fileOrigAbsPath.startsWith(this.#appPaths.modules)) {
        return
      }

      const fileRelPath = fileOrigAbsPath.replace(this.#appPaths.modules, '')
      this.#depsMap.delete(fileRelPath)
    }

    for (const event of ['add', 'change', 'unlink']) {
      this.#appFileManagers.modulesDirWatcher
        ?.on(event, watcherCallback.bind(this))
    }
  }
}

export { EarlyHints }
