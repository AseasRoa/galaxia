import $fs from 'fs'
import $path from 'path'
import '../typedefs.js'

import $templateCSS from './template-css.js'
import $templateJS from './template-js.js'
import $templateEngines from './ts-drivers/index.js'

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = $path.dirname(__filename)

//-- FUNCTIONS -------------------------------------------------------------------------------------

/**
 *
 * @param {string} tagName
 * @param {string|Object} data
 */
function buildHtmlElements(tagName, data) {
	let html = ''

	if (typeof data === 'string') {
		html = '\n\t' + '<' + tagName + '>' + data + '</' + tagName + '>'
	}
	else {
		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			//-- open tag
			html += '\n\t' + '<' + tagName

			//-- print all attributes
			for (let k in data[i]) {
				if (k === '$') continue

				if (typeof k === 'number') {
					html += ' ' + data[i][k]
				}

				html += ' ' + k
				if (data[i][k]) {
					if (typeof data[i][k] === 'boolean') {
						html += '=' + data[i][k]
					}
					else {
						data[i][k] = data[i][k].replace(/"/g, '')
						html += '="' + data[i][k] + '"'
					}
				}
			}

			//-- close tag
			html += '/>' + '\n'

			if (data[i]['$'] !== undefined) {
				html += data[i]['$'] + '</' + tagName + '>'
			}
		}
	}

	return html
}

function wrapHtmlCode(html, data, lang, data_html, js_script) {
	let htmlHead = '<!DOCTYPE html>\n<html lang=' + (lang || 'en') + '>\n<head>'
	htmlHead += '\n\t<meta charset="utf-8">'

	for (
		let idx  = 0,
		    keys = Object.keys(data); idx < keys.length; idx++
	) {
		const i = keys[idx]

		if (data[i].length === 0) {
			continue
		}
		if (i === 'script') {
			continue
		}

		if (i === 'link') {
			htmlHead += '\n\n<!-- CSS -->\n'
		}

		htmlHead += buildHtmlElements(i, data[i])
	}

	htmlHead += data_html

	htmlHead += '\n</head>\n<body>\n'

	html = htmlHead + html

	html += '\n\n<!-- JavaScript -->\n'

	if (data['script'] && data['script'].length > 0) {
		html += buildHtmlElements('script', data['script'])
	}

	html += js_script || ''

	return html
}

function finishHtmlCode(html) {
	return html + '\n</body>\n</html>'
}

/**
 *
 * @param file_i
 * @param componentName
 * @param args {array}
 * Arguments of the function that renders file, or null when loading watchers from the cache
 *
 * @returns {boolean}
 */
let filesWatchList = {}

function watchFileForChanges(file_i) {
	if (!process.develop)
		return false

	if (file_i in filesWatchList)
		return true

	filesWatchList[file_i] = true

	if ($fs.existsSync(file_i)) {
		const options = {
			persistent : true,
			interval   : 5007 // ms
		}

		$fs.watch(file_i, options, (event, filename) => {
			//if (filename.substr(-3) !== '.js') {return}

			// many events can come in no time, so we use timeout to make sure that we don't render too often
			if (watchFileForChanges.watchTimeout) {
				clearTimeout(watchFileForChanges.watchTimeout)
				watchFileForChanges.watchTimeout = null
			}

			watchFileForChanges.watchTimeout = setTimeout(() => {
				console.log('Template file modified: ' + file_i)

				Template.cache = {}
			}, 50)
		})
	}
}

watchFileForChanges.watchTimeout = null

//-- MAIN CLASS ------------------------------------------------------------------------------------
/**
 * @param {Request} request
 * @param {Response} response
 * @param {AppConfig} appConfig
 * @param {AppPaths} appPaths
 * @param pathComponents
 * @param {string} componentName
 * @param requestLocale
 * @param {boolean} isXHR
 * @returns {templateSelectFn}
 * @constructor
 */
const Template = function(
	request,
	response,
	appConfig,
	appPaths,
	pathComponents,
	componentName,
	requestLocale,
	isXHR
) {
	// these parameters are unique to each instance
	this.request        = request
	this.response       = response
	this.pathComponents = pathComponents
	this.componentName  = componentName
	this.locale         = requestLocale
	this.xhr            = isXHR

	//$templateCSS = $templateCSS || require('./template-css.js')
	//$templateJS  = $templateJS || require('./template-js.js')

	this.$templateCSS = new $templateCSS(pathComponents, componentName, appConfig, appPaths)
	this.$templateJS  = new $templateJS(pathComponents, componentName, appConfig, appPaths)

	const templateSelectFn = (selector, componentName) => {
		componentName = componentName || this.componentName

		// if the selector is a string, it is treated as a relative address to a template file
		if (typeof selector === 'string') {
			return new Template.wrap(
				this.select(selector, componentName),
				this, templateSelectFn,
				this.locale,
				componentName
			)
		}
		else {
			return new Template.wrapJSON(
				selector,
				this,
				templateSelectFn,
				this.locale,
				componentName
			)
		}
	}

	return templateSelectFn
}
Template.cache = {} // templates cache

