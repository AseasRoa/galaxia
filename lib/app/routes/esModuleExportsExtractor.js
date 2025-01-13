import { readFile } from 'node:fs/promises'
import ts from 'typescript'

const EnumExportKinds = Object.freeze({
  none: Symbol(0),
  function: Symbol(1),
  class: Symbol(2),
  ObjectLiteralExpression: Symbol(3)
})

/**
 * @param {ts.Node} node
 * @returns {ts.Modifier[]}
 */
function getModifiers(node) {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : []

  // @ts-ignore
  return modifiers ?? []
}

/**
 * @param {ts.Node} node
 * @returns {string}
 */
function getName(node) {
  let name = ''

  if (
    ts.isFunctionDeclaration(node)
    || ts.isFunctionExpression(node)
    || ts.isArrowFunction(node)
    || ts.isMethodDeclaration(node)
    || ts.isClassLike(node)
    || ts.isVariableDeclaration(node)
    || ts.isExportSpecifier(node)
    // example: export default { funcOne, funcTwo, funcThree }
    || ts.isShorthandPropertyAssignment(node)
  ) {
    if (node.name) {
      if (ts.isIdentifier(node.name) || ts.isPrivateIdentifier(node.name)) {
        name = node.name.escapedText ?? ''
      }
      else if (ts.isToken(node.name)) {
        if (ts.isStringLiteral(node.name)) {
          name = `'${node.name.text}'`
        }
      }
    }
  }
  else if (ts.isVariableStatement(node)) {
    const firstDeclaration = node.declarationList.declarations[0]

    if (firstDeclaration && ts.isIdentifier(firstDeclaration.name)) {
      name = firstDeclaration.name.escapedText ?? ''
    }
  }
  else if (ts.isExportAssignment(node)) {
    if (
      ts.isIdentifier(node.expression)
      || ts.isPrivateIdentifier(node.expression)
    ) {
      name = node.expression.escapedText ?? ''
    }
  }

  return name
}

/**
 * @param {ts.Node} node
 * @returns {ts.SyntaxKind[]}
 */
function getModifiersAsKinds(node) {
  // @ts-ignore
  const modifiers = getModifiers(node)

  return modifiers.map((modifier) => modifier.kind)
}

/**
 * @param {ts.Node} node
 * @returns {boolean}
 */
function hasExportModifier(node) {
  const modifiers = ts.canHaveModifiers(node)
    ? ts.getModifiers(node)
    : undefined

  if (modifiers) {
    for (const modifier of modifiers) {
      if (modifier.kind === ts.SyntaxKind.ExportKeyword) {
        return true
      }
    }
  }

  return false
}

/**
 * @param {ts.Node} node
 * @returns {boolean}
 */
function hasDefaultExportModifier(node) {
  const modifiers = ts.canHaveModifiers(node)
    ? ts.getModifiers(node)
    : undefined

  if (modifiers) {
    for (const modifier of modifiers) {
      if (modifier.kind === ts.SyntaxKind.DefaultKeyword) {
        return true
      }
    }
  }

  return false
}

/**
 * @param {ts.Node} node
 * @returns {{
 *   name: string,
 *   fields: ClassElement[],
 *   methods: ClassElement[],
 *   modifiers: ts.SyntaxKind[]
 * }}
 */
