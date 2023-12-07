import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK, WHITE, WOODSMOKE } from '@univision/fe-utilities/styled/constants';

export default {
  button: ({ disablePrendeTvButton, variant, isWorldCupMVP }) => css`
    align-items: center;
    background-color: ${variant === 'dark' ? BLACK : WHITE};
    display: flex;
    margin-left: ${disablePrendeTvButton ? '18px' : '5px'};
    ${media.md`
      margin-left: 2px;
    `}

    ${isWorldCupMVP && `
      background-color: ${WOODSMOKE};
      position: relative;
    `}
  `,
  menuIcon: css`
    margin-right: 12px;
  `,
  label: ({ variant, isWorldCupMVP }) => css`
    color: ${variant === 'dark' ? WHITE : BLACK};
    font-size: ${rem('9px')};
    font-weight: bold;
    text-transform: uppercase;

    ${isWorldCupMVP && `
      text-transform: uppercase;
      font-size: ${rem('16px')};
    `}
  `,
};
