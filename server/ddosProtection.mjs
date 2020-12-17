export default class
{
	/**
	 * @param {number=} secondsPeriod - The period for which the requests are counted
	 * @param {number=} maxRequests - If the requests count for a seconds period is bigger than this number, the IP address will be flagged
	 * @param {number=} blockTimeMinutes - If too many requests are detected, this is the time for which the IP address will be flagged
	 */
	constructor(secondsPeriod = 5, maxRequests = 200, blockTimeMinutes = 10)
	{
		this.maxRequests      = maxRequests
		this.blockTimeMinutes = blockTimeMinutes
		this.data             = {}

		if (secondsPeriod < 1)
		{
			console.error("Too small value for time")
		}

		setInterval(() => {
			if (0 && Object.keys(this.data).length > 0)
			{
				console.log(this.data)
			}

			let time = new Date().getTime()

			for (let ip in this.data)
			{
				if (!this.data[ip].blockedUntil)
				{
					delete this.data[ip]
				}
				else if (time >= this.data[ip].blockedUntil)
				{
					console.log("IP " + ip + " unblocked")
					delete this.data[ip]
				}
			}
		}, secondsPeriod * 1000)
	}

	/**
	 *
	 * @param {Object} request
	 * @return {boolean}
	 */
	tooManyRequests(request)
	{
		let ip = request.socket.remoteAddress

		if (!(ip in this.data))
		{
			this.data[ip] = {requests : 0}
		}

		this.data[ip].requests++

		if (!this.data[ip].blockedUntil && this.data[ip].requests > this.maxRequests)
		{
			this.data[ip].blockedUntil = new Date().getTime() + (this.blockTimeMinutes * 60 * 1000)
			console.log(`IP address ${ip} blocked for ${this.blockTimeMinutes} minutes (until ${new Date(this.data[ip].blockedUntil)})`)
		}

		if (this.data[ip].blockedUntil)
		{
			return true
		}

		return false
	}
}
