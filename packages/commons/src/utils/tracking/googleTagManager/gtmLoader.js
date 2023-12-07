// eslint-disable-next-line import/no-cycle
import features from '../../../config/features';
// eslint-disable-next-line import/no-cycle
import Store from '../../../store/store';
// eslint-disable-next-line import/no-cycle
import { getTitleShow } from '../../../store/storeHelpers';

/**
 * Google Tag Manager loader
 * @param {string} id GTM ID
 * @param {string} dataLayerName Data layer name
 * @param {string} parameters GTM parameters
 */
export default function load(id, dataLayerName = 'dataLayer', parameters) {
  /* eslint-disable */
  try {
    const startEvent = {
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    };
    if (features.shows.showsRedesign())
      startEvent.title = getTitleShow(Store);
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push(
        window.utag_data,
        startEvent,
      );
      const f = d.getElementsByTagName('head')[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.type = 'text/javascript';
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl + (parameters || '');
      f.appendChild(j);
    })(window, document, 'script', dataLayerName, id);
  } catch (e) {
  }
}
