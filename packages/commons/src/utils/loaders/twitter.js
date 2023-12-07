/**
 * loadTwitterScript
 * @param   {function} resolve callback on success
 * @param   {function} reject  callback on error
 */
export function doLoad(resolve, reject) {
  if (global.window.twttr) resolve(global.window.twttr);

  const script = document.createElement('script');

  script.src = '//platform.twitter.com/widgets.js';
  script.async = true;
  script.type = 'text/javascript';
  script.onerror = reject;
  script.onload = () => resolve(global.window.twttr);

  global.document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * call doLoad within promise
 * @returns {Object} the promise
 */
export default function loadTwitterScript() {
  return new Promise(doLoad);
}
