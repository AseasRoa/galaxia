import cluster from 'node:cluster'
import console from 'node:console'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import url from 'node:url'
import { ConfigReaderAndParser } from '../ConfigReaderAndParser.js'
import { stackTrace } from '../functions/stackTrace.js'
import { isDebugMode, isDevelopmentMode } from '../functions/utils.js'
import { Ipc } from '../ipc/Ipc.js'
import { startRemoteController } from './WorkersManagerRemoteController.js'

/** @typedef {Map<number, Cluster.Worker>} WorkersMap */

/** @typedef {'timeout' | 'replace' | 'shutDown'} ReasonsToKill */

class WorkersManager {
  /** @type {Required<GalaxiaOptions>} */
  #defaultOptions = {
    workersCount: 1,
    workersTimeout: 8000,
    useCluster: true
  }

  /** @type {boolean} */
  #development

  /**
   * Environment variables to sent to each worker
   *
   * @type {{galaxia : EnvironmentVariables}}
   */
  #env

  /** @type {Ipc} */
  #ipc = new Ipc()

  /** @type {boolean} */
  #isRestarting = false

  /** @type {Required<GalaxiaOptions>} */
  #options = structuredClone(this.#defaultOptions)

  /** @type {Map<number, ReasonsToKill>} */
  #reasonsToKill = new Map()

  /**
   * Should be 1000 (1 second). Use different values for testing purposes only.
   *
   * @type {number}
   */
  #workerHeartbeatInterval = 1000

  /**
   * The worker in this map are the worker we care about.
   * When a worker is being killed, it is removed immediately
   * from this map, but it can remain in the cluster for a while
   * until it dies. The point is, if the worker doesn't exist in
   * the map, it means that we don't care about it.
   *
   * @type {WorkersMap}
   */
  #workers = new Map()

  /**
   * A store for worker heartbeat times
   *
   * @type {Map<number, Date>}
   */
  #workersHeartbeatTimes = new Map()

  /**
   * This is the target count of worker that we must have at any time.
   * The actual count should be the size of the worker map.
   *
   * @type {number}
   */
  #workersTargetCount = 0

  constructor() {
    process.title = 'node | galaxia | cluster'

    this.#development = isDevelopmentMode()
    this.#printStartMessage()
    const caller = stackTrace(2)

    if (!caller) {
      throw new Error('Could not locate app')
    }

    this.#env = {
      galaxia: {
        appPath: path.normalize(path.dirname(caller.fileName)),
        devMode: this.development,
        heartbeatInterval: this.#workerHeartbeatInterval,
        showInitialMessages: true
      }
    }
  }

  /**
   * @returns {boolean}
   */
  get development() {
    return this.#development
  }

  /**
   * @returns {boolean}
   */
  get isRestarting() {
    return this.#isRestarting
  }

  /**
   * @param {boolean} [gracefully]
   * @returns {Promise<boolean>}
   */
  async restartWorkers(gracefully = true) {
    if (this.#isRestarting) {
      return false
    }

    this.#isRestarting = true

    if (this.#workers.size > 0) {
      await this.#replaceWorkers(this.#workers, gracefully)
    }
    else {
      const count = this.#workersTargetCount

      await this.#forkInitialWorkers(count)
    }

    this.#isRestarting = false

    return true
  }

  /**
   * @param {boolean} [gracefully]
   * @returns {Promise<void>}
   */
  async shutDownWorkers(gracefully = true) {
    const workersToKill = new Map(this.#workers)

    await this.#killWorkers(workersToKill, gracefully, 'shutDown')

    this.#updateWorkersMap(workersToKill, new Map())
  }

  /**
   * @param {GalaxiaOptions} [options]
   * @returns {Promise<void>}
   */
  async start(options = {}) {
    this.#options = this.#fixOptions(options)

    if (this.#options.useCluster) {
      await this.#startWithCluster()
    }
    else {
      await this.#startWithoutCluster()
    }
  }

  /**
   * @returns {number}
   */
  workersCount() {
    return this.#workers.size
  }

  /**
   * @returns {Promise<WorkerStats[]>}
   */
  async workersStats() {
    const stats = []

    for (const worker of this.#workers.values()) {
      /** @type {WorkerStats} */
      const workerStats = await this.#ipc.sendMessage('workerStats', null, worker.id)

      workerStats.workerId = worker.id
      workerStats.workerPid = worker.process.pid ?? 0

      stats.push(workerStats)
    }

    return stats
  }

  /**
   * Prints the message in the console with a slight delay. This is needed,
   * because when the IDE prints its messages in the same console while the
   * cluster is starting (for example information about the debugger), they
   * tend to be mixed with the messages from the cluster. With small delay,
   * the cluster messages appear at the end.
   *
   * @param {string} message
   */
  #consoleMessage(message) {
    setTimeout(() => {
      console.info(message)
    }, 120)
  }

  /**
   * @param {GalaxiaOptions} [options]
   * @returns {Required<GalaxiaOptions>}
   */
  #fixOptions(options = {}) {
    const configReader = new ConfigReaderAndParser()
    const newOptions = configReader.mergeDefaults(this.#defaultOptions, options)

    // Fix the count
    if (newOptions.workersCount < 0) {
      newOptions.workersCount = 1
    }

    if (newOptions.workersCount === 0) {
      newOptions.workersCount = os.cpus().length
    }

    // Fix the timeout
    let timeoutMs = newOptions.workersTimeout
    const heartbeatMs = this.#workerHeartbeatInterval

    if (timeoutMs <= heartbeatMs) {
      timeoutMs = heartbeatMs + 1000

      console.warn(`The workers timeout is less than the heartbeat time, which is ${heartbeatMs} milliseconds. The timeout has been set to ${timeoutMs} milliseconds.`)
    }

    newOptions.workersTimeout = timeoutMs

    return newOptions
  }

  /**
   * @param {number} workersCount
   * @returns {Promise<number>}
   * The number of created worker. Zero is considered an error.
   */
  async #forkInitialWorkers(workersCount) {
    if (cluster.isPrimary) {
      const currentWorkersCount = this.#getClusterWorkers().size

      if (currentWorkersCount > 0) {
        return 0
      }

      if (currentWorkersCount === 0) {
        this.#workers = await forkWorkers(workersCount, this.#env, 'listening')

        return this.#workers.size
      }
    }

    return 0
  }

  /**
   * @returns {Map<number, (Cluster.Worker)>}
   */
  #getClusterWorkers() {
    /** @type {Map<number, (Cluster.Worker)>} */
    const map = new Map()

    for (const id in cluster.workers) {
      /** @type {Cluster.Worker | undefined} */
      const worker = cluster.workers[id]

      if (worker) map.set(worker.id, worker)
    }

    return map
  }

  /**
   * @param {Cluster.Worker} worker
   * @returns {Date | undefined}
   */
  #getWorkerHeartbeatTime(worker) {
    return this.#workersHeartbeatTimes.get(worker.id)
  }

  /**
   * @see https://nodejs.org/api/cluster.html#cluster_worker_kill_signal
   * @param {WorkersMap} workersMap
   * @param {boolean} gracefully
   * @param {ReasonsToKill} reasonToKill
   * @param {NodeJS.Signals} [signal]
   * @returns {Promise<void>}
   */
  async #killWorkers(workersMap, gracefully, reasonToKill, signal = 'SIGTERM') {
    workersMap.forEach((worker) => {
      this.#reasonsToKill.set(worker.id, reasonToKill)
    })

    return killWorkers(workersMap, gracefully, signal)
  }

  /**
   * @returns {void}
   */
  #printStartMessage() {
    (this.development)
      ? console.log('\x1b[46m\x1b[30m%s\x1b[0m', ' DEVELOPMENT ')
      : console.log('\x1b[47m\x1b[30m%s\x1b[0m', ' PRODUCTION ')
  }

  /**
   * Watch for "exit" event on the cluster and replace
   * any worker that is terminated from outside this code.
   * Restarting is covered here in the code and is not
   * subject to this method.
   */
  #replaceWorkerIfTerminated() {
    /**
     * @param {Cluster.Worker} worker
     * The worker
     * @param {number} code
     * The exit code, if it exited normally.
     * @param {NodeJS.Signals} signal
     * The name of the signal (e.g. 'SIGHUP') that
     * caused the process to be killed.
     */
    const onExit = async(worker, code, signal) => {
      if (this.#env.galaxia.showInitialMessages) {
        const message = `Process ${String(worker.id)} (process id ${String(worker.process.pid)}) terminated with signal ${signal}.`

        console.warn(message)
      }

      const reasonToKill = this.#reasonsToKill.get(worker.id)

      if (!reasonToKill) {
        /** @type {WorkersMap} */
        const workersToReplace = new Map()

        workersToReplace.set(worker.id, worker)

        await this.#replaceWorkers(workersToReplace)
      }
    }

    cluster.on('exit', onExit)
  }

  /**
   * @param {WorkersMap} [workersToReplace]
   * An optional map with the worker to be replaced.
   * If not provided, all worker will be replaced.
   * @param {boolean} [gracefully]
   * @returns {Promise<void>}
   */
  async #replaceWorkers(workersToReplace, gracefully = true) {
    // First, which worker will be killed?
    const workersToKill = new Map(workersToReplace ?? this.#workers)

    // Create new worker to replace those who will be killed
    const newWorkers = await forkWorkers(workersToKill.size, this.#env, 'listening')

    // Update the main worker map - remove the old worker and add the new ones
    this.#updateWorkersMap(workersToKill, newWorkers)

    // Finally, kill the old worker
    await this.#killWorkers(workersToKill, gracefully, 'replace')
  }

  /**
   * @param {Cluster.Worker} worker
   */
  #setWorkerHeartbeatTime(worker) {
    this.#workersHeartbeatTimes.set(worker.id, new Date())
  }

  /**
   * @returns {void}
   */
  #setupClusterEvents() {
    /** @type {NodeJS.Timeout[]} */
    const noActivityTimeouts = []

    /**
     * @param {Cluster.Worker} worker
     */
    const onFork = (worker) => {
      noActivityTimeouts[worker.id] = setTimeout(() => {
        const errorMessage = `Something must be wrong with the connection of worker #${worker.id}...`

        console.error(errorMessage)
      }, 3000)
    }

    /**
     * @param {Cluster.Worker} worker
     */
    const onListening = (worker) => {
      const timeout = noActivityTimeouts[worker.id]

      if (timeout) clearTimeout(timeout)
    }

    /*
     * When a new worker is forked the cluster module will emit a 'fork' event.
     * This can be used to log worker activity, and create a custom timeout.
     */
    cluster.on('fork', onFork)

    // When a worker is connected to the net and listen
    cluster.on('listening', onListening)
  }

  /**
   * @param {number} workersTimeoutMs
   * @returns {void}
   */
  #setupWorkersHeartbeat(workersTimeoutMs) {
    const intervalMs = this.#workerHeartbeatInterval

    // If configured to not listen on a heartbeat, return
    if (intervalMs <= 0) {
      return
    }

    /*
     * On every second check the time of the last heartbeat for each
     * worker and kill any inactive worker
     */
    if (
      !isDebugMode()
      && typeof workersTimeoutMs === 'number'
      && workersTimeoutMs > 0
    ) {
      setTimeout(() => {
        setInterval(() => {
          this.#workersKillerAgent(workersTimeoutMs)
        }, intervalMs)
      }, intervalMs) // This initial timeout delay if for just in case
    }

    /**
     * @param {Cluster.Worker} worker
     * @param {{cmd: string, params?: Object<string, *>}} message
     */
    const onMessage = async(worker, message) => {
      if (message.cmd === 'heartbeat') {
        this.#setWorkerHeartbeatTime(worker)
      }
      else if (message.cmd === 'silentRestart') {
        const { showInitialMessages } = this.#env.galaxia

        this.#env.galaxia.showInitialMessages = false

        await this.restartWorkers()

        this.#env.galaxia.showInitialMessages = showInitialMessages
      }
      else if (message.cmd === 'shutDownWorker') {
        console.info(`Shutting down worker ${worker.id}`)

        this.#reasonsToKill.set(worker.id, 'shutDown')
        worker.kill('SIGTERM')
      }
    }

    // listen for heartbeat from the worker
    cluster.on('message', onMessage)
  }

  /**
   * @param {number} workersCount
   * @param {number} workersTimeout
   * @returns {Promise<void>}
   */
  async #startAndSetupInitialWorkers(workersCount, workersTimeout) {
    const currentFilename = url.fileURLToPath(import.meta.url)
    const currentDirname = path.dirname(currentFilename)
    const loaderLocation = path.join('file://', currentDirname, 'register-hooks.js')

    // Change the default 'fork' behaviour for future fork() calls
    cluster.setupPrimary({
      exec: path.join(currentDirname, '../worker/WorkerStarter.js'),
      args: [],
      silent: false,
      execArgv: [
        '--import',
        loaderLocation,
        '--trace-warnings',
        '--trace-deprecation'
      ]
    })

    this.#setupWorkersHeartbeat(workersTimeout)
    this.#setupClusterEvents()
    this.#replaceWorkerIfTerminated()

    // Fork worker
    const createdWorkersCount = await this.#forkInitialWorkers(workersCount)

    if (createdWorkersCount !== workersCount) {
      const errorMessage = `Tried to create ${workersCount} workers, but only created ${createdWorkersCount} workers.They are being shutted down.`

      console.error(new Error(errorMessage))

      await this.shutDownWorkers(false)
    }
  }

  /**
   * @returns {Promise<void>}
   * @throws If the options suggest to start without cluster
   */
  async #startWithCluster() {
    if (!this.#options.useCluster) {
      throw new Error('You should not run this function with falsy useCluster')
    }

    const { workersCount, workersTimeout } = this.#options

    this.#workersTargetCount = workersCount

    this.#consoleMessage(
      `Cluster is spawning ${workersCount} worker${(workersCount === 1) ? '' : 's'}...`
    )

    await startRemoteController(this)
    await this.#startAndSetupInitialWorkers(workersCount, workersTimeout)
  }

  /**
   * Start the worker by directly importing it
   *
   * @returns {Promise<void>}
   */
  async #startWithoutCluster() {
    process.env['galaxia'] = JSON.stringify(this.#env.galaxia)

    await import('../worker/WorkerStarter.js')
  }

  /**
   * @param {WorkersMap} workersToRemove
   * @param {WorkersMap} workersToAdd
   */
  #updateWorkersMap(workersToRemove, workersToAdd) {
    workersToRemove.forEach((worker) => this.#workers.delete(worker.id))
    workersToAdd.forEach((worker) => this.#workers.set(worker.id, worker))
  }

  /**
   * Check whether the cluster worker are working properly.
   * If some is disconnected, or it doesn't provide heartbeat
   * signals, it will be killed.
   *
   * @param {number} workersTimeoutMs
   * @returns {void}
   */
  #workersKillerAgent(workersTimeoutMs) {
    /** @type {WorkersMap} */
    const workersToReplace = new Map()
    const timeNow = new Date()

    /*
     * Check the heartbeat of each worker and if it appears dead,
     * add it to the list of worker to be replaced
     */
    for (const i in cluster.workers) {
      /** @type {Cluster.Worker | undefined} */
      const worker = cluster.workers[i]

      if (!worker) continue

      if (worker.isDead() || !worker.isConnected()) continue

      const heartbeatTime = this.#getWorkerHeartbeatTime(worker)

      /*
       * If the worker's ID does not yet exist in the list of heartbeats
       * (could happen on restart), set its initial heartbeat here and continue
       */
      if (!heartbeatTime) {
        this.#setWorkerHeartbeatTime(worker)

        continue
      }

      const timeDiff = timeNow.getTime() - heartbeatTime.getTime()

      if (timeDiff > workersTimeoutMs) {
        console.warn(`Replacing worker ${worker.id} because of missing heartbeat.`)

        if (this.#workers.has(worker.id)) {
          workersToReplace.set(worker.id, worker)
        }
      }
    }

    // Replace each worker that has been detected as dead
    if (workersToReplace.size > 0) {
      void this.#replaceWorkers(workersToReplace)
    }
  }
}

