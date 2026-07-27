import mimeTypes from './mimeTypes.js'

/** @type {app.FullConfig} */
const configDefaults = Object.freeze({
  development: -1,

  name: '',

  maxAge: {
    css: 2_592_000,
    js: 2_592_000,
    png: 2_592_000,
    jpg: 2_592_000,
    gif: 2_592_000,
    ico: 2_592_000,
    woff: 2_592_000
  },

  compressionLevels: {
    css: 6,
    js: 6,
    html: 3,
    json: 3
  },

  mimeTypes: mimeTypes,

  dirNames: {
    app: 'app',
    modules: 'modules',
    layout: '@layout',
    client: 'client',
    hooks: 'hooks',
    i18n: 'i18n',
    routes: 'routes',
    server: 'server',
    css: 'css',
    views: 'views',
    dist: 'dist'
  },

  server: {
    hostNames: ['localhost'],
    httpPort: 8080,
    httpsPort: 0,
    responseTimeout: 30,
    ssl: {},
    redirectHttpToHttps: false,
    redirectHttpToHttpsExcludePaths: [],
    proxy: {},
    earlyHints: true,
    middleware: {
      httpToHttps: {
        enabled: false,
        rules: []
      },
      rateLimiter: {
        enabled: false,
        rules: []
      },
      userAgentFilter: {
        enabled: false,
        rules: []
      }
    }
  },

  nodeModules: {
    __whitelist: ['docschema', 'paintor', 'paintor-ui'], // Modules, unlocked by default
    whitelist: []
  },

  ajax: {
    version: '',
    wrongVersionMessage: 'Website was updated. Please, reload the page.'
  },

  urlRewrite: {}
})

export default configDefaults
