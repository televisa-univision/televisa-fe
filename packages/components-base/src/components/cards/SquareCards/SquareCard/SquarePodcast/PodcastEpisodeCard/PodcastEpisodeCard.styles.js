import { css } from 'styled-components';

import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  GREY_BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import {
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';

import {
  getCardHoverState,
} from '../../../../helpers';

export default {
  episodeCardPlayButton: css`
    cursor: pointer;
    &:hover {
      filter: none;
    }
  `,
  episodeCardContainer: css`
    align-items: top;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    overflow: hidden;
    padding: 16px;
    position: relative;
  `,
  episodeCardImage: ({ size }) => css`
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        flex-shrink: 0;
        height: 168px;
        width: 168px;
      `,
      default: css`
        flex-shrink: 0;
        height: 132px;
        width: 132px;
      `,
    })}
  `,
  episodeCardContent: css`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: space-between;
    position: relative;
    text-align: left;
    width: 100%;
  `,
  episodeCardHeader: css`
    display: flex;
  `,
  episodeCardWrapper: ({ size }) => css`
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        padding: 0 0 0 16px;
      `,
      default: css`
        padding: 0 0 0 8px;
      `,
    })}
  `,
  episodeCardLabel: ({ size }) => css`
    display: inline-block;
    width: min-content;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-bottom: 16px;
      `,
      default: css`
        margin-bottom: 8px;
      `,
    })}
  `,
  episodeCardTitle: ({ size, isNewEpisode }) => css`
    color: ${WHITE};
    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    ${numberOfLines(3)}
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-bottom: 6px;
        padding-top: ${isNewEpisode ? '0' : '34px'};
      `,
      default: css`
        margin-bottom: 6px;
        padding-top: ${isNewEpisode ? '0' : '21px'};
      `,
    })}
    ${getCardHoverState(GREY_BLACK)}
  `,
  episodeCardDate: css`
    color: ${WHITE};
    font-size: ${rem('10px')};
    line-height: ${rem('16px')};
  `,
  episodeCardDescription: ({ size }) => css`
    color: ${WHITE};
    padding-left: 1px;
    position: relative;
    ${numberOfLines(4)}
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};
        margin-top: 16px;
      `,
      default: css`
        font-size: ${rem('12px')};
        line-height: ${rem('16px')};
        margin-bottom: 8px;
        margin-top: 8px;
      `,
    })}
    ${getCardHoverState(GREY_BLACK)}
  `,
  episodeCardItem: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    font-size: ${rem('12px')};
    letter-spacing: ${rem('0.88px')};
    line-height: ${rem('14px')};
    text-transform: uppercase;
    && {
      svg {
        margin-right: 8px;
      }
    }
  `,
};
