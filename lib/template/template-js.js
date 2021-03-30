import $fs from 'fs'

import $os from 'os'
import $path from 'path'
import $zlib from 'zlib'
import $uglifyes from 'uglify-es'
import $functions from './functions.js'
import Synchronator from 'synchronator'

var renderedFiles         = {}
var preRendered           = false
var renderCache           = {} // cache object that contains the generated output html links, to speed up getHtmlLink()
var renderCacheModifyTime = null
var filesWatchList        = {}
var __tmpdir              = $os.tmpdir() + $path.sep + 'nodejs-galaxia' + $path.sep + 'public-' + ((process.develop === true) ? 'dev' : 'prod')

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = $path.dirname(__filename)

$functions.dirCreateSync(__tmpdir)

let registeredWatchFiles = []

function minifyJS(code, root, source_filename, map_url)
{
	var codes              = {}
	codes[source_filename] = code // the key in this array goes to 'sources' in the map file

	// https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options
	var options = {
		compress : true,
		warnings : false,
		mangle   : true,
		ie8      : false
	}

	// to make or not to make source map?
	if (root)
	{
		options['sourceMap'] = {
			root           : root,
			url            : map_url,
			includeSources : true
		}
	}

	var minified = $uglifyes.minify(codes, options)

	if (minified.error)
	{
		console.error(minified.error)
		return code
	}

	return minified
}

/**
 * Returns JS code, that is mandatory for all pages
 *
 * @return {string}
 */
function mandatoryCode()
{
	var code = ''
	code += Synchronator.getJavaScriptCode()
	code += $fs.readFileSync(__dirname + '/template-js-ioRequests.js')

	if (process.develop === true)
	{
		//var file_o = __tmpdir + $path.sep + 'start.js'
		//$fs.writeFileSync(file_o, result.code)
		//$fs.writeFileSync(file_o + '.map', result.map)
	}
	else
	{
		code = minifyJS(code).code
	}

	return code
}

class Class
{
	constructor(componentsDir, componentName, appName, configuration)
	{
		this.configuration      = configuration
		this.componentsDir      = $path.resolve(componentsDir)
		this.componentName      = componentName
		this.appName            = appName
		this.indexFileName      = 'index'  // if file with such name exists in the inputDirName, work with it, otherwise load all files (in who knows what order)
		this.inputDirName       = 'script' // (relative) where preprocessor files are located
		this.outputFileName     = 'script' // the name of the generated file (will be appended with .css and .min.css)
		this.outputFileOptimize = true // use optimizer to optimize (restructure) the output code
		this.outputFileGzipped  = false
		this.watchTimeout       = null

		let componentsDirModified =
				 this.componentsDir
				 .replace(new RegExp($path.sep.replace('\\', '\\\\'), 'g'), '-')
				 .replace(/:/g, '-')
		this.outputFilesDirectory = configuration.outputFilesDirectory

		$functions.dirCreateSync(this.outputFilesDirectory)

		this.watchFile = this.outputFilesDirectory + $path.sep + '.watch-js.json'

		if (registeredWatchFiles.indexOf(this.watchFile) === -1)
		{
			registeredWatchFiles.push(this.watchFile)

			if ($fs.existsSync(this.watchFile))
			{
				filesWatchList = JSON.parse($fs.readFileSync(this.watchFile, 'utf8'))

				for (var i in filesWatchList)
				{
					this.watchFileForChanges(i, null)
				}
			}
		}

		this.preRenderAll()
	}

