import { Console } from 'node:console'
import { format, inspect } from 'node:util'

/**
 * @typedef {'bgBlack'
 * | 'bgRed'
 * | 'bgGreen'
 * | 'bgYellow'
 * | 'bgBlue'
 * | 'bgMagenta'
 * | 'bgCyan'
 * | 'bgWhite'
 * | 'bgGray'
 * | 'bgRedBright'
 * | 'bgGreenBright'
 * | 'bgYellowBright'
 * | 'bgBlueBright'
 * | 'bgMagentaBright'
 * | 'bgCyanBright'
 * | 'bgWhiteBright'
 * } InspectBackgroundColors
 */

/**
 * @typedef {'black'
 * | 'red'
 * | 'green'
 * | 'yellow'
 * | 'blue'
 * | 'magenta'
 * | 'cyan'
 * | 'white'
 * | 'gray'
 * | 'redBright'
 * | 'greenBright'
 * | 'yellowBright'
 * | 'blueBright'
 * | 'magentaBright'
 * | 'cyanBright'
 * | 'whiteBright'
 * } InspectForegroundColors
 */

/**
 * @typedef {'reset'
 * | 'bold'
 * | 'italic'
 * | 'underline'
 * | 'strikethrough'
 * | 'hidden'
 * | 'dim'
 * | 'overlined'
 * | 'blink'
 * | 'inverse'
 * | 'doubleunderline'
 * | 'framed'
 * } InspectModifiers
 */

/**
 * @typedef {InspectBackgroundColors
 * | InspectForegroundColors
 * | InspectModifiers
 * } AllColors
 */

/**
 * https://nodejs.org/api/util.html#util_customizing_util_inspect_colors
 *
 * @typedef InspectStyles
 * @type {object}
 * @property {AllColors} [bigint]
 * @property {AllColors} [boolean]
 * @property {AllColors} [date]
 * @property {AllColors} [module]
 * @property {AllColors} [name]
 * @property {AllColors} [null]
 * @property {AllColors} [number]
 * @property {AllColors} [regexp]
 * @property {AllColors} [special]
 * @property {AllColors} [string]
 * @property {AllColors} [symbol]
 * @property {AllColors} [undefined]
 */

class ColoredConsole {
  #colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
  }

  /**
   * @param {InspectStyles} inspectStyles
   */
  constructor(inspectStyles) {
    setInspectStyles(inspectStyles)
  }

  /**
   * @param {Console} console
   */
  assignTo(console) {
    /** @type {string[][]} */
    const labelColors = [
      ['warn', this.#colors.yellow],
      ['error', this.#colors.red],
      ['log', this.#colors.dim],
      ['info', this.#colors.blue]
    ]

    const logger = new Console(process.stdout, process.stderr)

    labelColors.forEach((pair) => {
      const method = pair[0] ?? ''
      const color = pair[1] ?? ''
      const reset = '\x1b[0m'
      /** @type {import('util').InspectOptions} */
      const inspectOptions = {
        showHidden: true,
        depth: null,
        colors: true
      }

      /** @type {Object<string, function(...any):void>} */
      const replacement = {}

      // this must be 'function ()'
      replacement[method] = function replacementFunction(...args) {
        const time = getTimeLabel(false)
        const title = `\x1b[37m${time}${reset} [${process.pid}] ${color}${method}${reset}: `

        let txt = `${title}`

        /*
         * When console.timeEnd() is called somewhere else,
         * here it appears as a normal 'log'.
         * Its arguments are like: '%s: %s' 'label' '2.797ms'.
         * The way to detect it is to check for %s.
         */
        if (
          args.length > 0
          && typeof args[0] === 'string'
          && args[0].includes('%s')
        ) {
          txt += format(...args)
        }
        else {
          /*
           * Each argument is inspect()-ed and printed on its own,
           * separated from the others
           */
          for (const arg of args) {
            txt += reset
            txt += (arg instanceof Object) ? '\n' : ''
            txt += inspect(arg, inspectOptions)
            txt += ' '
          }
        }

        txt += reset

        if (method === 'error' || method === 'warn') {
          logger.error(txt)
        }
        else {
          logger.log(txt)
        }
      }

      Object.assign(console, replacement)
    })
  }
}

/**
 * @param {boolean} [addMilliseconds]
 * @returns {string}
 */
function getTimeLabel(addMilliseconds = false) {
  const date = new Date()
  const hms = (date.toTimeString().split(' ')[0] ?? '') // HH:MM:SS
  const milliseconds = (addMilliseconds) ? `.${date.getMilliseconds().toString()}` : ''

  return `${hms}${milliseconds}`
}

/**
 * Set custom colors for the different types printed by the console
 *
 * @see https://nodejs.org/api/util.html#customizing-utilinspect-colors
 * @param {InspectStyles} inspectStyles
 */
function setInspectStyles(inspectStyles) {
  Object.assign(inspect.styles, inspectStyles)
}

export { ColoredConsole }
