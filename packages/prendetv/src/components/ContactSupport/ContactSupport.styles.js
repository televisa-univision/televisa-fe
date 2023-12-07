/**
 * @module PrendeTV Contact Support Styles
 */
import { css } from 'styled-components';

import {
  media,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  MONTSERRAT_FONT_FAMILY,
  SHAMROCK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  contactSupportEmail: css`
    padding: 20px 0 42px;

    a {
      color: ${SHAMROCK};
      font-family: ${MONTSERRAT_FONT_FAMILY};
      font-size: ${rem('20px')};
      letter-spacing: ${rem('1.25px')};
      line-height: ${rem('27px')};
    }

    ${media.md`
      a {
        font-size: ${rem('32px')};
        letter-spacing: ${rem('2px')};
        line-height: ${rem('27px')};
      }
    `}
  `,
  contactSupportLabel: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('16px')};
    letter-spacing: ${rem('1px')};
    line-height: ${rem('22px')};
    padding: 32px 0 0;
    text-transform: uppercase;

    ${media.md`
      font-size: ${rem('28px')};
      letter-spacing: ${rem('1.25px')};
      line-height: ${rem('27px')};
      padding-top: 48px;
    `}
  `,
  contactSupportWrapper: css`
    font-family: ${MONTSERRAT_FONT_FAMILY};
    text-align: center;
  `,
};
