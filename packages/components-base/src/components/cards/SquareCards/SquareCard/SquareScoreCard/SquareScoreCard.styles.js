import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import {
  GRADIENT_BLACK_GREY_TRANSPARENT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

/**
 * Get Score Wrapper styles
 * @param {string} size the size of the card
 * @returns {string}
 */
const getScoreWrapperStyles = size => getFromMap(size, {
  [LARGE]: css`
    left: 24px;
    position: absolute;
    top: 78%;
    ${media.md`
      top: 75%;
    `}
    ${media.lg`
      top: 78%;
    `}
  `,
  [MEDIUM]: css`
    bottom: 50px;
    left: 16px;
    position: absolute;
  `,
  [SMALL]: css`
    left: 8px;
    position: absolute;
    top: 65%;
  `,
});

export default {
  wrapper: ({ isListCard }) => css`
    height: 100%;  
    ${isListCard && `
      bottom: 0;
      pointer-events: none;
      position: absolute;
      width: 100%;
    `}
  `,
  backgroundOverlay: css`
    background: ${GRADIENT_BLACK_GREY_TRANSPARENT};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  matchImageWrapper: css`
    display: block;
    height: 100%;
    position: relative;
    width: 100%;
  `,
  scoreWrapper: ({ size, isListCard }) => css`
    height: auto;
    width: auto;
    z-index: 2;
    ${isListCard ? css`
      bottom: 0;
      position: absolute;
      width: 100%;
    ` : getScoreWrapperStyles(size)}
    
  `,
  picture: css`
    height: 100%;
    object-fit: cover;
  `,
  badgeWrapper: css`
    left: calc(50% + 8px);
    position: absolute;
    top: 2px;
    width: 25%;
  `,
};
