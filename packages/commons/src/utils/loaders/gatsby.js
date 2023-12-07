/**
 * loadTwitterScript
 * @param   {function} resolve callback on success
 * @param   {function} reject  callback on error
 * @returns {Promise} resolves true when script is loaded, rejects with an error if unable to load.
 */
export function doLoad(resolve, reject) {
  if (global.window.GATSBY) return resolve(global.window.GATSBY);

  const script = document.createElement('script');

  script.src = 'https://static.univision.com/external-content/embed.js';
  script.async = true;
  script.id = 'gatsby-script';
  script.type = 'text/javascript';
  script.onerror = reject;
  script.onload = () => resolve(global.window.GATSBY);

  global.document.getElementsByTagName('head')[0].appendChild(script);
  return null;
}

/**
 * call doLoad within promise
 * @param {string} id the DOM node id of the widget
 * @returns {Object} the promise
 */
export default function loadGatsbyScript() {
  return new Promise(doLoad);
}