Template.prototype.select = function(selector, componentName) {

	let index = ''

	if (selector.length > 1 && selector[0] === '.' && selector[1] !== '.') {
		const pos     = selector.indexOf('/')
		componentName = componentName || selector.substr(1, pos - 1)
		index         = selector.substr(1)
		selector      = selector.substr(pos + 1)
	}
	else {
		componentName = componentName || this.componentName
		index         = componentName + '/' + selector
	}

	if (!(this.pathComponents in Template.cache)) {
		Template.cache[this.pathComponents] = {}
	}

	let fn = Template.cache[this.pathComponents][index]

	if (fn === undefined) {
		// the filename without the extension
		const dir   = this.pathComponents + '/' + componentName + '/templates'
		const file0 = dir + '/' + selector
		let file    = ''

		// fallback error function
		const fn_fail = function() {
			return 'Template <b>' + selector + '</b> not found in ' + dir + '/<br />'
		}

		selector = selector.replace(/^[\/]+|[\\]+/, '')

		// is an extension defined?
		let ext = selector.match(/\.([A-Za-z0-9]+)$/)

		if (ext !== null) ext = ext[1]

		if (ext) {
			// 1) we have the file extension => we will select the engine using that extension
			if ($templateEngines[ext]) {
				file = file0
			}
			// 1a) probably the file name contain dots and no extension was actually specified
			else {
				ext = ''
			}
		}

		if (!ext) {
			// 2) we don't have the file extension => we will try to find the file using the $templateEngines list
			for (let i in $templateEngines) {
				file       = file0 + '.' + i
				ext        = i
				let exists = false

				try {
					$fs.statSync(file)
					exists = true
				} catch (e) {
					exists = false
				}

				if (exists === true) {
					break
				}
				else {
					file = ''
					ext  = ''
				}
			}
		}

		if (!file || !ext) {
			fn = fn_fail
		}
		else {
			const engine = $templateEngines[ext]

			fn = engine.compileFile(file, {
				basedir : this.pathComponents // in use by Jade/Pug when using 'include' with absolute paths
			})

			watchFileForChanges(file)

			if (typeof fn === 'function') {
				fn.label         = selector
				fn.componentName = this.componentName
				fn.index         = index
			}
		}

		Template.cache[this.pathComponents][index] = fn
	}

	return fn
}

Template.wrap = function(chunkFunction, templateClass, templateSelectFn, locale, componentName) {
	this.chunkFunction    = chunkFunction
	this.templateSelectFn = templateSelectFn
	this.templateClass    = templateClass
	this.locale           = locale
	this.dataset          = {}
	this.ob               = '' // the output buffer
	this.headDataset      = {}

	this.request             = templateClass.request
	this.response            = templateClass.response
	this.configuration       = templateClass.configuration
	this.componentName       = componentName || this.componentName
	this._wrapped            = false
	this._head_from_template = ''
}

