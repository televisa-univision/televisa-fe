import { css } from 'styled-components';
import {
  LANDSCAPE, PORTRAIT, SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import { BLACK_03 } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  mediaCard: css`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 100%;
    div:first-child {
      padding-bottom: 50%;
    }
    div:hover {
     filter: none;
    }
    &:after {
      background-color: ${BLACK_03};
      content: '';
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 1;
    }
  `,
  iconWrapper: ({ type }) => css`
    align-items: center;
    background: none;
    display: flex;
    justify-content: center;
    position: absolute;
    z-index: 2;
    ${getFromMap(type,
    {
      [PORTRAIT]: css`
        bottom: 10px;
        right: 10px;
      `,
      [SQUARE]: css`
        bottom: 10px;
        right: 10px;
      `,
      default: css`
        bottom: 16px;
        right: 16px;
      `,
    })}
    svg {
      ${getFromMap(type,
    {
      [PORTRAIT]: css`
        height: 32px;
        width: 32px;
      `,
      [LANDSCAPE]: css`
        height: 40px;
        width: 40px;
      `,
      [SQUARE]: css`
        height: 24px;
        width: 24px;
      `,
    })}
    }
  `,
};
