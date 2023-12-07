import _media from '@univision/fe-utilities/styled/mixins/media';
import _mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';
import _rem from '@univision/fe-utilities/styled/mixins/rem';
import _backgroundImage from '@univision/fe-utilities/styled/mixins/backgroundImage';
import _linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import _truncateGradient from '@univision/fe-utilities/styled/mixins/truncateGradient';
import _responsiveBackgrounds from '@univision/fe-utilities/styled/mixins/responsiveBackgrounds';

/**
 * breakpoints helper for styled components in web
 * @deprecated use `fe-utilities` instead
 * @example ${media.md`background: black;` }
 * @returns {css}
 */
export const media = _media;

/**
 * Creates a media query for a specific range
 * @deprecated use `fe-utilities` instead
 * @param {number|string} min Lower end of the range
 * @param {number|string} max Higher end of the range
 * @param {string} rules to be applied to this media query
 * @returns {string}
 */
export const mediaRange = _mediaRange;

/**
 * Helper to convert px to rem units with styled components
 * @deprecated use `fe-utilities` instead
 * @example font-size: ${rem(15)}; or font-size: ${rem('15px')};
 * @example font-size @{rem`15`};
 * @param {number|string} number - number in px to convert
 * @param {number} [base = 16] - base
 * @returns {string}
 */
export const rem = _rem;

/**
 * Receives a list of images that will display as a background image per
 * breakpoint.
 * @deprecated use `fe-utilities` instead
 * @example images = {xs: 'image-480.jpg', lg: 'image-768.jpg'}: Will return
 * the CSS for a responsive display of the images in their respective
 * breakpoints.
 * @param {Object} images - breakpoint/images list
 * @returns {*}
 */
export const responsiveBackgrounds = _responsiveBackgrounds;

/**
 * Gets background rule
 * @deprecated use `fe-utilities` instead
 * @param {Object} theme Set of themes properties
 * @returns {*}
 */
export const getBackgroundRule = _backgroundImage;

/**
 * Get truncate gradient styles
 * @deprecated use `fe-utilities` instead
 * @param {Object} options for the gradient
 * @returns {string}
 */
export const getTruncateGradientStyles = _truncateGradient;

/**
 * Generates a string for a horizontal gradient
 * @param {string} end color of gradient
 * @param {string} start color of gradient
 * @returns {string}
 */
export const getHorizontalThemeGradient = _linearGradient;

/**
 * Sets the number of lines to display with ellipsis
 * @param {number} lines - number of lines to display
 * @returns {string}
 */
export function numberOfLines(lines) {
  return `
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${lines};
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
