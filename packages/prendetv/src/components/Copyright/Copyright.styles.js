/**
 * @module PrendeTV Copyright Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  CHINESE_SILVER, MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

export default {
  copyright: css`
    color: ${CHINESE_SILVER};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(10)};
    letter-spacing: ${rem(0.62)};
    line-height: ${rem(15)};
    padding: 0;
    text-align: left;

    ${media.md`
      padding: 0;
      max-width: 702px;
    `}
  `,
};
