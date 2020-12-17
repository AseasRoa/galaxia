/*
	This modules replaces the native fs module. It"s methods are either SYNC or ASYNC depending on the callback function.
	If no callback function exists, then the method works as SYNC.
*/

"use strict"

const $fs     = require("fs")
const $path   = require("path")
const _0777   = parseInt("0777", 8)
const Promise = require("synchronator")

function makeDirAsync(dir, callback, done)
{
	let mode = _0777 & (~process.umask())
	if (!done) done = null

	callback = callback || function () {
	}
	dir      = $path.resolve(dir)

	$fs.mkdir(dir, mode, function (er) {
		if (!er)
		{
			done = done || dir
			return callback(null, done)
		}

		switch (er.code)
		{
			case "ENOENT":
				makeDirAsync($path.dirname(dir), function (er, done) {
					if (er)
					{
						callback(er, done)
					}
					else
					{
						makeDirAsync(dir, callback, done)
					}
				})
				break

			// In the case of any other error, just see if there's a dir
			// there already.  If so, then hooray!  If not, then something
			// is borked.
			default:
				$fs.stat(dir, function (er2, stat) {
					// if the stat fails, then that's super weird.
					// let the original error be the failure reason.
					if (er2 || !stat.isDirectory())
					{
						callback(er, done)
					}
					else
					{
						callback(null, done)
					}
				})
				break
		}
	})
}

function copyFileAsync(source, target, options, callback)
{
	source = $path.resolve(source)
	target = $path.resolve(target)

	let cbCalled = false

	makeDirAsync($path.dirname(target), (err) => {
		if (err)
		{
			done(err)
		}
		else
		{
			// read stream
			let rd = $fs.createReadStream(source)
			rd.on("error", (err) => {
				done(err)
			})

			// write stream
			let wr = $fs.createWriteStream(target)
			wr.on("error", (err) => {
				done(err)
			})
			wr.on("close", (ex) => {

				if (options["preserveTimestamps"])
				{
					try
					{
						$fs.stat(source, (err, stats) => {
							$fs.utimes(target, stats.atime, stats.mtime, (err) => {
								done(null)
							})
						})
					} catch (e)
					{
						console.error(e)
					}
				}
				else
				{
					done(null)
				}

			})

			// piping
			rd.pipe(wr)
		}
	})

	let done = function (err) {
		if (!cbCalled)
		{
			if (err)
			{
				callback(err)
			}
			else
			{
				callback(null, true)
			}
			cbCalled = true
		}
	}
}

function getStatSpecified(file, statname, callback)
{
	$fs.stat(file, (err, stats) => {
		if (err)
		{
			callback(err)
		}
		else
		{
			callback(null, stats[statname])
		}
	})
}

// http://stackoverflow.com/questions/12627586/is-node-js-rmdir-recursive-will-it-work-on-non-empty-directories
function rmfile(dir, file, callback)
{
	let p = $path.join(dir, file)
	$fs.lstat(p, function (err, stat) {
		if (err)
		{
			callback.call(null, err)
		}
		else if (stat.isDirectory())
		{
			rmdir(p, callback)
		}
		else
		{
			$fs.unlink(p, callback)
		}
	})
}

function rmdir(dir, callback)
{
	$fs.readdir(dir, function (err, files) {
		if (err)
		{
			callback.call(null, err)
		}
		else if (files.length)
		{
			rmfile(dir, files[0], function (err) {
				if (err)
				{
					callback.call(null, err)
				}
				else
				{
					rmdir(dir, callback)
				}
			})
		}
		else
		{
			$fs.rmdir(dir, callback)
		}
	})
}

function Fs()
{
	this.lastError = null
}

