/* eslint-disable */
import { css } from 'styled-components';
import {
  WHITE_25,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

/* istanbul ignore next */
export default {
  moreButtonWrapper: ({
    theme,
  }) => css`
    margin-top: 28px;
    > button {
      border-radius: 4px;
    }
    ${theme?.mainGradient && css`
      margin-bottom: 20px;

      > button, > button:active, > button:hover {
        border: 1px solid ${WHITE_25};
        background: transparent;

        svg path {
          fill: ${WHITE};
        }
      }

      span {
        color: ${WHITE};
        font-family: "Roboto Condensed";
        font-size: rem(12px);
        letter-spacing: rem(0.75px);
        line-height: rem(14px);
      }
    `}
    }
  `,
  playlistContentCard: ({ theme, isNewsDigitalChannel }) => css`
    ${isNewsDigitalChannel && theme?.cardsColor && css`
      background: ${theme?.cardsColor};
    `}
  `,
};
