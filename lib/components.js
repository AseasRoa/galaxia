import $path from 'path'
import $synchronator from 'synchronator'

import $template from './template/index.js'
import $words from './words/index.js'
import $pages from './pages.js'

global.Template                   = function (path, data) {

	// if Template was called without 'new'
	if (!(this instanceof Template)) return new Template(path, data)

	this._path = path || ''
	this._data = data || {}
}
global.Template.prototype.getPath = function () {
	return this._path
}
global.Template.prototype.getData = function () {
	return this._data
}
global.Template.prototype.data    = function (data) {
	this._data = data

	return this
}

// object containing IO modules
let ioModulesCache   = {}
let ioArgumentsCache = {}

// delete the cache of IO modules on a regular period of time
setInterval(() => {
	let timeout = 5 * 60 * 1000
	let time    = new Date().getTime()

	for (let i in ioModulesCache)
	{
		if (time > ioModulesCache[i]['time'] + (timeout))
		{
			delete ioModulesCache[i]
		}
	}
}, 10 * 1000)

//-- MAIN FUNCTIONS ----------------------------------------------------------------------------------------------------
/**
 * All HTTP requests end up here.
 * In this function we route those requests to the appropriate component, process the request and make the response.
 * @param request
 * @param response
 * @param conf
 */
