"use strict"

import $fs from "fs"
import $path from "path"
import $cluster from "cluster"
import $ipc from "./ipc.mjs"
import $os from "os"

const __filename = new URL(import.meta.url).href.replace("file:///", "")
const __dirname  = $path.dirname(__filename)

$cluster.setupMaster({
	exec : $path.resolve(__dirname + "/worker.mjs"),
	args : ["--experimental-loader"]
})
$cluster.schedulingPolicy = $cluster.SCHED_RR // SCHED_RR = Round Robin, SCHED_NONE = by the OS

// Fork workers
let flagForked     = 0 // -1 = able to restart workers, 0 = restarting workers, positive value = counting workers until their number becomes what we want, and then the value is set to -1
let flagRestarting = false

function developmentMode()
{
	if (developmentMode.devmode !== undefined) return developmentMode.devmode

	let devmode = undefined

	// check 1
	for (let i in process.argv)
	{
		if (process.argv[i].indexOf("production") > -1)
		{
			devmode = false
		}
		else if (process.argv[i].indexOf("develop") > -1) devmode = true
	}

	// check 2
	if (devmode === undefined)
	{
		if (process.env["NODE_ENV"] && process.env["NODE_ENV"].indexOf("develop") !== -1)
		{
			devmode = true
		}
	}

	// set
	developmentMode.devmode = devmode || false

	return developmentMode.devmode
}

developmentMode.devmode = undefined

if (developmentMode())
{
	console.info("-=-=-= start (development mode) =-=-=-")
}
else
{
	console.info("-=-=-= start (production mode) =-=-=-")
}

class Cluster
{
	/**
	 *
	 * @param {string} appPath
	 * @param {number} workersCount
	 * @param {number=} workersTimeout
	 */
	constructor({
						appPath,
						workersCount,
						workersTimeout = 30 // seconds
					})
	{
		appPath = $path.resolve(appPath)

		this.workersCount   = workersCount || 1
		this.workersTimeout = workersTimeout
		this.forkOptions    = {
			GALAXIA_APP_PATH         : $path.resolve(appPath),
			GALAXIA_DEVELOPMENT_MODE : developmentMode(),
			GALAXIA_PRODUCTION_MODE  : !developmentMode()
		}
		this.workersToKill  = {}

		this.start()
		this.setupIPC()
	}

