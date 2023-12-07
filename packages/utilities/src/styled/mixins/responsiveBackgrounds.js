/**
 * @module styled/mixins/responsiveBackgrounds
 */

import { css } from 'styled-components';

import media from './media';

const { breakpoints } = media;

/**
 * Receives a list of images that will display as a background image per
 * breakpoint.
 * @mixin
 * @example images = {xs: 'image-480.jpg', lg: 'image-768.jpg'}: Will return
 * the CSS for a responsive display of the images in their respective
 * breakpoints.
 * @param {Object} images - breakpoint/images list
 * @returns {Object} css styled
 */
export default function responsiveBackgrounds(images = {}) {
  const result = [];

  for (let b = 0, len = breakpoints.length, bp, image; b < len; b += 1) {
    bp = breakpoints[b];
    image = images?.[bp];
    if (image) {
      result.push(...css`${media[bp]`background-image: url(${image})`}`);
    }
  }

  return css`${result}`;
}
