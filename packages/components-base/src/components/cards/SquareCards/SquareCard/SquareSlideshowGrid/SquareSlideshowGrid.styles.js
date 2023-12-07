import { css } from 'styled-components';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  BLACK_GREY, TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Get the grid template based on the card type
 * @param {string} type the type of the card
 * @returns {string}
 */
const getGridTemplate = (type) => {
  return getFromMap(type, {
    [SQUARE]: '1fr 1fr / 1fr 1fr',
  });
};

/**
 * Get the grid area for an image grid image based on the image position and
 * card type
 * @param {number} imagePosition the position of the image
 * @param {string} type the type of the card
 * @returns {string}
 */
const getGridArea = (imagePosition, type) => {
  const mapping = {
    0: {
      [SQUARE]: '1 / 1 / 3 / 2',
    },
    1: {
      [SQUARE]: '1 / 2 / 2 / 3',
    },
    2: {
      [SQUARE]: '2 / 2 / 3 / 3',
    },
  };

  return mapping[imagePosition][type];
};

/**
 * Get the grid image aspect for an image grid image based on the image position
 * and card type (fix for Safari)
 * @param {number} imagePosition the position of the image
 * @param {string} type the type of the card
 * @returns {string}
 */
const getGridImageAspect = (imagePosition, type) => {
  const mapping = {
    0: {
      [SQUARE]: '127%',
    },
    1: {
      [SQUARE]: '67%',
    },
    2: {
      [SQUARE]: '67%',
    },
  };

  return mapping[imagePosition][type];
};

/**
 * Get image grid aspect ratio
 * @param {string} type the type of the card
 * @returns {string}
 */
const getGridAspectRatio = (type) => {
  return getFromMap(type, {
    [SQUARE]: '60%',
  });
};

export default {
  cardContainer: css`
    -webkit-font-smoothing: antialiased;
    background: ${BLACK_GREY};
    border-radius: 4px;
    overflow: hidden;
  `,
  cardContainerLink: css`
    display: block;
    height: 100%;
  `,
  imageGrid: ({ type }) => css`
    display: grid;
    grid-gap: 2px;
    grid-template: ${getGridTemplate(type)};
    height: 100%;
    position: absolute;
    width: 100%;
  `,
  imageGridContainer: ({ type }) => css`
    height: 60%;
    padding-bottom: ${getGridAspectRatio(type)};
    position: relative;
    width: 100%;
  `,
  imageGridImage: ({ index, type }) => css`
    background-position: center;
    background-size: cover;
    grid-area: ${getGridArea(index, type)};
    height: auto;
    overflow: visible;

    & div {
      padding-bottom: ${getGridImageAspect(index, type)};
    }
  `,
  imageGridOverlay: ({ size }) => {
    const HEIGHT = getFromMap(size, {
      [LARGE]: css`
        height: 100%;
      `,
      [MEDIUM]: css`
        height: 100%;
      `,
      [SMALL]: css`
        height: 100.3%;
      `,
    });
    return css`
      background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
      bottom: 0;
      ${HEIGHT}
      margin-bottom: -4px;
      position: absolute;
      top: 0;
      width: 100%;
    `;
  },
};
