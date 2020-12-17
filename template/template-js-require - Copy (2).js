var require = function(file, preload)
{
	// preload multiple files?
	if (preload && file instanceof Array)
	{
		for (var i = 0; i < file.length; i++)
		{
			require(file[i], true)
		}

		return
	}

	var url = "/" + file + ".js?v=" + require.mtime
	url = url.replace(/[\/]+/g, "/") // replace any double (or more) slashes with a single one, because the url is relative

	if (!(url in require.installed))
	{
		require.installed[url] = true

		if (1)
		{
			require.ajaxLoadScript(url, function(error, script)
			{
				// keep the code, it will be turned into module later
				require.scripts[url] = script

			})
		}
		else
		{
			require.loadScript(url, file, function(error, url, script) {
				console.log(document.scripts)
				console.log(script)
			})
		}
	}

	if (!preload)
	{
		return new Synchronator((resolve) => {

			if (require.loaded[url] == true)
			{
				resolve(require.modules[url].exports)
			}
			else {
				var interval = setInterval(function() {
					// I need the following here, because when the same file is required from 2 modules,
					// sometimes the interval cannot exit
					if (require.loaded[url] == true)
					{
						resolve(require.modules[url].exports)
						require.scripts[url] = 0
						clearInterval(interval)
					}

					if (require.scripts[url])
					{
						require.scriptToModule(require.scripts[url], url, function () {

							require.loaded[url] = true

							resolve(require.modules[url].exports)
						})

						require.scripts[url] = 0
						clearInterval(interval)
					}
				}, 0)
			}
		})
	}
}

require.element   = document.head || document.getElementsByTagName("head")[0]
require.modules   = {}
require.installed = {}
require.loaded    = {}
require.scripts   = {} // keeps the code of each file when the code is downloaded. Then, when the script is actually required, this code is parsed, stored in required.modules and deleted
require.mtime     = 0
require.setTime = function(time)
{
	require.mtime = time
}

require.loadScript = function(url, file, cb)
{
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
			cb(null, file, script)
		}
	}

	require.element.appendChild(script)
}

require.ajaxLoadScript = function(url, callback)
{
	var xhr = new XMLHttpRequest()

	xhr.overrideMimeType("application/javascript;charset=utf-8")
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText)
		{
			let sourceURL =
				"\n//# sourceURL="
				+ window.location.protocol+ "//" + window.location.hostname + url.replace(/\?v=[0-9]+/, "")

			callback(null, xhr.responseText + sourceURL)
		}
	}

	xhr.open("GET", url)

	xhr.setRequestHeader("Accept", "*/*")
	xhr.setRequestHeader("Content-Type", "application/javascript")

	xhr.send()
}

require.scriptToModule0 = function(script, file, callback)
{
	/*
	var js = document.createElement("script")
	js.type = "text/javascript"
	js.innerHTML = "console.log(123);\n//# sourceURL=/test_file_name.js"
	document.body.appendChild(js)
*/

	var fn = new Function("console.log(1253);\n//@ sourceURL=test_file_name.js")
	fn()
}

require.scriptToModule = function(script, url, callback)
{
	if (url in require.modules) {return}

	var module = require.modules[url] = {
      exports : {},
      id      : url,
      loaded  : false,
		fn      : null
   }

	var fn = new Function("return " + script).call(window)

	fn(module, module.exports, require).then(
		function() {
			callback(module)
		}
	)
}

require.ajaxRequest = function()
{
	return new Synchronator((resolve) => {
		let xhr = new XMLHttpRequest()
		let contentType = "application/json; charset=utf-8"

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4)
			{
				if (xhr.status == 200)
				{
					var responseType = (xhr.getResponseHeader("X-Response-Type") || "").toLowerCase()

					if (responseType === "error")
					{
						resolve(new Error(xhr.response["error"]))
					}
					else if (responseType === "json")
					{
						resolve(JSON.parse(xhr.response))
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

		xhr.open("POST", "/" + arguments[0] + "/" + arguments[1] + "")

		//xhr.responseType = "text"
		xhr.setRequestHeader("X-Requested-With", "xmlhttprequest")
		xhr.setRequestHeader("Accept", contentType)
		xhr.setRequestHeader("Content-Type", contentType)
		xhr.setRequestHeader("Cache-Control","no-cache")

		let data = {
			methodName           : arguments[1],
			methodArguments      : Array.from(arguments[2]),
			constructorArguments : Array.from(arguments[3]),
			sessionKey           : arguments[4]
		}

		xhr.send(JSON.stringify(data))
	})
}