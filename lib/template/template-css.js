// (Generate CSS Files)
// This module is used to automatically render output CSS files for each of the the components of the app
// The input files are to be used in CSS preprocessor(s) and turned into output .css and .min.css output files
// Two output CSS files are rendered for each component - one main file and its minified version

// (Return HTML "link" tags)
// For each component this module generates output link tag, which includes a timestamp

// (Watch For Changes)
// Also, input dirs are watched for changes and if something in them is changed, the output .css files are re-rendered

import $csso from 'csso'
import $fs from 'fs'
import $path from 'path'
import $stylus from 'stylus'
import '../typedefs.js'
import $functions from './functions.js'

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
	 * @param {AppConfig} appConfig
	 * @param {AppPaths} appPaths
	 * @constructor
	 */
	constructor(componentsDir, componentName, appConfig, appPaths) {
		this.appConfig     = appConfig
		this.componentsDir = componentsDir
		this.componentName = componentName
		// if file with such name exists in the inputDirName, work with it,
		// otherwise load all files (in who knows what order)
		this.indexFileName        = 'index'
		// (relative) where preprocessor files are located
		this.inputDirName         = 'stylesheet'
		// (relative) where to put the output file
		this.outputDirName        = 'stylesheet'
		// the name of the generated file (will be appended with .css and .min.css)
		this.outputFileName       = 'stylesheet'
		// use optimizer to optimize (restructure) the output code
		this.outputFileOptimize   = true
		this.outputFilesDirectory = appPaths.outputDest

		$functions.dirCreateSync(this.outputFilesDirectory)
	}

	/**
	 * Minify CSS code
	 *
	 * @param {string} code
	 * @returns {string}
	 */
	compress(code) {
		if (1) {
			code = $csso.minify(code, {restructure : this.outputFileOptimize}).css
		}
		else {
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
	getHtmlLink(componentName) {
		componentName = componentName || this.componentName

		let data = ''

		if (!(componentName in linksCache)) {
			const mtime = this.render(componentName)

			if (mtime !== false) {
				const outputFileName = (process.develop !== true) ? this.outputFileName + '.min' : this.outputFileName
				const filePath       = $path.join(this.outputFilesDirectory, componentName + '-' + this.outputDirName + '-' + outputFileName + '.css')

				try {
					const size = $functions.fileSizeSync(filePath)

					if (size <= 32 * 1024) {
						const contents = $fs.readFileSync(filePath, 'utf8')
						data           = `\r\n\t<style>${contents}</style>`
					}
					else {
						const href = `${componentName}/${this.outputDirName}/${outputFileName}.css?v=${Math.round(mtime / 1000)}`
						data       = `\r\n\t<link rel="stylesheet" type="text/css" href="${href}"/>`
					}
				} catch (error) {
					console.error(error)
				}
			}

			linksCache[componentName] = data
		}
		else {
			data = linksCache[componentName]
		}

		return data
	}

	/**
	 * render all raw files into output .css files
	 *
	 * @param {string} componentName
	 * @return {*}
	 */
	render(componentName) {
		componentName = componentName || this.componentName

		// paths for the component
		const pathInput  = this.componentsDir + '/' + componentName + '/' + this.inputDirName
		const pathOutput = this.outputFilesDirectory

		const inputFileIndexStyl = pathInput + '/' + this.indexFileName + '.styl'
		const fileCss            = $path.join(pathOutput, componentName + '-' + this.outputDirName + '-' + this.outputFileName + '.css')
		const fileCssMin         = $path.join(pathOutput, componentName + '-' + this.outputDirName + '-' + this.outputFileName + '.min.css')

		// paths for the .global component
		/*
		var path_global_styles         = this.componentsDir + '/.global/' + this.inputDirName
		var filename_global_styl_index = path_global_styles + '/' + this.indexFileName + '.styl'
		 */

		// get modify times
		const dirMtime = $functions.dirMtimeSync(pathInput)

		if (dirMtime === false) return false

		// get modify time of the global dir
		/*
		var dir_mtime_global = $functions.dirMtimeSync(path_global_styles)

		if (dir_mtime_global > dir_mtime) dir_mtime = dir_mtime_global
		*/

		let outputFileMtime = $functions.fileMtimeSync(fileCssMin)

		// generate output file: when the output file is old
		if (dirMtime > outputFileMtime) {
			const require0 = $functions.fileExistsSync(inputFileIndexStyl) ? 'index.styl' : '*'

			const style = $stylus('@require "' + require0 + '"').
			set('filename', inputFileIndexStyl).
			set('include css', true) // import .css files the same way as .styl
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
				if (err) {
					console.error(err)
					return false
				}

				// write output files
				$fs.writeFileSync(fileCss, css)

				const cssMinified = this.compress(css)

				$fs.writeFileSync(fileCssMin, cssMinified)

				// delete cache
				delete linksCache[componentName]

				console.info('CSS Files Generated: ' + fileCss + ' (also ' + this.outputFileName + '.min.css)')
			})

			outputFileMtime = $functions.fileMtimeSync(fileCssMin)
		}

		this.watchForFileChanges(componentName)

		return outputFileMtime
	}

	/**
	 * @param {string} componentName
	 */
	watchForFileChanges(componentName) {
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
			if (watchTimeout) {
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