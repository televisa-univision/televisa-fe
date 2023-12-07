import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  WHITE_GREY,
  DEEP_SEA,
} from '@univision/fe-utilities/styled/constants';

export default {
  cards: css`
    margin-right: 8px;
    width: 25%;
    &:last-child {
      margin-right: 0;
    }
  `,
  cardsWrapper: css`
    display: flex;
    justify-content: center;
    width: 100%;
  `,
  title: ({ isWorldCupMVP }) => css`
    && {
      border-top: 1px solid ${WHITE_GREY};
      font-size: ${rem(18)};
      line-height: ${rem(24)};
      padding-top: 7px;
      ${isWorldCupMVP && css`
        border-top: 1px solid ${DEEP_SEA};
        
        ${media.md && css`
          border-top: 1px solid ${WHITE_GREY};
        `}
      `}
    }
  `,
  titleLink: ({ theme, isWorldCupMVP }) => css`
    ${theme?.primary && css`
      && {
        color: ${theme.primary};
        ${isWorldCupMVP && css`
          font-size: ${rem(26)};
          line-height: ${rem(28)};
        `}
      }
    `}
    ${theme?.secondary && css`
      &&:hover {
        color: ${theme.secondary};
        text-decoration: none;
      }
    `}
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
      font-size: ${rem(26)};
      font-style: normal;
    `}
  `,
  wrapper: css`
    margin: 24px 0;
  `,
};
