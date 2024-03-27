import { join } from 'node:path'
import {
  deleteFile,
  fileExists,
  readFile,
  writeFile
} from '../functions/fileSystem.js'
import { stringCharacterOccurrences } from '../functions/utils.js'
import { AppFileManagers } from './AppFileManagers.js'

/**
 * @see https://github.com/npm/normalize-package-data#rules-for-name-field
 * @type {RegExp[]}
 */
const patterns = [
  // For example: import { something } from 'moduleName'
  /((?:^|\n)import\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: export { something } from 'moduleName'
  /((?:^|\n)export\s*(?:[\w\s{},$]*from)?\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)()/ug,
  // For example: import('moduleName')
  /((?:^|[^\w])import\s*\(\s*)('([.\/]+)?.+'|"([.\/]+)?.+"|`([.\/]+)?.+`)(\s*\))/ug
]

class ImportMaps {
  /** @type {AppFileManagers} */
  appFileManagers

  /** @type {app.FullConfig} */
  appConfig

  /** @type {app.Paths} */
  appPaths

  /** @type {Object<string, string[]>} */
  uniqueImports = {}

  /** @type {Map<string, Object<string, string[]>>} */
  #mapImports = new Map()

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
    const newImports = await this.#extractImports(
      contents, relativePath, moduleName
    )

    for (const newImport of newImports) {
      await this.appFileManagers.getModuleFile(newImport)
    }

    await this.#setImportsForFile(relativePath, moduleName, newImports, true)
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

    const newImports = []

    for (const packageName in packageJsonDependencies) {
      newImports.push(packageName)
    }

    for (const newImport of newImports) {
      await this.appFileManagers.getModuleFile(newImport)
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
    if (!('' in this.uniqueImports)) {
      await this.#getImportsForModule('')
    }

    if (!(moduleName in this.uniqueImports)) {
      await this.#getImportsForModule(moduleName)
    }
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
    const secondSlashPos = relativePath.indexOf('/', 1)

    return relativePath.substring(1, secondSlashPos)
  }

  /**
   * @param {string} moduleName
   * @returns {Promise<Object<string, string[]>>}
   */
  async #getImportsForModule(moduleName) {
    let imports = this.#mapImports.get(moduleName)

    if (!imports) {
      const importMapFile = this.#importsFile(moduleName)

      if (!(await fileExists(importMapFile))) {
        imports = {}
      }
      else {
        /** @type {Object<string, string[]>} */
        imports = JSON.parse(
          (await readFile(importMapFile)).toString()
        )
      }

      if (!(imports instanceof Object)) {
        throw new Error('imports must be an Object')
      }

      this.#mapImports.set(moduleName, imports)
      this.#addUniqueImports(moduleName, imports)

      return imports
    }

    return imports
  }

  /**
   * @param {string} relativePath
   * @param {string} moduleName
   * @param {string[] | null} imports
   * @param {boolean} [append]
   * @returns {Promise<void>}
   */
  async #setImportsForFile(relativePath, moduleName, imports, append = false) {
    const moduleImports = await this.#getImportsForModule(moduleName)
    const oldImports = moduleImports[relativePath]
    const newImports = imports

    if (!newImports) {
      delete moduleImports[relativePath]
    }
    else {
      if (this.#areImportsTheSame(oldImports, newImports)) {
        return
      }

      if (newImports.length === 0) {
        delete moduleImports[relativePath]
      }
      else {
        if (!moduleImports[relativePath]) {
          moduleImports[relativePath] = newImports
        }
        else {
          if (append) {
            moduleImports[relativePath] = [
              // @ts-ignore
              ...moduleImports[relativePath],
              ...newImports
            ]
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
   * @param {Object<string, string[]> | undefined} imports
   */
  #addUniqueImports(moduleName, imports) {
    if (!(moduleName in this.uniqueImports)) {
      this.uniqueImports[moduleName] = []
    }

    const uniqueImports = this.uniqueImports[moduleName]

    if (uniqueImports instanceof Array) {
      if (!imports || Object.keys(imports).length === 0) {
        uniqueImports.length = 0
      }
      else {
        uniqueImports.length = 0

        for (const fileName in imports) {
          const fileImports = imports[fileName]

          if (fileImports instanceof Array) {
            for (const fileImport of fileImports) {
              if (!uniqueImports.includes(fileImport)) {
                uniqueImports.push(fileImport)
              }
            }
          }
        }
      }
    }
  }

  /**
   * @param {string[] | undefined} importsOne
   * @param {string[]} importsTwo
   * @returns {boolean}
   */
  #areImportsTheSame(importsOne, importsTwo) {
    if (!(importsOne instanceof Array)) {
      return false
    }

    let same = true

    if (importsOne.length !== importsTwo.length) {
      same = false
    }
    else {
      for (let i = 0; i < importsOne.length; i++) {
        if (importsOne[i] !== importsTwo[i]) {
          same = false
        }
      }
    }

    return same
  }

  /**
   * @param {string} code
   * @param {string} relativePath
   * @param {string} moduleName
   * @returns {Promise<string[]>}
   */
  async #extractImports(code, relativePath, moduleName) {
    const depth = stringCharacterOccurrences(relativePath, '/') - 1
    const imports = []

    for (const pattern of patterns) {
      while (true) {
        const match = pattern.exec(code)

        if (match === null) {
          break
        }

        const slashes = Boolean(match[3] ?? match[4] ?? match[5])

        if (slashes) {
          let m2 = match[2] ?? ''
          let relPath = ''

          for (let i = 0; i < depth; i++) {
            relPath += '../'
          }

          m2 = m2.substring(1)

          if (m2.startsWith(relPath)) {
            m2 = m2.substring(relPath.length)
          }

          // Importing another app module?
          // For example: '../../moduleName/path/file.js
          const match2 = m2.match(/^([^.\/]+)\//u)

          if (match2) {
            const appModuleName = match2[1] ?? ''

            await this.appFileManagers.ensureModuleIsRendered(appModuleName)
            await this.#setImportsForFile(
              relativePath, moduleName, [`*${appModuleName}`], true
            )
          }

          continue
        }

        const name = (match[2] ?? '').slice(1, -1)

        if (!(name in imports)) {
          imports.push(name)
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
