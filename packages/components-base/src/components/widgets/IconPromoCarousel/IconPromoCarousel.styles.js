import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK,
  GRID_GUTTER_WIDTH,
  GREY_BLACK,
  WHITE,
  WHITE_10,
} from '@univision/fe-commons/dist/utils/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

export default {
  container: ({ isShow }) => css`
    position: relative;

    ${isShow && css`
      background-color: ${BLACK};
    `}
  `,
  wrapper: css`
    padding: 0 ${GRID_GUTTER_WIDTH / 2}px;
    position: relative;
  `,
  promoList: ({ isShow }) => css`
    display: flex;
    justify-content: center;
    width: auto;

    ${isShow && css`
      justify-content: flex-start;

      ${media.md`
        margin-left: -8px;
      `}
    `}
  `,
  carouselWrapper: css`
    .carousel {
      justify-content: center;
      min-width: 64px;

      &.bigSize {
        min-width: 130px;
      }
    }

    .arrow {
      position: absolute;
      width: 100px;
      button {
        width: 100%;
        svg {
          display: none;
        }
        &:before {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          border: 1px solid ${GREY_BLACK};
          position: absolute;
          top: 45px;
          transform: rotate(-45deg);
        }
      }
      &.arrowPrev {
        left: 0;
        button {
          background: ${linearGradient({ direction: 'to right', start: WHITE, end: WHITE_10 })};
          &:before {
            left: 15px;
            border-bottom: 0;
            border-right: 0;
          }
        }
      }
      &.arrowNext {
        right: 0;
        button {
          background: ${linearGradient({ direction: 'to right', start: WHITE_10, end: WHITE })};
          &:before {
            right: 15px;
            border-top: 0;
            border-left: 0;
          }
        }
      }
      &.hidden {
        opacity: 0;
        visibility: hidden;
      }
    }
  `,
};
