import { extractEntryPoint } from './packageJson.js'

describe('packageJson', () => {
  test('wrong input data', () => {
    // @ts-ignore
    expect(() => extractEntryPoint(123)).toThrow()
  })

  test('empty input data', () => {
    // @ts-ignore
    expect(extractEntryPoint({})).toBe('')
  })

  test('main only', () => {
    expect(extractEntryPoint({ main: './index.js' })).toBe('./index.js')
  })

  test('module only', () => {
    expect(extractEntryPoint({ module: './index.js' })).toBe('./index.js')
  })

  describe('exports', () => {
    test('string', () => {
      expect(extractEntryPoint({ exports: './index.js' })).toBe('./index.js')
    })

    test('object', () => {
      expect(extractEntryPoint({ exports: './index.js' })).toBe('./index.js')
    })

    test('conditional exports with require and import', () => {
      expect(extractEntryPoint({
        exports: {
          require: './require.js',
        }
      }, false)).toBe('./require.js')

      expect(extractEntryPoint({
        exports: {
          import: './import.js'
        }
      }, true)).toBe('./import.js')

      expect(extractEntryPoint({
        exports: {
          default: './default.js'
        }
      })).toBe('./default.js')

      // Preference
      expect(extractEntryPoint({
        exports: {
          import: './import.js',
          require: './require.js',
          default: './default.js'
        }
      })).toBe('./import.js')
      expect(extractEntryPoint({
        exports: {
          import: './import.js',
          require: './require.js',
          default: './default.js'
        }
      }, false)).toBe('./require.js')
    })
  })
})
