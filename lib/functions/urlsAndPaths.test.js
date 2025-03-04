import { describe, expect, test } from 'vitest'
import {
  extractNodeModulePathname,
  isClientPath,
  isClientScript,
  isNodeModule,
  isPubliclyAccessiblePath,
  isRoutesScript,
  isUnprocessedStyleFile,
  normalizePathSlashes,
  normalizeURLPath,
  pathSplit,
  replacePathSeparators
} from './urlsAndPaths.js'

describe('URL Functions', () => {
  describe('URL functions', () => {
    test('normalizePathSlashes', () => {
      expect(
        normalizePathSlashes('/a/b//c///d\\e\\\\f\\\\\\g')
      ).toBe(
        '/a/b/c/d/e/f/g'
      )

      expect(
        normalizePathSlashes('/a/b//c///d\\e\\\\f\\\\\\g', '\\')
      ).toBe(
        '\\a\\b\\c\\d\\e\\f\\g'
      )
    })

    test('should normalize url path', () => {
      expect(
        normalizeURLPath('/dir1\\\\dir2./dir3\\../dir4/file.ext?key=value')
      ).toBe(
        '/dir1/dir2/dir4/file.ext?key=value'
      )
    })

    test('replacePathSeparators()', () => {
      const filePath = 'C:\\folder\\file.ext'
      const urlPath = 'https://example.com/file.ext'

      expect(
        replacePathSeparators(filePath, '-')
      ).toBe(
        'C--folder-file.ext'
      )
      expect(
        replacePathSeparators(urlPath, '-')
      ).toBe(
        'https---example.com-file.ext'
      )
    })
  })

  describe('Path Functions', () => {
    test('pathSplit()', () => {
      const fn = pathSplit

      expect(fn('dir/file.ext')).toStrictEqual(['dir', 'file.ext'])
      expect(fn('/dir/file.ext')).toStrictEqual(['dir', 'file.ext'])
      // Mixed and multiple slashes
      expect(fn('\\/dir///\\file.ext')).toStrictEqual(['dir', 'file.ext'])
    })

    test('isUnprocessedStyleFile()', () => {
      const fn = isUnprocessedStyleFile
      const dirName = 'styles'

      // Try wrong paths
      expect(fn('')).toBe(false)
      expect(fn(`/module/${dirName}`)).toBe(false)
      expect(fn(`/module/${dirName}/dir`)).toBe(false)
      // Try correct paths
      expect(fn(`module/${dirName}/file.styl`)).toBe(true)
      expect(fn(`/module/${dirName}/file.styl`)).toBe(true)
      expect(fn(`/module/${dirName}/file.sass`)).toBe(true)
      expect(fn(`/module/${dirName}/file.scss`)).toBe(true)
      expect(fn(`\\module\\${dirName}\\file.styl`)).toBe(true)
      expect(fn(`/module\\${dirName}\\/file.styl`)).toBe(true)
      expect(fn(`/module/${dirName}/dir/file.styl`)).toBe(true)
    })

    test('isClientScript()', () => {
      const fn = isClientScript
      const dirName = 'client'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('/module/dir', dirName)).toBe(false)
      expect(fn('/module/dir/file.js', dirName)).toBe(false)
      expect(fn('/module/dir/dir', dirName)).toBe(false)
      expect(fn('/module/dir/dir/file.js', dirName)).toBe(false)
      expect(fn('', dirName)).toBe(false)
      expect(fn('/module/dir', dirName)).toBe(false)
      // Try correct paths
      expect(fn(`/module/${dirName}/file.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/file.ts`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/file.mjs`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/file.mts`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/dir/file.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/dir/dir/file.js`, dirName)).toBe(true)
    })

    test('isClientPath()', () => {
      const fn = isClientPath
      const dirName = 'client'
      const fileName = 'file'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('', dirName)).toBe(false)
      expect(fn('/fileName.txt', dirName)).toBe(false)
      // Try correct paths
      expect(fn(`/module/${dirName}`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/fileWithoutExt`, dirName)).toBe(true)
      expect(fn(`module/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.jpg`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.txt`, dirName)).toBe(true)
      expect(fn(`\\module\\${dirName}\\${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module\\${dirName}\\/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/dir/${fileName}.js`, dirName)).toBe(true)
    })

    test('isRoutesScript()', () => {
      const fn = isRoutesScript
      const dirName = 'routes'
      const fileName = 'file'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('', dirName)).toBe(false)
      expect(fn(`/module/${dirName}`, dirName)).toBe(false)
      expect(fn(`/module/${dirName}/dir`, dirName)).toBe(false)
      // Try correct paths
      expect(fn(`module/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`module/${dirName}/${fileName}.ts`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.ts`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.mjs`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/${fileName}.mts`, dirName)).toBe(true)
      expect(fn(`\\module\\${dirName}\\${fileName}.js`, dirName)).toBe(true)
      expect(fn(`\\module\\${dirName}\\${fileName}.ts`, dirName)).toBe(true)
      expect(fn(`/module\\${dirName}\\/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module\\${dirName}\\/${fileName}.ts`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/dir/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/module/${dirName}/dir/${fileName}.ts`, dirName)).toBe(true)
    })

    test('isPubliclyAccessiblePath()', () => {
      const fn = isPubliclyAccessiblePath
      const dirName = 'server'
      const forbiddenDirNames = new Set(['server'])

      // Try wrong paths
      expect(fn(`/module/${dirName}`, forbiddenDirNames)).toBe(false)
      expect(fn(`/module/${dirName}/file.js`, forbiddenDirNames)).toBe(false)
      expect(fn(`/module/${dirName}/dir`, forbiddenDirNames)).toBe(false)
      expect(fn(`/module/${dirName}/dir/file.js`, forbiddenDirNames)).toBe(false)
      // Try correct paths
      expect(fn('', forbiddenDirNames)).toBe(true)
      expect(fn('/module/dir', forbiddenDirNames)).toBe(true)
      expect(fn('/module/dir/file.js', forbiddenDirNames)).toBe(true)
      expect(fn('/module/dir/dir/file.js', forbiddenDirNames)).toBe(true)
    })

    test('isNodeModule()', () => {
      const fn = isNodeModule

      // Try wrong paths
      expect(fn('/modules/test')).toBe(false)
      expect(fn('test')).toBe(false)
      expect(fn('/@modules')).toBe(false)
      // Try correct paths
      expect(fn('/@modules/test')).toBe(true)
      expect(fn('/@modules/chart.js')).toBe(true)
    })

    test('extractNodeModulePathname()', () => {
      const fn = extractNodeModulePathname

      // Try wrong paths
      expect(fn('/modules/test')).toBe('')
      expect(fn('test')).toBe('')
      expect(fn('/@modules')).toBe('')

      // Try correct paths
      expect(fn('/@modules/test')).toBe('test')
      expect(fn('/@modules/chart.js')).toBe('chart.js')
    })
  })
})
