import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { LIGHT_GREY, WHITE, WHITE_70 } from '@univision/fe-utilities/styled/constants';

export default {
  calReply: ({
    forceMobileView,
    hasBackgroundImage,
    hasCalReplyOnly,
    isOpen,
  }) => css`
    display: flex;
    position: absolute;
    right: 15px;
    top: 16px;

    a {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    svg {
      path {
        fill: ${WHITE};
      }

      margin-bottom: 9px;
    }

    span {
      color: ${LIGHT_GREY};
      font-size: ${rem('9px')};
      line-height: ${rem('11px')};
      text-transform: uppercase;
    }

    ${forceMobileView && css`
      margin-right: 80px;

      span {
        font-size: ${rem('9px')};
      }

      &:after {
        border-left: 0;
      }
    `}

    ${hasBackgroundImage && css`
      svg {
        path {
          fill: ${WHITE_70};
        }
      }
    `}

    ${hasCalReplyOnly && css`
      margin-right: 0;
    `}

    ${media.sm`
      flex-direction: row;
      margin-right: 12px;
      position: relative;
      right: -15px;
      top: 0;

      a {
        flex-direction: row;
      }

      span {
        font-size: ${rem('11px')};
        padding-left: 8px;
      }

      svg {
        margin-bottom: 0;
      }
    `}

    ${isOpen && css`
      svg {
        path {
          fill: ${WHITE}
        }
      }
    `}
  `,
};
