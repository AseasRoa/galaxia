import { serialize } from './index.js'

describe('serialize(name, value)', () => {
  test('should serialize name and value', () => {
    expect(serialize('foo', 'bar')).toBe('foo=bar')
  })

  test('should URL-encode value', () => {
    expect(serialize('foo', 'bar +baz')).toBe('foo=bar%20%2Bbaz')
  })

  test('should serialize empty value', () => {
    expect(serialize('foo', '')).toBe('foo=')
  })

  test.each([
    ['foo'],
    ['foo,bar'],
    ['foo!bar'],
    ['foo#bar'],
    ['foo$bar'],
    ['foo\'bar'],
    ['foo*bar'],
    ['foo+bar'],
    ['foo-bar'],
    ['foo.bar'],
    ['foo^bar'],
    ['foo_bar'],
    ['foo`bar'],
    ['foo|bar'],
    ['foo~bar'],
    ['foo7bar'],
    ['foo/bar'],
    ['foo@bar'],
    ['foo[bar'],
    ['foo]bar'],
    ['foo:bar'],
    ['foo{bar'],
    ['foo}bar'],
    ['foo"bar'],
    ['foo<bar'],
    ['foo>bar'],
    ['foo?bar'],
    ['foo\\bar'],
  ])('should serialize name: %s', (name) => {
    expect(serialize(name, 'baz')).toBe(`${name}=baz`)
  })

  test.each([
    ['foo\n'],
    ['foo\u280a'],
    ['foo=bar'],
    ['foo;bar'],
    ['foo bar'],
    ['foo\tbar'],
  ])('should throw for invalid name: %s', (name) => {
    expect(() => serialize(name, 'bar')).toThrow(
      /argument name is invalid/u,
    )
  })
})

