import {
  getPathFromFileURI, parseStackLine
} from './stackTrace.js'

describe('functions', () => {
  test('getPathFromFileURI', () => {
    const fn = getPathFromFileURI
    expect(fn('file://localhost/etc/fstab')).toBe('/localhost/etc/fstab')
    expect(fn('file:///etc/fstab')).toBe('/etc/fstab')
    expect(fn('file:/etc/fstab')).toBe('/etc/fstab')
    expect(fn('file:///c:/WINDOWS/clock.avi')).toBe('c:/WINDOWS/clock.avi')
  })

  test('parseStackLine', () => {
    const fn = parseStackLine

    // V8
    expect(fn('at ClassName.methodName (/path/fileName.js:10:20)'))
      .toMatchObject({
        1: 'ClassName.methodName',
        2: '/path/fileName.js',
        3: '10',
        4: '20'
      })

    // V8
    expect(fn('at /path/fileName.js:10:20'))
      .toMatchObject({
        1: '',
        2: '/path/fileName.js',
        3: '10',
        4: '20'
      })

    // FF30
    expect(fn('trace@/path/fileName.js:10:20'))
      .toMatchObject({
        1: 'trace',
        2: '/path/fileName.js',
        3: '10',
        4: '20'
      })

    // FF14 to DD29
    expect(fn('trace@/path/fileName.js:10'))
      .toMatchObject({
        1: 'trace',
        2: '/path/fileName.js',
        3: '10',
        4: ''
      })
  })
})
