import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  EBONY_CLAY, RED, GREY_BLACK, WHITE_GREY, BURGUNDY, WOOD_SMOKE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  linkList: css`
    list-style: none;
    margin: 0;
    padding: 0 16px 0 0;
  `,
  linkListItem: ({ variant, isWorldCupMVP }) => css`
    display: inline-block;

    &::after {
      content: '·';
      padding: 0 8px;
      ${isWorldCupMVP && css`
        content: '';
      `}
    }

    &:last-of-type {
      &::after {
        display: none;
      }
    }

    > a {
      color: ${variant === 'dark' ? WHITE_GREY : EBONY_CLAY};

      &:active,
      &:hover {
        color: ${GREY_BLACK};
      }
      ${isWorldCupMVP && css`
        color: ${WOOD_SMOKE};
        font-family: 'Roboto Flex', sans-serif;
        letter-spacing: '0.5px';
      `}
    }
  `,
  mainLabel: ({ isWorldCupMVP }) => css`
    color: ${RED};
    margin-right: 10px;
    text-transform: uppercase;

    ${isWorldCupMVP && css`
      color: ${BURGUNDY};
      font-family: 'Roboto Flex', sans-serif;
      font-weight: 700;
      text-transform: capitalize;
    `}
  `,
  scroller: ({ isWorldCupMVP }) => css`
    color: ${EBONY_CLAY};
    display: flex;
    font-size: ${rem(12)};
    letter-spacing: 1px;
    line-height: ${rem(14)};
    margin-bottom: -20px;
    overflow: auto hidden;
    padding: 0 14px 20px;
    white-space: nowrap;
    ${isWorldCupMVP && media.md`
       padding: 0 0 20px;
    `}
  `,
  wrapper: css`
    overflow: hidden;
    width: 100%;
  `,
  container: ({ isWorldCupMVP }) => css`
    ${isWorldCupMVP && media.md`
        padding-left: 0;
    `}
  `,
};
