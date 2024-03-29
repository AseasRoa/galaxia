/** @type {app.Config} */
const config = {
  server: {
    hostNames: ['localhost'],
    httpPort: 8000
  },
  nodeModules: {
    whitelist: [
      'chart.js',
      '@kurkle'
    ]
  }
}

export default config
