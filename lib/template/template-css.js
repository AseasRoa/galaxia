// (Generate CSS Files)
// This module is used to automatically render output CSS files for each of the the components of the app
// The input files are to be used in CSS preprocessor(s) and turned into output .css and .min.css output files
// Two output CSS files are rendered for each component - one main file and its minified version

// (Return HTML "link" tags)
// For each component this module generates output link tag, which includes a timestamp

// (Watch For Changes)
// Also, input dirs are watched for changes and if something in them is changed, the output .css files are re-rendered

import $fs from 'fs'
import $path from 'path'
import $zlib from 'zlib'
import $functions from './functions.js'
import $stylus from 'stylus'
import $csso from 'csso'

var linksCache   = {} // cache object that contains the generated output html links, to speed up getHtmlLink
var watchTimeout = null

/**
 * Working with CSS files and code
 */
class Class
{
	/**
	 * @param {string} componentsDir
	 * @param {string} componentName
	 * @param {string} appName
	 */
	constructor(componentsDir, componentName, appName, configuration)
	{
		this.componentsDir      = componentsDir
		this.componentName      = componentName
		this.appName            = appName
		this.indexFileName      = 'index' // if file with such name exists in the inputDirName, work with it, otherwise load all files (in who knows what order)
		this.inputDirName       = 'stylesheet' // (relative) where preprocessor files are located
		this.outputDirName      = 'stylesheet' // (relative) where to put the output file
		this.outputFileName     = 'stylesheet' // the name of the generated file (will be appended with .css and .min.css)
		this.outputFileOptimize = true // use optimizer to optimize (restructure) the output code
		this.outputFileGzipped  = false

		let componentsDirModified =
				 this.componentsDir
				 .replace(new RegExp($path.sep.replace('\\', '\\\\'), 'g'), '-')
				 .replace(/:/g, '-')
		this.outputFilesDirectory = configuration.outputFilesDirectory

		$functions.dirCreateSync(this.outputFilesDirectory)
	}

	/**
	 * Minify CSS code
	 *
	 * @param {string} code
	 * @returns {string}
	 */
	compress(code)
	{
		if (1)
		{
			if (0 && this.outputFileOptimize)
			{// this caused some problems
				// if case of "tagname .someclass #someid", remove everything before the id, because ids are unique anyway
				code = code.replace(/^([^\n\{\,]+)( #[^\n\{]+\{)$/gm, (all, m1, m2) => {
					return m2
				})
			}

			code = $csso.minify(code, {restructure : this.outputFileOptimize}).css
		}
		else
		{
			// http://stackoverflow.com/questions/4402220/regex-to-minimize-css
			code = code.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '')
			// now all comments, newlines and tabs have been removed
			code = code.replace(/ {2,}/g, ' ')
			// now there are no more than single adjacent spaces left
			// now unnecessary: content = content.replace( /(\s)+\./g, ' .' )
			code = code.replace(/ ([{:}]) /g, '$1')
			code = code.replace(/([;,]) /g, '$1')
			code = code.replace(/ !/g, '!')
		}

		return code
	}

	/**
	 * Get rendered html link for a given component, to be used in the output html code
	 *
	 * @param {string} componentName
	 * @return {string} - HTML code that is used in the <head> section to load the bundle css file,
	 * or to put the contents there if the size is small enough.
	 */
	getHtmlLink(componentName)
	{
		componentName = componentName || this.componentName

		var data = linksCache[componentName]

		if (data === undefined)
		{
			var mtime = this.render(componentName)

			if (mtime === false)
			{
				data = ''
			}
			else
			{
				var outputFileName = (process.develop !== true) ? this.outputFileName + '.min' : this.outputFileName

				var path_output = this.outputFilesDirectory + $path.sep + this.appName + '-' + componentName + '-'

				var file_path = path_output + this.outputDirName + '-' + outputFileName + '.css'

				var contents = false

				try
				{
					var size = $functions.fileSizeSync(file_path)

					if (size <= 32 * 1024)
					{
						contents = $fs.readFileSync(file_path, 'utf8')
					}
				} catch (error)
				{
					console.error(error)
				}

				if (contents === false)
				{
					data = '\r\n\t<link rel="stylesheet" type="text/css" href="/' + componentName + '/' + this.outputDirName + '/' + outputFileName + '.css?v=' + Math.round(mtime / 1000) + '"/>'
				}
				else
				{
					data = '\r\n\t<style>' + contents + '</style>'
				}
			}

			linksCache[componentName] = data
		}

		return data
	}

