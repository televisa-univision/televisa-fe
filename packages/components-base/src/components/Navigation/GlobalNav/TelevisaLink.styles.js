import { css } from 'styled-components';
import {
  BLACK,
  WHITE,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  logo: () => css`
    display: flex;
    height: 40px;
    width: 48px;

    @media (min-width: 820px) {
      width: 56px;
    }
  `,
  link: ({ theme }) => css`
    background: ${theme.globalNavLogoBackground || BLACK};
    box-sizing: border-box;
    color: ${WHITE};
    cursor: pointer;
    display: flex;
    font-family: "Roboto Condensed", Roboto, sans-serif;
    margin: 0;
    padding: 12px;
    text-transform: uppercase;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};

    &:hover {
      color: ${WHITE};
      filter: brightness(85%);
      opacity: 1;
    }

    span {
      pointer-events: none;
    }

    & > svg {
      height: 16px;
      width: 24px;

      & > path {
        fill: ${WHITE};
      }
    }

    @media (min-width: 480px) {
      font-weight: bold;
      margin-top: 0;
      padding: 10px 12px;

      & > svg {
        height: 20px;
        width: 32px;
      }
    }
  `,
  navCheckIconStyled: css`
    margin: 14px 0 0 10px;
  `,
};
