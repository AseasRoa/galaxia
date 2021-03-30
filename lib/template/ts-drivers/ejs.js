import fs from 'fs'
import ejs from 'ejs'

class Tpl
{
	compile()
	{
		return ejs.compile.apply(this, arguments)
	}

	/**
	* @param {string} file
	* @param {Object} [options]
	*/
	compileFile(file, options = {})
	{
		options.compileDebug = false
		options.strict = true
		options.localsName = 'locals'
		options.rmWhitespace = false

		var code = ''

		try {
			code = fs.readFileSync(file, 'utf8')
		} catch (err) {
			console.error(`Failed to compile template file "${file}"`)
			return false
		}

		return ejs.compile(code, options)
	}
}

export default new Tpl()