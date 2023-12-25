/* eslint-disable */
// @ts-nocheck

/**
 * This IIFE tries ES6 code in the browser,
 * and if it fails, it rewrites the whole
 * page with an error message.
 */
(function() {
  try {
    eval('function*a(){}; async function b(){}; 1??2;')

    // Delete the script tag, it's not needed to be present
    const scripts = document.getElementsByTagName('script')

    scripts[scripts.length - 1].remove()
  }
  catch (e) {
    const oldBrowserMessage = 'Oops, it looks that your browser is'
      + ' too old for this website. Please, use a modern browser :)'

    document.write(oldBrowserMessage)
    window.stop()
  }
}())
