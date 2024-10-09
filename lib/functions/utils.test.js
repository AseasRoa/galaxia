/* eslint-disable max-classes-per-file */

import process from 'node:process'
import {
  generateRandomString,
  getCompressionAlgorithmName,
  isClass,
  isNodeJSVersionAtLeast,
  jsonToStrMap,
  objToStrMap,
  strMapToJson,
  strMapToObj
} from './utils.js'

describe('utils', () => {
  test('isNodeJSVersionAtLeast()', () => {
    let [major, minor, patch] = process.versions.node
      .split('.')
      .map((value) => parseInt(value))

    major ??= 0
    minor ??= 0
    patch ??= 0

    expect(major > 0).toBe(true)

    expect(isNodeJSVersionAtLeast(major)).toBe(true)
    expect(isNodeJSVersionAtLeast(major, minor)).toBe(true)
    expect(isNodeJSVersionAtLeast(major, minor, patch)).toBe(true)

    expect(isNodeJSVersionAtLeast(major - 1)).toBe(true)
    expect(isNodeJSVersionAtLeast(major, minor - 1)).toBe(true)
    expect(isNodeJSVersionAtLeast(major, minor, patch - 1)).toBe(true)

    expect(isNodeJSVersionAtLeast(major + 1)).toBe(false)
    expect(isNodeJSVersionAtLeast(major, minor + 1)).toBe(false)
    expect(isNodeJSVersionAtLeast(major, minor, patch + 1)).toBe(false)

    expect(isNodeJSVersionAtLeast(0, 0, 0)).toBe(true)
    expect(isNodeJSVersionAtLeast(-100, -100, -100)).toBe(true)
  })

  test('isClass()', () => {
    class EmptyClass {}

    class ClassWithMethod {
      /**
       * @returns {void}
       */
      someMethod() {
        // nothing
      }
    }

    const ClassAsConst = class {}

    expect(isClass(EmptyClass)).toBe(true)
    expect(isClass(ClassWithMethod)).toBe(true)
    expect(isClass(ClassAsConst)).toBe(true)

    expect(isClass(() => {})).toBe(false)
    expect(isClass(() => {})).toBe(false)
    expect(isClass(() => {})).toBe(false)

    expect(isClass(async() => {})).toBe(false)
    expect(isClass(async() => {})).toBe(false)

    expect(isClass(Date)).toBe(false)
    expect(isClass(Proxy)).toBe(false)
  })

  test('objToStrMap()', () => {
    const obj = { a: 1, b: 'two', 3: 'three' }
    const map = objToStrMap(obj)

    expect(obj.a).toBe(map.get('a'))
    expect(obj.b).toBe(map.get('b'))
    expect(obj[3]).toBe(map.get('3'))
  })

  test('strMapToObj()', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 'two')
    map.set(3, 'three')

    const obj = strMapToObj(map)

    expect(obj.a).toBe(map.get('a'))
    expect(obj.b).toBe(map.get('b'))
    expect(obj['3']).toBe(map.get(3))
  })

  test('strMapToJson()', () => {
    const map = new Map()
    map.set('a', 1)
    map.set('b', 'two')
    map.set(3, 'three')
    const json = strMapToJson(map)

    expect(json).toBe('{"3":"three","a":1,"b":"two"}')
  })

  test('jsonToStrMap()', () => {
    const json = JSON.stringify({ a: 1, b: 'two', 3: 'three' })
    const map = jsonToStrMap(json)

    expect(map.get('a')).toBe(1)
    expect(map.get('b')).toBe('two')
    expect(map.get('3')).toBe('three')
  })

  test('generateRandomString()', () => {
    expect(generateRandomString(10).length).toBe(10)
    expect(generateRandomString(1).length).toBe(1)
    expect(generateRandomString(0).length).toBe(0)
    expect(generateRandomString(-10).length).toBe(0)
  })

  test('getCompressionAlgorithmName', () => {
    expect(
      getCompressionAlgorithmName('deflate, gzip;q=1.0, *;q=0.5')
    ).toBe('deflate')
    expect(
      getCompressionAlgorithmName('br;q=1.0, gzip;q=0.8, *;q=0.1')
    ).toBe('br')
    expect(
      getCompressionAlgorithmName('', ['gzip', 'deflate'])
    ).toBe('gzip')
    expect(
      getCompressionAlgorithmName('compress;q=0.5, gzip;q=1.0', ['gzip'])
    ).toBe('gzip')
  })
})
