/**
 * add CarSaver widget to component container;
 * @param {string} WIDGET_ID the ID of the container
 * @returns {Promise} resolves true when script is loaded, rejects with an error if unable to load.
 */
export function doLoad(WIDGET_ID) {
  return (resolve, reject) => {
    if (global.window.carsaverWidgetSearchInit) return resolve(true);
    const script = document.createElement('script');

    script.src = 'https://widgets.carsaver.com/v2/js/embed.min.js';
    script.async = true;
    script.id = 'carsaver-script';
    script.type = 'text/javascript';
    script.onerror = reject;
    script.onload = () => resolve(global.window.carsaverWidgetSearchInit);

    global.document.getElementById(WIDGET_ID).appendChild(script);
    return null;
  };
}

/**
 * call doLoad within promise
 * @param {string} id the DOM node id of the widget
 * @returns {Object} the promise
 */
export default function loadCarSaverScript(id) {
  return new Promise(doLoad(id));
}
