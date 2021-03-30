import pug from 'pug'

class Tpl
{
	compile()
	{
		return pug.compile.apply(this, arguments)
	}

	/**
	 * @param {string} path
	 * @param {Object} [options] 
	 */
	compileFile(path, options = {})
	{
		options.compileDebug = false

		return pug.compileFile(path, options)
	}
}

export default new Tpl()