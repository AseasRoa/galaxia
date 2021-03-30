/*
	This module is used to translate words.

	For each HTTP request a new instance of it is created. The preferred locale is extracted from the request object automatically.
	There should be one .json file per locale. It's name should be like this - %locale name%.json
	Inside the file, the keys are the words and the values are the translations
	Files are cached
*/

import sprintf from './sprintf.js'
import jsonfile from '../jsonfile.js'

var defaults = {
	locale : 'en',
	folder : 'words'
}

var Words   = function (request, o, componentName) {
	var _this           = this
	this.request        = request
	this.pathComponents = o['pathComponents']
	this.componentName  = componentName
	this.preferred      = this.preferredLocale()
	this.language       = this.preferred
	this.usingFallback  = false // used in order to reuse 'translate', because it's attributes can't be used, they are defined from outside

	var fn         = function () {
		return _this.translate.apply(_this, arguments)
	}
	fn.lang        = this.language
	fn.setLanguage = function (to) {
		if (!to)
		{
			return false
		}
		_this.language = to

		return _this.language
	}

	return fn
}
Words.cache = {}

Words.prototype.translate = function () {
	const host  = this.request.headers.host
	let cache   = Words.cache
	let library = {} // will contain the object of the locale json file

	let localeID = this.language

	if (this.usingFallback)
	{
		localeID = this.usingFallback
	}

	if (!cache[host] || !cache[host][this.componentName] || !cache[host][this.componentName][localeID])
	{
		// load translations from files
		const file = `${this.pathComponents}/${this.componentName}/${defaults['folder']}/${localeID}.json`

		library = jsonfile.readFileSync(file, {stripComments : true}) || {}

		if (!cache[host])
		{
			cache[host]                               = {}
			cache[host][this.componentName]           = {}
			cache[host][this.componentName][localeID] = library
		}
		else if (!cache[host][this.componentName])
		{
			cache[host][this.componentName]           = {}
			cache[host][this.componentName][localeID] = library
		}
		else if (!cache[host][this.componentName][localeID])
		{
			cache[host][this.componentName][localeID] = library
		}
	}
	else
	{
		library = cache[host][this.componentName][localeID]
	}

	let translated = library[arguments[0]]

	if (translated === undefined)
	{
		// if this is the default locale, no fallback
		if (localeID === defaults.locale)
		{
			translated = arguments[0]
		}
		// fallback to the default locale
		else
		{
			this.usingFallback = defaults.locale
			translated         = this.translate.apply(this, arguments)
			this.usingFallback = false

			// write the value to cache, so the next time will be found
			cache[host][this.componentName][localeID][arguments[0]] = translated
			return translated
		}
	}

	arguments[0] = translated

	if (arguments.length === 1)
	{
		// no need to format, return the string as is
		return arguments[0]
	}
	else
	{
		// do format
		return sprintf.apply(this, arguments)
	}
}

// prototype methods
Words.prototype.preferredLocale = function (request) {
	request = request || this.request

	if (!request || !request.headers)
	{
		return
	}

	var accept     = ',' + request.headers['accept-language'] || ''
	var regExp     = /,\s*([a-z0-9\-]+)/gi
	var prefLocale = ''

	var match = regExp.exec(accept)

	if (match)
	{
		while (!prefLocale)
		{
			var locale = match[1].toLowerCase() // en-us
			var parts  = locale.split('-') // ['en', 'us']

			if (Words.cache[locale])
			{
				prefLocale = locale
			}
			else if (parts.length > 1 && Words.cache[parts[0]])
			{
				prefLocale = parts[0]
			}
			else
			{
				prefLocale = parts[0]
			}

			//if (prefLocale) break
		}
	}

	return prefLocale || defaults.locale
}

export default Words