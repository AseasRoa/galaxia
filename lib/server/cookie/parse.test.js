import { parse } from './index.js'

describe('parse(str)', () => {
  test('should parse cookie string to object', () => {
    expect(parse('foo=bar')).toStrictEqual({ foo: 'bar' })
    expect(parse('foo=123')).toStrictEqual({ foo: '123' })
  })

  test('should ignore OWS', () => {
    expect(parse('FOO    = bar;   baz  =   raz')).toStrictEqual({
      FOO: 'bar',
      baz: 'raz',
    })
  })

  test('should parse cookie with empty value', () => {
    expect(parse('foo=; bar=')).toStrictEqual({ foo: '', bar: '' })
  })

  test('should parse cookie with minimum length', () => {
    expect(parse('f=')).toStrictEqual({ f: '' })
    expect(parse('f=;b=')).toStrictEqual({ f: '', b: '' })
  })

  test('should URL-decode values', () => {
    expect(parse('foo="bar=123456789&name=Magic+Mouse"')).toStrictEqual({
      foo: '"bar=123456789&name=Magic+Mouse"',
    })

    expect(parse('email=%20%22%2c%3b%2f')).toStrictEqual({ email: ' ",;/' })
  })

  test('should trim whitespace around key and value', () => {
    expect(parse('  foo  =  "bar"  ')).toStrictEqual({ foo: '"bar"' })
    expect(parse('  foo  =  bar  ;  fizz  =  buzz  ')).toStrictEqual({
      foo: 'bar',
      fizz: 'buzz',
    })
    expect(parse(' foo = " a b c " ')).toStrictEqual({ foo: '" a b c "' })
    expect(parse(' = bar ')).toStrictEqual({ '': 'bar' })
    expect(parse(' foo = ')).toStrictEqual({ foo: '' })
    expect(parse('   =   ')).toStrictEqual({ '': '' })
    expect(parse('\tfoo\t=\tbar\t')).toStrictEqual({ foo: 'bar' })
  })

  test('should return original value on escape error', () => {
    expect(parse('foo=%1;bar=bar')).toStrictEqual({ foo: '%1', bar: 'bar' })
  })

  test('should ignore cookies without value', () => {
    expect(parse('foo=bar;fizz  ;  buzz')).toStrictEqual({ foo: 'bar' })
    expect(parse('  fizz; foo=  bar')).toStrictEqual({ foo: 'bar' })
  })

  test('should ignore duplicate cookies', () => {
    expect(parse('foo=%1;bar=bar;foo=boo')).toStrictEqual({
      foo: '%1',
      bar: 'bar',
    })
    expect(parse('foo=false;bar=bar;foo=true')).toStrictEqual({
      foo: 'false',
      bar: 'bar',
    })
    expect(parse('foo=;bar=bar;foo=boo')).toStrictEqual({
      foo: '',
      bar: 'bar',
    })
  })

  test('should parse native properties', () => {
    expect(parse('toString=foo;valueOf=bar')).toStrictEqual({
      toString: 'foo',
      valueOf: 'bar',
    })
  })
})

describe('parse(str, options)', () => {
  describe('with "decode" option', () => {
    test('should specify alternative value decoder', () => {
      expect(
        // eslint-disable-next-line object-shorthand
        parse('foo="YmFy"', {
          decode: function(v) {
            return Buffer.from(v, 'base64').toString()
          },
        }),
      ).toStrictEqual({ foo: 'bar' })
    })
  })
})