/**
 * This function takes an input object and turns all its keys
 * and values into strings. toString() is used for the keys
 * and JSON.stringify() is used for the values.
 *
 * Why? Environment variables are key-value pairs where both,
 * the keys and the values are strings.
 *
 * @param {Object<string, *>} object
 * @returns {Object<string, string>}
 */
function objectToJsonStringifiedEnv(object) {
  /** @type {Object<string, string>} */
  const output = {}

  for (const i in object) {
    output[i.toString()] = JSON.stringify(object[i])
  }

  return output
}

/**
 * @param {number} workersCount
 * The number of worker to fork
 * @param {Object<*, *>} env
 * Key/value pairs to add to each worker process environment
 * @param {'listening'|'online'} mandatoryEvent
 * The event all worker must emit before resolving the promise
 * @returns {Promise<WorkersMap>}
 */
function forkWorkers(workersCount, env, mandatoryEvent) {
  return new Promise((resolve, reject) => {
    /**
     * Notice:
     * It's much slower to fork (including the 'listening' event)
     * multiple worker one after another. It's much faster to call the fork()
     * function on all of them, and then wait for their events on the cluster.
     *
     * Notice:
     * It seems that the 'listening' event is the only event that fires after
     * the worker's script is executed. The 'online' event fires immediately
     * after 'fork', which fires immediately after forking.
     */

    /**
     * A temporary set that is filled with the worker when they
     * are initially forked, and then emptied when the events are
     * detected.
     *
     * @type {Set<number>}
     */
    const workersSetTmp = new Set()

    /**
     * A map that stores all created worker. This map will be resolved.
     *
     * @type {WorkersMap}
     */
    const workersMap = new Map()

    /**
     * @see https://nodejs.org/api/cluster.html#event-fork
     * @param {Cluster.Worker} worker
     */
    const onFork = (worker) => {
      workersSetTmp.add(worker.id)
      workersMap.set(worker.id, worker)
    }

    /**
     * @param {Error} error
     */
    const killWorkersAndReject = (error) => {
      workersMap.forEach((worker) => worker.kill('SIGKILL'))
      reject(error)
    }

    /**
     * @param {Cluster.Worker} worker
     */
    const onMandatoryEvent = (worker) => {
      workersSetTmp.delete(worker.id)

      if (workersSetTmp.size === 0) {
        resolve(workersMap)
      }
    }

    cluster.on('fork', onFork)
    cluster.on('error', killWorkersAndReject)
    cluster.on(mandatoryEvent, onMandatoryEvent)

    const envStringified = objectToJsonStringifiedEnv(env)

    for (let i = 0; i < workersCount; i++) {
      cluster.fork(envStringified)
    }
  })
}

