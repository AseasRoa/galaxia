import $fs from "fs"
import $vm from "vm"
import $path from "path"
import $config from "./config.js"
import $module from "module" // Look at the bottom of the paragraph here: https://nodejs.org/api/modules.html#modules_modules
import $synchronator from "synchronator"

let db           = {}
let setDatabases = function (databases) {
	db = databases
}

/**
 * This function replaces "require()" into the components
 */
let requireEx         = function () {
	let appname = arguments[0]
	let folder  = $path.resolve(arguments[1])
	let path    = arguments[2]

	return new Synchronator((resolve) => {

		if (path === "db")
		{
			resolve(db[appname])

			return
		}

		// absolute address?
		if (path.indexOf(":") !== -1)
		{
			resolve(require(path))

			return
		}

		let first_letter  = path.substr(0, 1)
		let second_letter = path.substr(1, 1)

		try
		{
			// is the path in the "node_modules" of the project?
			if (first_letter !== "." && first_letter !== "/")
			{
				try
				{
					let custom_node_modules = $path.resolve($config["apps-path"] + $path.sep + appname + $path.sep + "node_modules")

					path = require.resolve(custom_node_modules + $path.sep + path)

					// here we "require" with the native function, otherwise the module would run through the Synchronator,
					// which makes problems when that module requires other modules
					resolve(require(path))

					return
				} catch (e)
				{

				}
			}

			// search for the module the normal way
			path = require.resolve(folder + $path.sep + path)
		} catch (e)
		{
			// one directory above, because this file is located one directory inside
			if (first_letter === "." && second_letter !== ".")
			{
				path = "." + path
			}

			resolve(require(path))

			return
		}

		// If requireEx() is used to load a module who has (yield asynchronousFunction()) on its global scope,
		// then we need to wait for asynchronousFunction() to finish, which makes requireEx() asynchronous.
		// So it's not guaranteed that the module is in the cache, this could take some time.
		// If the module is in the cache, we can return it. But if it's not and is still in processing, we wait on interval

		// if the module is in the cache - return it
		if (requireEx._cache[path])
		{
			resolve(requireEx._cache[path])

			return
		}

		// if the module is not in the cache, but is processing, wait for it to be loaded and then return it
		if (requireEx._processing[path] === true)
		{
			let interval = setInterval(() => {
				if (requireEx._processing[path] === false)
				{
					clearInterval(interval)
					resolve(requireEx._cache[path])
				}
			}, 0)

			return
		}

		// if the module is required for the first time - start processing it
		let __processAppFile = function (filepath, callback) {
			requireEx._processing[path] = true

			let code = $fs.readFileSync(filepath).toString() + "\r\n"

			let source = ";(function*(module, exports, db, require, __filename, __dirname) {\"use strict\";\r\n" + code + "});"

			source = $synchronator.transform(source, filepath).code

			let fn = $vm.runInThisContext(source, {
				filename      : filepath,
				lineOffset    : -1,
				displayErrors : true,
				columnOffset  : 0
			})

			let dirname = $path.dirname(filepath)

			// using the original template, it's not mandatory
			let mod      = new $module(filepath)
			mod.filename = filepath

			// calling the function

			let s = fn(
				mod,
				mod.exports,
				db[appname],
				requireEx.bind(null, appname, dirname),
				filepath,
				dirname
			)

			s.then(() => {
				callback(filepath, mod.exports)
			})
		}

		__processAppFile(path, (path, exports) => {

			requireEx._cache[path] = exports

			requireEx._processing[path] = false

			resolve(exports)
		})
	})
}
requireEx._cache      = {}
requireEx._processing = {}

// TODO: make this function independent from App and HttpModule
let watchForFileChanges     = function (path) {
	if (process.develop !== true) return

	if (watchForFileChanges.list[path]) return true

	let options = {
		persistent : true,
		recursive  : true
	}

	$fs.watch(path, options, (event, filename) => {

		if (filename.substr(-3) !== ".js")
		{
			return
		}

		// many events can come in no time, so we use timeout to make sure that we don't render too often
		if (watchForFileChanges.timeout)
		{
			clearTimeout(watchForFileChanges.timeout)
			watchForFileChanges.timeout = null
		}

		watchForFileChanges.timeout = setTimeout(() => {

			if (filename === "script" || filename === "public" || filename === "stylesheet")
			{
				return
			} // skip for some subfolders

			requireIOModule.cache = {}
			requireEx._cache      = {}

			console.info("Reloading modules because of file change in \"" + path + "\"")
		}, 0)

	})

	watchForFileChanges.list[path] = true
}
watchForFileChanges.list    = {}
watchForFileChanges.timeout = 0

/**
 * Create a list of file contents starting with one main file and adding other "child" files who have certain filenames
 * @param dirName
 * @param fileName
 * @param ext
 * @returns {*}
 */
