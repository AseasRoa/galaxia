/**
 * This module works with page layout files
 * @type {exports|module.exports}
 */

import $fs from "fs"
import $vm from "vm"
import $path from "path"
import $synchronator from "synchronator"

const CONFIG = {
	folderName     : "pages",
	filesExtension : ".html"
}

function loadAllHeadTags(dir)
{
	if (!(dir in loadAllHeadTags.cache))
	{
		loadAllHeadTags.cache[dir] = {}

		let file_path     = $path.resolve(dir + $path.sep + CONFIG["folderName"] + "/.htmlHeadTags.json")
		let file_contents = null

		try
		{
			file_contents = $fs.readFileSync(file_path).toString()
		} catch (error)
		{
		}

		try
		{
			loadAllHeadTags.cache[dir] = (typeof file_contents === "string") ? JSON.parse(file_contents) : {}
		} catch (error)
		{
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
function loadAllPages(dir)
{
	if (!(dir in loadAllPages.cache))
	{
		loadAllPages.cache[dir] = loadAllPages.cache[dir] || {}

		let path = $path.resolve(dir + $path.sep + CONFIG["folderName"])

		try
		{
			// load the pages
			let files = $fs.readdirSync(path)

			for (let i in files)
			{
				let filepath   = path + $path.sep + files[i]
				let parsedpath = $path.parse(filepath)
				let stats      = $fs.lstatSync(filepath)

				if (stats.isFile() && parsedpath.ext === CONFIG["filesExtension"])
				{
					let contents = $fs.readFileSync(filepath).toString()
					let source   = ";(function*(chunk) {return `" + contents + "`})"

					source = $synchronator.transform(source, filepath).code

					let fn = $vm.runInThisContext(source, {filename : filepath, lineOffset : 0, displayErrors : true})

					let filename = parsedpath.name

					let exploded = filename.split(".")
					let tmp      = loadAllPages.cache[dir]

					for (let i in exploded)
					{
						tmp[exploded[i]] = tmp[exploded[i]] || {}
						tmp              = tmp[exploded[i]]
					}

					tmp["_fn_"] = fn
				}
			}
		} catch (e)
		{
			console.error(e)

			return {}
		}
	}

	return loadAllPages.cache[dir]
}

loadAllPages.cache = {}

function loadPage(dir, urlPathExploded)
{
	let templateFn      = undefined
	let pages           = {}
	let head_tags       = {}
	let head_tags_found = false

	if (urlPathExploded.length > 0)
	{
		pages     = loadAllPages(dir)
		head_tags = loadAllHeadTags(dir)

		for (let i in urlPathExploded)
		{
			let part = urlPathExploded[i]

			if (part in pages)
			{
				pages = pages[part]
			}

			if (part in head_tags)
			{
				head_tags       = head_tags[part]
				head_tags_found = true
			}
		}

		if ("index" in head_tags) head_tags = head_tags["index"]

		templateFn = ("_fn_" in pages) ? pages["_fn_"] : undefined
	}

	if (templateFn === undefined)
	{
		templateFn = false
	}

	if (!head_tags_found)
	{
		head_tags = {}
	}

	return {
		templateFunction : templateFn,
		htmlHeadTags     : head_tags
	}
}

export default {
	loadPage,
	loadAllPages,
	loadAllHeadTags
}