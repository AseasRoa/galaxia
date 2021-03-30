import $path from 'path'

var fs = require('fs')
var vm = require('vm')

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = $path.dirname(__filename)

function errorToHtmlCode(error, file, bgcolor)
{
	bgcolor  = bgcolor || 'yellow'
	file     = file || 'N/A'
	var html = '<span><div title="' + file + '" style="display:inline-block; background-color:' + bgcolor + '; padding:3px 5px; border-radius:5px; border:1px solid #ccc; color:red; font-family:monospace; font-size:14px; white-space:nowrap">' + error.name + ': ' + error.message + ' <span style="color:#aaa; font-style:italic; font-family:cursive">' + file + '</span>' + '</span></div>'
	return html
}

function replaceContentInOutermostBrackets(open_bracket, close_bracket, str, replace)
{
	var str_output    = ''
	var str_matched   = ''
	var inside        = false
	var recurse_level = 0

	for (var i = 0; i < str.length; i++)
	{
		var ch = str[i] // the current character

		if (inside === true)
		{
			if (ch === close_bracket)
			{
				if (recurse_level === 0)
				{
					str_output += replace(str_matched) || ''

					// reset and continue searching the next match
					str_matched   = ''
					inside        = false
					recurse_level = 0

					continue
				}

				recurse_level--
			}
			else if (ch === open_bracket)
			{
				recurse_level++
			}

			str_matched += ch

			continue
		}

		if (inside === false && ch === open_bracket)
		{
			inside        = true
			recurse_level = 0
		}
		else
		{
			str_output += ch
		}
	}

	return str_output
}

var Tpl = function () {
	this.static = {
		regex   : {
			evaluate    : /\{\{([\s\S]+?(\}?)+)\}\}\s?/g, // {{ js code }}
			//evaluate    : /(\((?>[^()]+|(?1))*\))/g,
			interpolate : /\{\{=([\s\S]+?)\}\}/g, // {{=variable}}
			conditional : /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g, // {{? condition }} {{?}}
			//iterate     : /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
			template    : /\{\{\$(\s*([\s\S]+?)\s*:\s*([\s\S]+?(\}?)+)\s*)\}\}|\{\{\$(\s*([\s\S]+?)\s*)\}\}/g, // {{$ filename:{key:'value'} }}
			locale1     : /\{\{\\'([\s\S]+?)\}\}/g, // {{'translate me'}}
			locale2     : /\{\{"([\s\S]+?)\}\}/g, // {{'translate me'}}
			strip       : false // strip whitespace
		},
		varname : 'data'
	}
}

Tpl.prototype = {

	compile : function (str, options) {
		var options_default = {
			filename : '' // Used in exceptions, and required for relative includes and extends
		}
		for (var i in options_default)
		{
			if (options[i] === undefined)
			{
				options[i] = options_default[i]
			}
		}

		var varname = this.static.varname
		var sid     = 0
		var indv

		str = str.replace(/\r/g, '')

		//-- strip whitespace
		if (this.static.regex.strip)
		{
			str = str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g, ' ').replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g, '')
		}

		str = str
		//-- escape \ and '
		.replace(/'|\\/g, '\\$&')
		//-- variables
		.replace(this.static.regex.interpolate, function (m, code) {

			// ability to use both styles - {{=data.variable}} and {{=variable}}
			var prefix = 'this.'

			if (code.substr(0, varname.length + 1) == varname + '.')
			{
				//prefix = varname + '.' + unescape(code) + '||';
				prefix = ''
			}

			return '\';out+=('
				//+ prefix
				+ 'this.' + unescape(code) + '||' + unescape(code) + "||'');out+='"
		})
		.replace(this.static.regex.locale1, function (m, code) {
			// the regex needs to work with \' instead of only ' because ' is already escaped at this point
			code = "\'" + code
			return "'+(this._(" + unescape(code) + "))+'"
		})
		.replace(this.static.regex.locale2, function (m, code) {
			code = '"' + code
			return "'+(this._(" + unescape(code) + "))+'"
		})
		.replace(this.static.regex.conditional, function (m, elsecase, code) {
			return elsecase ?
				(code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
				(code ? "';if(" + unescape(code) + "){out+='" : "';}out+='")
		})
		.replace(this.static.regex.template, function (m, template, filename, dataset) {

			if (!template) return "';} } out+='"

			dataset = dataset || ''

			return "';out+=this.$('" + filename + "').data(" + dataset + ").html();out+='"
		})
		/*.replace(this.static.regex.iterate || skip, function(m, iterate, vname, iname) {
		 if (!iterate) return "';} } out+='";
		 sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
		 return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
		 +vname+"=arr"+sid+"["+indv+"+=1];out+='";
		 })*/
		//-- javascript code
		.replace(this.static.regex.evaluate, function (m, code) {
			//-- unescape \ and '
			code = code.replace(/([^\\])\\'/g, "$1'") // \' to ' (only if \' is alone, not like \\')
			code = code.replace(/\\\\\\'/g, "\\'") // \\\' to \'
			code = code.replace(/\\\\/g, "\\") // \\ to \

			return "';" + (code) + "out+='"
		})


		if (0)
		{
			str = replaceContentInOutermostBrackets('{', '}', str, function (code) {
				code = code.trim()
				if (code.substr(-1, 1) !== ';')
				{
					code += ';'
				}
				return "';" + unescape(code) + "out+='"
			})
		}

		//var str0 = str.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r");

		str = "var out='" + str + "';return out;"
		str = "'use strict';" + str
		//str = "out='" + str + "';";

		// escape empty symbols in the html parts only
		str = str.replace(/(out[\+]?='[\s\S]*?[^\\]?';)/g, function (m, code) {
			return code.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
		})

		str = str
		// new rows
		//.replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
		//-- I have no idea what this is... yet
		.replace(/(\s|;|\}|^|\{)out\+='';/g, '$1')
		//-- remove all the +'' from the string
		.replace(/\+''/g, "")


		var chunkBody = null
		var args      = varname + ', require, __filename, __dirname'

		try
		{
			var str   = '(function (' + args + ') {var _=this._; var $=this.$;' + str + '});'
			chunkBody = vm.runInThisContext(str, {filename : options.filename, displayErrors : true})
		} catch (e)
		{
			// error when parsing initially => create the function anyway, but it will return an error message
			var str   = '(function (' + args + ') {return \'' + errorToHtmlCode(e, options.filename, 'brown')
			.replace(/'/g, "\\'") + '\';});'
			chunkBody = vm.runInThisContext(str, {filename : options.filename, displayErrors : true})
		}


		var chunkFunction = function (data) {

			data["require"]    = require
			data["__filename"] = __filename
			data["__dirname"]  = __dirname

			var out = ''

			try
			{
				out = chunkBody.call(data)
			} catch (e)
			{
				return out + errorToHtmlCode(e, options.filename)
			}

			return out
		}

		return chunkFunction
	},

	compileFile : function (path, options) {

		options          = options || {}
		options.filename = path

		var contents = ''

		try
		{
			contents = fs.readFileSync(path, "ascii")
		} catch (e)
		{
			console.error(e)
		}

		return this.compile(contents, options)
	}
}

export default function () {
	return new Tpl()
}
()