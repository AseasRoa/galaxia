/**
 * Require a module file
 *
 * @param {string} file
 * @param {boolean=} preload
 * @return {Synchronator|void}
 */
function require(file, preload = false)
{
	var mainDir = (this instanceof String) ? this : ""
	mainDir     = mainDir.trim()
	mainDir     = mainDir.replace(/__dirname/g, "")

	// preload files?
	if (file instanceof Array)
	{
		for (var i = 0; i < file.length; i++)
		{
			require.call(mainDir, file[i], true)
		}

		return
	}

	// replace Anything.io with io, or Anything.io.js with io.js
	var match   = file.match(/(.*[\/\\])*([^|\/\\]+)\.(io)(\.js)?/)
	var ioClass = ""

	if (match)
	{

		file    = match[1] + match[3] + (match[4] || "")
		ioClass = match[2]
	}

	// first of all, remove .js for consistency
	file = file.replace(/\.js$/, "")
	file = require.normalizePath(mainDir + "/" + file)

	var url        = ""
	var url_parsed = (file in require.urls)
	
	if (url_parsed)
	{
		url = require.urls[file]
	}
	else
	{
		url = file
		url = "/" + url + ".js?v=" + require.mtime
		url = url.replace(/[\/]+/g, "/") // replace any double (or more) slashes with a single one, because the url is relative

		require.urls[file] = url
	}

	/*
		if (file in require.modules) {
			return require.modules[file].exports
		}
	*/

	if (!(url in require.requested))
	{
		require.requested[url] = true

		var getScript = function (url) {
			function onScriptLoaded()
			{
				this.remove()
			}

			function onScriptError()
			{
				throw new Error("Failed to load script: " + url)
			}

			var script     = document.createElement("script")
			script.src     = url
			script.async   = true
			script.defer   = true
			script.onerror = onScriptError
			script.onload  = script.onerror = script.onreadystatechange = onScriptLoaded

			require.element.appendChild(script)
		}

		getScript(url)
	}

	if (!preload)
	{
		return new Synchronator(function (resolve) {
			var module = {}

			function moduleResolve(module)
			{
				var module_fn      = module.module_fn
				var module_dirname = module.module_dirname

				module_fn(module, module.exports, require.bind(module_dirname)).then(function () {

					require.loaded[url] = true
					module.loaded       = true

					if (ioClass)
					{
						//console.log("file = " + file)
						//console.log(module.exports)
						//console.log(module.exports[ioClass])
						return resolve(module.exports[ioClass])
					}
					//console.log("file2 = " + file)
					return resolve(module.exports)
				})
			}

			//-- if the module has been downloaded and parsed
			if (require.loaded[url] === true)
			{
				if (ioClass)
				{
					return resolve(require.modules[url].exports[ioClass])
				}
				else
				{
					return resolve(require.modules[url].exports)
				}

				//require.modules[url].fn.then(modResolve)
			}
			else if (require.modules[url])
			{
				module = require.modules[url]

				moduleResolve(module)
			}
			else
			{
				if (require.debug) console.log("%c want: " + file, 'background: #aaa; color: blue')

				let timeout = setTimeout(function () {
					console.error("Script timeout: " + url)
				}, 5000)

				//-- wait for the module to be downloaded and parsed
				require.element.addEventListener("require", function (e) {
					module = e.detail.module

					clearTimeout(timeout)

					if (require.debug) console.log("%c event: " + e.detail.module_url, 'background: #555; color: #bada55')

					if (module.module_url === url)
					{
						moduleResolve(module)
					}
				})
			}
		})
	}
}

require.version    = 0
require.element    = document.head || document.getElementsByTagName("head")[0]
require.requested  = {}
require.urls       = {}
require.modules    = {}
require.loaded     = {}
require.scripts    = {} // keeps the code of each file when the code is downloaded. Then, when the script is actually required, this code is parsed, stored in required.modules and deleted
require.mtime      = 0
require.debug      = 0
require.setTime    = function (time) {
	require.mtime = time
}
require.register   = function (file, fn) {
	var url     = require.urls[file] || file
	var dirname = require.dirname(file)

	// just in case
	if (url in require.modules)
	{
		return
	}

	var module = require.modules[url] = {
		exports        : {},
		id             : url,
		loaded         : false,
		module_fn      : fn,
		module_url     : url,
		module_dirname : dirname
	}

	var detail = {
		module_url     : url,
		module_fn      : fn,
		module         : module,
		module_dirname : dirname
	}

	if (require.debug) console.log("%c register: " + file, "color:blue" + "")

	require.element.dispatchEvent(new CustomEvent("require", {detail : detail}))
}
require.setVersion = function (version) {
	require.version = version
}
require.run        = function () {

}

/**
 * @param {string} path
 * @return {*}
 */
require.normalizePath = function (path) {
	// replace \ with /
	path = path.replace(/\\/g, "/")

	// remove any ./ (negative lookbehind used here) - doesn't work with firefox
	//path = path.replace(/(?<![.])(\.\/)/g, "/")

	path = path.replace(/(?:^|[^.])(\.\/)/g, "/")

	// replace multiple / with single /
	path = path.replace(/[\/]+/g, "/")

	// process ../
	while (true)
	{
		var replaced = false

		path = path.replace(/[^.\/]+\/\.\.\//, function () {
			replaced = true
			return ""
		})

		if (replaced === false) break
	}

	return path
}

