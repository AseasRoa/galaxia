import { EnumExportKinds, extractExportsData } from './esModuleExportsExtractor.js'

class RouterFileGeneratorUsingTsCompiler {
  /**
   * @param {string} sourceFileAbsPath
   * @param {string} moduleName
   * @param {string} routerName
   * @param {string} ajaxVersion
   * @returns {Promise<string>}
   */
  async generate(sourceFileAbsPath, moduleName, routerName, ajaxVersion) {
    const exports = await extractExportsData(sourceFileAbsPath)

    let output = `
const module = '${moduleName}'
const router = '${routerName}'
const ajaxVersion = '${ajaxVersion}'

`

    const namedExports = this.#generateNamedExports(exports)
    const defaultExports = this.#generateDefaultExports(exports)

    let namedExportsString = ''

    namedExports.forEach((exp) => {
      namedExportsString += exp
    })

    output += `
${namedExportsString}
${defaultExports}
`.trimStart()

    return output
  }

  /**
   * @param {ExportData} classExport
   * @returns {{name: string, code: string}}
   * @throws
   */
  #generateClass(classExport) {
    const output = { name: '', code: '' }
    const { classElements } = classExport

    if (!classElements) {
      throw new Error('Class elements are missing')
    }

    const { name } = classExport
    const defaultKeyword = !name ? 'default ' : ''

    output.name = name
    output.code += `export ${defaultKeyword}class ${(name) ? `${name} ` : ''}{
  #constructorArgs
  #sessionKey = ''

  constructor() {
    this.#constructorArgs = arguments
    this.#sessionKey = routesFetcher.randomString(8)
  }
`

    let { methods } = classElements

    methods = methods.filter((method) => method.name !== 'constructor')
    methods = methods.filter((method) => method.isPublic)

    const methodsStr = methods.map(
      (method) => this.#generateMethod(method.name, true)
    )

    output.code += `${methodsStr.join('')}}\n`

    return output
  }

  /**
   * @param {ExportData[]} exports
   * @returns {string}
   */
  #generateDefaultExports(exports) {
    let output = ''

    for (const exp of exports) {
      if (exp.isDefault && exp.name) {
        output = `export default ${exp.name}`
      }
      else if (exp.isDefault && exp.exportObjectLiteralElements) {
        output = `export default { ${exp.exportObjectLiteralElements.join(', ')} }`
      }
    }

    return output
  }

  /**
   * @param {ExportData} functionExport
   * @param {boolean} isAsync
   * @returns {string}
   */
  #generateFunction(functionExport, isAsync) {
    const { name } = functionExport
    const asyncKeyword = (isAsync) ? 'async ' : ''
    const defaultKeyword = !name ? 'default ' : ''

    return `export ${defaultKeyword}${asyncKeyword}function ${name}() {
  return routesFetcher('', module, router, [], '${name.replace(/'/ug, '\\\'')}', arguments, ajaxVersion, '')
}
`
  }

  /**
   * @param {string} name
   * @param {boolean} isAsync
   * @returns {string}
   */
  #generateMethod(name, isAsync) {
    const async = (isAsync) ? 'async ' : ''

    return `
  ${async}${name}() {
    return routesFetcher(this.constructor.name, module, router, this.#constructorArgs, '${name.replace(/'/ug, '\\\'')}', arguments, ajaxVersion, this.#sessionKey)
  }
`
  }

  /**
   * @param {ExportData[]} exports
   * @returns {Map<string, string>}
   */
  #generateNamedExports(exports) {
    /** @type {Map<string, string>} */
    const output = new Map()

    for (const exp of exports) {
      if (exp.exportKind === EnumExportKinds.class) {
        output.set(exp.name, this.#generateClass(exp).code)
      }
      else if (exp.exportKind === EnumExportKinds.function) {
        output.set(exp.name, this.#generateFunction(exp, true))
      }
    }

    return output
  }
}

export { RouterFileGeneratorUsingTsCompiler }
