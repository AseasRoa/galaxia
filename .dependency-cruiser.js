/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'warn',
      comment: '',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment: '',
      from: {},
      to: {
        dependencyTypes: [
          'npm-no-pkg',
          'npm-unknown'
        ]
      }
    },
    {
      name: 'not-to-unresolvable',
      comment: '',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true
      }
    },
    {
      name: 'not-to-test',
      comment: '',
      severity: 'error',
      from: {
        pathNot: '^(tests)'
      },
      to: {
        path: '^(tests)'
      }
    },
    {
      name: 'not-to-spec',
      comment: '',
      severity: 'error',
      from: {},
      to: {
        path: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      }
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment: '',
      from: {
        path: '^(lib)',
        pathNot: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$'
      },
      to: {
        dependencyTypes: [
          'npm-dev',
        ],
        // type only dependencies are not a problem as they don't end up in the
        // production code or are ignored by the runtime.
        dependencyTypesNot: [
          'type-only'
        ],
        pathNot: [
          'node_modules/@types/'
        ]
      }
    },
    {
      name: 'optional-deps-used',
      severity: 'info',
      comment: '',
      from: {},
      to: {
        dependencyTypes: [
          'npm-optional'
        ]
      }
    },
    {
      name: 'peer-deps-used',
      comment: '',
      severity: 'warn',
      from: {},
      to: {
        dependencyTypes: [
          'npm-peer'
        ]
      }
    }
  ],
  options: {
    detectJSDocImports: false,

    doNotFollow: {
      path: 'node_modules'
    },

    includeOnly: '^lib',

    exclude: '[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx)$',

    tsPreCompilationDeps: true,

    tsConfig: {
      fileName: './tsconfig.json',
    },

    enhancedResolveOptions: {
      exportsFields: ['exports'],

      conditionNames: ['import', 'require', 'node', 'default', 'types'],

      mainFields: ['module', 'main', 'types', 'typings'],
    },

    externalModuleResolutionStrategy: 'node_modules',

    progress: { type: 'performance-log' },

    reporterOptions: {
      archi: {
        collapsePattern: '',

        theme: {
          modules: [
            {
              criteria: { collapsed: true },
              attributes: { shape: 'tab' }
            },
          ],
          graph: {
            splines: 'ortho',
            rankdir: 'TD',
            ranksep: '1',
            bgcolor: '#222222',
            color: '#222222',
            fontcolor: '#cccccc',
            fillcolor: '#444444',
          },
          node: {
            color: 'black',
            fillcolor: '#aaaaaa',
            fontcolor: '#000000',
          },
          edge: {
            arrowhead: 'vee',
            arrowsize: '0.5',
            penwidth: '0.5',
            color: '#aaaaaa',
            fontcolor: '#aaaaaa',
          },
        },
      },
    },
  },
}
