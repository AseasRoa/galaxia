/**
 * CustomEvent polyfill for IE
 */
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent( "CustomEvent" )
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail )
    return evt
   }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()

/**
 * Promise polyfill
 */
if (typeof Promise === "undefined") Promise = Synchronator

/**
 * Synchronous loading of CommonJS style modules. Or preloading only.
 * @param file {string} The module ID
 * @param preload {boolean} When true, the require function downloads the script and prepares it
 * @returns {*}
 */
var require = function(file, preload)
{
	// preload files?
	if (file instanceof Array)
	{
		for (var i=0; i<file.length; i++)
		{
			require(file[i], true)
		}

		return
	}

	if (file in require.installed && require.installed[file].loaded)
	{
		return require.installed[file].exports
	}

	if (!(file in require.dispatched))
	{
		require.dispatched[file] = true

		var module = require.installed[file] = {
		//var module = {
	      exports : {},
	      id      : file,
	      loaded  : false,
			fn      : null
	   }

		var url = "/" + file + ".js?v=" + require.mtime

		var getScript = function(url, file, cb)
		{
			if (file in require.modules)
			{
				// the module was preloaded
				return cb(null, file)
			}

			function onScriptLoaded()
			{
				var readyState = this.readyState // we test for "complete" or "loaded" if on IE

				if (!readyState || /ded|te/.test(readyState))
				{
					cb(null, file)
				}
			}

			var script    = document.createElement("script")
			script.src    = url
			script.async  = true
			script.defer  = true
			script.onload = script.onerror = script.onreadystatechange = onScriptLoaded

			require.element.appendChild(script)
		}

		getScript(url, file, function(err, file)
		{
			if (!(file in require.modules)) {
				throw new Error("Failed to load script: " +url)
			}

			var module_fn = require.modules[file](module, module.exports, require)
			module.fn = module_fn
			require.element.dispatchEvent(new CustomEvent("require", {detail: {module_path: file, module_fn: module_fn, module: module}}))
		})
	}

	if (!preload)
	{

		return new Synchronator(function(resolve)
		{
			var module = {}

			function modResolve()
			{
				module.loaded = true

				resolve(module.exports)
			}

			//-- if the module has been downloaded and parsed
			if (file in require.installed && require.installed[file].fn)
			{
				module = require.installed[file]

				if (require.installed[file].loaded)
				{
					modResolve()
				}
				else
				{
					module.fn.then(modResolve)
				}
			}
			else
			{
				//-- wait for the module to be downloaded and parsed
				require.element.addEventListener("require", function(event)
				{
					if (event.detail.module_path === file)
					{
						module = event.detail.module

						module.loaded = true // if this is not here, there is a problem when files require each other
						event.detail.module.fn.then(modResolve)

						//resolve(event.detail.module.exports)
						//console.log(event.detail.module.fn)
					}
				})
			}
		})
	}
}

require.element    = document.head || document.getElementsByTagName("head")[0]
require.dispatched = {}
require.modules    = {}
require.installed  = {}
require.mtime      = 0

global = window