/**
 * @param {string} path
 * @return {*}
 */
require.dirname = function (path) {
	path = require.normalizePath(path)
	path = path.replace(/\/[^\/]*$/, "")

	return path
}

/**
 * @param {string} url
 * @param callback
 */
require.loadScript = function (url, callback) {
	var script    = document.createElement("script")
	script.src    = url
	script.async  = true
	script.defer  = true
	script.onload = script.onerror = script.onreadystatechange = onScriptLoaded

	function onScriptLoaded()
	{
		var readyState = this.readyState // we test for "complete" or "loaded" if on IE

		if (!readyState || /ded|te/.test(readyState))
		{
			callback(null, script)
		}
	}

	require.element.appendChild(script)
}

/**
 * @param {string} url
 * @param callback
 */
require.ajaxLoadScript = function (url, callback) {
	var xhr = new XMLHttpRequest()

	xhr.overrideMimeType("application/javascript;charset=utf-8")
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText)
		{
			let sourceURL =
					 "\n//# sourceURL="
					 + window.location.protocol + "//" + window.location.hostname + url.replace(/\?v=[0-9]+/, "")

			callback(null, xhr.responseText + sourceURL)
		}
	}

	xhr.open("GET", url)

	xhr.setRequestHeader("Accept", "*/*")
	xhr.setRequestHeader("Content-Type", "application/javascript")

	xhr.send()
}

/**
 * @param {string} script
 * @param {string} url
 * @param callback
 */
require.scriptToModule = function (script, url, callback) {
	if (url in require.modules)
	{
		return
	}

	var module = require.modules[url] = {
		exports : {},
		id      : url,
		loaded  : false,
		fn      : null
	}

	var fn = new Function("return " + script).call(window)

	fn(module, module.exports, require).then(
		function () {
			callback(module)
		}
	)
}

/**
 * This function is used to load IO modules
 *
 * @return {Promise}
 */
var requireAjaxRequest = function () {
	return new Promise((resolve) => {
		let xhr         = new XMLHttpRequest()
		let contentType = "application/json; charset=utf-8"

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4)
			{
				if (xhr.status === 200)
				{
					var responseType = (xhr.getResponseHeader("X-Response-Type") || "").toLowerCase()

					if (responseType === "error")
					{
						resolve(new Error(JSON.parse(xhr.response)["error"]))
					}
					else if (responseType === "json")
					{
						resolve(JSON.parse(xhr.response || "null"))
					}
					else if (responseType === "string")
					{
						resolve(xhr.response)
					}
					else
					{
						resolve(xhr.responseText)
					}
				}
				else
				{
					var error_connection = "Oops, it looks that we have problems.<br><br>If this error persists, please contact with administrator"

					resolve(new Error(error_connection))
				}
			}
		}

		//xhr.open("POST", "/?" + arguments[0] + "/" + arguments[1] + "")
		xhr.open("POST", "/?" + arguments[0] + "/" + arguments[2] + "/" + arguments[1] + "()")

		//xhr.responseType = "text"
		xhr.setRequestHeader("X-Requested-With", "xmlhttprequest")
		xhr.setRequestHeader("Accept", contentType)
		xhr.setRequestHeader("Content-Type", contentType)
		xhr.setRequestHeader("Cache-Control", "no-cache")
		xhr.setRequestHeader("x-component-name", arguments[0])
		xhr.setRequestHeader("x-method-name", arguments[1])
		xhr.setRequestHeader("x-io-name", arguments[2])
		xhr.setRequestHeader("x-session-key", arguments[5])
		xhr.setRequestHeader("x-ajax-version", require.version)

		/**
		 let data = {
			//componentName        : arguments[0],
			//methodName           : arguments[1],
			//ioName               : arguments[2],
			constructorArguments : Array.from(arguments[3])
			methodArguments      : Array.from(arguments[4]),
			//sessionKey           : arguments[5],
			//version              : require.version
		}
		 */
		let constructorArguments = argumentsToPostParameters(arguments[3])

		if (constructorArguments instanceof Error)
		{
			console.error(constructorArguments)

			return
		}

		if (constructorArguments)
		{
			xhr.setRequestHeader("x-constructor-arguments", constructorArguments)
		}

		let methodArguments = argumentsToPostParameters(arguments[4])

		if (methodArguments instanceof Error)
		{
			console.error(methodArguments)

			return
		}

		xhr.responseType = "text" // in Firefox prevents an error message when ? is used in the url
		xhr.send(methodArguments)
	})
}

/**
 *
 * @param args
 * @return {string|Error}
 */
var argumentsToPostParameters = function (args) {
	let arr = Array.from(args)

	if (arr.length > 1)
	{
		return new Error("Method arguments must contain only one object")
	}

	let parameters = null

	if (arr.length === 1)
	{
		parameters = JSON.stringify(arr[0])
	}

	return parameters
}