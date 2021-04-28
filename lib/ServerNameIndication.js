import {readFileSync} from 'fs'
import {createSecureContext} from 'tls'
import './typedefs.js'

/** @type {string} */
const defaultCiphers = [
	'ECDHE-ECDSA-CHACHA20-POLY1305',
	'ECDHE-RSA-CHACHA20-POLY1305',
	'ECDHE-ECDSA-AES128-GCM-SHA256',
	'ECDHE-RSA-AES128-GCM-SHA256',
	'ECDHE-ECDSA-AES256-GCM-SHA384',
	'ECDHE-RSA-AES256-GCM-SHA384',
	'DHE-RSA-AES128-GCM-SHA256',
	'DHE-RSA-AES256-GCM-SHA384',
	'ECDHE-ECDSA-AES128-SHA256',
	'ECDHE-RSA-AES128-SHA256',
	'ECDHE-ECDSA-AES128-SHA',
	'ECDHE-RSA-AES256-SHA384',
	'ECDHE-RSA-AES128-SHA',
	'ECDHE-ECDSA-AES256-SHA384',
	'ECDHE-ECDSA-AES256-SHA',
	'ECDHE-RSA-AES256-SHA',
	'DHE-RSA-AES128-SHA256',
	'DHE-RSA-AES128-SHA',
	'DHE-RSA-AES256-SHA256',
	'DHE-RSA-AES256-SHA',
	'ECDHE-ECDSA-DES-CBC3-SHA',
	'ECDHE-RSA-DES-CBC3-SHA',
	'EDH-RSA-DES-CBC3-SHA',
	'AES128-GCM-SHA256',
	'AES256-GCM-SHA384',
	'AES128-SHA256',
	'AES256-SHA256',
	'AES128-SHA',
	'AES256-SHA',
	'DES-CBC3-SHA',
	'!DSS'
].join(':')

class ServerNameIndication
{
	/** @private {Object<string, {}>} */
	#certsDictionary = {}

	/**
	 * @param {ServerConfig} serverConfig
	 */
	constructor(serverConfig) {
		this.#certsDictionary = this.readCerts(serverConfig.ssl)
	}

	/**
	 * @param {string} hostname
	 * @param {function(Error|null, SecureContext)} callback
	 * @returns {void}
	 * @public
	 */
	createContext(hostname, callback) {
		let errorMessage = ''

		// if the hostname starts with "www.", but it is not found in the configuration,
		// remove the "www." part
		if (
			(this.#certsDictionary.indexOf(hostname) === -1)
			&& (hostname.substr(0, 4) === 'www.')
		)
			hostname = hostname.substr(4)

		if (!(hostname in this.#certsDictionary))
			errorMessage = `Unknown host ${hostname}`

		const ctx   = createSecureContext(this.#certsDictionary[hostname])
		const error = (errorMessage) ? new Error(errorMessage) : null

		callback(error, ctx)
	}

	/**
	 * Checks whether the cert string is valid. To be valid it must only contain
	 * Base64 characters or "-", which is used to describe begin and end sections
	 * https://base64.guru/learn/base64-characters
	 * @param {string} string
	 * @returns {boolean}
	 * @private
	 */
	isCertStringValid(string) {
		return string.search(/[^A-Za-z0-9+/-]/) > -1
	}

	/**
	 * Certs could be provided directly as strings, but also as file names.
	 * If file name is used, replace it with the contents from the file.
	 * @param {Object<string, ServerConfigSSL>} serverConfigSSL
	 * @returns {Object<string, ServerConfigSSL>}
	 * @private
	 */
	readCerts(serverConfigSSL) {
		/** @type {Object<string, ServerConfigSSL>} */
		let allCerts = {}

		for (let hostname in serverConfigSSL) {
			/** @type {ServerConfigSSL} */
			let hostCerts     = {ca : '', key : '', cert : ''}
			let hostConfigSSL = serverConfigSSL[hostname]

			// Fetch certs

			for (let key in hostCerts) {
				if (!(key in hostConfigSSL)) continue

				const isFilePath = (hostConfigSSL[key].search(/[.:\\]/) > -1)

				if (isFilePath) {
					const file       = hostConfigSSL[key]
					let fileContents = ''

					try {
						fileContents = readFileSync(file).toString()
					} catch (error) {
						throw new Error(`Failed to read SSL files for host ${hostname}`)
					}

					if (!this.isCertStringValid(fileContents))
						throw new Error(`Wrong file contents for ${file}`)

					hostCerts[key] = fileContents
				}
			}

			// Add "ciphers"
			if (!hostConfigSSL.ciphers) {
				hostCerts.ciphers = defaultCiphers
			}
			else {
				hostCerts.ciphers = (hostConfigSSL.ciphers instanceof Array)
					? hostConfigSSL.ciphers.join(':')
					: hostConfigSSL.ciphers
			}

			allCerts[hostname] = hostCerts
		}

		return allCerts
	}
}

export {ServerNameIndication}