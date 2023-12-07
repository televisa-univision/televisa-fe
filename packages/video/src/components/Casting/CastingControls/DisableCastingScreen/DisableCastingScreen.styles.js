import { css } from 'styled-components';

import {
  BLACK_GREY, DARKER_GREY, WHITE, ZINDEX_ABOVE_NAVIGATION, ROBOTO_CONDENSED_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  screenWrapper: css`
    background-color: ${BLACK_GREY};
    bottom: 0;
    height: 164px;
    opacity: 0;
    position: fixed;
    right: 0;
    width: 100vw;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 2};
     ${media.md`
        height: 194px;
     `}
  `,
  contentWrapper: ({ isTop }) => css`
    display: flex;
    flex-direction: row;
    height: ${isTop ? '91px' : '72px'};
    width: 100%;
    ${isTop && css`
      align-items: top;
      border-bottom: 1px solid ${DARKER_GREY};
      color: ${WHITE};
      flex-direction: column;
      font-size: ${rem(16)};
      justify-content: flex-start;
    `}
    ${!isTop && css`
      align-items: center;
      justify-content: center;
    `}
    ${media.md`
       height: ${isTop ? '120px' : '73px'};
    `}
  `,
  buttonContainer: ({ isClose }) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    ${isClose && css`
      flex-direction: row-reverse;
      justify-content: flex-start;
      padding: 16px 14px 7px 0;
      ${media.md`
        padding: 16px 14px 14px 0;
        margin: 0 auto;
        max-width: 1280px;
      `}
    `}
  `,
  buttonCopy: css`
    color: ${WHITE};
    cursor: pointer;
    font-family: ${ROBOTO_CONDENSED_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: bold;
    letter-spacing: ${rem(1)};
    text-transform: uppercase;
    ${media.md`
       font-size: ${rem(16)};
    `}
  `,
  icon: ({ isClose }) => css`
    ${isClose ? css`
      cursor: pointer;
      margin-right: 0;
    ` : css`
       margin-right: 24px;
    `}
  `,
  castingInfo: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  `,
};
