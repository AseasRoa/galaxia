import { sep } from 'node:path'
import {
  deleteFile,
  fileExists,
  readFile,
  writeFile
} from '../../functions/fileSystem.js'
import { setJoin } from '../../functions/set.js'
import { extractEsDependencies } from '../../functions/urlsAndPaths.js'
import { stringCharacterOccurrences } from '../../functions/utils.js'
import { FileManagers } from './FileManagers.js'

/**
 * @typedef Imports
 * @type {object}
 * @property {string[]} mod
 * @property {string[]} app
 */

class ImportMaps {
  /** @type {app.FullConfig} */
  #appConfig

  /** @type {app.Paths} */
  #appPaths

  /** @type {FileManagers} */
  #appFileManagers

  /** @type {Map<string, Object<string, Imports>>} */
  #mapImports = new Map()

  /** @type {Object<string, Imports>} */
  #uniqueImports = {}

  /**
   * Holds a cache of already built importmap scripts.
   * The key is a string, made out of the names of
   * the app modules that are used.
   *
   * @type {Map<string, string>}
   */
  #importMapScriptsCache = new Map()

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {FileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.#appConfig = appConfig
    this.#appPaths = appPaths
    this.#appFileManagers = appFileManagers
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
   *
   * @param {Set<string>} appModulesUsed
   * @returns {Promise<string>}
   */
  async buildImportMapScript(appModulesUsed) {
    const key = setJoin(appModulesUsed, ' ')

    /** @type {string | undefined} */
    let importMap = this.#importMapScriptsCache.get(key)

    if (importMap === undefined) {
      importMap = '<script type="importmap">'

      const items = { imports: {} }
      const globalDeps = await this.#getImports('')

      for (const dep of globalDeps.mod) {
        items.imports[dep] = '/@modules/' + dep
      }

      /**
       * @param {string} appModuleName
       * @param {Object<string, string>} imports
       * @param {Set<string>} appliedModules Used to remember which modules were
       * processed and prevent endless loop when two modules use each other
       * @returns {Promise<void>}
       */
      const applyImports = async(
        appModuleName,
        imports,
        appliedModules = new Set()
      ) => {
        if (appliedModules.has(appModuleName)) {
          return
        }

        const appModuleImports
          = await this.#getImports(appModuleName)

        for (const dep of appModuleImports.app) {
          await applyImports(dep, imports, appliedModules)
          appliedModules.add(appModuleName)
        }

        for (const dep of appModuleImports.mod) {
          imports[dep] = '/@modules/' + dep

          appliedModules.add(appModuleName)

          /**
           * If we have for example `galaxia/library`, include `library`
           * in the importmap as well.
           * This helps when `library` is being used directly,
           * without `galaxia/` prefix, which can happen in modules,
           * external to the app.
           */
          if (dep.startsWith('galaxia/')) {
            const shortDep = dep.substring(8)
            // @ts-ignore
            const __whitelist = this.#appConfig.nodeModules.__whitelist

            if (__whitelist && __whitelist.includes(shortDep)) {
              imports[shortDep] = '/@modules/' + dep
            }
          }
        }
      }

      for (const appModuleName of appModulesUsed) {
        await applyImports(appModuleName, items.imports)
      }

      importMap += JSON.stringify(items) + '</script>'

      this.#importMapScriptsCache.set(key, importMap)
    }

    return importMap ?? ''
  }

  /**
   * @param {string} fullPath
   * @param {string} relativePath
   * @returns {Promise<void>}
   */
  async injectFromAppModuleFile(fullPath, relativePath) {
    const moduleName = this.#extractModuleName(relativePath)
    const contents = (await readFile(fullPath)).toString()
    const newImports = this.#buildImports(contents, relativePath)

    for (const newImport of newImports.app) {
      if (moduleName !== newImport) {
        // Important: Only ensure module names, different than the current one!
        await this.#appFileManagers.ensureModuleIsRendered(newImport)
      }
    }

    for (const newImport of newImports.mod) {
      await this.#appFileManagers.getNodeModuleFile(newImport)
    }

    await this.#setImportsForFile(relativePath, moduleName, newImports, false)
  }

  /**
   * @param {string} modulePath
   * @param {Object<string, string>} packageJsonDependencies
   * @returns {Promise<void>}
   */
  async injectFromPackageJsonDependencies(modulePath, packageJsonDependencies) {
    if (!(packageJsonDependencies instanceof Object)) {
      throw new Error('packageJsonDependencies must be an Object')
    }

    /** @type {Imports} */
    const newImports = { mod: [], app: [] }

    for (const packageName in packageJsonDependencies) {
      newImports.mod.push(packageName)
    }

    for (const newImport of newImports.mod) {
      await this.#appFileManagers.getNodeModuleFile(newImport)
    }

    await this.#setImportsForFile(modulePath, '', newImports, true)
  }

  /**
   * @param {string} relativePath
   * @returns {Promise<void>}
   */
  async deleteImportsForFile(relativePath) {
    const moduleName = this.#extractModuleName(relativePath)

    await this.#setImportsForFile(relativePath, moduleName, null, true)

    // Also clear the importmap scripts cache
    this.#importMapScriptsCache.clear()
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<void>}
   */
  async ensureUniqueImportsAreLoaded(moduleName) {
    if (!(moduleName in this.#uniqueImports)) {
      await this.#getImportsForModule(moduleName)
    }
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<Imports | undefined>}
   */
  async getUniqueImports(moduleName) {
    await this.ensureUniqueImportsAreLoaded(moduleName)

    return this.#uniqueImports[moduleName]
  }

  /**
   * @param {string} moduleName
   * When empty string, it means the global imports
   * @returns {Promise<Imports>}
   */
  async #getImports(moduleName) {
    let uniqueImports = await this.getUniqueImports(moduleName)

    if (!uniqueImports) {
      uniqueImports = { mod: [], app: [] }
    }

    return uniqueImports
  }

  /**
   * @param {string} moduleName
   * @returns {string}
   */
  #importsFile(moduleName) {
    return this.#appPaths.output + sep + moduleName + sep + 'imports.json'
  }

