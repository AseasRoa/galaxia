"use strict"

var redis = require("redis")

var DbConnector = function(setup, callback)
{
	// if the function was called without "new"
	if (this instanceof DbConnector === false) {return new DbConnector(setup, callback)}

	var _this = this
	this.name = "Redis"

	var client = redis.createClient(setup)

	client.on("connect", function() {
		callback.apply(_this, null)
	})

	client.on("error", function(err) {
		callback.apply(_this, err)
	})

	client.on("reconnecting", function() {
		console.log("Redis reconnecting...")
	})

	return client
}

module.exports = DbConnector