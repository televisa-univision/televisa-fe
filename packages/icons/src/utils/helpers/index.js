import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import toCamelCase from '@univision/fe-utilities/helpers/string/toCamelCase';

import iconsList from '../../assets/icons/icons.json';
import iconsConstants from '../../constants/icons';
import { GREY_BLACK, WHITE } from '../../constants/colors';

/**
 * Native/web icon sizes
 */
export const iconSizes = {
  xxsmall: 10,
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 50,
  extraLarge: 56,
};

/**
 * Function for getting svg size
 * @param {number|string|Array} size - size provided
 * @returns {number|array}
 */
export function getIconSize(size) {
  if (isValidArray(size)) {
    return { width: size[0], height: size[1] };
  }
  const newSize = Number.isFinite(parseInt(size, 10)) ? size : iconSizes[size] || iconSizes.medium;

  return { width: newSize, height: newSize };
}

/**
 * Function for getting fill color variant
 * @param {string} variant - the variant name (dark|light)
 * @returns {?string}
 */
export function getIconVariant(variant) {
  return {
    dark: GREY_BLACK,
    light: WHITE,
  }[variant];
}

/**
 * Get plain object with icons name and type
 * @returns {Object}
 */
export function getIconsWithType() {
  const types = Object.keys(iconsList);
  const iconsWithType = {};

  for (let t = 0, tlen = types.length; t < tlen; t += 1) {
    const type = types[t];
    const values = iconsList[type];

    for (let i = 0, len = values.length; i < len; i += 1) {
      iconsWithType[values[i]] = type;
    }
  }

  return iconsWithType;
}

/**
 * Format properties to a conventional icons props structure.
 *
 * @param {Object} options - values that should be format as icon props
 * @param {string} [options.className] - modifier class
 * @param {string} [options.fill] - fill color, default: svg file color
 * @param {string} options.name - the name of icon to load
 * @param {(string|number|Array)} [options.size='medium'] - name size or custom number size
 * @param {(Object|style)} [options.style] - additional styles
 * @param {string} [options.viewBox='0 0 256 256'] - viewBox size, default: 0 0 256 256
 * @returns {string}
 */
export function formatIconProps({
  className,
  fill,
  name,
  size = iconsConstants.DEFAULT_SIZE,
  style,
  viewBox = iconsConstants.DEFAULT_VIEWBOX,
}) {
  const iconName = toCamelCase(name);
  const iconSize = getIconSize(size);
  return {
    iconName,
    iconProps: {
      'data-name': iconName,
      className,
      fill,
      height: iconSize.height,
      style: style || {},
      width: iconSize.width,
      viewBox,
    },
  };
}
