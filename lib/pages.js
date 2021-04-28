/**
 * This module works with page layout files
 * @type {exports|module.exports}
 */

import $fs from 'fs'
import $path from 'path'
import $synchronator from 'synchronator'
import $vm from 'vm'

const CONFIG = {
	folderName     : 'pages',
	filesExtension : '.html'
}

function loadAllHeadTags(dir) {
	if (!(dir in loadAllHeadTags.cache)) {
		loadAllHeadTags.cache[dir] = {}

		let filePath     = $path.resolve(dir + $path.sep + CONFIG.folderName + '/.htmlHeadTags.json')
		let fileContents = null

		try {
			fileContents = $fs.readFileSync(filePath).toString()
		} catch (error) {
		}

		try {
			loadAllHeadTags.cache[dir] = (typeof fileContents === 'string') ? JSON.parse(fileContents) : {}
		} catch (error) {
			console.error(error)
		}
	}

	return loadAllHeadTags.cache[dir]
}

loadAllHeadTags.cache = {}

/**
 * Load all files that contain pages layouts and cache everything.
 * The output is an object that resembles file structure with multiple levels.
 * At the end of each level there is a Synchronator function,
 * which is the template from the file, compiled into a JS function that returns the html code
 * @type {{}}
 */
function loadAllPages(dir) {
	if (!(dir in loadAllPages.cache)) {
		loadAllPages.cache[dir] = loadAllPages.cache[dir] || {}

		let path = $path.resolve(dir + $path.sep + CONFIG.folderName)

		try {
			// load the pages
			let files = $fs.readdirSync(path)

			for (let i in files) {
				let filePath   = path + $path.sep + files[i]
				let parsedpath = $path.parse(filePath)
				let stats      = $fs.lstatSync(filePath)

				if (stats.isFile() && parsedpath.ext === CONFIG.filesExtension) {
					let contents = $fs.readFileSync(filePath).toString()
					let source   = ';(function*(chunk) {return `' + contents + '`})'

					source = $synchronator.transform(source, filePath).code

					let fn = $vm.runInThisContext(source, {
						filename      : filePath,
						lineOffset    : 0,
						displayErrors : true
					})

					let filename = parsedpath.name

					let exploded = filename.split('.')
					let tmp      = loadAllPages.cache[dir]

					for (let i in exploded) {
						tmp[exploded[i]] = tmp[exploded[i]] || {}
						tmp              = tmp[exploded[i]]
					}

					tmp['_fn_'] = fn
				}
			}
		} catch (e) {
			console.error(e)

			return {}
		}
	}

	return loadAllPages.cache[dir]
}

loadAllPages.cache = {}

/**
 * @param {string} dir
 * @param {string[]} urlPathExploded
 * @returns {{templateFunction : Function || boolean, htmlHeadTags : {}}}
 */
function loadPage(dir, urlPathExploded) {
	let templateFunction = undefined
	let pages            = {}
	let htmlHeadTags     = {}
	let areHeadTagsFound = false

	if (urlPathExploded.length > 0) {
		pages        = loadAllPages(dir)
		htmlHeadTags = loadAllHeadTags(dir)

		for (let i in urlPathExploded) {
			let part = urlPathExploded[i]

			if (part in pages) {
				pages = pages[part]
			}

			if (part in htmlHeadTags) {
				htmlHeadTags     = htmlHeadTags[part]
				areHeadTagsFound = true
			}
		}

		if ('index' in htmlHeadTags) htmlHeadTags = htmlHeadTags['index']

		templateFunction = ('_fn_' in pages) ? pages['_fn_'] : undefined
	}

	if (templateFunction === undefined) {
		templateFunction = false
	}

	if (!areHeadTagsFound) {
		htmlHeadTags = {}
	}

	return {templateFunction, htmlHeadTags}
}

export default {
	loadPage,
	loadAllPages,
	loadAllHeadTags
}