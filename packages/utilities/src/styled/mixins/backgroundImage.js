/**
 * @module styled/mixins/backgoundImage
 */
import { css } from 'styled-components';

import isValidObject from '../../helpers/common/isValidObject';

import responsiveBackgrounds from './responsiveBackgrounds';

/**
 * Get background css rule depending of the theme object
 * could be gradient, responsive backgrounds or a single background
 * @mixin
 * @param {Object} theme - set of themes properties
 * @param {Object} theme.backgroundImages - images for each breakpoints
 * @param {string} theme.backgroundImage - image path to set as single background image
 * @param {string} theme.backgroundGradient - css gradient value
 * @returns {*}
 */
export default function backgroundImage({
  backgroundImages: images,
  backgroundImage: image,
  backgroundGradient: gradient,
} = {}) {
  if (isValidObject(images)) {
    return responsiveBackgrounds(images);
  }

  if (image) {
    return css`background-image: url(${image})`;
  }

  if (gradient) {
    return css`background-image: ${gradient}`;
  }

  return 'background-image: none';
}
