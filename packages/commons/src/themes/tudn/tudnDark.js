import {
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';
import tudn from '.';

/**
 * Dark variant TUDN theme definition
 * @param {Object} data - page data from API
 * @param {Object} options - extra options for theme
 * @returns {Object}
 */
export default function tudnDark(data, options) {
  return {
    ...tudn(data, options),
    isDark: true,
    variant: DARK_VARIANT,
  };
}
