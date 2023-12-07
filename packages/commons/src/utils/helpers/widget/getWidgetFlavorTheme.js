import { FLAVOR_PRENDE_TV } from '../../../constants/widgetFlavors';
import prendeTv from '../../../themes/prendetv';

/**
 * Gets the corresponding theme on the requested widget flavor
 * @param {string} flavor - widget flavor
 * @returns {Object}
 */
function getWidgetFlavorTheme(flavor) {
  switch (flavor) {
    case FLAVOR_PRENDE_TV:
      return prendeTv();

    default:
      return {};
  }
}

export default getWidgetFlavorTheme;