function extractClassElements(node) {
  /**
   * @type {{
   *   name: string,
   *   fields: ClassElement[],
   *   methods: ClassElement[],
   *   modifiers: ts.SyntaxKind[]
   * }}
   */
  const data = {
    name: '',
    fields: [],
    methods: [],
    modifiers: getModifiersAsKinds(node)
  }

  ts.forEachChild(node, (child) => {
    switch (child.kind) {
      case ts.SyntaxKind.Identifier: {
        // @ts-ignore
        data.name = child?.escapedText ?? ''

        break
      }
      case ts.SyntaxKind.PropertyDeclaration:
      case ts.SyntaxKind.MethodDeclaration: {
        const name = getName(child)
        // @ts-ignore
        const isPrivate = child.name ? ts.isPrivateIdentifier(child.name) : true
        const isPublic = !isPrivate
        const modifiers = getModifiersAsKinds(child)

        const target = child.kind === ts.SyntaxKind.PropertyDeclaration
          ? data.fields
          : data.methods

        target.push({ name, isPrivate, isPublic, modifiers })

        break
      }
      case ts.SyntaxKind.GetAccessor:
      case ts.SyntaxKind.SetAccessor: {
        // not implemented

        break
      }
      default: {
        // nothing
      }
    }
  })

  return data
}

class EsModuleExportsExtractor {
  /** @type {Map<string, ts.Node>} */
  #collectedClassNodes = new Map()

  /** @type {ts.Node[]} */
  #collectedExportNodes = []

  /** @type {Map<string, ts.Node>} */
  #collectedFunctionNodes = new Map()

  /** @type {Map<string, ts.Node>} */
  #collectedVariableNodes = new Map()

  /** @type {ts.SourceFile} */
  #sourceFile

  /**
   * @param {ts.SourceFile} sourceFile
   */
  constructor(sourceFile) {
    this.#sourceFile = sourceFile
  }

  /**
   * @returns {ExportData[]}
   */
  process() {
    ts.forEachChild(this.#sourceFile, (node) => {
      this.#collectData(node)
    })

    /** @type {ExportData[]} */
    const exportsData = []

    for (const node of this.#collectedExportNodes) {
      const exportNode = this.#parseNode(node)

      if (exportNode) exportsData.push(exportNode)
    }

