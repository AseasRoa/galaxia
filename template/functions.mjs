import $fs from "fs"
import $path from "path"

/**
 * Recursively create a directory (synchronously)
 * @param dir {string} The directory path that must be created
 * @returns {boolean} true if the directory exists or it was created, false if error happened
 */
var dirCreateSync = function (dir) {
	dir = $path.resolve(dir)

	var sep     = $path.sep
	var dirs    = dir.split(sep)
	var prevDir = dirs.splice(0, 1) + sep

	while (dirs.length > 0)
	{
		var curDir = prevDir + dirs.splice(0, 1)

		if (!$fs.existsSync(curDir))
		{
			try
			{
				$fs.mkdirSync(curDir)
			} catch (e)
			{
				return false
			}
		}

		prevDir = curDir + sep
	}

	return true
}

/**
 * Recursively get time of the newly modified file in a directory
 * @param dir
 * @returns {*}
 */
var dirMtimeSync = function (dir) {
	var result = 0
	var stat   = 0

	// check if directory exists
	try
	{
		stat = $fs.statSync(dir)
	} catch (e)
	{
		return false
	}

	// get files from the current directory
	var list = $fs.readdirSync(dir)

	// recursively check all files
	list.forEach((file) => {
		file      = dir + "/" + file
		var stat  = $fs.statSync(file)
		var mtime = (stat && stat.isDirectory()) ? dirMtimeSync(file) : stat.mtime.getTime()

		if (mtime > result)
		{
			result = mtime
		}
	})

	return result
}

var dirExistsSync = function (dir) {
	try
	{
		var stat = $fs.lstatSync(dir)
		if (stat && stat.isDirectory())
		{
			return true
		}
	} catch (e)
	{
	}

	return false
}

// get modify time of a file
var fileMtimeSync = function (file) {
	var result = false

	try
	{
		var stat = $fs.lstatSync(file)
		if (stat && stat.isFile())
		{
			result = stat.mtime.getTime()
		}
	} catch (e)
	{
		return false
	}

	return result
}

// get size of a file
var fileSizeSync = function (file) {
	var result = false

	try
	{
		var stat = $fs.lstatSync(file)
		if (stat && stat.isFile())
		{
			result = stat.size
		}
	} catch (e)
	{
		return false
	}

	return result
}

var fileExistsSync = function (file) {
	try
	{
		var stat = $fs.lstatSync(file)
		if (stat && stat.isFile())
		{
			return true
		}
	} catch (e)
	{
	}

	return false
}

export default {
	dirCreateSync  : dirCreateSync,
	dirMtimeSync   : dirMtimeSync,
	fileMtimeSync  : fileMtimeSync,
	fileSizeSync   : fileSizeSync,
	fileExistsSync : fileExistsSync,
	dirExistsSync  : dirExistsSync
}