/**
 * This function is used to load IO modules
 *
 * @return {Promise}
 */
class ioRequests
{
	/**
	 * @param {string} componentName
	 * @param {string} className
	 * @param {Array} constructorArguments
	 * @param {string} methodName
	 * @param {Array} methodArguments
	 * @param {string} sessionKey
	 * @param {string} ajaxVersion
	 *
	 * @returns {Promise<unknown>}
	 */
	request(componentName, className, constructorArguments, methodName, methodArguments, sessionKey, ajaxVersion)
	{
		return new Promise((resolve) => {
			let xhr         = new XMLHttpRequest()
			let contentType = 'application/json; charset=utf-8'

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4)
				{
					if (xhr.status === 200)
					{
						let responseType = (xhr.getResponseHeader('X-Response-Type') || '').toLowerCase()

						switch (responseType)
						{
							case 'error' :
							{
								resolve(new Error(JSON.parse(xhr.response)['error']))
								break
							}

							case  'json' :
							{
								resolve(JSON.parse(xhr.response || 'null'))
								break
							}

							case 'string' :
							{
								resolve(xhr.response)
								break
							}

							default :
							{
								resolve(xhr.responseText)
							}
						}
					}
					else
					{
						let error_connection = `Oops, it looks that we have problems.<br><br>If this error persists, please contact with administrator`

						resolve(new Error(error_connection))
					}
				}
			}

			let url = `/?${componentName}/${className}/${methodName}`
			xhr.open('POST', url)

			let serializedArguments = ''
			let headers             = {
				'X-Requested-With' : 'xmlhttprequest',
				'Accept'           : contentType,
				'Content-Type'     : contentType,
				'Cache-Control'    : 'no-cache',
				'x-component-name' : componentName,
				'x-method-name'    : methodName,
				'x-io-name'        : className,
				'x-session-key'    : sessionKey,
				'x-ajax-version'   : ajaxVersion
			}

			this.setRequestHeaders(xhr, headers)

			serializedArguments = this.argumentsToPostParameters(constructorArguments)

			if (serializedArguments instanceof Error)
			{
				console.error(serializedArguments)

				return
			}

			if (serializedArguments)
			{
				xhr.setRequestHeader('x-constructor-arguments', serializedArguments)
			}

			serializedArguments = this.argumentsToPostParameters(methodArguments)

			if (serializedArguments instanceof Error)
			{
				console.error(serializedArguments)

				return
			}

			xhr.responseType = 'text' // in Firefox prevents an error message when ? is used in the url
			xhr.send(serializedArguments)
		})
	}

	/**
	 * @param xhr
	 * @param {Object} headers
	 */
	setRequestHeaders(xhr, headers)
	{
		for (let headerName in headers)
		{
			xhr.setRequestHeader(headerName, headers[headerName])
		}
	}

	/**
	 * @param args
	 *
	 * @return {string|Error}
	 */
	argumentsToPostParameters(args)
	{
		let arr = Array.from(args)

		if (arr.length > 1)
		{
			return new Error('Method arguments must contain only one object')
		}

		let parameters = ''

		if (arr.length === 1)
		{
			parameters = JSON.stringify(arr[0])
		}

		return parameters
	}
}