	renderFile(projectName, dirBase, componentName, pathInput, dirOutput, filename)
	{
		var allowedFolders = ['script', 'public']

		var path_input_split = pathInput.split('\\')

		if (allowedFolders.indexOf(path_input_split[1]) === -1) return false

		if (filename.substr(-3) !== '.js') return false

		var sep = $path.sep

		//-- input file preparation -----------------------------------------------------------------------------------------
		var file_i    = dirBase + sep + pathInput + sep + filename
		var file_mark = dirBase + pathInput + filename
		var mtime_i   = $fs.statSync(file_i).mtime.getTime()

		//-- output file preparation ----------------------------------------------------------------------------------------
		// remove first 'script' part from the path
		//var path_clear = path_input.replace(/(^[^\\]+)(?:\\script)(\\|$)/, '$1$2')
		var path_clear = pathInput

		var output_filename_prefix = path_clear.replace(new RegExp($path.sep.replace('\\', '\\\\'), 'g'), '-')
		.replace(/:/g, '-') + '-'
		var link_prefix            = path_clear.replace(new RegExp($path.sep.replace('\\', '\\\\'), 'g'), '/')
		.replace(/:/g, '/') + '/'
		var file_o                 = dirOutput + sep + output_filename_prefix + filename

		var mtime_o = 0
		try
		{
			mtime_o = $fs.statSync(file_o).mtime.getTime()
		} catch (e)
		{
		}

		//-- work -----------------------------------------------------------------------------------------------------------
		if (mtime_i > mtime_o)
		{
			// read the input file
			var contents = $fs.readFileSync(file_i).toString()

			// find all require() in the code and deal with each of them

			// TODO - remove comments first
			if (1)
			{
				contents = contents.replace(/((?:^|[^\w\/])require\()([^)]+)\)/g, (all, m1, path) => {
					path = path.trim()
					path = path.replace(/__dirname/g, '')

					if (path[0] === '"' || path[0] === "'" || path[0] === '`')
					{
						var pos = 1
						for (var p = pos; p < path.length; p++)
						{
							if (path[p] === path[0])
							{
								pos = p
								break
							}
						}

						var path_clear = $path.normalize(path.substr(1, pos - 1))

						if (path[1] === '/')
						{
							path_clear = path_clear.substr(1)
						}
						else
						{
							path_clear = pathInput + sep + path_clear
						}

						path_clear = $path.normalize(path_clear).replace(dirBase + sep, '')

						var path_clear_full = dirBase + sep + path_clear
						if (path_clear.substr(-3) !== '.js')
						{
							path_clear_full += '.js'
						}

						if ($fs.existsSync(path_clear_full))
						{
							// prevent 'Maximum Call Stack' when 2 files require each other
							if (!(file_i in renderedFiles))
							{
								var parsed = $path.parse(path_clear_full)

								this.renderFile(projectName, dirBase, componentName, $path.dirname(path_clear), dirOutput, parsed.base)
							}
						}
						else
						{
							console.error('Could not find module ' + path_clear_full.replace(dirBase, '') + ' in ' + file_i.replace(dirBase, ''))
						}

						// remove first 'script' part from the path
						var q = path[0]

						path_clear = '/' + path_clear.replace(new RegExp($path.sep.replace('\\', '\\\\'), 'g'), '/')
						.replace(/:/g, '-')
						path_clear = path_clear.replace(/\.js($)/, '')

						path = path[0] + path_clear + path[0] + path.substr(pos + 1)
					}

					//return m1 + path + ')'
					return all
				})
			}

			renderedFiles[file_i] = true

			var key = link_prefix + filename
			key     = key.replace(/\.js($)/, '')

			//contents = `require.register("/${key}", function*(module, exports, require) {${contents}\r\n})`

			//-- add pre-require code
			contents = contents.replace(/(?:(?:[^(){}]+=\s*)?require\s*\(\s*(?:'[^']+'|"[^"]+")\s*\)\s*[;]?\s*(?:\/\/[^\n]*)?\s*){2,}/g, (all) => {

				var pre_requires = []
				var pattern      = /require\s*\(\s*('[^']+'|"[^"]+")\s*\)/g
				var match        = null

				while (match = pattern.exec(all))
				{
					var path = match[1]
					pre_requires.push(path)
				}

				all = ';/*pre-require*/require([' + pre_requires.join(',') + '],1);' + '\r\n' + all

				return all
			})

			contents = Synchronator.transform(contents, file_i).code

			//var sourceURL = path_input.replace(/\\/g, '/') + filename
			//contents += `\n//# sourceURL=../${sourceURL}`

			if (process.develop === false)
			{
				contents = minifyJS(contents).code
			}

			$fs.writeFileSync(file_o, contents)

			this.watchFileForChanges(file_i, componentName, Array.from(arguments))
		}
	}

	/**
	 *
	 * @param {string} file_i
	 * @param {string} componentName
	 * @param {Array=} args - arguments of the function that renders file, or null when loading watchers from the cache
	 * @returns {boolean}
	 */
	watchFileForChanges(file_i, componentName, args)
	{
		if (!process.develop)
		{
			return false
		}

		if (args)
		{
			if (file_i in filesWatchList) return true

			filesWatchList[file_i] = {arguments : Array.from(args), componentName : componentName}
			setTimeout(() => {
				$fs.writeFileSync(this.watchFile, JSON.stringify(filesWatchList))
			}, 50)
		}

		var options = {
			persistent : true,
			interval   : 5007 // ms
		}

		if ($fs.existsSync(file_i))
		{
			$fs.watch(file_i, options, (event, filename) => {
				if (filename.substr(-3) !== '.js')
				{
					return
				}

				// many events can come in no time, so we use timeout to make sure that we don't render too often
				if (this.watchTimeout)
				{
					clearTimeout(this.watchTimeout)
					this.watchTimeout = null
				}

				this.watchTimeout = setTimeout(() => {

					process.stdout.write('wait...')

					if (1 || event === 'change' || event === 'rename')
					{
						Class.clearRenderCache(filesWatchList[file_i].componentName)

						this.renderFile.apply(this, filesWatchList[file_i].arguments)

						process.stdout.write('\rJS file rebuilt "' + file_i + '"\n')
					}
				}, 50)
			})
		}
		else
		{
			//log(file_i)
			//$fs.unlink(file_o)
		}
	}

	// get rendered html link for a given component, to be used in the output html code
	getHtmlLink(componentName = this.componentName)
	{
		var data = renderCache[componentName]

		if (data === undefined)
		{
			data = {code : '', mtime : 0}

			var mtime = this.render(componentName)
			mtime     = Math.round(mtime / 1000)

			if (!renderCacheModifyTime)
			{
				renderCacheModifyTime = mtime
			}

			if (mtime)
			{
				data['mtime'] = renderCacheModifyTime

				if (mtime !== false)
				{
					//data['code'] += '<script>\r\n' + mandatoryCode + '\r\n</script>'
					var outputFileName = this.outputFilesDirectory + $path.sep + componentName + '-script-index.js'
					//var old_browser_message = 'Oops, it looks that your browser is too old for fxDreema. Please, use a modern browser :)'

					if ($fs.existsSync(outputFileName))
					{
						//data['code'] += `\r\n<script>window.addEventListener(\'load\',function() {`
						data['code'] += `\r\n<script type='module'>`


						let conf        = this.configuration
						let ajaxVersion = (typeof conf['ajax'] === 'object' && ('version' in conf['ajax'])) ? conf['ajax']['version'] : ''

						if (0)
						{
							data['code'] += '\r\n\t// Load scripts\r\n'
							data['code'] += '\trequire.setVersion("' + ajaxVersion + '");\r\n'
							data['code'] += '\trequire.setTime(' + data['mtime'] + ');\r\n'
							data['code'] += '\trequire.call("/' + componentName + '/script", "index");'
						}
						else
						{
							data['code'] += '\r\n\t// Load scripts\r\n'
							//data['code'] += '\trequire.setVersion("' + ajaxVersion + '");\r\n'
							//data['code'] += '\trequire.setTime(' + data['mtime'] + ');\r\n'
							data['code'] += '\timport "./script/index.js";\r\n'
						}

						//data['code'] += `\r\n})</script>\r\n`
						data['code'] += `\r\n</script>\r\n`
					}
				}
			}

			renderCache[componentName] = data
		}
		else
		{
			//data['code'] = '<script>require.mtime=' + data['mtime'] + '</script>`
		}

		return data['code']
	}

	gzip(content, callback)
	{
		$zlib.deflate(content, (err, buffer) => {
			if (err)
			{
				callback(err)
				return
			}

			callback(null, buffer)
		})
	}

	preRenderAll()
	{
		if (preRendered === true) return true
		preRendered = true

		var dir = this.componentsDir

		if ($fs.existsSync(dir))
		{
			var list = $fs.readdirSync(dir)

			for (var i in list)
			{
				var componentName = list[i]
				var dirname       = dir + $path.sep + componentName

				var stat = $fs.statSync(dirname)

				if (stat && stat.isDirectory())
				{
					this.getHtmlLink(componentName)
				}

			}
		}
	}

	// render all raw files into output .js files
	render(componentName)
	{
		componentName = componentName || this.componentName

		// paths for the component
		var path_input  = componentName + $path.sep + this.inputDirName
		var path_output = this.outputFilesDirectory + $path.sep

		this.renderDir(this.appName, this.componentsDir, componentName, path_input, path_output)
		//this.renderIOFile(componentName)
		this.renderIOFiles(componentName)

		return $functions.dirMtimeSync(this.componentsDir + '/' + path_input)
	}

	renderDir(projectName, dirBase, componentName, pathInput, dirOutput)
	{
		pathInput = $path.normalize(pathInput)
		dirOutput = $path.resolve(dirOutput)
		dirBase   = $path.resolve(dirBase)

		var sep = $path.sep
		var dir = dirBase + sep + pathInput

		if ($fs.existsSync(dir))
		{
			var list = $fs.readdirSync(dir)

			for (var i in list)
			{
				var filename = list[i]

				if (filename.substr(-3) === '.js')
				{
					var file_i = dir + sep + filename
					var stat   = $fs.statSync(file_i)

					if (stat.isFile())
					{
						this.renderFile(projectName, dirBase, componentName, pathInput, dirOutput, filename)
					}
				}
			}
		}
	}

	renderIOFile(/* string */ componentName)
	{
		let code =
				 `
	let IO = {}
	let componentName = '${componentName}'
	let methodNames   = {}

	function * createClass(ioName, methodNames)
	{
		IO[ioName] = class
		{
			constructor() {
				this.__componentName = componentName
				this.__ioName        = ioName
				this.__args = arguments
				this.__sess = Math.floor(1000000000 + Math.random() * 9000000000)
			}
		}

		for (let i in methodNames)
		{
			let methodName = methodNames[i]
		
			IO[ioName].prototype[methodName] = function*() {
				return requireAjaxRequest(componentName, methodName, ioName, this.__args, arguments, this.__sess)
			}
		}
	}
`

		var file          = this.componentsDir + $path.sep + componentName + $path.sep + 'io.js'
		var file2         = '/' + componentName + '/io'
		let dir           = this.componentsDir + $path.sep + componentName
		let scandir       = $fs.readdirSync(dir)
		let argumentTypes = {}

		for (let i in scandir)
		{
			let fileName = scandir[i]
			let filePath = dir + $path.sep + fileName

			if (fileName.length > 4 && fileName.substr(-6) === '.io.js')
			{
				let className = fileName.substr(0, fileName.length - 6)
				let stat      = $fs.statSync(filePath)

				if (className && stat.isFile())
				{
					// https://stackoverflow.com/questions/13014947/regex-to-match-a-c-style-multiline-comment
					let pattern0 = /(?<jsDocComment>\/\*\*[^*]*\*+(?:[^/*][^*]*\*)*\/)\s*\n\s*[\*]?\s*(?<methodName>[a-zA-Z_][\w$]+)\s*\(/g
					let pattern1 = /\n[ \t]*\*[ \t]*@param[ \t]+{(?<type>[\w]+)(?<optional>[=]?)}[ \t]*(?<name>[a-zA-Z_$][\w$]*)[^\n]*\n/g

					let pattern                  = /@public[^\/]+\*\/[\r\n]\s*[*]?\s*(?<methodName>[A-Za-z_$][\w$]*)\s*\(/g
					let contents                 = $fs.readFileSync(filePath).toString()
					let methodNames              = []
					let argumentTypesForThisFile = {}
					let match                    = null
					let match1                   = null


					while (match = pattern0.exec(contents))
					{
						let methodName   = match.groups['methodName']
						let jsDocComment = match.groups['jsDocComment']

						methodNames.push(methodName)

						while (match1 = pattern1.exec(jsDocComment))
						{
							let type     = match1.groups['type']
							let name     = match1.groups['name']
							let optional = match1.groups['optional'] === '='

							if (!(methodName in argumentTypesForThisFile))
							{
								argumentTypesForThisFile[methodName] = {}
							}

							argumentTypesForThisFile[methodName][name] = {
								types    : type.toLowerCase().split('|').map(s => s.trim()),
								optional : optional
							}
						}
					}

					argumentTypes[fileName] = argumentTypesForThisFile

					code +=
						`
	createClass('${className}', ${JSON.stringify(methodNames)})`
				}
			}
		}

		code +=
			`

	module.exports = IO`

		let contents = `require.register('${file2}', function*(module, exports, require) {` + code + `\r\n})`

		contents   = Synchronator.transform(contents).code
		let file_o = ''

		file_o = this.outputFilesDirectory + $path.sep + componentName + '-arguments.json'
		$fs.writeFileSync(file_o, JSON.stringify(argumentTypes, null, 3))

		// write the output file
		file_o = this.outputFilesDirectory + $path.sep + componentName + '-io.js'

		$fs.writeFileSync(file_o, contents)
	}

	renderIOFiles(/* string */ componentName)
	{
		let dir     = this.componentsDir + $path.sep + componentName
		let scandir = $fs.readdirSync(dir)

		let conf        = this.configuration
		let ajaxVersion = (typeof conf['ajax'] === 'object' && ('version' in conf['ajax'])) ? conf['ajax']['version'] : ''

		for (let i in scandir)
		{
			let fileName = scandir[i]
			let filePath = dir + $path.sep + fileName

			let ioIndex  = fileName.indexOf('.io.')
			let isIoFile = ioIndex > -1

			if (isIoFile)
			{
				if (
					(fileName.length > 4 && fileName.substr(-6) === '.io.js')
					|| (fileName.length > 5 && fileName.substr(-7) === '.io.mjs')
				)
				{
					let className = fileName.substr(0, ioIndex)
					let stat      = $fs.statSync(filePath)

					if (className && stat.isFile())
					{
						let contents = `
const componentName = '${componentName}'
const className     = '${className}'
const ajaxVersion   = '${ajaxVersion}'

export default class
{
	constructor() {
		const constructorArguments = arguments

		return new Proxy({}, {
			get(target, methodName)
			{
				return function()
				{
					return new ioRequests().request(
						componentName,
						className,
						constructorArguments,
						methodName,
						arguments,
						'',
						ajaxVersion
					)
				}
			}
		})
	}
}
					`.trim()

						var file_o = this.outputFilesDirectory + $path.sep + componentName + '-' + fileName

						$fs.writeFileSync(file_o, contents)
					}
				}
			}
		}
	}
}

Class.clearRenderCache = function (componentName) {
	if (!componentName)
	{
		renderCache           = {}
		renderCacheModifyTime = null
	}
	else
	{
		if (componentName && (componentName in renderCache))
		{
			delete renderCache[componentName]
		}
		else
		{
			renderCache = {}
		}
	}
	return true
}

Class.mandatoryScript = '<script>\r\n' + mandatoryCode() + '\r\n</script>'

export default Class