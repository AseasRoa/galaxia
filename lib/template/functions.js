import fs from 'fs'
import path from 'path'

/**
 * Recursively create a directory (synchronously)
 * @param {string} dir The directory path that must be created
 * @returns {boolean} true if the directory exists or it was created, false if error happened
 */
const dirCreateSync = function(dir) {
	dir = path.resolve(dir)

	const sep       = path.sep
	const dirs      = dir.split(sep)
	let previousDir = dirs.splice(0, 1) + sep

	while (dirs.length > 0) {
		const currentDir = previousDir + dirs.splice(0, 1)

		if (!fs.existsSync(currentDir)) {
			try {
				fs.mkdirSync(currentDir)
			} catch (e) {
				return false
			}
		}

		previousDir = currentDir + sep
	}

	return true
}

/**
 * Recursively get time of the newly modified file in a directory
 * @param dir
 * @returns {number|boolean}
 */
const dirMtimeSync = function(dir) {
	var result = 0

	// check if directory exists
	try {
		let stat = fs.statSync(dir)
	} catch (e) {
		return false
	}

	// get files from the current directory
	var list = fs.readdirSync(dir)

	// recursively check all files
	list.forEach((file) => {
		file      = dir + '/' + file
		var stat  = fs.statSync(file)
		var mtime = (stat && stat.isDirectory()) ? dirMtimeSync(file) : stat.mtime.getTime()

		if (mtime > result) {
			result = mtime
		}
	})

	return result
}

/**
 * @param {string} dir
 * @returns {boolean}
 */
const dirExistsSync = function(dir) {
	try {
		var stat = fs.lstatSync(dir)
		if (stat && stat.isDirectory()) {
			return true
		}
	} catch (e) {
	}

	return false
}

/**
 * Get modify time of a file
 * @param {string} file
 * @returns {boolean}
 */
const fileMtimeSync = function(file) {
	var result = false

	try {
		var stat = fs.lstatSync(file)
		if (stat && stat.isFile()) {
			result = stat.mtime.getTime()
		}
	} catch (e) {
		return false
	}

	return result
}

/**
 * Get size of a file
 * @param {string} file
 * @returns {boolean}
 */
const fileSizeSync = function(file) {
	var result = false

	try {
		var stat = fs.lstatSync(file)
		if (stat && stat.isFile()) {
			result = stat.size
		}
	} catch (e) {
		return false
	}

	return result
}

/**
 * @param {string} file
 * @returns {boolean}
 */
const fileExistsSync = function(file) {
	try {
		var stat = fs.lstatSync(file)
		if (stat && stat.isFile()) {
			return true
		}
	} catch (e) {
	}

	return false
}

export default {
	dirCreateSync,
	dirMtimeSync,
	fileMtimeSync,
	fileSizeSync,
	fileExistsSync,
	dirExistsSync
}