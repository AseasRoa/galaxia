/* There are two classes:
 1) Connector - who makes the connection. Usually 1 connection is used
 2) Interface - new instance of it is created for each request, and this instance uses the connection made from DbConnector
 */

/*
Examples:
	db.open("collection")                       | selects a new collection / creating a new class instance
 	db.open("collection").insert({key:"value"}) | insert single document in the collection
	db.open('default').insert([{key1:"value1}, {key2:"value2"}, {key3:"value3"}]) | insert multiple objects at once
 */

import Connector from "./Connector.mjs"

export default Connector