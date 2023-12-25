import {
  extractNodeModuleName,
  isClientJSFile,
  isClientPath,
  isNodeModule,
  isPubliclyAccessiblePath,
  isRouterFile,
  isUnprocessedStyleFile,
  normalizeURLPath,
  pathSplit,
  replacePathSeparators
} from './urlsAndPaths.js'

describe('URL Functions', () => {
  describe('URL functions', () => {
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
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('', dirName)).toBe(false)
      expect(fn(`/component/${dirName}`, dirName)).toBe(false)
      expect(fn(`/component/${dirName}/dir`, dirName)).toBe(false)
      // Try correct paths
      expect(fn(`component/${dirName}/file.styl`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/file.styl`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/file.sass`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/file.scss`, dirName)).toBe(true)
      expect(fn(`\\component\\${dirName}\\file.styl`, dirName)).toBe(true)
      expect(fn(`/component\\${dirName}\\/file.styl`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/dir/file.styl`, dirName)).toBe(false)
    })

    test('isClientJSFile()', () => {
      const fn = isClientJSFile
      const dirName = 'client'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('/component/dir', dirName)).toBe(false)
      expect(fn('/component/dir/file.js', dirName)).toBe(false)
      expect(fn('/component/dir/dir', dirName)).toBe(false)
      expect(fn('/component/dir/dir/file.js', dirName)).toBe(false)
      expect(fn('', dirName)).toBe(false)
      expect(fn('/component/dir', dirName)).toBe(false)
      // Try correct paths
      expect(fn(`/component/${dirName}/file.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/file.mjs`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/file.cjs`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/dir/file.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/dir/dir/file.js`, dirName)).toBe(true)
    })

    test('isClientPath()', () => {
      const fn = isClientPath
      const dirName = 'client'
      const fileName = 'file'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('', dirName)).toBe(false)
      expect(fn(`/component/${dirName}`, dirName)).toBe(false)
      // Try correct paths
      expect(fn(`/component/${dirName}`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/fileWithoutExt`, dirName)).toBe(true)
      expect(fn(`component/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.jpg`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.txt`, dirName)).toBe(true)
      expect(fn(`\\component\\${dirName}\\${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component\\${dirName}\\/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/dir/${fileName}.js`, dirName)).toBe(true)
    })

    test('isRouterFile()', () => {
      const fn = isRouterFile
      const dirName = 'routes'
      const fileName = 'file'

      // Try wrong paths
      expect(() => fn('/anything', '')).toThrow()
      expect(fn('', dirName)).toBe(false)
      expect(fn(`/component/${dirName}`, dirName)).toBe(false)
      expect(fn(`/component/${dirName}/dir`, dirName)).toBe(false)
      // Try correct paths
      expect(fn(`component/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.mjs`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/${fileName}.cjs`, dirName)).toBe(true)
      expect(fn(`\\component\\${dirName}\\${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component\\${dirName}\\/${fileName}.js`, dirName)).toBe(true)
      expect(fn(`/component/${dirName}/dir/${fileName}.js`, dirName)).toBe(true)
    })

    test('isPubliclyAccessiblePath()', () => {
      const fn = isPubliclyAccessiblePath
      const dirName = 'server'
      const forbiddenDirNames = new Set(['server'])

      // Try wrong paths
      expect(fn(`/component/${dirName}`, forbiddenDirNames)).toBe(false)
      expect(fn(`/component/${dirName}/file.js`, forbiddenDirNames)).toBe(false)
      expect(fn(`/component/${dirName}/dir`, forbiddenDirNames)).toBe(false)
      expect(fn(`/component/${dirName}/dir/file.js`, forbiddenDirNames)).toBe(false)
      // Try correct paths
      expect(fn('', forbiddenDirNames)).toBe(true)
      expect(fn('/component/dir', forbiddenDirNames)).toBe(true)
      expect(fn('/component/dir/file.js', forbiddenDirNames)).toBe(true)
      expect(fn('/component/dir/dir/file.js', forbiddenDirNames)).toBe(true)
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

    test('extractNodeModuleName()', () => {
      const fn = extractNodeModuleName

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
