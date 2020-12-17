class RequestsCounter
{
	#previousCount     = 0
	#accumulatingCount = 0

	constructor(period = 1000)
	{
		setInterval(() => {
			this.#previousCount     = this.#accumulatingCount
			this.#accumulatingCount = 0
		}, period)
	}

	addRequest()
	{
		this.#accumulatingCount++
	}

	getCount()
	{
		return this.#previousCount
	}
}

export default RequestsCounter