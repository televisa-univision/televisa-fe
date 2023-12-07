// eslint-disable-next-line import/no-cycle
import Store from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { isOptimizeAntiFlickerEnabled, getRequestParams } from '../../store/storeHelpers';
import optimizeAntiFlickerUrls from '../data/optimize/antiFlicker.json';
import redirectParams from '../data/optimize/redirectParams.json';
// eslint-disable-next-line import/no-cycle
import { isValidArray } from '../../utils/helpers';

/** Espected json in optimizeAntiFlickerUrls
{
  "global": [],
  "deportes": [],
  "noticias": [],
  "entretenimiento": []
} */
/** Espected json in redirectParams
['expected', 'params', 'to', 'look', 'for']
*/
export default {
  // Enable Google Optimize anti-flicker script
  antiFlicker: () => {
    let hasParam = false;
    const currentParams = Object.keys(getRequestParams(Store));
    // If current A/B test is a redirect one, we expect a param present after redirecting
    // so if param is found turn off the antiflicker
    if (isValidArray(redirectParams) && isValidArray(currentParams)) {
      hasParam = redirectParams.some(param => currentParams.includes(param));
    }

    return !hasParam && isOptimizeAntiFlickerEnabled(
      Store,
      optimizeAntiFlickerUrls
    );
  },
};
