import './typedefs.js'
import cluster, {Worker} from 'cluster'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import {IPC} from './IPC.js'

const __filename = new URL(import.meta.url).href.replace('file:///', '')
const __dirname  = path.dirname(__filename)

// Change the default 'fork' behaviour for future fork() calls
cluster.setupMaster({exec : path.resolve(__dirname + '/Worker.js'), args : []})
cluster.schedulingPolicy = cluster.SCHED_RR // SCHED_RR = Round Robin, SCHED_NONE = by the OS

//
let flagForked     = 0 // -1 = able to restart workers, 0 = restarting workers, positive value = counting workers until their number becomes what we want, and then the value is set to -1
let flagRestarting = false

/**
 * @returns {boolean}
 */
function isDevelopmentMode()
{
	// check 1
	for (let i in process.argv)
	{
		let argv = process.argv[i]

		if (argv === '-p' || argv === '--production')
		{
			return false
		}

		if (argv === '-d' || argv === '--develop')
		{
			return true
		}
	}

	// check 2
	return process.env.NODE_ENV === 'develop'
}

if (isDevelopmentMode())
{
	console.info('-=-=-= start (development mode) =-=-=-')
}
else
{
	console.info('-=-=-= start (production mode) =-=-=-')
}

class MainCluster
{
	/** @type {Object.<number, Date>} */
	#workerHeartbeatTimes = {}
	/** @type {Object.<number, Worker>} */
	#workersToKill        = {}

	/**
	 * @param {string} appPath
	 * @param {number} workersCount
	 * @param {number} [workersTimeout]
	 */
	constructor({
						appPath,
						workersCount,
						workersTimeout = 30 // seconds
					})
	{
		appPath = path.resolve(appPath)

		this.workersCount   = workersCount || 1
		this.workersTimeout = workersTimeout
		this.forkOptions    = {
			GALAXIA_APP_PATH         : path.resolve(appPath),
			GALAXIA_DEVELOPMENT_MODE : isDevelopmentMode(),
			GALAXIA_PRODUCTION_MODE  : !isDevelopmentMode()
		}

		this.start()
		this.setupIPC()
	}

	/**
	 * @returns {void}
	 */
	forkWorkers()
	{
		if (cluster.isMaster)
		{
			let count = this.workersCount

			if (count === 0)
			{
				count = os.cpus().length
			}
			else if (count < 0)
			{
				count = 1
			}

			let workers_keys      = Object.keys(cluster.workers)
			let workers_count_now = workers_keys.length

			if (workers_count_now > 0)
			{
				if (flagForked !== -1)
				{
					// probably the function was called while workers are still recreated => do nothing
					return
				}

				// recreating workers
				flagForked = 0

				for (let i in workers_keys)
				{
					let gracefully = isDevelopmentMode()
					let workerID   = workers_keys[i]
					let worker     = cluster.workers[workerID]

					this.killWorker(worker, gracefully)
				}
			}
			else
			{
				for (let i = 0; i < count; i++)
				{
					cluster.fork(this.forkOptions)
				}
			}
		}
	}

	/**
	 * https://nodejs.org/api/cluster.html#cluster_worker_kill_signal
	 * @param {Worker} worker
	 * @param {boolean} [gracefully]
	 */
	killWorker(worker, gracefully = true)
	{
		if (gracefully)
		{
			// this attempts to gracefully disconnect the worker process,
			// but it is susceptible to waiting indefinitely
			worker.kill('SIGTERM')
		}
		else
		{
			worker.process.kill()
		}
	}

