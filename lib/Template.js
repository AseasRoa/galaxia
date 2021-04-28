/**
 *
 * @param {string} path
 * @param {{}} [data]
 * @returns {Template}
 * @constructor
 */
const Template = function(path, data) {

	// if Template was called without 'new'
	if (!(this instanceof Template)) return new Template(path, data)

	this._path = path || ''
	this._data = data || {}
}

/**
 * @returns {string}
 */
Template.prototype.getPath = function() {
	return this._path
}

/**
 * @returns {{}}
 */
Template.prototype.getData = function() {
	return this._data
}

/**
 * @param {{}} data
 * @returns {Template}
 */
Template.prototype.data = function(data) {
	this._data = data

	return this
}

export {Template}