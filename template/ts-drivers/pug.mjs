"use strict"

import $pug from "pug" // require on demand

var Tpl = function () {
}

Tpl.prototype = {
	compile     : function () {
		return $pug.compile.apply(this, arguments)
	},
	compileFile : function (path, options) {
		options              = options || {}
		options.compileDebug = false

		return $pug.compileFile(path, options)
	}
}

export default new Tpl()