/**
 * @module PrendeTV Opening Styles
 */
import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { NERO } from '@univision/fe-utilities/styled/constants';

import { isLandingPage } from '../../utils';

export default {
  wrapper: ({ page }) => css`
    background-color: ${NERO};
    margin: 0 auto;
    width: 100%;

    ${media.md`
      max-height: 503px;
      ${isLandingPage(page) && css`padding: 40px 0;`}
    `}
  `,
  image: ({ page }) => css`
    width: 100%;

    ${!isLandingPage(page) && css`
      display: block;
      margin: 0 auto;
      max-height: 503px;
    `}

    ${media.md`
      ${!isLandingPage(page) && css`
        width: auto;
      `}
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    padding: 0;
  `,
};
