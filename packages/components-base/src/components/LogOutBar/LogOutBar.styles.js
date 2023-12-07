import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WHITE, GREY, BLACK, EMPEROR,
} from '@univision/fe-commons/dist/utils/styled/constants';

/** Get Background color
 * @param {string} variant - the type of variant
 * @returns {string}
 */
const getBackgroundColor = (variant) => {
  switch (variant) {
    case 'light':
      return WHITE;
    case 'dark':
      return BLACK;
    default:
      return GREY;
  }
};

/** Get Font color
 * @param {string} variant - the type of variant
 * @returns {string}
 */
const getFontColor = (variant) => {
  switch (variant) {
    case 'light':
      return EMPEROR;
    default:
      return WHITE;
  }
};

/** Get Font size
 * @param {string} variant - the type of variant
 * @param {string} isMobile - if is mobile breakpoint
 * @returns {string}
 */
const getFontSize = (variant, isMobile) => {
  switch (variant) {
    case 'light':
    case 'dark':
      return rem(9);
    default:
      return isMobile ? rem(12) : rem(14);
  }
};

export default {
  wrapper: ({ variant }) => css`
    background-color: ${getBackgroundColor(variant)};
  `,

  logOutBar: ({ variant }) => css`
    align-items: center;
    background-color: transparent;
    border: 0;
    color: ${getFontColor(variant)};
    cursor: ${variant !== 'default' ? 'default' : 'pointer'};
    display: flex;
    flex-direction: ${variant !== 'default' ? 'row-reverse' : 'row'};
    height: 40px;
    justify-content: center;
    outline: none;
    width: 100%;
    
    ${media.sm`
        justify-content: ${variant !== 'default' ? 'flex-start' : 'center'};
    `}
  `,

  copyText: ({ variant, underline }) => css`
    cursor: ${underline ? 'pointer' : 'default'};
    font-size: ${getFontSize(variant, true)};
    margin-left: ${variant !== 'default' ? '0' : '14px'};
    margin-right: ${variant !== 'default' ? '5px' : '0'};
    ${underline && css`
      margin-left: 5px;
      text-decoration: underline;
    `}
    ${media.sm`
      font-size: ${getFontSize(variant, false)};
    `}
     text-align: left;
  `,

  providerLogo: css`
    height: auto;
    width: 65px;
  `,
};
