function pause()
{
	return new Promise((resolve) => {
		setTimeout(function () {
			resolve("done")
		}, 2000)
	})
}

class Hello
{
	constructor()
	{

	}

	async doSomething()
	{
		pause()
		return true
	}

	async doSomethingElse()
	{
		pause()
		return true
	}
}

export default Hello