// http://mongodb.github.io/node-mongodb-native/2.0/reference/connecting/connection-settings/

var assert = require('assert');



var db = function(setup, callback)
{
	var _this = this;

	this.bucket   = null;
	this.col      = null;
	this.prefix   = "";
	this.query    = {};
	this._where   = {};
	this._options = {};
	this._readOne = false;

	var options = setup['options-'+setup['type']] || setup['options'] || {};

	this.connect(setup['host'], setup['database'], options, function(bucket) {
		_this.bucket = bucket;
		console.log("Couchbase connected to collection " + '"'+setup['database']+'" in bucket "'+bucket+'"');
		callback();
	});

	//return this.collection();
};

db.prototype.on = function(type, callback)
{
	if (type == "error")
	{}
	//'' :
}

db.prototype.collection = function(prefix)
{
	if (prefix) {
		this.prefix = prefix;
	}
	else
	{
		return this.prefix;
	}

	return this;
}

db.prototype.connect = function(url, dbname, options, callback)
{
	bucketname = 'default';
	dbname = dbname || 'default';

	var couchbase = require('couchbase');
	var cluster   = new couchbase.Cluster('couchbase://'+url);
	var bucket    = cluster.openBucket(bucketname, function(err) {
		if (err)
		{
			console.log("Could not connect to couchbase with bucket: " + bucketname);
		}
	});

	bucket.ttl               = null;
	bucket.connectionTimeout = 10000;
	bucket.operationTimeout  = 60 * 1000;  // 60 seconds operation timeout (LCB_CNTL_OP_TIMEOUT)

/*
	bucket.setTranscoder(function(value) {
		return {
			value: new Buffer(JSON.stringify(value), 'utf8')
			flags: 0
		};
	}, function(doc) {
		return JSON.parse(doc.value.toString('utf8'));
	});
*/

	bucket.on('error', function(err) {
		console.error(err);
	});
	bucket.on('connect', function(msg) {
		this.prefix = dbname;
		//bucket.insert("testdoc", {name:'Message To Couchbase'}, function(err, result) {

			if (typeof callback == "function") {callback(bucket);}
		//});
	});
}

db.prototype.options = function(options)
{
	options = options || {};

	for (var i in options)
	{
		if (typeof this[i] == 'function')
		{
			this[i](options[i]);
		}
		else
		{
			this._options[i] = options[i];
		}
	}

	return this;
}

db.prototype.find = function(query)
{
	if (typeof query != "object") {query = {};}

	this.query = query;

	return this;
}

db.prototype.sort = function(query)
{
	if (typeof query == "object") {query = {};}

	//this.query = query;

	return this;
}

db.prototype.where = function(where)
{
	this._where = {};

	for (var i in where)
	{
		tmp["$"+i] = where[i];
	}
}

db.prototype.insert = function(data, callback)
{

	if (typeof data != 'object') {return false;}
	//if (!this.col) {return false;}

	this.col.insert(
		data,
		{w:1, j:0},
		function(err, result)
		{
			if (err == null && result["result"]["ok"] == 1 && typeof callback == "function") {
				if (typeof callback == "function") {

					var ids = result.insertedIds;

					if (result.insertedCount == 1)
					{
						ids = ids[0];
					}

					callback(ids, result);
				}
			}
		}
	);

	return this;
}

db.prototype.update = function(data, callback)
{
	if (!this.query) {return this;}
	if (typeof data != 'object') {return false;}
	//if (!this.col) {return false;}

if (0)
{
	/*
	var result = this.col.findAndModify({
		query: this.query,
		update: {
			$set : data
		},
		upsert: false, // insert if nothing found

		function(err, result)
		{
			if (typeof callback != "function") {return;}

			if (err)
			{
				callback(err);
			}

			if (err == null && result["result"]["ok"] == 1) {
				callback(null);
			};
		}
	});
	*/
	/*var result = this.col.updateOne(
		query,
		{
			$set : data
		},
		{
			upsert: false, // insert if nothing found
		},
		function(err, result)
		{
			if (typeof callback != "function") {return;}

			if (err)
			{
				callback(err);
			}

			if (err == null && result["result"]["ok"] == 1) {
				callback(null);
			};
		}
	);*/
}
else
{
	var result = this.col.update(
		this.query,
		{
			$set : data
		},
		{
			upsert: false, // insert if nothing found
			multi: false,  // update multiple
			writeConcern: {
				w: 1,          // 1 = write to disk, 0 = write to RAM first
				j: true
			}
		},
		function(err, result)
		{
			if (typeof callback != "function") {return;}

			if (err !== null)
			{
				callback(err);
			}
			else if (result["result"]["ok"] == 1) {
				callback(null);
			}
		}
	);
}


	return this;
}

db.prototype.select = function(fields)
{
	if (typeof fields == 'string')
	{
		if (fields != '')
		{
			fields = fields.split(" ");
		}
		else
		{
			fields = {};
		}
	}

	this._options['fields'] = {};

	if (fields.length == 0)
	{
		this._options['fields'] = undefined;
	}
	else
	{
		for (var i in fields)
		{
			this._options['fields'][fields[i]] = 1;
		}
	}

	return this;
}

db.prototype.skip = function(val)
{
	val = val || 0;
	this._options['skip'] = val;
	return this;
}

db.prototype.limit = function(val)
{
	val = val || 0;
	this._options['limit'] = val;
	return this;
}

db.prototype.cursor = function()
{
	return db.col.find.apply(this, arguments);
}

db.prototype.readOne = function()
{
	this._readOne = true;
	var ret = this.read.apply(this, arguments);
	this._readOne = false;
	return ret;
}

db.prototype.read = function()
{
	var query    = null;
	var callback = null;
	var promise  = null;
	var cb       = null;
	var _readOne = this._readOne;

	if (arguments.length == 0)
	{
		return this;
	}

	if (arguments.length == 1)
	{
		query = this.query;
	}
	else
	{
		query    = arguments[0];
	}

	if (typeof arguments[arguments.length-1] == 'function')
	{
		callback = arguments[arguments.length-1];
		cb = function(err, data) {
			assert.equal(err, null);
			data = data || {};
			data = (_readOne) ? data[0] : data;
			callback(data);
		}
	}
	else
	{
		promise = new Promise(function(resolve, reject){
			cb = function(err, data) {
				assert.equal(err, null);
				data = data || {};
				data = (_readOne) ? data[0] : data;
				resolve(data);
			};
		});
	}

	this._options.limit = (typeof this._options.limit == 'number') ? this._options.limit : 1;
	this._options.skip  = this._options['skip'];

	this.col.find(
		query,
		this._options
	).toArray(cb);

	if (callback) {
		return this;
	}
	else
	{

		return promise;
	}


	//
	/*
	.then(function(err, result)
	{
		if (typeof callback != "function") {return;}

		if (err !== null)
		{
			callback(err);
		}
		else {
			callback(result);
		}
	});
	*/
}

module.exports = db;

//db("collection").insert()