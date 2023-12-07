import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY_BLACK } from '@univision/fe-utilities/styled/constants';

export default {
  dateText: ({ isWorldCupMVP }) => css`
    align-items: center;
    color: ${GREY_BLACK};
    display: flex;
    font-size: 11px;
    justify-content: flex-start;
    line-height: 1;
    padding: 8px 16px 0;
    text-transform: uppercase;

    p {
      margin: 0;
    }

    > span {
      display: inline-block;
      ${isWorldCupMVP && css`
        font-size: ${rem('12px')};
      `}
      ${media.sm`
        padding: 0;
        align-self: center;
        display: none;
      `}

      ${media.lg`
        display: inline-block;
      `}
    }

    ${media.md`
      height: 30px;
      padding: 0;
      justify-content: flex-end;
    `}
  `,
  channelLogos: ({ hasBg }) => css`
    .countChannels {
      & > div {
        margin-left: 12px;
        &:nth-child(1) {
          ${media.sm`
            margin-left: 0;
          `}

          ${media.lg`
            margin-left: 12px;
          `}
        }
      }
    }

    ${!hasBg && css`
      svg {
        fill: ${GREY_BLACK};
      }
    `}
  `,
};