	/**
	 * @returns {void}
	 */
	setupIPC()
	{
		const ipc = new IPC()

		ipc.on('check-restarting', (message, callback) => {
			callback(flagRestarting)
		})

		ipc.on('restart', (message, callback) => {

			if (flagRestarting === true)
			{
				console.warn('The server is currently restarting!')
			}
			else
			{
				flagRestarting = true

				console.warn('\n\nRESTARTING SERVER (please wait until you see "SERVER RESTARTED")')

				let maxWorkersCount = this.workersCount
				let newWorkersCount = 0

				// make list of current workers, they will be killed later
				for (let i in cluster.workers)
				{
					this.#workersToKill[cluster.workers[i].process.pid] = cluster.workers[i]
				}

				// create brand new workers

				// this timeout is mostly because the 'RESTARTING' letters are sometimes shown after the following message in the console
				setTimeout(() => {
					let processWord = (maxWorkersCount === 1) ? 'process' : 'processes'

					console.log(`\n-- Restarting phase 1 (of 2): Creating ${maxWorkersCount} new ${processWord}...\n`)

					for (let i = 0; i < maxWorkersCount; i++)
					{
						let worker = cluster.fork(this.forkOptions)

						// 'online' is emitted when the worker is working
						worker.on('online', () => {
							newWorkersCount++

							//console.log(newWorkersCount + ' ' + max_workers_count)

							if (newWorkersCount === maxWorkersCount)
							{
								// this timeout is because it takes time for the servers on the worker to be created
								// and their message is printed with some delay
								setTimeout(() => {
									console.log(`\n-- Restarting phase 2 (of 2): Killing old ${processWord}...\n`)

									// all new workers are now listening
									for (let i in this.#workersToKill)
									{
										this.#workersToKill[i].send({cmd : 'killYourself'})
										delete this.#workersToKill[i]
									}
								}, 1000)
							}
						})
					}
				}, 100)
			}

			if (typeof callback === 'function') callback(null, flagRestarting)
		})
	}

	/**
	 * @returns {void}
	 */
	start()
	{
		this.setupWorkersHeartbeat(this.workersTimeout)

		let timeouts = []

		cluster.on('fork', (worker) => {
			timeouts[worker.id] = setTimeout(() => {
				console.error('Something must be wrong with the connection ...')
			}, 10000)
		})

		// when a worker is connected to the net and listen
		cluster.on('listening', (worker) => {
			clearTimeout(timeouts[worker.id])

			let currentWorkersCount  = Object.keys(cluster.workers).length
			let expectedWorkersCount = this.workersCount + Object.keys(this.#workersToKill).length

			if (currentWorkersCount >= expectedWorkersCount)
			{
				/*
				if (Object.keys(this.#workersToKill).length > 0)
				{
					// this timeout is mostly because the 'HTTP listen on...' letters are sometimes shown before the following message in the console
					setTimeout(() => {
						console.log('-- Restarting phase 2 (of 2): Killing old processes...')

						for (let i in this.#workersToKill)
						{
							this.#workersToKill[i].send({cmd : 'killYourself'})
							delete this.#workersToKill[i]
						}
					}, 1000)

				}
				*/
			}
		})

		process.stdin.resume()//so the program will not close instantly

		// When process dies, replace it.
		cluster.on('exit', (worker, code, signal) => {

			clearTimeout(timeouts[worker.id])

			//console.log('worker = ' + worker + ' code = ' + code + ' signal = ' + signal)

			// when restarting the server
			if (code === 4)
			{
				console.warn(`Process ${worker.id} (process id ${worker.process.pid} closed)`)

				// mark when the server is restarted
				if (
					flagRestarting === true
					&& Object.keys(cluster.workers).length === this.workersCount
					&& Object.keys(this.#workersToKill).length === 0)
				{
					console.warn('\nSERVER RESTARTED\n\n')
					flagRestarting = false
				}
			}
			// termination due to worker timeout (endless loop)
			else if (signal === 'SIGTERM')
			{
				console.warn(`Process ${worker.id} (process id ${worker.process.pid}) terminated with SIGTERM`)
				cluster.fork(this.forkOptions)
			}
			// any other case, like manual termination of the process
			else
			{
				console.warn(`(${signal}) Process ${worker.id} (process id ${worker.process.pid}) died`)
				cluster.fork(this.forkOptions)
			}
		})

		// watching file changes
		function watcher(dir, extensions)
		{
			if (fs.lstatSync(dir).isDirectory())
			{
				let subDir = fs.readdirSync(dir)

				for (let i in subDir)
				{
					let newDir = dir + path.sep + subDir[i]

					if (fs.lstatSync(newDir).isDirectory())
					{
						//watcher(newdir, extensions)
					}
				}
			}
		}

		if (0)
		{
			let wtof = true //watch timeout flag

			fs.watch(
				__dirname,
				{persistent : true, recursive : true},
				(event, filename) => {

					if (filename && filename.indexOf('node_modules') !== -1)
					{
						return
					}

					if (wtof === true)
					{
						wtof = false
						setTimeout(() => {
							this.forkWorkers()
							wtof = true
						}, 300)
					}
				})
		}

		this.forkWorkers()
	}

	/**
	 * @param {Worker} worker
	 */
	setWorkerHeartbeatTime(worker)
	{
		this.#workerHeartbeatTimes[worker.id] = new Date()
	}

	/**
	 * @param {Worker} worker
	 * @returns {Date}
	 */
	getWorkerHeartbeatTime(worker)
	{
		return this.#workerHeartbeatTimes[worker.id]
	}

	/**
	 * There is a heartbeat
	 * @param {number} timeout
	 * @returns {void}
	 */
	setupWorkersHeartbeat(timeout)
	{
		// On every second check the time of the last heartbeat for each worker
		// and kill any inactive worker
		if (!global.v8debug && typeof timeout === 'number' && timeout > 0)
		{
			setTimeout(() => {
				setInterval(() => {

					let timeNow = new Date()

					for (let i in cluster.workers)
					{
						if (cluster.workers[i].isDead()) continue

						let heartbeatTime = this.getWorkerHeartbeatTime(cluster.workers[i])

						if (timeNow - heartbeatTime > timeout * 1000)
						{
							// Killing worker
							console.log(`Replacing worker ${cluster.workers[i].id}, because of missing heartbeat`)

							cluster.workers[i].process.kill('SIGTERM')
						}
					}
				}, 1000)
			}, 1000)
		}

		/**
		 * @param {Worker} worker
		 * @param {ProcessMessage} message
		 */
		const onMessage = (worker, message) => {
			switch (message.cmd)
			{
				case 'heartbeat':
					this.setWorkerHeartbeatTime(worker)
					break
				case 'killYourself':
					process.exit(4)
					break
			}
		}

		// listen for heartbeat from the workers
		cluster.on('message', onMessage)
	}
}

export {MainCluster}