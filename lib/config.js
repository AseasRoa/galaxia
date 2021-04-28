import './typedefs.js'
import path from 'path'
import jsonFile from './jsonFile.js'

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = path.dirname(__filename)

//-- configuration defaults
/** @type {Config} */
const configDefaults = {
	httpPort          : 80,
	httpsPort         : false,
	requestTimeout    : 30, // Timeout of the requests, in seconds
	hostnameFallback  : '',
	hostnameAliases   : {}, // For example {'appname': ['myappname.com', 'myappname.net']} where appname is the folder name of the app
	appsPath          : 'apps',
	appsConfigPath    : '/config',
	appsComponentsPath: '/app',
	payloadMaxMb      : 20 // Max payload (POST, file uploads) size in MB
}

let file = `${path.dirname(__dirname)}${path.sep}config.json`

let config = jsonFile.readFileSync(file, {stripComments: true})

if (typeof config !== 'object')
{
	console.error(`Configuration file is broken (${file})`)
	config = configDefaults
}

// Apply default values where needed
for (let i in configDefaults)
{
	if (config[i] === undefined) config[i] = configDefaults[i]
}

/** @type {Config} */
export default config