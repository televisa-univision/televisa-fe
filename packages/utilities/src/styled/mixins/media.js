/**
 * @module styled/mixins/media
 */
import { css } from 'styled-components';

import { APP_BREAKPOINTS } from '../constants';

const breakpoints = Object.keys(APP_BREAKPOINTS);

/**
 * Breakpoints mixin for styled components in web
 * @mixin
 * @example ${ media.md`background: black;` }
 * @returns {css}
 */
export default breakpoints.reduce((acc, label) => {
  acc[label] = (...args) => css`
      @media (min-width: ${APP_BREAKPOINTS[label]}px) {
        ${css(...args)};
      }
    `;

  return acc;
}, {
  breakpoints,
});
