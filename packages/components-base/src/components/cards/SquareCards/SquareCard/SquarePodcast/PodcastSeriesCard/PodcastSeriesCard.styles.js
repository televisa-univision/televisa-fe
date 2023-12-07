import { css } from 'styled-components';

import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import { GREY_BLACK, WHITE } from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  getCardHoverState,
} from '../../../../helpers';

export default {
  seriesCardContainer: ({ size }) => css`
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
  seriesCardLabel: ({ size }) => css`
    display: flex;
    justify-content: center;
    width: min-content;
    z-index: 1;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-bottom: 16px;
      `,
      default: css`
        margin-bottom: 8px;
      `,
    })}`,
  seriesCardLinkImage: ({ size }) => css`
    width: 100%;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        padding: 0 83px;
      `,
      default: css`
        padding: 0 76px;
      `,
    })}
  `,
  seriesCardContent: ({ size }) => css`
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
  seriesCardDescription: ({ size }) => css`
    color: ${WHITE};
    display: block;
    margin-bottom: 12px;
    ${numberOfLines(2)}
    ${getCardHoverState(GREY_BLACK)}
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('16px')};
      `,
      default: css`
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};
      `,
    })}
  `,
  seriesCardItem: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('10px')};
    letter-spacing: 0.88px;
    line-height: ${rem('14px')};
    text-transform: uppercase;
  `,
  seriesCardClickable: css`
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
};