describe('serialize(name, value, options)', () => {
  describe('with "domain" option', () => {
    test.each([
      ['example.com'],
      ['sub.example.com'],
      ['.example.com'],
      ['localhost'],
      ['.localhost'],
      ['my-site.org'],
      ['localhost'],
    ])('should serialize domain: %s', (domain) => {
      expect(serialize('foo', 'bar', { domain })).toBe(
        `foo=bar; Domain=${domain}`,
      )
    })

    test.each([
      ['example.com\n'],
      ['sub.example.com\u0000'],
      ['my site.org'],
      ['domain..com'],
      ['example.com; Path=/'],
      ['example.com /* inject a comment */'],
    ])('should throw for invalid domain: %s', (domain) => {
      expect(() => serialize('foo', 'bar', { domain })).toThrow(
        /option domain is invalid/u,
      )
    })
  })

  describe('with "encode" option', () => {
    test('should specify alternative value encoder', () => {
      expect(
        // eslint-disable-next-line object-shorthand
        serialize('foo', 'bar', {
          encode: function(v) {
            return Buffer.from(v, 'utf8').toString('base64')
          },
        }),
      ).toBe('foo=YmFy')
    })

    test.each(['foo=bar', 'foo"bar', 'foo,bar', 'foo\\bar', 'foo$bar'])(
      'should serialize value: %s',
      (value) => {
        expect(serialize('foo', value, { encode: (x) => x })).toBe(
          `foo=${value}`,
        )
      },
    )

    test.each([['+\n'], ['foo bar'], ['foo\tbar'], ['foo;bar'], ['foo\u280a']])(
      'should throw for invalid value: %s',
      (value) => {
        expect(() => serialize('foo', value, { encode: (x) => x }),
        ).toThrow(/argument val is invalid/u)
      },
    )
  })

  describe('with "expires" option', () => {
    test('should throw on invalid date', () => {
      expect(
        serialize.bind(null, 'foo', 'bar', { expires: new Date(NaN) }),
      ).toThrow(/option expires is invalid/u)
    })

    test('should set expires to given date', () => {
      expect(
        serialize('foo', 'bar', {
          expires: new Date(Date.UTC(2000, 11, 24, 10, 30, 59, 900)),
        }),
      ).toBe('foo=bar; Expires=Sun, 24 Dec 2000 10:30:59 GMT')
    })
  })

  describe('with "httpOnly" option', () => {
    test('should include httpOnly flag when true', () => {
      expect(serialize('foo', 'bar', { httpOnly: true })).toBe(
        'foo=bar; HttpOnly',
      )
    })

    test('should not include httpOnly flag when false', () => {
      expect(serialize('foo', 'bar', { httpOnly: false })).toBe(
        'foo=bar',
      )
    })
  })

  describe('with "maxAge" option', () => {
    test('should throw when not a number', () => {
      expect(() => {
        /** @ts-expect-error */
        serialize('foo', 'bar', { maxAge: 'buzz' })
      }).toThrow(/option maxAge is invalid/u)
    })

    test('should throw when Infinity', () => {
      expect(() => {
        serialize('foo', 'bar', { maxAge: Infinity })
      }).toThrow(/option maxAge is invalid/u)
    })

    test('should throw when max-age is not an integer', () => {
      expect(() => {
        serialize('foo', 'bar', { maxAge: 3.14 })
      }).toThrow(/option maxAge is invalid/u)
    })

    test('should set max-age to value', () => {
      expect(serialize('foo', 'bar', { maxAge: 1000 })).toBe(
        'foo=bar; Max-Age=1000',
      )
      expect(serialize('foo', 'bar', { maxAge: 0 })).toBe(
        'foo=bar; Max-Age=0',
      )
    })

    test('should not set when undefined', () => {
      expect(serialize('foo', 'bar', { maxAge: undefined })).toBe(
        'foo=bar',
      )
    })
  })

  describe('with "partitioned" option', () => {
    test('should include partitioned flag when true', () => {
      expect(serialize('foo', 'bar', { partitioned: true })).toBe(
        'foo=bar; Partitioned',
      )
    })

    test('should not include partitioned flag when false', () => {
      expect(serialize('foo', 'bar', { partitioned: false })).toBe(
        'foo=bar',
      )
    })

    test('should not include partitioned flag when not defined', () => {
      expect(serialize('foo', 'bar', {})).toBe('foo=bar')
    })
  })

  describe('with "path" option', () => {
    test('should serialize path', () => {
      const validPaths = [
        '/',
        '/login',
        '/foo.bar/baz',
        '/foo-bar',
        '/foo=bar?baz',
        '/foo"bar"',
        '/../foo/bar',
        '../foo/',
        './',
      ]

      validPaths.forEach((path) => {
        expect(serialize('foo', 'bar', { path })).toBe(
          `foo=bar; Path=${path}`,
        )
      })
    })

    test('should throw for invalid value', () => {
      const invalidPaths = [
        '/\n',
        '/foo\u0000',
        '/path/with\rnewline',
        '/; Path=/sensitive-data',
        '/login"><script>alert(1)</script>',
      ]

      invalidPaths.forEach((path) => {
        expect(
          serialize.bind(null, 'foo', 'bar', { path }),
        ).toThrow(/option path is invalid/u)
      })
    })
  })

  describe('with "priority" option', () => {
    test('should throw on invalid priority', () => {
      expect(() => {
        /** @ts-expect-error */
        serialize('foo', 'bar', { priority: 'foo' })
      }).toThrow(/option priority is invalid/u)
    })

    test('should throw on non-string', () => {
      expect(() => {
        /** @ts-expect-error */
        serialize('foo', 'bar', { priority: 42 })
      }).toThrow(/option priority is invalid/u)
    })

    test('should set priority low', () => {
      expect(serialize('foo', 'bar', { priority: 'low' })).toBe(
        'foo=bar; Priority=Low',
      )
    })

    test('should set priority medium', () => {
      expect(serialize('foo', 'bar', { priority: 'medium' })).toBe(
        'foo=bar; Priority=Medium',
      )
    })

    test('should set priority high', () => {
      expect(serialize('foo', 'bar', { priority: 'high' })).toBe(
        'foo=bar; Priority=High',
      )
    })

    test('should set priority case insensitive', () => {
      /** @ts-expect-error */
      expect(serialize('foo', 'bar', { priority: 'High' })).toBe(
        'foo=bar; Priority=High',
      )
    })
  })

  describe('with "sameSite" option', () => {
    test('should throw on invalid sameSite', () => {
      expect(() => {
        /** @ts-expect-error */
        serialize('foo', 'bar', { sameSite: 'foo' })
      }).toThrow(/option sameSite is invalid/u)
    })

    test('should set sameSite strict', () => {
      expect(serialize('foo', 'bar', { sameSite: 'strict' })).toBe(
        'foo=bar; SameSite=Strict',
      )
    })

    test('should set sameSite lax', () => {
      expect(serialize('foo', 'bar', { sameSite: 'lax' })).toBe(
        'foo=bar; SameSite=Lax',
      )
    })

    test('should set sameSite none', () => {
      expect(serialize('foo', 'bar', { sameSite: 'none' })).toBe(
        'foo=bar; SameSite=None',
      )
    })

    test('should set sameSite strict when true', () => {
      expect(serialize('foo', 'bar', { sameSite: true })).toBe(
        'foo=bar; SameSite=Strict',
      )
    })

    test('should not set sameSite when false', () => {
      expect(serialize('foo', 'bar', { sameSite: false })).toBe(
        'foo=bar',
      )
    })

    test('should set sameSite case insensitive', () => {
      /** @ts-expect-error */
      expect(serialize('foo', 'bar', { sameSite: 'Lax' })).toBe(
        'foo=bar; SameSite=Lax',
      )
    })
  })

  describe('with "secure" option', () => {
    test('should include secure flag when true', () => {
      expect(serialize('foo', 'bar', { secure: true })).toBe(
        'foo=bar; Secure',
      )
    })

    test('should not include secure flag when false', () => {
      expect(serialize('foo', 'bar', { secure: false })).toBe(
        'foo=bar',
      )
    })
  })
})
