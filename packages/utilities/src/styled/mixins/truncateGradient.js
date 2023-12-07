/**
 * @module styled/mixins/truncateGradient
 */
import { css } from 'styled-components';

import { WHITE_00, WHITE } from '../constants';

import linearGradient from './linearGradient';

/**
 * Get truncate gradient style
 * @mixin
 * @returns {string}
 */
export default function truncateGradient() {
  return css`
    position: relative;
    &::after {
      background: ${linearGradient({ direction: '180deg', start: WHITE_00, end: WHITE })};
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: 50%;
    }
  `;
}
