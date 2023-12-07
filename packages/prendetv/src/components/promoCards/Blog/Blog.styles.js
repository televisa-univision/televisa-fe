/**
 * @module PrendeTV Blog Promo Card styles
 */
import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import {
  PRENDETV_HEADER_BACKGROUND_DESKTOP,
  PRENDETV_HEADER_BACKGROUND_MOBILE,
} from '../../../constants';

export default {
  header: css`
    align-items: center;
    background: url(${PRENDETV_HEADER_BACKGROUND_MOBILE}) no-repeat center center;
    background-size: cover;
    display: grid;
    height: 100px;
    justify-items: center;

    img {
      max-width: 60%;
    }

    ${media.md`
      background-image: url(${PRENDETV_HEADER_BACKGROUND_DESKTOP});
      height: 160px;
      margin-bottom: 40px;
    `}
  `,
  wrapper: css`
    background-color: ${WHITE};
  `,
};
