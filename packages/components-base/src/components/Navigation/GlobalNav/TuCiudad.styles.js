import { css } from 'styled-components';
import { MINE_SHAFT, WHITE, ZINDEX_ABOVE_NAVIGATION } from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  animatedModalBackgroundStyled: css`
   left: 0;
   top: 0;
`,
  tuCiudadLink: ({ theme }) => css`
    background: ${theme.globalNavBackgroundColor || MINE_SHAFT};
    border: 1px solid rgba(255,255,255,0.5);
    border-radius: 4px;
    box-sizing: border-box;
    color: ${WHITE};
    cursor: pointer;
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(12)};
    font-weight: bold;
    height: 100%;
    margin-left: 10px;
    opacity: 0.5;
    text-transform: uppercase;
    width: 93px;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};

    & > svg {
     margin: 0 0 4px 2px;
    }

    & > svg > path {
      fill: ${WHITE};
    }

    &:hover {
     color: ${WHITE};
      filter: brightness(85%);
      opacity: 1;
    }

    ${media.sm`
      margin-left: 0;
    `}

    span {
      pointer-events: none;
    }
  `,
  navCheckIconStyled: css`
    margin: 14px 0 0 10px;
  `,
};
