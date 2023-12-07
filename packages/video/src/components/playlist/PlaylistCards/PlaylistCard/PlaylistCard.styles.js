import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  WHITE,
  BLACK_50,
} from '@univision/fe-utilities/styled/constants';

export default {
  external: css`
    margin-right: 8px;
    min-width: 160px;
    position: relative;
    scroll-snap-align: start;
    ${media.md`
      margin-bottom: 16px;
      margin-right: 0;
    `}
  `,

  wrapper: css`
    cursor: pointer;
  `,

  overlay: ({ isWorldCupMVP }) => css`
    align-items: center;
    background-color: ${BLACK_50};
    border-radius: 3px 0 0 3px;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('10px')};
    height: 100%;
    justify-content: center;
    letter-spacing: ${rem('1px')};
    line-height: ${rem('19px')};
    position: absolute;
    text-transform: uppercase;
    width: 100%;
    z-index: 2;
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem('12px')};
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0.24px;
      text-transform: initial;
      ${media.md`
        font-size: ${rem('14px')};
      `}
    `}
  `,

  listCard: css`
    max-width: 100%;

    ${media.md`
      height: 132px;
      width: 99%;
    `}
  `,

  actionBar: css`
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 4px;
    z-index: auto;
  `,
};