    return exportsData
  }

  /**
   * @param {ts.Node} node
   */
  #collectData(node) {
    // example: export default function func() {}
    if (hasExportModifier(node)) {
      this.#collectedExportNodes.push(node)
    }

    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration: {
        this.#collectedClassNodes.set(getName(node), node)

        break
      }
      case ts.SyntaxKind.FunctionDeclaration:
      case ts.SyntaxKind.ArrowFunction: {
        this.#collectedFunctionNodes.set(getName(node), node)

        break
      }
      case ts.SyntaxKind.VariableStatement: {
        // @ts-ignore
        const declarationNode = node?.declarationList?.declarations?.[0]

        if (declarationNode) {
          this.#collectedVariableNodes.set(
            getName(declarationNode),
            declarationNode
          )
        }

        break
      }
      // example: export default something
      case ts.SyntaxKind.ExportAssignment: {
        if (ts.isExportAssignment(node)) { // for TS reasons
          this.#collectedExportNodes.push(node)
        }

        break
      }
      // example: export { abc, def }
      case ts.SyntaxKind.ExportDeclaration: {
        ts.forEachChild(node, (exportNode) => {
          if (exportNode.kind === ts.SyntaxKind.NamedExports) {
            ts.forEachChild(exportNode, (namedExportNode) => {
              this.#collectedExportNodes.push(namedExportNode)
            })
          }
        })

        break
      }
      default: {
        // nothing
      }
    }
  }

  /**
   * @param {ts.Node} exportNode
   * @returns {ExportData | null}
   */
  #parseNode(exportNode) {
    // example: export default { funcOne, funcTwo, funcThree }
    if (
      ts.isExportAssignment(exportNode)
      && ts.isObjectLiteralExpression(exportNode.expression)
    ) {
      const isDefault = true
      const exportKind = EnumExportKinds.ObjectLiteralExpression
      const name = ''
      const classElements = null
      /** @type {string[]} */
      const exportObjectLiteralElements = []

      ts.forEachChild(exportNode.expression, (node) => {
        if (node.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
          exportObjectLiteralElements.push(getName(node))
        }
      })

      return {
        isDefault,
        exportKind,
        name,
        classElements,
        exportObjectLiteralElements
      }
    }

    const kinds = [
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.VariableStatement
    ]

    for (const kind of kinds) {
      let exportKind = EnumExportKinds.none
      let collectedNodes = this.#collectedClassNodes

      switch (kind) {
        case ts.SyntaxKind.FunctionDeclaration: {
          exportKind = EnumExportKinds.function
          collectedNodes = this.#collectedFunctionNodes

          break
        }
        case ts.SyntaxKind.ClassDeclaration: {
          exportKind = EnumExportKinds.class
          collectedNodes = this.#collectedClassNodes

          break
        }
        case ts.SyntaxKind.VariableStatement: {
          collectedNodes = this.#collectedVariableNodes

          break
        }
        default: {
          // nothing
        }
      }

      for (const [name, node] of collectedNodes) {
        const exportNodeName = getName(exportNode)

        if (name === exportNodeName) {
          const isDefault = (
            exportNode.kind === ts.SyntaxKind.ExportAssignment
            || hasDefaultExportModifier(exportNode)
          )

          let classElements = null

          if (kind === ts.SyntaxKind.ClassDeclaration) {
            classElements = extractClassElements(node)
          }

          if (kind === ts.SyntaxKind.VariableStatement) {
            // @ts-ignore
            const initializer = node?.initializer

            if (!initializer) continue

            switch (initializer.kind) {
              case ts.SyntaxKind.ClassExpression: {
                exportKind = EnumExportKinds.class

                break
              }
              case ts.SyntaxKind.FunctionExpression:
              case ts.SyntaxKind.ArrowFunction: {
                exportKind = EnumExportKinds.function

                break
              }
              case ts.SyntaxKind.Identifier: {
                /**
                 * @example
                 * const functionName = function() {}
                 * const exportName = functionName
                 */

                const identifierName = initializer.escapedText

                // search for class or a function

                if (this.#collectedVariableNodes.has(identifierName)) {
                  const node = this.#collectedVariableNodes.get(identifierName)
                  // @ts-ignore
                  const initializer = node?.initializer

                  if (node && initializer) {
                    if (
                      initializer.kind === ts.SyntaxKind.ClassExpression
                      || initializer.kind === ts.SyntaxKind.ClassDeclaration
                    ) {
                      exportKind = EnumExportKinds.class
                      classElements = extractClassElements(node)
                    }
                    else if (
                      initializer.kind === ts.SyntaxKind.FunctionExpression
                      || initializer.kind === ts.SyntaxKind.FunctionDeclaration
                      || initializer.kind === ts.SyntaxKind.ArrowFunction
                    ) {
                      exportKind = EnumExportKinds.function
                    }
                  }
                }
                else if (this.#collectedClassNodes.has(identifierName)) {
                  exportKind = EnumExportKinds.class
                  classElements = extractClassElements(
                    // @ts-ignore
                    this.#collectedClassNodes.get(identifierName)
                  )
                }
                else if (this.#collectedFunctionNodes.has(identifierName)) {
                  exportKind = EnumExportKinds.function
                }

                break
              }
              default: {
                exportKind = EnumExportKinds.none
              }
            }

            if (
              exportKind === EnumExportKinds.none
            ) {
              /*
               * continue // this "continue" here seems to continue
               * the top for loop
               */
            }

            if (initializer.kind === ts.SyntaxKind.ClassExpression) {
              classElements = extractClassElements(initializer)
            }
          }

          return { isDefault, exportKind, name, classElements }
        }
      }
    }

    return null
  }
}

/**
 * @param {string} fileName
 * @param {string} [sourceText]
 * @returns {Promise<ExportData[]>}
 * @throws {Error}
 */
async function extractExportsData(fileName, sourceText) {
  const fileContents = sourceText ?? (await readFile(fileName)).toString()
  const tsSourceFile = ts.createSourceFile(
    fileName,
    fileContents,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.JS
  )

  return new EsModuleExportsExtractor(tsSourceFile).process()
}

export { EnumExportKinds, extractExportsData }
