import MongoDB from './mongodb/index.js'

/** @typedef {'mongodb'} DatabaseName */

/**
 * @param {DatabaseName} name
 */
function selectDatabaseDriver(name) {
	switch (name.toLowerCase()) {
		case 'mongodb':
			return new MongoDB()
	}

	throw new Error(`"${name}" is not recognized as a database driver`)
}

export {selectDatabaseDriver}