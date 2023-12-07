import { css } from 'styled-components';

import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  GREY_BLACK, WHITE, TRANSPARENT, BLACK_85,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { getCardHoverState } from '../../../helpers';

export default {
  radioContainer: ({ size }) => css`
    align-items: center;
    border-radius: 4px;
    display: flex;
    overflow: hidden;
    position: relative;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        flex-direction: column;
        padding: 0 0 24px 0;
      `,
      default: css`
        flex-direction: column;
        padding: 0 0 24px 0;
      `,
    })}
  `,
  radioLabel: ({ size }) => css`
    border-radius: 0;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('10px')};
    height: 24px;
    justify-content: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    width: 64px;
    z-index: 1;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-bottom: 0;
      `,
      default: css`
        margin-bottom: 0;
      `,
    })}
  `,
  radioContent: ({ size }) => css`
    line-height: 1rem;
    position: relative;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin: 16px 0 0 0;
        padding: 0 16px;
        width: 100%;
      `,
      default: css`
        margin: 8px 0 0 0;
        padding: 0 12px;
        width: 100%;
      `,
    })}
  `,
  radioDescription: ({ size }) => css`
    color: ${WHITE};
    display: flex;
    justify-content: center;
    margin-bottom: 12px;
    ${getCardHoverState(GREY_BLACK)}
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('20px')};
      `,
      default: css`
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};
      `,
    })}
  `,
  radioClickable: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('12px')};
    letter-spacing: ${rem('0.88px')};
    line-height: ${rem('14px')};
    margin-top: 30px;
    text-transform: uppercase;
    ${getCardHoverState(GREY_BLACK)}
    svg {
      margin-right: 8px;
    }
  `,
  radioLabelWrapper: css`
    align-items: center;
    border-radius: 0;
    display: flex;
    height: 24px;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
    > a {
      border-radius: 0;
      width: 64px;
      > div {
        border-radius: 0;
        height: 24px;
        margin-bottom: 0;
        width: 64px;
      } 
    }
  `,
  title: css`
    color: ${WHITE};
    display: flex;
    font-size: ${rem('16px')};
    justify-content: center;
    line-height: ${rem('20px')};
    margin-bottom: 0;
    width: 100%;
    a {
      color: ${WHITE};
    }
    ${getCardHoverState(GREY_BLACK)}
  `,
  radioCta: ({ size }) => css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('12px')};
    justify-content: flex-start;
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin-bottom: 12px;
    margin-top: 14px;
    text-transform: uppercase;
    width: 100%;
    ${getCardHoverState(GREY_BLACK)}
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        padding-left: 16px;
      `,
      default: css`
        padding-left: 8px;
      `,
    })}
  `,
  radioMedia: css`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 100%;

    & div:first-child {
      padding-bottom: 50%;
    }

    & div:hover {
     filter: none;
    }
  `,
  radioMediaMargin: ({ size }) => css`
    width: 100%;

    ${getFromMap(size,
    {
      [MEDIUM]: css`
        padding: 0 100px;
      `,
      default: css`
        padding: 0 88px;
      `,
    })}
  `,
  radioPictureOverlay: css`
   background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_85 })};
    bottom: 0;
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
  `,
  radioLogo: css`
    background: transparent;
    position: absolute;
    width: 50%;
  `,
  radioLogoImage: css`
    width: 100%;
  `,
  radioPlayButton: css`
    align-items: center;
    background: transparent;
    border: 1px solid ${WHITE};
    border-radius: 100px;
    bottom: 8px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    height: 24px;
    justify-content: center;
    position: absolute;
    svg {
      left: 1px;
      position: relative;
    }
    right: 8px;
    width: 24px;
  `,
};
