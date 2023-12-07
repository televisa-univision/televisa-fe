/**
 * @module PrendeTV Footer Styles
 */
import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BITTERSWEET,
  BLACK,
  DARK_GRAY,
  MONTSERRAT_FONT_FAMILY,
  NERO,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  dropDownContainer: css`
    display: flex;
    margin-bottom: 24px;

    & > div {
      border: 0;
      display: inherit;
      height: 39px;
      width: 125px;
    }
    && {
      svg {
        right: 6px;
      }
    }

    ${media.md`
      margin-bottom: 0;
    `}
  `,
  dropDownWrapper: css`
    && {
      background-color: transparent;
      border: 1px solid ${BITTERSWEET};
      border-radius: 4px;
      color: ${WHITE};
      font-family: ${MONTSERRAT_FONT_FAMILY};
      font-size: ${rem(14)};
      font-weight: bold;
      letter-spacing: ${rem(0.75)};
      line-height: ${rem(14)};
      outline: none;
      padding: 0 0 0 16px;
      text-transform: uppercase;

      option {
        color: ${BLACK};
      }
    }
  `,
  wrapper: css`
    background-color: ${NERO};
    border-top: 2px solid ${DARK_GRAY};
    margin: 0;
    min-height: 70px;
    padding: 16px 19px 16px 19px;
    width: 100%;

    ${media.md`
      padding: 20px 90px 29px;
    `}
  `,
  innerWrapper: css`
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    margin: 20px 0;
    position: relative;
    text-align: center;
    width: 100%;

    ${media.md`
      flex-direction: initial;
      margin: 0;
     `}
  `,
  smallLogo: css`
    text-align: left;
    img {
      max-height: 27px;
    }
    ${media.md`
      img {
        max-height: 48px;
      }
    `}
  `,
};
