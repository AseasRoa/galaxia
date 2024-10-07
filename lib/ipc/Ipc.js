import cluster from 'node:cluster'
import process from 'node:process'

/**
 * A counter that is used to generate unique Id
 *
 * @type {number}
 */
let processMessageID = 0

/**
 * Outputs a string, which must be unique each time the function runs.
 * More than that, it must be unique along multiple processes and
 * that's why it contains the pid of the current process.
 *
 * @returns {string}
 */
function generateUniqueID() {
  if (processMessageID > 100000) processMessageID = 0

  processMessageID += 1

  return `${process.pid}_${processMessageID}`
}

class Ipc {
  /**
   * @type {Map<string, ChannelCallback>}
   */
  #channelCallbacks = new Map()

  /**
   * A map in which the callback of the sender is stored temporary,
   * identified with randomly generated id. After the request is
   * sent and a response is received, the callback is removed
   * from the map.
   *
   * @type {Map<string, MessageCallback>}
   */
  #messageCallbacks = new Map()

  constructor() {
    this.#init()
  }

  /**
   * @param {string} channel
   * @param {MessageCallback} callback
   * @throws
   */
  onMessage(channel, callback) {
    if (this.#channelCallbacks.has(channel)) {
      throw new Error(`Channel "${channel}" is already opened.`)
    }

    this.#channelCallbacks.set(channel, callback)
  }

  /**
   * @param {string} channel
   * @param {any} message
   * @param {number} recipientId
   * @returns {Promise<any>}
   */
  sendMessage(channel, message, recipientId) {
    return new Promise((resolve, reject) => {
      const callbackId = generateUniqueID()

      /** @type {MessageCallback} */
      const tmpCallback = (response) => {
        resolve(response)

        this.#messageCallbacks.delete(callbackId)
      }

      this.#messageCallbacks.set(callbackId, tmpCallback)

      /** @type {ChannelRequest} */
      const request = {
        type: 'channelRequest',
        callbackId: callbackId,
        channel: channel,
        message: message
      }

      this.#send(recipientId, request, (error) => {
        if (error) {
          reject(error)

          this.#messageCallbacks.delete(callbackId)
        }
      })
    })
  }

  /**
   * @returns {void}
   */
  #init() {
    if (cluster.isPrimary) {
      cluster.on(
        'message',
        (worker, message) => this.#onMessage(worker.id, message)
      )
    }
    else {
      process.on(
        'message',
        // @ts-ignore
        (message) => this.#onMessage(0, message)
      )
    }
  }

  /**
   * @param {number} recipientId
   * @param {ChannelRequest | ChannelResponse} message
   */
  #onMessage(recipientId, message) {
    if (message.type === 'channelRequest') {
      const { callbackId } = message
      const callback = this.#channelCallbacks.get(message.channel)
      const response = (callback instanceof Function)
        ? callback(message.message)
        : undefined

      /** @type {ChannelResponse} */
      const channelResponse = {
        type: 'channelResponse',
        callbackId: callbackId,
        response: response
      }

      // Send the response
      this.#send(recipientId, channelResponse)
    }

    if (message.type === 'channelResponse') {
      const callback = this.#messageCallbacks.get(message.callbackId)

      if (callback instanceof Function) callback(message.response)
    }
  }

  /**
   * Send a message. If the current process is a Primary, the message
   * is sent to the worker with the given Id. If the current process
   * is a Worker, the message is sent to the cluster and the recipient
   * Id doesn't matter.
   *
   * @param {number} recipientId
   * @param {any} message
   * @param {function(any):any} [callback]
   * @returns {boolean}
   */
  #send(recipientId, message, callback) {
    // Primary => Worker
    if (
      cluster.isPrimary
      && cluster.workers
    ) {
      return cluster.workers?.[recipientId]?.send(message, callback) ?? false
    }

    // Worker => Primary
    if (
      cluster.isWorker
      && process.send instanceof Function
    ) {
      return process.send(message, undefined, {}, callback)
    }

    return false
  }
}

export { Ipc }
