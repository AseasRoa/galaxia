import './typedefs.js'
import $cluster from 'cluster'

let processMessageID        = 0
let IPCCallbacks            = {}
let IPCCallbacksPersistence = {}

function generateUniqueID()
{
	if (processMessageID > 100000)
	{
		processMessageID = 0
	}

	let uid = 0

	while (true)
	{
		uid = process.pid + '_' + processMessageID++

		if (!(uid in IPCCallbacks))
		{
			break
		}
	}

	return uid
}

if ($cluster.isMaster)
{
	$cluster.on('message', (worker, message) => {
		// no 'uid' means different standard, not to be covered here in this module
		if (!('uid' in message))
		{
			return
		}

		if (!(message['uid'] in IPCCallbacks))
		{
			// send the message to all persistent callbacks made from the cluster
			// note that the uid here contains the process.uid of the cluster
			for (let uid in IPCCallbacksPersistence)
			{
				if (
					IPCCallbacksPersistence[uid] === true
					|| IPCCallbacksPersistence[uid] === message['cmd']
				)
				{
					let cb_func = (responseMessage) => {
						worker.send({
							uid     : message['uid'],
							cmd     : message['cmd'],
							message : responseMessage
						})
					}
					IPCCallbacks[uid].call(worker, message['message'], cb_func)
				}
			}

			return
		}

		if (!(message['uid'] in IPCCallbacksPersistence))
		{
			IPCCallbacks[message['uid']].call(worker, message['message'])
			delete IPCCallbacks[message['uid']]
		}
	})
}
else
{
	process.on('message', (message) => {
		if (!('uid' in message))
		{
			return
		}

		if (!(message['uid'] in IPCCallbacks))
		{
			for (let uid in IPCCallbacksPersistence)
			{
				if (IPCCallbacksPersistence[uid] === true || IPCCallbacksPersistence[uid] === message['cmd'])
				{
					IPCCallbacks[uid](message['message'], (response_message) => {
						process.send({
							uid     : message['uid'],
							cmd     : message['cmd'],
							message : response_message
						})
					})
				}
			}

			return
		}

		if (!(message['uid'] in IPCCallbacksPersistence))
		{
			IPCCallbacks[message['uid']](message['message'])
			delete IPCCallbacks[message['uid']]
		}
	})
}

class IPC
{
	send(cmd, message, callback)
	{
		if (typeof message === 'function' && typeof callback !== 'function')
		{
			callback = message
			message  = undefined
		}

		let uid = generateUniqueID()

		if ($cluster.isMaster)
		{
			return false
		}
		else
		{
			if (typeof callback === 'function')
			{
				IPCCallbacks[uid] = callback
			}

			process.send({uid, cmd, message})
		}
	}

	/**
	 * @param {string} cmd
	 * @param {function} callback
	 *
	 * @returns {void}
	 */
	on(cmd, callback)
	{
		let uid = generateUniqueID()

		IPCCallbacks[uid]            = callback
		IPCCallbacksPersistence[uid] = cmd
	}
}

export {IPC}