/*
 This module extends the native 'fs' and allows reads and writes in JSON format
 Based on this module: https://github.com/jprichardson/node-jsonfile
 Extended, so it's possible to strip comments when reading .json files
 */

import $fs from 'fs'

function stripComments(content)
{
	if (!content) return content
	return content.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '$1')
}

function readFile(file, options, callback)
{
	if (callback == null)
	{
		callback = options
		options  = {}
	}

	$fs.readFile(file, options, (err, content) => {
		if (err) return callback(err)

		content = (options['stripComments']) ? stripComments(content.toString()) : content
		content = content || '{}'

		var obj

		try
		{
			obj = JSON.parse(content, options ? options.reviver : null)
		} catch (err2)
		{
			err2.message = file + ': ' + err2.message
			return callback(err2)
		}

		callback(null, obj)
	})
}

function readFileSync(file, options)
{
	options = options || {}
	if (typeof options === 'string')
	{
		options = {encoding : options}
	}

	var shouldThrow = 'throws' in options ? options.throws : true

	var parsed = null

	try
	{
		var content = $fs.readFileSync(file, options)

		content = (options['stripComments']) ? stripComments(content.toString()) : content
		content = content || '{}'

		try
		{
			parsed = JSON.parse(content, options.reviver || false)
		} catch (err)
		{
			if (shouldThrow)
			{
				console.error(file + ': ' + err.message)
				return false
			}
			else
			{
				return false
			}
		}

	} catch (err)
	{
		if (shouldThrow)
		{
			//console.error(file + ': ' + err.message)
			return false
		}
		else
		{
			return false
		}
	}

	return parsed
}

function writeFile(file, obj, options, callback)
{
	if (callback == null)
	{
		callback = options
		options  = {}
	}

	var spaces = typeof options === 'object' && options !== null
		? 'spaces' in options
			? options.spaces : this.spaces
		: this.spaces

	var str = ''
	try
	{
		str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
	} catch (err)
	{
		if (callback) return callback(err, null)
	}

	$fs.writeFile(file, str, options, callback)
}

function writeFileSync(file, obj, options)
{
	options = options || {}

	var spaces = typeof options === 'object' && options !== null
		? 'spaces' in options
			? options.spaces : this.spaces
		: this.spaces

	var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
	// not sure if $fs.writeFileSync returns anything, but just in case
	return $fs.writeFileSync(file, str, options)
}

var jsonfile = {
	spaces        : null,
	readFile      : readFile,
	readFileSync  : readFileSync,
	writeFile     : writeFile,
	writeFileSync : writeFileSync
}

export default jsonfile