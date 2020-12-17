// Redis protocol: http://redis.io/topics/protocol

"use strict";

var net = require('net');
var tls = require('tls');

// RESP (REdis Serialization Protocol)
var Resp = function(socket)
{
	this.socket = socket;
}
Resp.prototype.command = function()
{

}
Resp.prototype.set = function(key, value, timeout)
{
	var command = "*3\r\n$3\r\nset\r\n$" + key.length + "\r\n" + key + "\r\n$" + value.length + "\r\n" + value + "\r\n";
	this.socket.write(command);
}
Resp.prototype.get = function(key)
{
	var command = "*2\r\n$3\r\nget\r\n$" + key.length + "\r\n" + key + "\r\n";

	this.socket.write(command);
}
Resp.prototype.info = function()
{
	this.socket.write("*1\r\n$7\r\ncommand");
}

Resp.prototype.buildCommandString = function () {

	var request = '*' + length + '\r\n';

	for (var i = 0; i < arguments.length; i++)
	{
		if (typeof arguments[i] === 'string') {
			request += '$' + Buffer.byteLength(arguments[i]) + '\r\n' + arguments[i] + '\r\n';
		} else {
			var string = '' + arguments[i];
			request += '$' + string.length + '\r\n' + string + '\r\n';
		}
	}

	return request;
};

var db = function(setup, callback)
{
	var defaults = {
		host: "127.0.0.1",
		port: 6379,
		family: 4
	}

	setup = setup || {};

	for (var i in defaults) {if (setup[i] === undefined) {setup[i] = defaults[i];}}

	var _this = this;

	this.server   = null;
	this._query   = {};
	this._options = {};
	this.protocol = null;
	this.callback = null;

	this.connect(setup, function(err, socket, db) {
		_this.socket = socket;
		_this.db     = db;
		_this.protocol = new Resp(socket);
		//log(_this.socket)

		if (!err) {
			console.log("Redis connected");
		}
		else
		{
			console.error(err);
		}

		_this.protocol.info();


		callback(err);
	});

	//return function() {};
};

db.prototype.connect = function(options, callback)
{
	//var host = url.substr(0, url.indexOf(':'));
	//var port = parseInt(url.substr(url.indexOf(':')+1));
	var _this = this;

	var socket = net.createConnection(options, function() {

		socket.setNoDelay(true);
		socket.setKeepAlive(true);
		socket.setTimeout(5000);

		callback(null, socket, 0);

		socket.on("data", function(data) {
			data = data.toString();

			if (data[0] === '*')
			{
				var idx0 = 1;
				var idx1 = data.indexOf("\r", idx0);

				var array_len = parseInt(data.substring(idx0, idx1));
				idx0 = idx1 + 2;

				var array = new Array(array_len);

				for (var i=0; i<array_len; i++)
				{
					idx1 = data.indexOf("\r", idx0);

					if (data[idx0] === ":")
					{

					}

					array.push(data.substring(idx0, idx1));
				}
			}

			//console.log(array);

//			_this.callback.call(_this, data.toString());
			//console.log(data.toString())

		})

		//stream.write("*1\r\n$4info");

	});

	socket.on('error', function(err) {
		callback(err, null)
	});


	//console.log(stream);
}

db.prototype.set = function(key, value, timeout)
{
	this.protocol.set(key, value, timeout)
}

db.prototype.get = function(key, callback)
{
	//this.protocol.get(key)
	if (!key) {return;}

	var command = "*2\r\n$3\r\nget\r\n$" + key.length + "\r\n" + key + "\r\n";
	this.socket.write(command);
	//this.callback = callback;

	this.socket.on("data", callback);
}

module.exports = db;