Fs.prototype = {
	getStat              : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.stat(file, (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	getTimeAccessed      : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			getStatSpecified(file, "atime", (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	getTimeModified      : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			getStatSpecified(file, "mtime", (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	getTimeChangedStatus : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			getStatSpecified(file, "ctime", (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	getTimeCreated       : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			getStatSpecified(file, "birthtime", (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	getFileSize          : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			getStatSpecified(file, "size", (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	scanDir              : function (dirname) {
		this.lastError = null

		dirname = $path.resolve(dirname)

		return new Promise((resolve, reject) => {
			$fs.readdir(dirname, (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve({})
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	readBinary           : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.readFile(file, {encoding : null}, (err, contents) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(contents)
				}
			})
		})
	},
	readFile             : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.readFile(file, options, (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
				}
				else
				{
					resolve(data)
				}
			})
		})
	},
	readJSON             : function (file) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.readFile(file, options, (err, data) => {
				if (err)
				{
					this.lastError = err
					resolve(undefined)
					return
				}

				try
				{
					let json = JSON.parse(data)
					resolve(json)
				} catch (err)
				{
					this.lastError = err
					if (err) resolve(undefined)
				}
			})
		})
	},
	writeFile            : function (file, data, options) {
		this.lastError = null

		//if (options === undefined) options = {encoding: null}

		return new Promise((resolve, reject) => {
			data = data || ""

			let dirname = $path.dirname($path.resolve(file))

			makeDirAsync(dirname, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
					return
				}

				$fs.writeFile(file, data, options, (err) => {
					if (err)
					{
						this.lastError = err
						resolve(false)
						return
					}

					resolve(true)
				})
			})
		})
	},
	writeJSON            : function (file, data) {
		data = JSON.stringify(data)

		return this.writeFile(file, data)
	},
	makeDir              : function (dir) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			makeDirAsync(dir, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(true)
				}
			})
		})
	},
	deleteFile           : function (file) {
		this.lastError = null

		file = $path.resolve(file)

		return new Promise((resolve, reject) => {
			$fs.stat(file, (err, stat) => {
				if (err)
				{
					// there is no file anyway...
					resolve(true)
				}
				else
				{
					if (stat.isFile())
					{
						$fs.unlink(file, (err) => {
							if (err)
							{
								this.lastError = err
								resolve(false)
							}
							else
							{
								resolve(true)
							}
						})
					}
					else
					{
						this.lastError = new Error("Not a file")
						resolve(false)
					}
				}
			})
		})
	},
	deleteDir            : function (dir) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			rmdir(dir, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				resolve(true)
			})
		})
	},
	isFile               : function (path) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.stat(path, (err, stat) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(stat.isFile())
				}
			})
		})
	},
	isDir                : function (path) {
		return new Promise((resolve, reject) => {
			$fs.stat(path, (err, stat) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(stat.isDirectory())
				}
			})
		})
	},
	exists               : function (path, callback) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.stat(path, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(true)
				}
			})
		})
	},
	copyFile             : function (source, target, options) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			copyFileAsync(source, target, {preserveTimestamps : true}, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(true)
				}
			})
		})
	},
	rename               : function (oldPath, newPath, callback) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.rename(oldPath, newPath, (err) => {
				if (err)
				{
					this.lastError = err
					resolve(false)
				}
				else
				{
					resolve(true)
				}
			})
		})
	},
	moveFile             : function (source, target) {
		this.lastError = null

		return new Promise((resolve, reject) => {
			$fs.rename(source, target, (err0) => {
				if (err0 && err0.code === "EXDEV")
				{
					copyFileAsync(source, target, {preserveTimestamps : true}, (err) => {
						if (err)
						{
							this.lastError = err
							resolve(false)
							return
						}

						$fs.stat(source, (err, stat) => {
							if (err)
							{
								// there is no file anyway...
								resolve(true)
							}
							else
							{
								if (stat.isFile())
								{
									$fs.unlink(source, (err) => {
										if (err)
										{
											this.lastError = err
											resolve(err)
										}
										else
										{
											resolve(true)
										}
									})
								}
								else
								{
									this.lastError = new Error("Not a file")
									resolve(true)
								}
							}
						})
					})
				}
				else if (err0)
				{
					this.lastError = err
					resolve(false)
				}
			})
		})
	}
}

//- alias methods
Fs.prototype.isDirectory     = Fs.prototype.isDir
Fs.prototype.makeDirectory   = Fs.prototype.makeDir
Fs.prototype.deleteDirectory = Fs.prototype.deleteDir
Fs.prototype.scanDirectory   = Fs.prototype.scanDir
Fs.prototype.size            = Fs.prototype.getFileSize
Fs.prototype.stat            = Fs.prototype.getStat
Fs.prototype.delete          = Fs.prototype.deleteDir
Fs.prototype.read            = Fs.prototype.readFile
Fs.prototype.write           = Fs.prototype.writeFile
Fs.prototype.watch           = $fs.watch
Fs.prototype.watchFile       = $fs.watchFile

let options = {encoding : "utf8"}

function stripComments(content)
{
	if (!content) return content
	return content.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, "$1")
}

function writeJson(file, obj, options, callback)
{
	if (callback == null)
	{
		callback = options
		options  = {}
	}

	let spaces = typeof options === "object" && options !== null
		? "spaces" in options
			? options.spaces : this.spaces
		: this.spaces

	let str = ""
	try
	{
		str = JSON.stringify(obj, options ? options.replacer : null, spaces) + "\n"
	} catch (err)
	{
		if (callback) return callback(err, null)
	}

	$fs.writeFile(file, str, options, callback)
}

function writeJsonSync(file, obj, options)
{
	options = options || {}

	let spaces = typeof options === "object" && options !== null
		? "spaces" in options
			? options.spaces : this.spaces
		: this.spaces

	let str = JSON.stringify(obj, options.replacer, spaces) + "\n"
	// not sure if $fs.writeFileSync returns anything, but just in case
	return $fs.writeFileSync(file, str, options)
}

module.exports = new Fs()