import eslintJs from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import vitest from 'eslint-plugin-vitest'
import globals from 'globals'

export default [
  {
    ignores: [
      // Directories
      '**/.idea/*',
      '**/.vscode/*',
      '**/dist/*',
      '**/node_modules/*',
      'coverage/*',
      // Files
      '**/*.ts',
      '**/.DS_Store',
      '*.log',
      '.env*',
      'package-lock.json',
      'bun.lockb',
      // To lint files and folders with names starting with a dot
      '!.*'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
      }
    }
  },
  // ESLint
  {
    files: ['**/*.?(c|m)[jt]s?(x)'],
    plugins: {},
    rules: {
      ...eslintJs.configs.recommended.rules,
      // ESLint: Possible Problems
      'array-callback-return': 'error',
      'no-constant-condition': 'off',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-self-compare': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': 'warn',
      'no-use-before-define': ['error', {
        functions: false,
        classes: true,
        variables: true,
        allowNamedExports: false
      }],

      // ESLint: Suggestions
      'accessor-pairs': 'error',
      'block-scoped-var': 'error',
      'camelcase': 'error',
      'curly': ['error', 'multi-line'],
      'default-param-last': 'error',
      'eqeqeq': 'error',
      'func-name-matching': 'error',
      'func-names': ['error', 'as-needed'],
      'grouped-accessor-pairs': 'error',
      'init-declarations': ['error', 'always'],
      'max-classes-per-file': ['error', 1],
      'multiline-comment-style': 'off',
      'new-cap': 'error',
      'no-array-constructor': 'error',
      'no-else-return': 'error',
      'no-extend-native': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-loop-func': 'error',
      'no-new': 'error',
      'no-new-wrappers': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-shadow': 'warn',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'off', // Found issues in regex when used in a template string in RegExp()
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': [2, 'consistent-as-needed'],
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-destructuring': 'warn',
      'prefer-object-has-own': 'error',
      'prefer-rest-params': 'error',
      'prefer-template': 'warn',
      'require-await': 'warn',
      'require-unicode-regexp': 'error',
      'require-yield': 'error',
      'sort-imports': [
        'error', { ignoreCase: true, ignoreDeclarationSort: true }
      ],
      'strict': ['error', 'never'],
      'symbol-description': 'error',
      'vars-on-top': 'error',

      // ESLint: Layout & Formatting

      // ESLint: Deprecated
      'array-element-newline': ['error', 'consistent'],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': 'error',
      'block-spacing': ['error', 'always'],
      'brace-style': ['error', 'stroustrup', { allowSingleLine: false }],
      'comma-dangle': 'off',
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'always'],
      'func-call-spacing': ['error', 'never'],
      'function-call-argument-newline': ['error', 'consistent'],
      'function-paren-newline': 'off',
      'generator-star-spacing': ['error', { before: true, after: true }],
      'handle-callback-err': 'error',
      'implicit-arrow-linebreak': ['error', 'beside'],
      'indent': [
        'error', 2, {
          SwitchCase: 1,
          VariableDeclarator: 'first',
          MemberExpression: 1,
          FunctionDeclaration: { body: 1, parameters: 'first' },
          FunctionExpression: { body: 1, parameters: 'first' },
          StaticBlock: { body: 1 },
          CallExpression: { arguments: 'off' },
          ArrayExpression: 'first',
          ObjectExpression: 'first',
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          offsetTernaryExpressions: false,
          ignoreComments: false
        }
      ],
      'key-spacing': ['error', {
        beforeColon: false,
        afterColon: true,
        mode: 'minimum'
      }
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      'linebreak-style': ['error', 'unix'],
      'lines-around-comment': 'off',
      'lines-between-class-members': [
        'error', {
          enforce: [
            { blankLine: 'always', prev: '*', next: 'field' },
            { blankLine: 'always', prev: 'field', next: '*' },
            { blankLine: 'always', prev: 'method', next: 'method' }
          ]
        }
      ],
      'max-len': [
        'error', {
          code: 80,
          tabWidth: 2,
          comments: 80,
          ignoreComments: false,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ],
      'max-statements-per-line': ['error', { max: 2 }],
      'multiline-ternary': ['error', 'always-multiline'],
      'new-parens': 'error',
      'no-buffer-constructor': 'error',
      'no-confusing-arrow': 'error',
      'no-extra-parens': 'off',
      'no-extra-semi': 'error',
      'no-floating-decimal': 'error',
      'no-mixed-operators': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': 'error',
      'no-new-require': 'error',
      'no-path-concat': 'off',
      'no-restricted-modules': 'off',
      'no-return-await': 'off',
      'no-sync': 'off',
      'no-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'nonblock-statement-body-position': 'off',
      'object-curly-newline': ['error', { consistent: true }],
      'object-curly-spacing': ['error', 'always'],
      'object-property-newline': 'off',
      'one-var-declaration-per-line': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'padded-blocks': ['error', 'never'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'class' },
        { blankLine: 'always', prev: '*', next: 'do' },
        { blankLine: 'always', prev: '*', next: 'for' },
        { blankLine: 'always', prev: '*', next: 'while' },
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: '*', next: 'throw' },
        { blankLine: 'always', prev: '*', next: 'try' },
        { blankLine: 'always', prev: '*', next: 'return' }
      ],
      'prefer-reflect': 'off',
      'quote-props': ['error', 'consistent-as-needed'],
      'quotes': ['error', 'single'],
      'require-jsdoc': 'off',
      'rest-spread-spacing': ['error', 'never'],
      'semi': ['error', 'never'],
      'semi-spacing': 'off',
      'semi-style': 'off',
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error', {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'never'
        }
      ],
      'space-in-parens': 'off',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': ['error', 'always'],
      'switch-colon-spacing': 'error',
      'template-curly-spacing': 'error',
      'template-tag-spacing': 'error',
      'valid-jsdoc': 'off',
      'wrap-iife': ['error', 'outside'],
      'wrap-regex': 'off',
      'yield-star-spacing': ['error', 'both'],
    }
  },
  // JsDoc
  // https://www.npmjs.com/package/eslint-plugin-jsdoc
  {
    files: ['**/*.?(c|m)[jt]s?(x)'],
    plugins: { jsdoc },
    rules: {
      ...jsdoc.configs.recommended.rules,
      'jsdoc/check-line-alignment': 'error',
      'jsdoc/check-types': 'off',
      'jsdoc/no-bad-blocks': 'error',
      'jsdoc/no-blank-block-descriptions': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/no-undefined-types': 'off', // TypeScript deals with this
      'jsdoc/require-hyphen-before-param-description': ['error', 'never'],
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-property-description': 'off',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/require-throws': 'error',
      'jsdoc/tag-lines': ['error', 'any', { startLines: 1 }],
    }
  },
  // Vitest
  // https://www.npmjs.com/package/eslint-plugin-vitest
  {
    files: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    plugins: { vitest },
    languageOptions: {
      globals: {
        ...vitest.configs.env.languageOptions.globals
      }
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-alias-methods': 'error',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-conditional-tests': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-done-callback': 'error',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-interpolation-in-snapshots': 'error',
      'vitest/no-mocks-import': 'error',
      'vitest/no-restricted-vi-methods': 'error',
      'vitest/no-standalone-expect': 'error',
      'vitest/no-test-prefixes': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-each': 'error',
      'vitest/prefer-expect-resolves': 'warn',
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/prefer-mock-promise-shorthand': 'error',
      'vitest/prefer-spy-on': 'error',
      'vitest/prefer-strict-equal': 'error',
      'vitest/prefer-to-be': 'error',
      'vitest/prefer-to-be-object': 'error',
      'vitest/prefer-to-contain': 'error',
      'vitest/prefer-todo': 'error',
      'vitest/require-hook': 'error',
      'vitest/require-top-level-describe': 'error'
    }
  }
]
