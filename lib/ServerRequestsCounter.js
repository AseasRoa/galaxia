class ServerRequestsCounter
{
	#accumulatingCount = 0
	#previousCount     = 0

	/**
	 * @param {number} secondsPeriod - Interval period in seconds
	 */
	constructor(secondsPeriod = 1) {
		this.startProcessingData(secondsPeriod)
	}

	addRequest() {
		this.#accumulatingCount++
	}

	getCount() {
		return this.#previousCount
	}

	/**
	 * @param {number} secondsPeriod
	 * @returns {void}
	 * @private
	 */
	startProcessingData(secondsPeriod) {
		setInterval(() => {
			this.#previousCount     = this.#accumulatingCount
			this.#accumulatingCount = 0
		}, secondsPeriod * 1000)
	}
}

export {ServerRequestsCounter}