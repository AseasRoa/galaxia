#!/usr/bin/env node

const $reverseProxy = require("../server/reverseProxy")
const $path         = require("path")
const $fs           = require("fs")

let validCommands        = ["start", "stop", "--config"]
let consoleLineArguments = getCommandLineArguments(validCommands)
let commandLineDirectory = getCommandLineDirectory()

if ("stop" in consoleLineArguments)
{
	console.info("Stopping...")

	process.exit()
}

else if ("start" in consoleLineArguments)
{
	let configFilePath = consoleLineArguments["--config"]

	let config = readConfigurationFile(configFilePath)

	if (config instanceof Error)
	{
		console.error(config)

		process.exit()
	}

	new $reverseProxy(config)
}
else
{
	process.exit()
}

function readConfigurationFile(configFilePath)
{
	let contents = {}

	if (configFilePath)
	{
		// If the path is relative, "resolve" uses the path of the command line file
		configFilePath = $path.resolve(configFilePath)

		try
		{
			contents = $fs.readFileSync(configFilePath)
		}
		catch (e)
		{
			return new Error(`Could not locate configuration file at "${configFilePath}"`)
		}

		try
		{
			contents = JSON.parse(contents)
		}
		catch (e)
		{
			return new Error(`Could not JSON parse configuration file "${configFilePath}"`)
		}
	}

	return contents
}

function getCommandLineArguments(validCommands = [])
{
	let consoleArguments = process.argv.slice(2)
	let expectKey        = true
	let expectValue      = false
	let lastKey          = ""
	let retval           = {}

	for (let i in consoleArguments)
	{
		let piece = consoleArguments[i].trim()

		if (
			(expectKey)
			|| (piece.length > 0 && piece[0] === "-")
		)
		{
			if (validCommands.indexOf(piece) === -1)
			{
				console.error(`'${piece}' is not a valid command`)

				return process.exit()
			}

			retval[piece] = ""
			lastKey       = piece
			expectKey     = false
			expectValue   = true
		}
		else if (expectValue && lastKey)
		{
			retval[lastKey] = piece
			expectKey       = true
			expectValue     = false
		}
	}

	return retval
}

function getCommandLineDirectory()
{
	return process.cwd()
}