/**
 * @see https://nodejs.org/api/cluster.html#cluster_worker_kill_signal
 * @see https://man7.org/linux/man-pages/man7/signal.7.html
 * @param {WorkersMap} workersMap
 * @param {boolean} gracefully
 * If true, the cluster sends 'shutDown' message to each worker
 * and waits for 'exit' events from all of them.
 * If false, the workers are killed right away, without waiting
 * for them to gracefully stop.
 * @param {NodeJS.Signals} [signal]
 * @returns {Promise<void>}
 */
function killWorkers(workersMap, gracefully, signal = 'SIGTERM') {
  return new Promise((resolve) => {
    if (workersMap.size === 0) {
      resolve()

      return
    }

    const workersToKill = new Map(workersMap)

    workersToKill.forEach((worker) => {
      if (worker.isDead()) {
        /*
         * The worker could already be dead, if it
         * executed process.exit() on itself
         */
        return
      }

      if (gracefully) {
        worker.send({ cmd: 'shutDown' })
      }
      else {
        worker.kill(signal)
      }
    })

    /**
     * @param {Cluster.Worker} worker
     */
    const onExit = (worker) => {
      workersToKill.delete(worker.id)

      if (workersToKill.size === 0) {
        resolve()
      }
    }

    cluster.on('exit', onExit)
  })
}

export { WorkersManager }
