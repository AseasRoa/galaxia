// TODO: Remove this file
const addProperties = function(original, extension) {
	for (let key in extension) {
		if (original.hasOwnProperty(key)) {
			continue
		}
		Object.defineProperty(original, key, {
			value      : extension[key],
			writable   : true,
			enumerable : false
		})
	}
}

//== String ========================================================================================
let StringX = {}

/**
 * Find out if the string has the parameter at the beginning.
 */
StringX.startsWith = function(str) {
	return this.slice(0, str.length) === str
}

/**
 * Find out if the string ends with the given parameter.
 */
StringX.endsWith = function(str) {
	return this.slice(this.length - str.length) === str
}

/**
 * Find out if the string contains the argument at any position.
 */
StringX.contains = function(str) {
	return this.indexOf(str) !== -1
}

/**
 * Replace all occurrences of a string with the replacement.
 */
StringX.replaceAll = function(find, replace) {
	if (typeof find === 'string') {
		return this.split(find).join(replace)
	}

	return this.replace(new RegExp(find, 'g'), replace)
}

StringX.size = function() {
	return this.length
}

addProperties(String.prototype, StringX)

//== Object ========================================================================================
let ObjectX = {}

ObjectX.hasKey = function(key) {
	return (key in this)
}

ObjectX.hasValue =
	ObjectX.contains = function(needle) {
		if (this instanceof Array) {
			return (this.indexOf(needle) > -1)
		}

		for (let i in this) {
			if (this.hasOwnProperty(i)) {
				if (this[i] === needle) return true
			}
		}
		return false
	}

ObjectX.sortByKey = function() {
	if (!(this instanceof Object)) return this

	let tmp    = {}
	let keys   = Object.keys(this)
	let length = keys.length

	keys.sort()

	for (let i = 0; i < length; i++) {
		tmp[keys[i]] = this[keys[i]]
	}

	return tmp
}

ObjectX.cleanup = function() {
	if (this instanceof Array) {
		let tmp    = []
		let length = this.length

		for (let i = 0; i < length; i++) {
			if (this[i] !== undefined && this[i] !== null) {
				tmp.push(this[i])
			}
		}

		return tmp
	}

	if (this instanceof Object) {
		for (let i in this) {
			if (this.hasOwnProperty(i)) {
				if (this[i] === undefined || this[i] === null) {
					delete this[i]
				}
			}
		}

		return this
	}
}

ObjectX.size = function() {
	let size = 0,
	    key
	for (key in this) {
		if (this.hasOwnProperty(key)) {
			size++
		}
	}

	return size
}

ObjectX.concat = function() {

	let ret = {}

	for (let p in this) {
		if (this.hasOwnProperty(p)) {
			ret[p] = this[p]
		}
	}

	let len = arguments.length

	for (let i = 0; i < len; i++) {
		for (p in arguments[i]) {
			if (arguments[i].hasOwnProperty(p)) {
				ret[p] = arguments[i][p]
			}
		}
	}

	return ret
}

ObjectX.indexOf = function(value) {
	let keys = Object.keys(this)
	for (let i = 0; i < keys.length; i++) {
		if (this[i] === value) return i
	}
	return -1
}

// TODO this appears to not work
ObjectX.reverse = function() {
	let keys   = Object.keys(this)
	let newobj = {}

	for (let i = keys.length - 1; i >= 0; i--) {
		newobj[keys[i]] = this[keys[i]]
	}

	return newobj
}

addProperties(Object.prototype, ObjectX)

Object.values = function(obj) {
	let vals = []
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			vals.push(obj[key])
		}
	}
	return vals
}

//== Array =========================================================================================

//== Math ==========================================================================================
let MathX = {}

MathX.isNumeric = function(value) {
	return !isNaN(parseFloat(value)) && isFinite(value)
}

addProperties(Math, MathX)

//== Number ========================================================================================
/*
let NumberX = {}

NumberX.round = function(places)
{
	return +(Math.round(this + 'e+' + places)  + 'e-' + places)
}

addProperties(Number, NumberX)
*/

Number.prototype.round = function(places) {
	return +(Math.round(this + 'e+' + places) + 'e-' + places)
}

//== Date ==========================================================================================
// http://php.net/manual/en/function.date.php
Date.prototype.toFormattedString = function(f) {
	let time = this

	// check for Invalid Date
	if (isNaN(time)) {
		time = new Date(0)
	}

	let nm = time.getMonthName()
	let nd = time.getDayName()

	f = f.replace(/Y/g, time.getFullYear())
	f = f.replace(/y/g, String(time.getFullYear()).substr(2, 2))
	//f = f.replace(/M/g, nm.substr(0,3).toUpperCase())
	f = f.replace(/M/g, nm.substr(0, 3))
	f = f.replace(/MM\*/g, nm.toUpperCase())
	f = f.replace(/Mm\*/g, nm)
	f = f.replace(/m/g, String(time.getMonth() + 1).padLeft('0', 2))
	f = f.replace(/n/g, String(time.getMonth() + 1))
	//f = f.replace(/D/g, nd.substr(0,3).toUpperCase())
	f = f.replace(/D/g, nd.substr(0, 3))
	//f = f.replace(/DD\*/g, nd.toUpperCase())
	f = f.replace(/l\*/g, nd)
	f = f.replace(/d/g, String(time.getDate()).padLeft('0', 2))
	f = f.replace(/j\*/g, time.getDate())
	f = f.replace(/H/g, String(time.getHours()).padLeft('0', 2))
	f = f.replace(/h/g, time.getHours())
	f = f.replace(/i/g, String(time.getMinutes()).padLeft('0', 2))
	f = f.replace(/s/g, String(time.getSeconds()).padLeft('0', 2))

	return f
}

Date.prototype.getMonthName = function() {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	]

	return monthNames[this.getMonth()]
}

//n.b. this is sooo not i18n safe :)
Date.prototype.getDayName = function() {
	switch (this.getDay()) {
		case 0:
			return 'Sunday'
		case 1:
			return 'Monday'
		case 2:
			return 'Tuesday'
		case 3:
			return 'Wednesday'
		case 4:
			return 'Thursday'
		case 5:
			return 'Friday'
		case 6:
			return 'Saturday'
	}
}

String.prototype.padLeft = function(value, size) {
	let x = this

	while (x.length < size) {
		x = value + x
	}
	return x
}

//== Global ========================================================================================
global = global || window

global.isNumeric = function(value) {
	return !isNaN(parseFloat(value)) && isFinite(value)
}

global.isArray = function(item) {
	return (item instanceof Array)
}

global.isObject = function(item) {
	return (item instanceof Object && !(item instanceof Array))
}

global.isIterable = function(item) {
	return (item instanceof Object || item instanceof Array)
}

export default {}