Template.wrap.prototype = {
	//== begin: head functions
	head        : function(data, dataset) {
		if (!data) return this

		// 1) Elements are coming from a template file
		if (typeof data === 'string') {
			this._head_from_template = this.templateSelectFn(data, this.componentName).
			data(dataset || {}).html()

			return this
		}

		// 2) Generate each element
		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (this[i] === undefined) {
				if (typeof data[i] === 'string') {
					this.headDataset[i] = data[i]
				}
				else {
					this.headDataset[i] = this.headDataset[i] || []
					this.headDataset[i].push(data[i])
				}

				continue
			}
			if (this[i]) {
				this[i](data[i])
			}
		}

		return this
	},
	title       : function(text) {
		text = text || ''

		this.headDataset['title'] = this.locale(text)

		return this
	},
	description : function(text) {
		if (this.headDataset['meta'] === undefined) this.headDataset['meta'] = []

		text = text || ''
		text = this.locale(text)
		text = text.replace(/["]+/g, '') // Any time quotes are used in a meta description, Google cuts off the description. => https://moz.com/learn/seo/meta-description

		const data = {name : 'description', content : text}
		const meta = this.headDataset['meta']

		for (
			let idx  = 0,
			    keys = Object.keys(meta); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (meta[i]['name'] === 'description') {
				meta[i] = data
				return this
			}
		}
		this.headDataset['meta'].push(data)

		return this
	},
	keywords    : function(text) {
		if (this.headDataset['meta'] === undefined) this.headDataset['meta'] = []

		text = text || ''
		text = (typeof text === 'string') ? text : text.join(',')

		const data = {name : 'keywords', content : text}
		const meta = this.headDataset['meta']

		for (
			let idx  = 0,
			    keys = Object.keys(meta); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (meta[i]['name'] === 'keywords') {
				meta[i] = data
				return this
			}
		}
		this.headDataset['meta'].push(data)

		return this
	},
	meta        : function(data) {
		if (this.headDataset['meta'] === undefined) this.headDataset['meta'] = []

		data = data || []

		if (typeof data === 'string') {
			return this
		}

		if (!(0 in data)) data = [data]

		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			this.headDataset['meta'].push(data[i])
		}

		return this
	},
	css         : function(data) {
		if (this.headDataset['link'] === undefined)
			this.headDataset['link'] = []

		data = data || []

		if (typeof data === 'string') {
			data = [{
				href : data
			}]
		}

		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (typeof data[i] === 'string') {
				data[i] = {
					href : data[i]
				}
			}
		}

		if (!data[0]) data = [data]

		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (!data[i]['rel']) data[i]['rel'] = 'stylesheet'
			if (!data[i]['type']) data[i]['type'] = 'text/css'

			this.headDataset['link'].push(data[i])
		}

		return this
	},
	script      : function(data) {
		if (this.headDataset['script'] === undefined) this.headDataset['script'] = []

		data = data || []

		if (typeof data === 'string') {

			data = [{
				src     : data,
				content : ''
			}]
		}

		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (typeof data[i] === 'string' && data[i]) {
				data[i] = {
					src : data[i]
				}
			}
			else {

			}
		}

		if (!data[0]) data = [data]

		for (
			let idx  = 0,
			    keys = Object.keys(data); idx < keys.length; idx++
		) {
			const i = keys[idx]

			if (!data[i]['src']) continue
			if (!data[i]['type']) data[i]['type'] = 'text/javascript'
			if (!data[i]['$']) data[i]['$'] = ''

			this.headDataset['script'].push(data[i])

		}

		return this
	},
	//== end: head functions

	// sets the data to be used in the template
	data            : function(data) {
		if (data === undefined) {
			return this.dataset || {}
		}
		else {
			this.dataset = data || {}
			return this
		}
	},
	// returns html from the template using the data which is previously added using '.data()'
	html            : function(data) {
		data = data || this.dataset || {}

		let html = ''

		try {
			data['$'] = this.templateSelectFn
			data['_'] = this.locale

			html = this.chunkFunction(data)
		} catch (e) {
			html = '<span style="color:red">' + e.name + ' : </span>' + e.message
		}

		return html
	},
	getCSScode      : function() {
		return this.templateClass.$templateCSS.getHtmlLink(this.componentName)
	},
	getJScode       : function() {
		return this.templateClass.$templateJS.getHtmlLink(this.componentName)
	},
	mandatoryScript : function() {
		return this.templateClass.$templateJS.initialBrowserCode()
	},
	buffer          : function(data) {
		this.ob += this.html(data)

		return this
	},
	inject          : function(id, selector, data) {
		if (this.ob === '') this.ob = this.html()

		let html = this.html(data)

		if (selector && html) {

			id = id.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') // escape

			const regex = new RegExp('<!--\\s*' + id + '\\s*-->', 'g')
			this.ob     = this.ob.replace(regex, this.templateClass(selector).html(data))
		}

		return this
	},
	chunk           : function(data) {
		if (data !== undefined) {
			const head = this.headDataset

			if (this.response.finished === true) {
				console.warn('The request has finished')
				return
			}

			data = data || ''

			if (this.response.headersSent === false) {
				this.response.setHeader('Content-Type', 'text/html')

				if (this._wrapped === false) {
					this._wrapped = true

					const csslink = this.templateClass.$templateCSS.getHtmlLink(this.componentName)
					//const jslink  = this.templateClass.$templateJS.getHtmlLink(this.componentName)

					data = wrapHtmlCode(data, head, this.locale.lang, csslink, '')
				}
			}

			if (typeof data === 'object') {
				data = JSON.stringify(data)
			}
			else {

			}

			this.response.write(data, 'utf-8')

			return this
		}

		if (this.ob === '') this.ob = this.html()

		//this.templateClass.chunk(this.ob)
		this.response.write(this.ob)
		this.ob = ''

		return this
	},
	send            : function(data) {
		return this.chunk(data)
	},

	done : function() {
		if (this.response.finished === true) {
			//console.warn('The request has finished')
			return
		}

		if (this.ob === '') this.ob = this.html()

		let data = this.ob || ''

		if (!this.templateClass.xhr) {
			if (this.response.headersSent === false) {
				this.response.setHeader('Content-Type', 'text/html; charset=UTF-8')
				this.response.setHeader('Accept-Ranges', 'bytes')

				if (this._wrapped === false) {
					this._wrapped = true

					const csslink = this.templateClass.$templateCSS.getHtmlLink(this.componentName)
					const jslink  = this.templateClass.$templateJS.getHtmlLink(this.componentName)

					data = wrapHtmlCode(data, this.headDataset, this.locale.lang, this._head_from_template + csslink, jslink)
				}
			}

			if (this._wrapped === true) {
				data = finishHtmlCode(data)
			}
		}

		//this.response.compressionLevel(this.configuration['deflate']['html']).end(data)
		this.response.end(data)

		this.ob = ''

		return data
	},

	/**
	 * Changes the response HTTP Status and Message
	 * @param code
	 * @param message
	 * @returns {Template.wrap}
	 */
	setStatus : function(code, message) {
		this.response.statusCode = code

		return this
	},
	setHeader : function(key, value) {
		this.response.setHeader(key, value)
		return this
	},
	redirectTo(location) {
		this.response.statusCode = 302
		this.response.setHeader('Location', location.toString())
		this.response.end()

		return this
	},
	moveTo(location) {
		this.response.statusCode = 301
		this.response.setHeader('Location', location.toString())
		this.response.end()

		return this
	},
	setCookie(name, value, options) {
		this.response.setCookie(name, value, options)
		return this
	},
	error     : function(data) {
		data = data || 'Error'
		data = this.locale(data)

		if (0) {
			this.templateClass.error(data)
		}
		else {
			if (this.response.finished === true) {
				console.warn('The request has finished')
				return
			}

			data = data || ''

			if (this.response.headersSent === false) {
				this.response.setHeader('X-Error', message)

				if (typeof data === 'object')
					this.response.setHeader('content-type', 'application/json; charset=utf-8')
				else
					this.response.setHeader('content-type', 'text/html')

				this.response.statusCode = 200
			}

			if (typeof data === 'object')
				data = JSON.stringify(data)

			this.response.end(data)
		}

		this.ob = ''

		return this
	}
}