function loadFiles(dirName, fileName, ext)
{
	ext = ext || "js"

	let collection = {}

	try
	{
		if ($fs.lstatSync(dirName).isDirectory())
		{
			let dirs = $fs.readdirSync(dirName)

			for (let d in dirs)
			{
				collection[dirs[d]] = {}
				let dirPath         = dirName + "/" + dirs[d]
				let filePath        = dirPath + "/" + fileName + "." + ext

				// no directory => continue
				if (!$fs.lstatSync(dirPath).isDirectory()) continue

				// read the main file
				try
				{
					if ($fs.lstatSync(filePath).isFile())
					{
						let contents = $fs.readFileSync(filePath, "utf8")
						if (contents) collection[dirs[d]][fileName + "." + ext] = contents
					}
				} catch (e)
				{
					// pretend that there is a main file
					//collection[dirs[d]][filename + "." + ext] = ""
				}

				// search for satellite filename.xxx.ext files
				let files = $fs.readdirSync(dirPath)

				for (let f in files)
				{
					let filepathX = dirPath + "/" + files[f]

					// no file => continue
					if (!$fs.lstatSync(filepathX).isFile()) continue

					// no specific name rules => continue
					if (
						files[f] === (fileName + "." + ext) // the name must be different than filename.ext
						|| files[f].substr(0, fileName.length + 1) !== fileName + "." // the name must start with filename.
						|| files[f].substr(-3) !== "." + ext // the name must end with .ext
					)
					{
						continue
					}

					let contents = $fs.readFileSync(filepathX, "ascii")
					if (contents) collection[dirs[d]][files[f]] = contents
				}

				if (Object.keys(collection[dirs[d]]).length === 0) delete collection[dirs[d]]
			}
		}
	} catch (e)
	{
		return false
	}

	return collection
}

function loadItems(appName, callback)
{
	let items = {}

	let basedir = $config["apps-path"] + "/" + appName
	let dirname = basedir + $config["apps-components-path"]

	// read code from all files
	let list = loadFiles(dirname, "io")

	let items_to_load = 0

	for (let i in list)
	{
		for (let j in list[i])
		{
			items_to_load++
		}
	}

	for (let i in list)
	{
		for (let j in list[i])
		{

			let lineOffset = -1

			watchForFileChanges(dirname + "/" + i)

			let main_file = dirname + "/" + i + "/" + j
			let code_top  = ""
			let code      = ""

			//== the actual code of the loaded file ====================================================================
			code = list[i][j]

			let mod      = new $module(main_file)
			mod.filename = main_file

			code += "\r\n"

			lineOffset -= code_top.split("\n").length - 1

			let source = ";(function*(module, exports, require, __filename, __dirname, __basedir, __projectname, __componentname) {\"use strict\";\r\n"
				//+ code_top
				+ code
				//+ code_bottom
				+ "});"

			source = $synchronator.transform(source, main_file).code

			let fn = $vm.runInThisContext(source, {filename : main_file, lineOffset : lineOffset, displayErrors : true})

			let s = fn(
				mod,
				mod.exports,
				requireEx.bind(null, appName, $path.dirname(main_file)),
				main_file,
				$path.dirname(main_file),
				basedir,
				appName,
				i
			)

			// the idea of this function is to store each "mod" value for each iteration
			// otherwise because "then()" is asynchronous, "mod" gets overwtitten
			function runModule(s, mod, source)
			{
				s.then(() => {
					if (!items[i]) items[i] = mod.exports

					items_to_load--

					if (items_to_load === 0)
					{
						callback(items)
					}
				})
			}

			runModule(s, mod, source)
		}
	}

	function addCookieFunctions(items)
	{
		for (let i in items)
		{
			// add "this.cookie()" support
			for (let j in items[i])
			{
				items[i][j].prototype.cookie = function (key, value, options) {
					if (key && value)
					{
						return this.response.setCookie(key, value, options)
					}
					else
					{
						return this.request.getCookie(key)
					}
				}
			}
		}
	}

	addCookieFunctions(items)
}

let requireIOModule   = function (appName, itemName, callback) {
	let items = requireIOModule.cache[appName]

	if (items === undefined)
	{
		loadItems(appName, (loaded_items) => {
			items = loaded_items

			requireIOModule.cache[appName] = items

			if (itemName === undefined)
			{
				callback(requireIOModule.cache[appName] || {})
			}
			else
			{
				callback(requireIOModule.cache[appName][itemName] || {})
			}
		})
	}
	else
	{
		if (itemName === undefined)
		{
			callback(requireIOModule.cache[appName] || {})
		}
		else
		{
			callback(requireIOModule.cache[appName][itemName] || {})
		}
	}
}
requireIOModule.cache = {}

export default {
	require      : requireIOModule,
	cache        : requireIOModule.cache,
	setDatabases : setDatabases
}