	/**
	 * Compress code
	 *
	 * @param {string} content
	 * @param callback
	 */
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

	/**
	 * render all raw files into output .css files
	 *
	 * @param {string} componentName
	 * @return {*}
	 */
	render(componentName)
	{
		componentName = componentName || this.componentName

		// paths for the component
		var path_input  = this.componentsDir + '/' + componentName + '/' + this.inputDirName
		var path_output = this.outputFilesDirectory + $path.sep + componentName + '-'

		var filename_styl_index = path_input + $path.sep + this.indexFileName + '.styl'
		var filename_css        = path_output + this.outputDirName + '-' + this.outputFileName + '.css'
		var filename_css_min    = path_output + this.outputDirName + '-' + this.outputFileName + '.min.css'
		var filename_css_gzip   = path_output + this.outputDirName + '-' + this.outputFileName + '.min.css.gzip'

		// paths for the .global component
		/*
		var path_global_styles         = this.componentsDir + '/.global/' + this.inputDirName
		var filename_global_styl_index = path_global_styles + '/' + this.indexFileName + '.styl'
		 */

		// get modify times
		var dir_mtime = $functions.dirMtimeSync(path_input)

		if (dir_mtime === false) return false

		// get modify time of the global dir
		/*
		var dir_mtime_global = $functions.dirMtimeSync(path_global_styles)

		if (dir_mtime_global > dir_mtime) dir_mtime = dir_mtime_global
		*/

		var file_out_mtime = $functions.fileMtimeSync(filename_css_min)

		// generate output file: when the output file is old
		if (dir_mtime > file_out_mtime)
		{
			var require0 = $functions.fileExistsSync(filename_styl_index) ? 'index.styl' : '*'

			var style = $stylus('@require "' + require0 + '"')
			.set('filename', filename_styl_index)
			.set('include css', true) // import .css files the same way as .styl
			/*.set('sourcemap', {
				'comment' : true, // Adds a comment with the `sourceMappingURL` to the generated CSS
				'inline'  : true, // Inlines the sourcemap with full source text in base64 format
				'basePath': '.' // Base path from which sourcemap and all sources are relative (default: `.`)
			})*/
			.set('linenos', true)

			/*
			if ($functions.dirExistsSync(path_global_styles))
			{
				if ($functions.fileExistsSync(filename_global_styl_index)) {
					style.import(filename_global_styl_index)
				}
				else {
					style.import(this.componentsDir + '/.global/stylesheet/*')
				}
			}
			*/

			style.render((err, css) => {

				if (err)
				{
					console.error(err)
					return false
				}

				// write output files
				$fs.writeFileSync(filename_css, css)

				var css_min = this.compress(css)

				$fs.writeFileSync(filename_css_min, css_min)

				if (this.outputFileGzipped)
				{
					this.gzip(css_min, (err, data) => {
						$fs.writeFileSync(filename_css_gzip, data)
					})
				}

				// delete cache
				delete linksCache[componentName]

				console.info('CSS Files Generated: ' + filename_css + ' (also ' + this.outputFileName + '.min.css)')
			})

			file_out_mtime = $functions.fileMtimeSync(filename_css_min)
		}

		this.watchForFileChanges(componentName)

		return file_out_mtime
	}

	/**
	 * @param {string} componentName
	 */
	watchForFileChanges(componentName)
	{
		componentName = componentName || this.componentName
		if (process.develop !== true) return

		var _this = this
		var path  = this.componentsDir + '/' + componentName + '/' + this.inputDirName

		var options = {
			persistent : true,
			recursive  : true
		}

		$fs.watch(path, options, (event, filename) => {
			// many events can come in no time, so we use timeout to make sure that we don't render too often
			if (watchTimeout)
			{
				clearTimeout(watchTimeout)
				watchTimeout = null
			}

			watchTimeout = setTimeout(() => {
				//console.info('CSS changes detected for component "' + componentName + '"')
				_this.render(componentName)
			}, 100)
		})
	}
}

export default Class