Template.wrapJSON           = function(dataset, templateClass, templateSelectFn, locale) {
	this.templateClass     = templateClass
	this.locale            = locale
	this.dataset           = dataset
	this.request           = templateClass.request
	this.response          = templateClass.response
	//this.configuration = templateClass.configuration
	this._wrapped          = false
	this._compressionLevel = null

}
Template.wrapJSON.prototype = {
	chunk            : function(data) {
		if (this.response.headersSent === false) {
			this.response.setHeader('Content-Type', 'application/json; charset=UTF-8')
			this.response.setHeader('Accept-Ranges', 'bytes')
		}

		if (data !== undefined) {
			this.response.write(JSON.stringify(data))

			return this
		}

		this.response.write(JSON.stringify(this.dataset))
		this.dataset = false

		return this
	},
	done             : function(data) {
		data = data || this.dataset

		if (typeof data === 'string') {
			data = this.locale(data)

			if (this.response.headersSent === false) {
				this.response.setHeader('Content-Type', 'text/plain; charset=UTF-8')
				this.response.setHeader('Accept-Ranges', 'bytes')
			}

			this.response.end(data)
		}
		else {
			if (this.response.headersSent === false) {

				this.response.setHeader('Content-Type', 'application/json; charset=UTF-8')
				this.response.setHeader('Accept-Ranges', 'bytes')

				if (data instanceof Error) {
					const errorKey = 'error'

					this.response.setHeader('X-Response-Type', 'error')

					let message = data.message

					// translate the error
					message = this.locale(message)

					data           = {}
					data[errorKey] = message
				}
				else {
					this.response.setHeader('X-Response-Type', 'json')
				}
			}

			//const compressionLevel = (this._compressionLevel !== null) ? this._compressionLevel : this.configuration['deflate']['html']

			//this.response.compressionLevel(compressionLevel).end(JSON.stringify(data))

			this.response.end(JSON.stringify(data))
		}
		this.dataset = false

		return this
	},
	compressionLevel : function(level) {
		this._compressionLevel = level

		return this
	},
	error            : function(message) {
		message = message || 'Error'
		message = this.locale(message)

		this.templateClass.error(this.dataset, message)
		this.dataset = false

		return this
	}
}

Template.mandatoryScript = function() {
	return $templateJS.mandatoryScript
}
Template.getCSScode      = function() {

}

// use some of the functions from wrap to wrapJSON
const list = ['send', 'data', 'moveTo', 'redirectTo', 'setStatus', 'setHeader', 'setCookie']

for (let i = 0; i < list.length; i++) {
	const fn = Template.wrap.prototype[list[i]]

	if (fn === undefined) throw Error('Method ' + list[i] + ' is missing')

	Template.wrapJSON.prototype[list[i]] = fn
}

export default Template