  /**
   * @param {string} relativePath For example: /moduleName/client/filename.js
   * @returns {string}
   */
  #extractModuleName(relativePath) {
    const secondSlashPos = relativePath.indexOf(sep, 1)
    const moduleName = relativePath.substring(1, secondSlashPos)

    return moduleName
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<Object<string, Imports>>}
   */
  async #getImportsForModule(moduleName) {
    let imports = this.#mapImports.get(moduleName)

    if (!imports) {
      /** @type {Object<string, Imports>} */
      imports = {}
      const importMapFile = this.#importsFile(moduleName)

      if (await fileExists(importMapFile)) {
        /** @type {Object<string, Imports>} */
        imports = JSON.parse((await readFile(importMapFile)).toString())

        if (!(imports instanceof Object)) {
          throw new Error(`${importMapFile} must contain valid JSON`)
        }
      }

      this.#mapImports.set(moduleName, imports)
      this.#addUniqueImports(moduleName, imports)
    }

    return imports
  }

  /**
   * @param {string} relativePath
   * @param {string} moduleName
   * @param {Imports | null} newImports Use null when imports has to be deleted
   * @param {boolean} [append]
   * @returns {Promise<void>}
   */
  async #setImportsForFile(
    relativePath,
    moduleName,
    newImports,
    append = false
  ) {
    const moduleImports = await this.#getImportsForModule(moduleName)
    const oldImports = moduleImports[relativePath]

    if (!newImports) {
      delete moduleImports[relativePath]
    }
    else {
      if (this.#areImportsTheSame(oldImports, newImports)) {
        return
      }

      if (newImports.mod.length === 0 && newImports.app.length === 0) {
        delete moduleImports[relativePath]
      }
      else {
        if (!moduleImports[relativePath]) {
          moduleImports[relativePath] = newImports
        }
        else {
          if (append) {
            for (const scope in newImports) {
              for (const imp of newImports[scope]) {
                if (!moduleImports[relativePath][scope].includes(imp)) {
                  moduleImports[relativePath][scope].push(imp)
                }
              }
            }
          }
          else {
            moduleImports[relativePath] = newImports
          }
        }
      }
    }

    this.#addUniqueImports(moduleName, moduleImports)
    await this.#updateImportsFile(moduleName)
  }

  /**
   * @param {string} moduleName
   * @param {Object<string, Imports> | undefined} imports
   */
  #addUniqueImports(moduleName, imports) {
    if (!(moduleName in this.#uniqueImports)) {
      this.#uniqueImports[moduleName] = { mod: [], app: [] }
    }

    const uniqueImports = this.#uniqueImports[moduleName]

    if (!uniqueImports) {
      return
    }

    const fileNames = imports ? Object.keys(imports) : []

    if (fileNames.length === 0) {
      uniqueImports.mod.length = 0
      uniqueImports.app.length = 0
    }
    else {
      uniqueImports.mod.length = 0
      uniqueImports.app.length = 0

      for (const fileName in imports) {
        const fileImports = imports[fileName]

        if (!fileImports) {
          continue
        }

        for (const scope in fileImports) {
          for (const fileImport of fileImports[scope]) {
            if (!uniqueImports[scope].includes(fileImport)) {
              uniqueImports[scope].push(fileImport)
            }
          }
        }
      }
    }
  }

  /**
   * @param {Imports | undefined} importsOne
   * @param {Imports} importsTwo
   * @returns {boolean}
   */
  #areImportsTheSame(importsOne, importsTwo) {
    if (importsOne === undefined) {
      return false
    }

    for (const key in importsOne) {
      if (importsOne[key].length !== importsTwo[key].length) {
        return false
      }
    }

    for (const key in importsOne) {
      for (let i = 0; i < importsOne[key].length; i++) {
        if (importsOne[key][i] !== importsTwo[key][i]) {
          return false
        }
      }
    }

    return true
  }

  /**
   * @param {string} code
   * @param {string} fileRelPath
   * @returns {Imports}
   */
  #buildImports(code, fileRelPath) {
    /** @type {Imports} */
    const imports = { mod: [], app: [] }
    const matches = extractEsDependencies(code)

    for (const match of matches) {
      const matchedPath = match[2] ?? ''
      // Dots and slashes like ./ or ../ or ../../ or deeper
      const matchedDotSlash = match[3] ?? ''

      /**
       * If the path is relative and leads to another app module,
       * we have to import that app module as well.
       *
       * For example:
       * fileRelPath: ../../
       * matchedPath: ../../appModuleName/path/file.js
       *
       * Also:
       * matchedPath: /appModuleName/path/file.js
       */
      if (matchedDotSlash !== '') {
        /**
         * If the relative path is /appModuleName/path/file.js
         * then its depth is 2, because there are 2 "/" slashes
         * after the initial one
         *
         * @type {number}
         */
        const depth = stringCharacterOccurrences(fileRelPath, sep) - 1

        let depthPath = ''

        // Support for: /appModuleName/path/file.js
        if (matchedDotSlash === '/') {
          depthPath = '/'
        }
        else {
          for (let i = 0; i < depth; i++) {
            depthPath += '../'
          }
        }

        if (depthPath === matchedDotSlash) {
          const matchedPathSliced = matchedPath.slice(depthPath.length)
          // Match appModuleName in appModuleName/path/file.js
          const matchForSliced = matchedPathSliced.match(/^([^.\/]+)\//u)

          if (matchForSliced) {
            const appModuleName = matchForSliced[1] ?? ''

            if (
              appModuleName !== ''
              && !imports.app.includes(appModuleName)
            ) {
              imports.app.push(appModuleName)
            }
          }
        }
      }
      else {
        const modName = matchedPath

        if (
          modName !== ''
          && !(imports.mod.includes(modName))
        ) {
          imports.mod.push(modName)
        }
      }
    }

    return imports
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<void>}
   */
  async #updateImportsFile(moduleName) {
    const importsFile = this.#importsFile(moduleName)
    const imports = this.#mapImports.get(moduleName)

    if (
      imports
      && Object.keys(imports).length > 0
    ) {
      await writeFile(importsFile, JSON.stringify(imports, null, 2))
    }
    else {
      await deleteFile(importsFile)
    }
  }
}

export { ImportMaps }
