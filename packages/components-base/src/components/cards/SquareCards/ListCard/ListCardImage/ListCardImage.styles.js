import { css } from 'styled-components';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import {
  WHITE,
  BLACK_GREY,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

/**
 * Get the grid area for an image grid image based on the image position
 * @param {number} imagePosition the position of the image
 * @returns {string}
 */
const getGridArea = (imagePosition) => {
  const mapping = {
    0: '1 / 1 / 2 / 2',
    1: '1 / 2 / 2 / 3',
  };

  return mapping[imagePosition];
};

/**
 * Get image grid aspect ratio
 * @param {string} layout the layout of the card
 * @returns {string}
 */
const getContainerWidth = (layout) => {
  return getFromMap(layout, {
    [HORIZONTAL]: css`
      border-radius: 4px 0 0 4px;
      height: 100%;
      width: 100%;
    `,
    [VERTICAL]: css`
      border-radius: 4px 4px 0 0;
      height: 100%;
      width: 100%;
    `,
  });
};

export default {
  cardContainer: ({ layout }) => css`
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    position: relative;
    ${getContainerWidth(layout)}
  `,
  cardContainerLink: css`
    display: block;
    height: 100%;
  `,
  filter: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    height: 80px;
    left: 0;
    position: absolute;
    right: 0;
    width: 100%;
  `,
  imageGrid: css`
    display: grid;
    grid-gap: 2px;
    grid-template: 1fr / 1fr 1fr;
    height: 100%;
    position: absolute;
    width: 100%;
  `,
  imageGridContainer: ({ isDark }) => css`
    background: ${isDark ? BLACK_GREY : WHITE};
    height: 100%;
    position: relative;
    width: 100%;
  `,
  imageGridImage: ({ index }) => css`
    background-position: center;
    background-size: cover;
    grid-area: ${getGridArea(index)};
    height: 100%;
    object-fit: cover;
    overflow: visible;

    & div {
      padding-bottom: 100%;
    }
  `,
  imageGridOverlay: ({ index }) => css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    grid-area: ${getGridArea(index)};
    height: 80px;
    margin-bottom: -4px;
    position: absolute;
    width: 100%;
  `,
  picture: css`
    height: 100%;
    object-fit: cover;
  `,
  videoCard: css`
    height: 100%;
  `,
};