let parseRequest = function (request, response, conf) {
	let pathComponents    = conf['pathComponents']
	let xhr               = (request.headers['x-requested-with'] && request.headers['x-requested-with'].toLowerCase() === 'xmlhttprequest')
	let requestMethodName = (!xhr && request.method === 'GET') ? 'PAGE' : request.method.toUpperCase()
	let componentsAssets  = {scripts : {}, styles : {}}
	let componentsScripts = {}
	let ajaxVersion       = (typeof conf['ajax'] === 'object' && ('version' in conf['ajax'])) ? conf['ajax']['version'] + '' : ''

	/*
	if (requestMethodName !== 'GET' && requestMethodName !== 'POST' && requestMethodName !== 'PAGE')
	{
		//console.warn(request)
		response.end('What?')
		return
	}
	*/
	//requestMethodName = 'HEAD'

	// transform the requested pathname from string to an array
	let pathname = request.pathname// || request.headers[':path'] || request.headers['path']

	// if the pathname is like '/account/login?returnTo=builder', remove the GET parameters
	if (pathname.indexOf('?'))
	{
		var tmp  = pathname.split('?')
		pathname = tmp[0]
	}

	let urlPathExploded = pathnameSplit(pathname)

	if (urlPathExploded.length === 0)
	{
		urlPathExploded = ['index']
	}

	let chunkLoader = function (urlPathExploded, path) {
		return new Promise(function (resolve) {
			let componentName = 'index'
			let componentPath = 'index'
			let ioClass       = ''

			if (path)
			{
				let pathExploded = pathnameSplit(path)

				componentName = pathExploded[0] || 'index'
				componentPath = pathExploded[1] || 'index'
			}
			else
			{
				componentName = request.headers['x-component-name']
				componentPath = request.headers['x-method-name']
				ioClass       = request.headers['x-io-name'] + '.'
			}

			//-- language & Template & App
			let requestWords    = new $words(request, {pathComponents : pathComponents}, componentName)
			let requestTemplate = new $template(request, response, conf, pathComponents, componentName, requestWords, xhr)

			//-- io module
			var ioModulePath = conf['pathComponents'] + '/' + componentName + '/' + ioClass + 'io.js'
			var module1      = $synchronator.require(ioModulePath)

			if (!(componentName in ioArgumentsCache))
			{
				var file                        = conf['outputFilesDirectory'] + $path.sep + conf.appName + '-' + componentName + '-' + 'arguments.json'
				//ioArgumentsCache[componentName] = JSON.parse($fs.readFileSync(file))
				ioArgumentsCache[componentName] = {}
			}

			module1.then((ioModule) => {
				request.query    = request.query || {}
				request.queryGet = request.queryGet || {}
				var x            = {
					request  : request,
					response : response,
					template : requestTemplate,
					lang     : requestWords,
					words    : requestWords,
					address  : urlPathExploded,
					queryGet : request.queryGet
				}

				let constructorArgumentsInHeaders = {}

				try
				{
					constructorArgumentsInHeaders = JSON.parse(request.headers['x-constructor-arguments'] || '{}')
				} catch (error)
				{
					constructorArgumentsInHeaders = {}
				}

				let constructorArguments = [{}, {}]

				if (constructorArgumentsInHeaders instanceof Object)
				{
					constructorArguments[0] = constructorArgumentsInHeaders
				}

				let methodArguments = {}

				if (request.query instanceof Object)
				{
					methodArguments = request.query
				}

				if (typeof ioModule === 'function')
				{
					constructorArguments[1] = x

					let sessionKey = request.headers['x-session-key']

					if (0 && sessionKey in ioModulesCache)
					{
						ioModule = ioModulesCache[sessionKey]['object']
					}
					else
					{
						ioModule = new ioModule(...constructorArguments)

						if (sessionKey)
						{
							ioModulesCache[sessionKey] = {
								object : ioModule,
								time   : new Date().getTime()
							}
						}
					}

					// TODO remove that
					ioModule.x = x
				}

				if (typeof ioModule[componentPath] !== 'function')
				{
					let msg = new Error('IO method <b>' + componentPath + '</b> for component <b>' + componentName + '</b> does not exist!')
					resolve(msg)
				}
				else
				{
					// check argument types
					var argumentTypes        = ioArgumentsCache[componentName][ioClass + 'io.js']
					var methodArgumentsSpecs = {}

					if (argumentTypes && argumentTypes[componentPath])
					{
						methodArgumentsSpecs = argumentTypes[componentPath]
					}

					for (let argumentName in methodArgumentsSpecs)
					{
						let argumentSpecs = methodArgumentsSpecs[argumentName]
						let types         = argumentSpecs['types']
						let optional      = argumentSpecs['optional']

						if (!(argumentName in methodArguments))
						{
							if (optional)
							{
								continue
							}
							else
							{
								console.error(`Argument ${argumentName} is mandatory`)
							}
						}

						var argumentType = getJsDocTypeOfVariable(methodArguments[argumentName])

						if (
							types.indexOf('*') > -1
							|| (types.indexOf(argumentType) > -1)
						)
						{
							// all fine here
						}
						else
						{
							var errorMessage = `Wrong argument type for ${componentPath}(). The type of argument "${argumentName}" is "${argumentType}", but "${types.join('|')}" was expected.`
							console.error(errorMessage)

							responseError(response, errorMessage)

							return
						}
					}

					let fn = ioModule[componentPath].call(ioModule, methodArguments, x)

					resolveIoFunction(fn, componentName, response, requestTemplate, xhr, componentsAssets, resolve)
				}

				if (!(componentName in componentsScripts))
				{
					componentsScripts[componentName] = true
				}
			})
		})
	}

	let old_browser_message = 'Oops, it looks that your browser is too old for fxDreema. Please, use a modern browser :)'

	if (requestMethodName === 'PAGE')
	{
		// direct the request to a page layout
		let page         = $pages.loadPage(conf['pathRoot'], urlPathExploded)
		let templateFn   = page['templateFunction']
		let htmlHeadTags = page['htmlHeadTags']

		if (templateFn === false)
		{
			response.end('Not found :(')
		}
		else
		{
			templateFn(chunkLoader.bind(this, urlPathExploded)).then((html) => {
				let styles  = ''
				let scripts = ''

				for (let componentName in componentsAssets['styles'])
				{
					styles += componentsAssets['styles'][componentName]
				}

				for (let componentName in componentsAssets['scripts'])
				{
					scripts += componentsAssets['scripts'][componentName]
				}

				let requestWords = new $words(request, {pathComponents : ''}, 'index')

				html = '<!DOCTYPE html>\n<html lang=' + (requestWords.language || 'en') + '>\n<head>\n'
					+ '   <meta charset="utf-8">\n'
					+ generateHtmlHeadTags(htmlHeadTags)
					+ styles
					+ $template.mandatoryScript()
					+ '</head>\n<body>'
					+ html
					+ '\r\n<script>// Check browser support\r\n(function(){try{return eval("function*a(){};async function b(){}")}catch(e){document.getElementsByTagName("body")[0].innerHTML=("<div style=\\"color:yellow; text-align:center;vertical-aligh:middle;font-size:3rem;padding:3rem\\">' + old_browser_message + '</div>")}})()</script>'
					+ scripts
					+ '\n</body>\n</html>'

				response.end(html)
			}, (error) => {
				console.error(error)
			})
		}
	}
	else
	{
		if (request.headers['x-ajax-version'] !== ajaxVersion)
		{
			responseError(response, conf['ajax']['wrongVersionMessage'] || 'Website was updated. Please, reload the page.')

			return
		}

		chunkLoader(urlPathExploded).then((value, statusCode) => {

			if (statusCode) response.statusCode = statusCode

			if (response.finished) return
			{
				if (value instanceof Error)
				{
					let errorKey = 'error'
					response.setHeader('X-Response-Type', errorKey)
					let message = value.message

					let data       = {}
					data[errorKey] = message

					response.end(JSON.stringify(data))
				}
				else if (typeof value === 'string')
				{
					response.setHeader('X-Response-Type', 'string')
					response.end(value)
				}
				else
				{
					response.setHeader('X-Response-Type', 'json')
					response.end(JSON.stringify(value))
				}
			}
		})
	}
}