	forkWorkers()
	{
		let count = this.workersCount

		if ($cluster.isMaster !== true)
		{
			return
		}

		if (count === 0)
		{
			count = $os.cpus().length
		}
		else if (count < 0)
		{
			count = 1
		}

		let workers_keys      = Object.keys($cluster.workers)
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
				let id = workers_keys[i]

				if (developmentMode())
				{
					// this way the process is killed faster
					$cluster.workers[id].process.kill()
				}
				else
				{
					// this way the process is killed after the http timeout ends
					$cluster.workers[id].kill("SIGTERM")
				}
			}
		}
		else
		{
			for (let i = 0; i < count; i++)
			{
				$cluster.fork(this.forkOptions)
			}
		}
	}

	setupIPC()
	{
		$ipc.on("check-restarting", (message, callback) => {
			callback(flagRestarting)
		})

		$ipc.on("restart", (message, callback) => {

			if (flagRestarting === true)
			{
				console.warn("The server is currently restarting!")
			}
			else
			{
				flagRestarting = true

				console.warn("\n\nRESTARTING SERVER (please wait until you see \"SERVER RESTARTED\")")

				let currentWorkersCount = $cluster.workers
				let maxWorkersCount     = this.workersCount
				let newWorkersCount     = 0

				// make list of current workers, they will be killed later
				for (let i in $cluster.workers)
				{
					this.workersToKill[$cluster.workers[i].process.pid] = $cluster.workers[i]
				}

				// create brand new workers

				// this timeout is mostly because the "RESTARTING" letters are sometimes shown after the following message in the console
				setTimeout(() => {
					let processWord = (maxWorkersCount === 1) ? "process" : "processes"

					console.log(`\n-- Restarting phase 1 (of 2): Creating ${maxWorkersCount} new ${processWord}...\n`)

					for (let i = 0; i < maxWorkersCount; i++)
					{
						let worker = $cluster.fork(this.forkOptions)

						// "online" is emitted when the worker is working
						worker.on("online", () => {
							newWorkersCount++

							//console.log(newWorkersCount + " " + max_workers_count)

							if (newWorkersCount === maxWorkersCount)
							{
								// this timeout is because it takes time for the servers on the worker to be created
								// and their message is printed with some delay
								setTimeout(() => {
									console.log(`\n-- Restarting phase 2 (of 2): Killing old ${processWord}...\n`)

									// all new workers are now listening
									for (let i in this.workersToKill)
									{
										this.workersToKill[i].send({cmd : "killYourself"})
										delete this.workersToKill[i]
									}
								}, 1000)
							}
						})
					}
				}, 100)
			}

			if (typeof callback === "function") callback(null, flagRestarting)
		})
	}

	start()
	{
		this.workersHeartbeat(this.workersTimeout)

		let timeouts = []

		$cluster.on("fork", (worker) => {
			timeouts[worker.id] = setTimeout(() => {
				console.error("Something must be wrong with the connection ...")
			}, 10000)
		})

		// when a worker is connected to the net and listen
		$cluster.on("listening", (worker) => {
			clearTimeout(timeouts[worker.id])

			let currentWorkersCount  = Object.keys($cluster.workers).length
			let expectedWorkersCount = this.workersCount + Object.keys(this.workersToKill).length

			if (currentWorkersCount >= expectedWorkersCount)
			{
				/*
				if (Object.keys(this.workersToKill).length > 0)
				{
					// this timeout is mostly because the "HTTP listen on..." letters are sometimes shown before the following message in the console
					setTimeout(() => {
						console.log("-- Restarting phase 2 (of 2): Killing old processes...")

						for (let i in this.workersToKill)
						{
							this.workersToKill[i].send({cmd : "killYourself"})
							delete this.workersToKill[i]
						}
					}, 1000)

				}
				*/
			}
		})

		process.stdin.resume()//so the program will not close instantly

		// When process dies, replace it.
		$cluster.on("exit", (worker, code, signal) => {
			clearTimeout(timeouts[worker.id])

			//console.log("worker = " + worker + " code = " + code + " signal = " + signal)

			// when restarting the server
			if (code === 4)
			{
				console.warn(`Process ${worker.id} (process id ${worker.process.pid} closed)`)

				// mark when the server is restarted
				if (
					flagRestarting === true
					&& Object.keys($cluster.workers).length === this.workersCount
					&& Object.keys(this.workersToKill).length === 0)
				{
					console.warn("\nSERVER RESTARTED\n\n")
					flagRestarting = false
				}
			}
			// termination due to worker timeout (endless loop)
			else if (signal === "SIGTERM")
			{
				console.warn(`Process ${worker.id} (process id ${worker.process.pid}) terminated with SIGTERM`)
				$cluster.fork(this.forkOptions)
			}
			// any other case, like manual termination of the process
			else
			{
				console.warn(`(${signal}) Process ${worker.id} (process id ${worker.process.pid}) died`)
				$cluster.fork(this.forkOptions)
			}
		})


		// watching file changes
		function watcher(dir, extensions)
		{

			if ($fs.lstatSync(dir).isDirectory())
			{
				let subDir = $fs.readdirSync(dir)

				for (let i in subDir)
				{
					let newDir = dir + $path.sep + subDir[i]

					if ($fs.lstatSync(newDir).isDirectory())
					{
						//watcher(newdir, extensions)
					}
				}
			}
		}

		if (0)
		{
			let wtof = true //watch timeout flag

			$fs.watch(
				__dirname,
				{persistent : true, recursive : true},
				(event, filename) => {

					if (filename && filename.indexOf("node_modules") !== -1)
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
	 * There is a heartbeat
	 *
	 * @param {number} timeout
	 */
	workersHeartbeat(timeout)
	{
		timeout = timeout || this.workersTimeout

		// On every second check the time of the last heartbeat for each worker
		// and kill any inactive worker
		if (!global.v8debug && typeof timeout === "number" && timeout > 0)
		{
			setTimeout(() => {
				setInterval(() => {

					let time_now = new Date()

					for (let i in $cluster.workers)
					{
						if ($cluster.workers[i].isDead()) continue
						let heartbeatTime = $cluster.workers[i]["__heartbeatTime"]

						if (time_now - heartbeatTime > timeout * 1000)
						{
							// Killing worker
							console.log(`Replacing worker ${$cluster.workers[i].id}, because of missing heartbeat`)

							$cluster.workers[i].process.kill("SIGTERM")
						}
						else
						{
							// Set __heartbeatTime to true now and if on the next interval it is still true -> kill it
							//$cluster.workers[i]["__heartbeatTime"] = true
						}
					}
				}, 1000)
			}, 1000)
		}

		// listen for heartbeat from the workers
		$cluster.on("message", (worker, msg) => {
			if (msg === undefined)
			{
				msg    = worker
				worker = $cluster.workers[msg["worker"]]
			} // old version

			if (msg["cmd"] === "heartbeat")
			{
				if (worker)
				{
					worker["__heartbeatTime"] = new Date()
				}
			}

			if (msg["cmd"] === "killYourself")
			{
				process.exit(4)
			}
		})
	}
}

export default Cluster