import { css } from 'styled-components';
import {
  ALABASTER_00,
  ALABASTER,
  LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    background-color: ${ALABASTER};
    border-bottom: 1px solid ${LIGHT_GREY};
    margin-top: 16px;
    min-height: 194px;
    overflow: hidden;
    padding-top: 8px;
    position: relative;
    user-select: none;
    width: 100%;
  `,
  slider: css`
    display: block;
  `,
  arrowWrapper: ({ isLeft }) => css`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 66px;
    z-index: 99;

    ${!isLeft && css`
      background: linear-gradient(to left, ${WHITE} 70%, ${ALABASTER_00} 100%);
      padding-left: 2px;
      right: -22px;
    `}

    ${isLeft && css`
      align-items: flex-end;
      background: linear-gradient(to right, ${WHITE} 70%, ${ALABASTER_00} 100%);
      left: -22px;
      padding-right: 2px;
    `}
  `,
};
