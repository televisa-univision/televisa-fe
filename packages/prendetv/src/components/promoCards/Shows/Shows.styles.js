/**
 * @module PrendeTV Shows Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  BITTERSWEET, BLACK, CHINESE_SILVER, MONTSERRAT_FONT_FAMILY, SHAMROCK, NERO,
} from '@univision/fe-utilities/styled/constants';

export default {
  image: css`
    height: 100%;
    width: 100%;
  `,
  wrapper: css`
    align-items: center;
    background-color: ${BLACK};
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 300px;
    padding: 36px 0;
    width: 100%;
  `,
  row: ({ larger }) => css`

    -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
    }
    display: flex;
    overflow-x: auto;
    padding-top: 16px;
    scrollbar-width: none;
    user-select: none;
    white-space: nowrap;
    width: 100vw;
    ${larger && 'justify-content: flex-start;'}
    ${!larger && 'justify-content: center;'}
  `,
  square: ({ device, backgroundhover }) => css`
    &:first-child {
      margin-left: 16px;
    }
    &:last-child {
      margin-right: 16px;
    }
    align-items: center;
    background-color: ${NERO};
    border: 0.69px solid ${CHINESE_SILVER};
    border-radius: 4.11px;
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    height: 66px;
    justify-content: center;
    margin-right: ${device === 'mobile' ? '7px' : '16px'};
    padding: 4px;
    width: 66px;

    &:hover, &:active {
      background-color: ${backgroundhover || BITTERSWEET};
      border-color: ${backgroundhover || BITTERSWEET};
    }

    ${media.md`
      height: 91px;
      width: 91px;
    `}
  `,
  title: css`
    color: ${SHAMROCK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: 600;
    letter-spacing: 1px;
    line-height: ${rem(14)};
    text-transform: uppercase;

    ${media.md`
      font-size: ${rem(24)};
      letter-spacing: 2px;
    `}
  `,
};
