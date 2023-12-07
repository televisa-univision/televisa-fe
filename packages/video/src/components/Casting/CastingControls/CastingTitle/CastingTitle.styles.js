import { css, keyframes } from 'styled-components';

import {
  WHITE, BLACK_GREY, TRANSPARENT, MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export const marquee = keyframes`
   0%   { transform: translate(0, 0); }
   100% { transform: translate(-100%, 0); }
`;

export default {
  titleWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 48px;
    overflow: hidden;
    position: relative;
    width: 100%;
    ${media.md`
      flex: 1;
      width: 500px;
    `}
  `,
  titleContent: css`
    align-items: center;
    display: flex;
    flex-basis: 100%;
    height: 48px;
    overflow: hidden;
    position: relative;
    ${media.md`
      height: 85px;
    `}
  `,
  titleCap: ({ isLeft }) => css`
    display: flex;
    height: 48px;
    position: absolute;
    width: 20px;
    ${isLeft && css`
      background: ${linearGradient({ direction: '90deg', start: BLACK_GREY, end: TRANSPARENT })};
      left: 0;
      z-index: 1;
    `}
    ${!isLeft && css`
      background: ${linearGradient({ direction: '90deg', start: TRANSPARENT, end: BLACK_GREY })};
      right: 0;
    `}
    ${media.md`
      height: 85px;
    `}
  `,
  titleMarquee: css`
    animation: ${marquee} 10s linear infinite;
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(14)};
    left: 0;
    min-width: 200%;
    padding-left: 100%;
    position: absolute;
    white-space: nowrap;
    ${media.md`
      animation: none;
      font-size: ${rem(16)};
      min-width: 100%;
      padding-left: 0;
    `}
  `,
  advertisementLink: css`
    color: ${WHITE};
    font-size: ${rem(14)};
    padding-left: 16px;
    text-transform: uppercase;
    ${media.md`
      font-size: ${rem(16)};
      padding-left: 32px;
    `}
    &:hover {
      color: ${WHITE};
      text-decoration: underline;
    }
  `,
  adCopy: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem(14)};
    padding: 0 10px 0 0;
    white-space: nowrap;
    ${media.md`  
      font-size: ${rem(16)};
      padding: 0 0 0 12px;
    `}
  `,
};