/**
 * Process the result of the IO function that is provided,
 * depending on what type the function is (Synchronator or normal)
 * and depending on what type is the returned value (template, Error...)
 *
 * @param fn
 * @param componentName
 * @param response
 * @param requestTemplate
 * @param xhr
 * @param componentsAssets
 * @param callback
 */
let resolveIoFunction   = function (fn, componentName, response, requestTemplate, xhr, componentsAssets, callback) {
	if (fn instanceof $synchronator || fn instanceof Promise)
	{
		fn.then((value) => {
			if (value instanceof Template)
			{
				let reqTpl = requestTemplate(value._path)
				let html   = reqTpl.data(value._data).html()

				if (!xhr)
				{
					componentsAssets['scripts'][componentName] = reqTpl.getJScode()
					componentsAssets['styles'][componentName]  = reqTpl.getCSScode()
				}

				callback(html)
			}
			else if (value instanceof $template.wrap)
			{
				let html = value.html()

				if (!xhr)
				{
					componentsAssets['scripts'][componentName] = value.getJScode()
					componentsAssets['styles'][componentName]  = value.getCSScode()
				}

				callback(html)
			}
			else if (value instanceof $template.wrapJSON)
			{
				// todo remove this
				//let json = value
				value.done()

				//callback(value)
			}
			// new String()
			else if (value instanceof String)
			{
				response.end(value + '')

				//callback(value)
			}
			else if (value instanceof Object)
			{
				requestTemplate(value).done()
			}
			else if (value === false || value instanceof Error)
			{
				callback(value)
			}
			else
			{
				callback(value)
			}
		})
	}
	else if (fn instanceof $template.wrap || fn instanceof $template.wrapJSON)
	{
		fn.done()
	}
}
resolveIoFunction.cache = {}

//-- UTILITY FUNCTIONS -------------------------------------------------------------------------------------------------
/**
 * Convert object into HTML code. The input data should contain tag names and their attributes.
 *
 * ::: Example 1 :::
 * {title : 'sometitle'} is converted to <title>sometitle</title>
 *
 * ::: Example 2 :::
 * {meta : [{name : 'description', content : 'somecontent'}, {name : 'keywords', content : 'somekeywords'}]} is converted to:
 *    <meta name='description' content='somecontent'>
 *    <meta name='keywords' content='somekeywords'>
 *
 * @param {Object} input - The input data to be converted into HTML code
 * @returns {string}
 */
function generateHtmlHeadTags(input)
{
	let html = ''

	if (!(input instanceof Object)) return ''

	for (let tagName in input)
	{
		let tagContents = input[tagName]

		if (tagContents instanceof Array)
		{
			for (let name in tagContents)
			{
				let properties = tagContents[name]

				if (properties instanceof Object)
				{
					let propertiesHTML = ''

					for (let propertyName in properties)
					{
						let propertyContents = properties[propertyName].replace(/"/g, '')

						propertiesHTML += `${propertyName}="${propertyContents}" `
					}

					html += `   <${tagName} ${propertiesHTML.trim()}>\n`
				}
			}
		}
		else if (typeof tagName === 'string')
		{
			html += `   <${tagName}>${tagContents}</${tagName}>\n`
		}
	}

	return html
}

/**
 * Explodes path from a string to an Array. For example:
 * 'part1/part2/part3' is turned into ['part1', 'part2', 'part3']
 * @param pathname {string}
 * @returns {Array}
 */
function pathnameSplit(pathname)
{
	// Note: The code below works faster than doing .split and then removing empty values

	let output = []
	let word   = ''
	let length = pathname.length

	for (let i = 0; i < length; i++)
	{
		if (pathname[i] !== '/')
		{ // building a word
			word += pathname[i]
		}
		else
		{ // pushing the word into the output
			if (word) output.push(word)
			word = '' // reset, start a new word
		}
	}

	// if the pathname does not end with /, then we have a word here
	if (word) output.push(word)

	return output
}

// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
function getArgumentNames(func)
{
	var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg
	var ARGUMENT_NAMES = /([^\s,]+)/g

	if (typeof func !== 'function') return []

	var fnStr  = func.toString().replace(STRIP_COMMENTS, '')
	var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)

	if (result === null) result = []

	return result
}

function getJsDocTypeOfVariable(variable)
{
	if (variable instanceof Array)
	{
		return 'array'
	}

	if (variable === null)
	{
		return 'null'
	}

	return (typeof variable).toLowerCase()
}

function responseError(response, errorMessage = 'Unknown Error')
{
	response.setHeader('X-Response-Type', 'error')
	response.end(JSON.stringify({
		error : errorMessage
	}))
}

//-- EXPORTS -----------------------------------------------------------------------------------------------------------
export default {
	parseRequest : parseRequest
}