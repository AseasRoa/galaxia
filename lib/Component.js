import $path from 'path'
import $synchronator from 'synchronator'
import {URL} from 'url'
import $pages from './pages.js'
import {Template} from './Template.js'
import $template from './template/index.js'
import './typedefs.js'
import $words from './words/index.js'

/**
 * @typedef {Object} ComponentsAssets
 * @property {{}} styles
 * @property {{}} scripts
 */

global.Template = Template

// object containing IO modules
let ioModulesCache   = {}
let ioArgumentsCache = {}

// delete the cache of IO modules on a regular period of time
setInterval(() => {
	let timeout = 5 * 60 * 1000
	let time    = new Date().getTime()

	for (let i in ioModulesCache) {
		if (time > ioModulesCache[i]['time'] + (timeout)) {
			delete ioModulesCache[i]
		}
	}
}, 10 * 1000)

//-- MAIN FUNCTIONS ----------------------------------------------------------------------------------------------------
/**
 * All HTTP requests end up here.
 * In this function we route those requests to the appropriate component, process the request and make the response.
 * @param {Request} request
 * @param {Response} response
 * @param {URL} url
 * @param {QueryParams} queryParams
 * @param {AppConfig} appConfig
 * @param {AppPaths} appPaths
 */
let parseRequest = function(request, response, url, queryParams, appConfig, appPaths) {
	const pathComponents    = appPaths.components
	const isXHR             = isRequestXHR(request)
	const requestMethodName = (!isXHR && request.method === 'GET') ? 'PAGE' : request.method.toUpperCase()
	const ajaxVersion       = (typeof appConfig.ajax === 'object' && ('version' in appConfig.ajax))
		? appConfig.ajax.version + ''
		: ''

	/** @type {ComponentsAssets} */
	let componentsAssets  = {scripts : {}, styles : {}}
	let componentsScripts = {}
	let explodedPathname  = explodePathname(url.pathname)

	if (explodedPathname.length === 0)
		explodedPathname = ['index']

	/**
	 * @param {string[]} urlPathExploded
	 * @param {string} [path]
	 * @returns {Promise<string|boolean|Error>}
	 */
	const chunkLoader = function(urlPathExploded, path) {
		return new Promise(function(resolve) {
			let componentName = 'index'
			let componentPath = 'index'
			let ioClass       = ''

			if (path) {
				const pathExploded = explodePathname(path)

				componentName = pathExploded[0] || 'index'
				componentPath = pathExploded[1] || 'index'
			}
			else {
				componentName = request.headers['x-component-name']
				componentPath = request.headers['x-method-name']
				ioClass       = request.headers['x-io-name'] + '.'
			}

			//-- language & Template & App
			const requestWords    = new $words(
				request,
				{pathComponents},
				componentName
			)
			const requestTemplate = new $template(
				request,
				response,
				appConfig,
				appPaths,
				pathComponents,
				componentName,
				requestWords,
				isXHR
			)

			//-- io module
			const ioModulePath = $path.join(pathComponents, componentName, ioClass + 'io.js')
			const moduleOne    = $synchronator.require(ioModulePath)

			if (!(componentName in ioArgumentsCache))
				ioArgumentsCache[componentName] = {}

			moduleOne.then((ioModule) => {
				const x = {
					request  : request,
					response : response,
					template : requestTemplate,
					lang     : requestWords,
					words    : requestWords,
					address  : urlPathExploded,
					queryGet : queryParams.queryGet
				}

				let constructorArgumentsInHeaders = {}

				try {
					constructorArgumentsInHeaders = JSON.parse(request.headers['x-constructor-arguments'] || '{}')
				} catch (error) {
					constructorArgumentsInHeaders = {}
				}

				let constructorArguments = [{}, {}]

				if (constructorArgumentsInHeaders instanceof Object)
					constructorArguments[0] = constructorArgumentsInHeaders

				// todo is this decoupling?
				let methodArguments = {...{}, ...queryParams.query}

				if (typeof ioModule === 'function') {
					constructorArguments[1] = x

					let sessionKey = request.headers['x-session-key']

					if (0 && sessionKey in ioModulesCache) {
						ioModule = ioModulesCache[sessionKey]['object']
					}
					else {
						ioModule = new ioModule(...constructorArguments)

						if (sessionKey) {
							ioModulesCache[sessionKey] = {
								object : ioModule,
								time   : new Date().getTime()
							}
						}
					}

					// TODO remove that
					ioModule.x = x
				}

				if (typeof ioModule[componentPath] !== 'function') {
					let msg = new Error('IO method <b>' + componentPath + '</b> for component <b>' + componentName + '</b> does not exist!')
					resolve(msg)
				}
				else {
					// check argument types
					const argumentTypes = ioArgumentsCache[componentName][ioClass + 'io.js']

					let methodArgumentsSpecs = {}

					if (argumentTypes && argumentTypes[componentPath])
						methodArgumentsSpecs = argumentTypes[componentPath]

					for (let argumentName in methodArgumentsSpecs) {
						const argumentSpecs = methodArgumentsSpecs[argumentName]
						const types         = argumentSpecs['types']
						const optional      = argumentSpecs['optional']

						if (
							!(argumentName in methodArguments)
							&& !optional
						) console.error(`Argument ${argumentName} is mandatory`)

						const argumentType = getJsDocTypeOfVariable(methodArguments[argumentName])

						if (
							types.indexOf('*') > -1
							|| (types.indexOf(argumentType) > -1)
						) {
							// all fine here
						}
						else {
							const errorMessage = `Wrong argument type for ${componentPath}(). The type of argument "${argumentName}" is "${argumentType}", but "${types.join('|')}" was expected.`

							console.error(errorMessage)

							responseError(response, errorMessage)

							return
						}
					}

					let fn = ioModule[componentPath].call(ioModule, methodArguments, x)

					resolveIoFunction(fn, componentName, response, requestTemplate, isXHR, componentsAssets, resolve)
				}

				if (!(componentName in componentsScripts))
					componentsScripts[componentName] = true
			})
		})
	}

	if (requestMethodName === 'PAGE') {
		// direct the request to a page layout
		const page             = $pages.loadPage(appPaths.root, explodedPathname)
		const templateFunction = page.templateFunction
		const htmlHeadTags     = page.htmlHeadTags

		if (!templateFunction) {
			response.end('Not found :(')
		}
		else {
			templateFunction(chunkLoader.bind(this, explodedPathname)).then((html) => {
				let styles  = ''
				let scripts = ''

				for (let componentName in componentsAssets.styles)
					styles += componentsAssets.styles[componentName]

				for (let componentName in componentsAssets.scripts)
					scripts += componentsAssets.scripts[componentName]

				let requestWords        = new $words(request, {pathComponents : ''}, 'index')
				const oldBrowserMessage = 'Oops, it looks that your browser is too old for fxDreema. Please, use a modern browser :)'

				html = '<!DOCTYPE html>\n<html lang=' + (requestWords.language || 'en') + '>\n<head>\n'
					+ '   <meta charset="utf-8">\n'
					+ generateHtmlHeadTags(htmlHeadTags)
					+ styles
					+ $template.mandatoryScript()
					+ '</head>\n<body>'
					+ html
					+ '\r\n<script>// Check browser support\r\n(function(){try{return eval("function*a(){};async function b(){}")}catch(e){document.getElementsByTagName("body")[0].innerHTML=("<div style=\\"color:yellow; text-align:center;vertical-aligh:middle;font-size:3rem;padding:3rem\\">' + oldBrowserMessage + '</div>")}})()</script>'
					+ scripts
					+ '\n</body>\n</html>'

				response.end(html)
			}, (error) => {
				console.error(error)
			})
		}
	}
	else {
		if (request.headers['x-ajax-version'] !== ajaxVersion) {
			const errorMessage = appConfig.ajax['wrongVersionMessage'] || 'Website was updated. Please, reload the page.'
			responseError(response, errorMessage)

			return
		}

		chunkLoader(explodedPathname).then((value, statusCode) => {

			if (statusCode) response.statusCode = statusCode

			if (response.finished) return
			{
				if (value instanceof Error) {
					let errorKey = 'error'
					response.setHeader('x-response-type', errorKey)
					let message = value.message

					let data       = {}
					data[errorKey] = message

					response.end(JSON.stringify(data))
				}
				else if (typeof value === 'string') {
					response.setHeader('x-response-type', 'string')
					response.end(value)
				}
				else {
					response.setHeader('x-response-type', 'json')
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
 * @param {string} componentName
 * @param {Response} response
 * @param requestTemplate
 * @param {boolean} isXhr
 * @param {ComponentsAssets} componentsAssets
 * @param callback
 */
let resolveIoFunction   = function(
	fn,
	componentName,
	response,
	requestTemplate,
	isXhr,
	componentsAssets,
	callback
) {
	if (fn instanceof $synchronator || fn instanceof Promise) {
		fn.then((value) => {
			if (value instanceof Template) {
				let reqTpl = requestTemplate(value._path)
				let html   = reqTpl.data(value._data).html()

				if (!isXhr) {
					componentsAssets.scripts[componentName] = reqTpl.getJScode()
					componentsAssets.styles[componentName]  = reqTpl.getCSScode()
				}

				callback(html)
			}
			else if (value instanceof $template.wrap) {
				let html = value.html()

				if (!isXhr) {
					componentsAssets.scripts[componentName] = value.getJScode()
					componentsAssets.styles[componentName]  = value.getCSScode()
				}

				callback(html)
			}
			else if (value instanceof $template.wrapJSON) {
				// todo remove this
				//let json = value
				value.done()

				//callback(value)
			}
			// new String()
			else if (value instanceof String) {
				response.end(value + '')

				//callback(value)
			}
			else if (value instanceof Object) {
				requestTemplate(value).done()
			}
			else if (value === false || value instanceof Error) {
				callback(value)
			}
			else {
				callback(value)
			}
		})
	}
	else if (fn instanceof $template.wrap || fn instanceof $template.wrapJSON) {
		fn.done()
	}
}
resolveIoFunction.cache = {}

//-- UTILITY FUNCTIONS -------------------------------------------------------------------------------------------------
/**
 * Convert object into HTML code. The input data should contain tag names and their attributes.
 *
 * ::: Example 1 :::
 * {title : 'someTitle'} is converted to <title>someTitle</title>
 *
 * ::: Example 2 :::
 * {meta : [{name : 'description', content : 'someContent'}, {name : 'keywords', content : 'someKeywords'}]}
 * is converted to:
 *    <meta name='description' content='someContent'>
 *    <meta name='keywords' content='someKeywords'>
 *
 * @param {Object} input - The input data to be converted into HTML code
 * @returns {string}
 */
function generateHtmlHeadTags(input) {
	let html = ''

	if (!(input instanceof Object)) return ''

	for (let tagName in input) {
		let tagContents = input[tagName]

		if (tagContents instanceof Array) {
			for (let properties of tagContents) {
				if (!(properties instanceof Object))
					continue

				let propertiesHTML = ''

				for (let propertyName in properties) {
					let propertyContents = properties[propertyName].replace(/"/g, '')

					propertiesHTML += `${propertyName}="${propertyContents}" `
				}

				html += `   <${tagName} ${propertiesHTML.trim()}>\n`
			}
		}
		else if (typeof tagName === 'string') {
			html += `   <${tagName}>${tagContents}</${tagName}>\n`
		}
	}

	return html
}

/**
 * @param {Request} request - HTTP 2.0 request containing headers with lower-case property keys
 * @returns {boolean}
 */
const isRequestXHR = function(request) {
	const xhrHeader = (request.headers['x-requested-with'] || '').toLowerCase()

	return Boolean(xhrHeader === 'xmlhttprequest')
}

/**
 * Splits url pathname from a string into an Array. For example:
 * 'part1/part2/part3' is turned into ['part1', 'part2', 'part3']
 * @param pathname {string}
 * @returns {string[]}
 */
function explodePathname(pathname) {
	// Note: The code below works faster than doing .split and then removing empty values

	let output = []
	let word   = ''

	for (let char of pathname) {
		// building a word
		if (char !== '/') {
			word += char
		}
		// pushing the word into the output
		else {
			if (word)
				output.push(word)

			word = '' // reset, start a new word
		}
	}

	// if the pathname does not end with /, then we have a word here
	if (word) output.push(word)

	return output
}

// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically
function getArgumentNames(func) {
	var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg
	var ARGUMENT_NAMES = /([^\s,]+)/g

	if (typeof func !== 'function') return []

	var fnStr  = func.toString().replace(STRIP_COMMENTS, '')
	var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)

	if (result === null) result = []

	return result
}

function getJsDocTypeOfVariable(variable) {
	if (variable instanceof Array) {
		return 'array'
	}

	if (variable === null) {
		return 'null'
	}

	return (typeof variable).toLowerCase()
}

function responseError(response, errorMessage = 'Unknown Error') {
	response.setHeader('x-response-type', 'error')
	response.end(JSON.stringify({
		error : errorMessage
	}))
}

//-- EXPORTS -----------------------------------------------------------------------------------------------------------
export default {parseRequest}