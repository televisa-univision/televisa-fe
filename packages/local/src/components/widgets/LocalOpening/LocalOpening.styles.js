import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  APP_BREAKPOINTS,
} from '@univision/fe-commons/dist/utils/styled/constants';
import mediaRange from '@univision/fe-utilities/styled/mixins/mediaRange';

/**
 * Consolidates all CSS for the containers
 * @param {boolean} hasEnhancement - Feature flag to show new design enhancements
 * @returns {function}
 */
const getSettings = (hasEnhancement) => {
  // @TODO: Remove the "if" condition (and hasEnhancement param)
  //  after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  if (!hasEnhancement) {
    return css`
      && {
        margin-bottom: 16px;
        padding: 0;

        ${media.md`
          margin-bottom: 0;
          padding: 0.5%;
        `}
      }
    `;
  }

  return css`
    && {
      margin-bottom: 16px;
      padding: 0;

      ${media.md`
        margin-bottom: 0;
        max-height: 570px;
        ${mediaRange(APP_BREAKPOINTS.sm, APP_BREAKPOINTS.md) && `
          max-height: 488px;
        `}
      `}

      ${media.lg`
        max-height: 610px;
      `}

      ${media.xl`
        max-height: 622px;
      `}
    }
  `;
};

/**
 * Sets up the widget's wrapper CSS
 * @param {boolean} hasEnhancement - Feature flag to show new design enhancements
 * @returns {function}
 */
const getWrapperCSS = (hasEnhancement) => {
  // @TODO: Remove the "if" condition (and hasEnhancement param)
  //  after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  if (!hasEnhancement) return css`width: 100%;`;

  return css`
    display: block;
    width: 100%;

    ${media.md`
      display: grid;
      grid-column-gap: 6px;
      grid-row-gap: 8px;
      grid-template-columns: 470px repeat(2, 240px);
    `}

    ${media.lg`
      display: grid;
      grid-column-gap: 19px;
      grid-row-gap: 22px;
      grid-template-columns: 610px repeat(2, 294px);
    `}

    ${media.xl`
      grid-template-columns: 622px repeat(2, 300px);
    `}
  `;
};

export default {
  adWrapper: css`
    margin: 2px 0 16px;
    width: 100%;
  `,
  // @TODO: all hasEnhancement params after the new SquareCard is deployed on Jan/2021
  //  and feature flag showEnhancement is removed
  latestContentContainer: ({ hasEnhancement }) => css`
    ${getSettings(hasEnhancement)}
  `,
  leadCardContainer: ({ hasEnhancement }) => css`
    ${getSettings(hasEnhancement)}
  `,
  weatherCardContainer: ({ hasEnhancement }) => css`
    ${getSettings(hasEnhancement)}
  `,
  wrapper: ({ hasEnhancement }) => css`
    ${getWrapperCSS(hasEnhancement)}
  `,
};
