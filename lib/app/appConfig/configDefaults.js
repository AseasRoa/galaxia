import mimeTypes from './mimeTypes.js'

/** @type {app.FullConfig} */
const configDefaults = Object.freeze({
  development: -1,

  name: '',

  maxAge: {
    css: 2592000,
    js: 2592000,
    png: 2592000,
    jpg: 2592000,
    gif: 2592000,
    ico: 2592000,
    woff: 2592000
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
    styles: 'styles',
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
    __whitelist: ['docschema', 'paintor'], // Modules, unlocked by default
    whitelist: []
  },

  ajax: {
    version: '',
    wrongVersionMessage: 'Website was updated. Please, reload the page.'
  },

  urlRewrite: {}
})

export default configDefaults
