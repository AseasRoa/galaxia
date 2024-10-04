import { join, sep } from 'node:path'
import {
  deleteFile,
  fileExists,
  readFile,
  writeFile
} from '../functions/fileSystem.js'
import {
  stringCharacterOccurrences,
  stringTrimChars
} from '../functions/utils.js'
import { AppFileManagers } from './AppFileManagers.js'

/**
 * @see https://github.com/npm/normalize-package-data#rules-for-name-field
 * @type {RegExp[]}
 */
const patterns = [
  // For example: import { something } from './moduleName'
  /((?:^|\n)import\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: export { something } from './moduleName'
  /((?:^|\n)export\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: import('./moduleName')
  /((?:^|[^\w])import\s*\(\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)(\s*\))/ug
]

class ImportMaps {
  /** @type {AppFileManagers} */
  appFileManagers

  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {Map<string, Object<string, Imports>>} */
  #mapImports = new Map()

  /** @type {Object<string, Imports>} */
  #uniqueImports = {}

  /**
   * @param {app.FullConfig} appConfig
   * @param {app.Paths} appPaths
   * @param {AppFileManagers} appFileManagers
   */
  constructor(appConfig, appPaths, appFileManagers) {
    this.appConfig = appConfig
    this.appPaths = appPaths
    this.appFileManagers = appFileManagers
  }

  /**
   * @param {string} fullPath
   * @param {string} relativePath
   * @returns {Promise<void>}
   */
  async injectFromAppModuleFile(fullPath, relativePath) {
    const moduleName = this.#extractModuleName(relativePath)
    const contents = (await readFile(fullPath)).toString()
    const newImports = await this.#extractImports(contents, relativePath)

    for (const newImport of newImports.app) {
      await this.appFileManagers.ensureModuleIsRendered(newImport)
    }

    for (const newImport of newImports.mod) {
      await this.appFileManagers.getNodeModuleFile(newImport)
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
      await this.appFileManagers.getNodeModuleFile(newImport)
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
   * @returns {string}
   */
  #importsFile(moduleName) {
    return join(this.appPaths.output, moduleName, 'imports.json')
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
   * @param {string} relativePath
   * @returns {Promise<Imports>}
   */
  async #extractImports(code, relativePath) {
    const depth = stringCharacterOccurrences(relativePath, sep) - 1
    /** @type {Imports} */
    const imports = { mod: [], app: [] }

    for (const pattern of patterns) {
      while (true) {
        const match = pattern.exec(code)

        if (match === null) {
          break
        }

        // Dots and slashes like ./ or ../ or ../../ or deeper
        const matchedDotSlash = match[3] ?? match[4] ?? match[5]
        const hasDotSlash = Boolean(matchedDotSlash)

        if (hasDotSlash) {
          let matchedPath = match[2] ?? ''
          matchedPath = stringTrimChars(matchedPath, 1)

          let relPath = ''

          for (let i = 0; i < depth; i++) {
            relPath += '../'
          }

          if (matchedPath.startsWith(relPath)) {
            matchedPath = matchedPath.substring(relPath.length)
          }

          // Importing another app module?
          // For example: '../../moduleName/path/file.js
          const match2 = matchedPath.match(/^([^.\/]+)\//u)

          if (match2) {
            const appModuleName = match2[1] ?? ''

            if (
              appModuleName !== ''
              && !imports.app.includes(appModuleName)
            ) {
              imports.app.push(appModuleName)
            }
          }

          continue
        }

        const moduleName = (match[2] ?? '').slice(1, -1)

        if (
          moduleName !== ''
          && !(moduleName in imports)
        ) {
          imports.mod.push(moduleName)
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
