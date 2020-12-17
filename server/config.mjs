"use strict"

import $path from "path"
import $jsonfile from "../jsonfile.mjs"

const __filename = new URL(import.meta.url).href.replace("file:///", "")
const __dirname  = $path.dirname(__filename)

//-- configuration defaults
const config_defaults = {
	"http-port"            : 80,
	"https-port"           : false,
	"request-timeout"      : 30, // Timeout of the requests, in seconds
	"hostname-fallback"    : "",
	"hostname-aliases"     : {}, // For example {"appname": ["myappname.com", "myappname.net"]} where appname is the folder name of the app
	"apps-path"            : "apps",
	"apps-config-path"     : "/config",
	"apps-components-path" : "/app",
	"payload-max-mb"       : 20 // Max payload (POST, file uploads) size in MB
}

const file = $path.dirname(__dirname) + $path.sep + "config.json"
var config = $jsonfile.readFileSync(file, {stripComments : true})

for (var i in config_defaults)
{
	if (config[i] === undefined) config[i] = config_defaults[i]
}

if (typeof config !== "object")
{
	console.error("Configuration file is broken (" + file + ")")
	config = config_defaults
}

export default config