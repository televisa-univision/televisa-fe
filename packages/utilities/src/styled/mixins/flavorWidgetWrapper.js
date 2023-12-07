/**
 * @module styled/mixins/ottWrapper
 */
import { css } from 'styled-components';

import isValidObject from '../../helpers/common/isValidObject';

import media from './media';

/**
 * Overrides the widget wrapper style with a provided flavor and theme options
 * @param {Object} backgroundImage - object that contains all background images
 * @param {string} flavor - flavor of the widget
 * @param {string} primary - primary color of the theme
 * @param {bool} enablePadding - enable a pading-top
 * @returns {string}
 */
export default function flavorWidgetWrapper({
  backgroundImage, flavor, primary, enablePadding,
}) {
  // If no flavor, then don't override anything
  if (!flavor) {
    return null;
  }

  return css`
    background-color: ${primary};
    padding-bottom: 7px;
    padding-top: ${enablePadding ? '24px' : '0px'};

    ${isValidObject(backgroundImage) && css`
      background-image: url(${backgroundImage?.mobile});
      background-position: top right;
      background-repeat: no-repeat;

      ${backgroundImage?.desktop && media.sm`
        background-image: url(${backgroundImage.desktop})
      `}
    `}
  `;
}
