import ts from 'typescript'
import { describe, expect, test } from 'vitest'
import { EnumExportKinds, extractExportsData } from './esModuleExportsExtractor.js'

describe('extractExportsData', () => {
  const fileName = 'test.js'

  test('default function declaration', async() => {
    const sourceText = `
    export default function funcOne() {}
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: true,
      exportKind: EnumExportKinds.function,
      name: 'funcOne',
      classElements: null
    }])
  })

  test('function expression', async() => {
    const sourceText = `
    export const funcOne = function() {}
    export const funcTwo = () => {}
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'funcOne',
      classElements: null
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'funcTwo',
      classElements: null
    }])
  })

  test('export declaration: functions', async() => {
    const sourceText = `
    function funcOne() {}
    const funcTwo = function someName() {}
    const funcThree = () => {}
    export { funcOne, funcTwo, funcThree }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'funcOne',
      classElements: null
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'funcTwo',
      classElements: null
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'funcThree',
      classElements: null
    }])
  })

  test('export declaration (default): functions', async() => {
    const sourceText = `
    function funcOne() {}
    const funcTwo = function someName() {}
    const funcThree = () => {}
    export default { funcOne, funcTwo, funcThree }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: true,
      exportKind: EnumExportKinds.ObjectLiteralExpression,
      name: '',
      classElements: null,
      exportObjectLiteralElements: ['funcOne', 'funcTwo', 'funcThree']
    }])
  })

  test('export functions: complex case', async() => {
    const sourceText = `
    const functionOne = () => {}
    const exportOne = functionOne
    export default exportOne
    
    const functionTwo = () => {}
    export const exportTwo = functionTwo
    
    const functionThree = function() {}
    const exportThree = functionThree
    
    export { exportThree }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: true,
      exportKind: EnumExportKinds.function,
      name: 'exportOne',
      classElements: null
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'exportTwo',
      classElements: null
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.function,
      name: 'exportThree',
      classElements: null
    }])
  })

  test('default class declaration', async() => {
    const sourceText = `
    export default class ClassOne {}
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: true,
      exportKind: EnumExportKinds.class,
      name: 'ClassOne',
      classElements: {
        name: 'ClassOne',
        fields: [],
        methods: [],
        modifiers: [
          ts.SyntaxKind.ExportKeyword,
          ts.SyntaxKind.DefaultKeyword
        ]
      }
    }])
  })

  test('class expression', async() => {
    const sourceText = `
    export const ClassOne = class SomeName {}
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'ClassOne',
      classElements: {
        name: 'SomeName', fields: [], methods: [], modifiers: []
      }
    }])
  })

  test('export declaration: classes', async() => {
    const sourceText = `
    class ClassOne {}
    const ClassTwo = class SomeName{}
    export { ClassOne, ClassTwo }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'ClassOne',
      classElements: { name: 'ClassOne', fields: [], methods: [], modifiers: [] }
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'ClassTwo',
      classElements: { name: 'SomeName', fields: [], methods: [], modifiers: [] }
    }])
  })

  test('export classes: complex case', async() => {
    const sourceText = `
    class ClassOne {}
    const exportOne = ClassOne
    export default exportOne
    
    const ClassTwo = class {}
    export const exportTwo = ClassTwo
    
    class ClassThree {}
    const exportThree = ClassThree
    
    export { exportThree }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: true,
      exportKind: EnumExportKinds.class,
      name: 'exportOne',
      classElements: { name: 'ClassOne', fields: [], methods: [], modifiers: [] }
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'exportTwo',
      classElements: { name: 'ClassTwo', fields: [], methods: [], modifiers: [] }
    }, {
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'exportThree',
      classElements: { name: 'ClassThree', fields: [], methods: [], modifiers: [] }
    }])
  })

  test('class methods and fields', async() => {
    const sourceText = `
    export const ClassOne = class SomeName {
      publicField = 'public'
      #privateField = 'private'
      
      async publicMethod() {}
      async #privateMethod() {}
    }
    `

    const result = await extractExportsData(fileName, sourceText)

    expect(result).toStrictEqual([{
      isDefault: false,
      exportKind: EnumExportKinds.class,
      name: 'ClassOne',
      classElements: {
        name: 'SomeName',
        fields: [
          { name: '', isPrivate: false, isPublic: true, modifiers: [] },
          { name: '', isPrivate: true, isPublic: false, modifiers: [] }
        ],
        methods: [{
          name: 'publicMethod',
          isPrivate: false,
          isPublic: true,
          modifiers: [ts.SyntaxKind.AsyncKeyword]
        }, {
          name: '#privateMethod',
          isPrivate: true,
          isPublic: false,
          modifiers: [ts.SyntaxKind.AsyncKeyword]
        }],
        modifiers: []
      }
    }])
  })
})
