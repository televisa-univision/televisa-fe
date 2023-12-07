import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  WHITE,
  BLACK_GREY,
  BLACK_GREY_00,
} from '@univision/fe-utilities/styled/constants';
import {
  HORIZONTAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';

/**
 * Get border radius
 * @param {string} layout the layout of the card
 * @returns {string}
 */
const getBorderRadius = layout => getFromMap(layout, {
  [HORIZONTAL]: '4px 0 0 4px',
  default: '4px 4px 0 0',
});

// VideoCard styles
export default {
  wrapper: ({ isListCard, layout }) => css`
    background-color: ${BLACK_GREY};
    border-radius: ${isListCard ? getBorderRadius(layout) : '4px'};
    color: ${WHITE};
    overflow: hidden;
    position: relative;
  `,

  progressWrapper: ({ hideProgressBar }) => css`
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
    ${hideProgressBar && 'display: none;'}
  `,

  videoCardOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: BLACK_GREY_00, end: BLACK_GREY })};
    bottom: 0;
    height: 50%;
    left: 0;
    position: absolute;
    right: 0;
  `,

  videoWrapper: ({ isListCard, layout }) => css`
    height: ${isListCard ? '100%' : '0'};
    padding-bottom: ${isListCard ? '0' : '100%'};
    [data-element-name="VideoImageWrapper"],
    [data-element-name="VideoImagePictureWrapper"] {
      border-radius: ${isListCard ? getBorderRadius(layout) : '4px'};
      overflow: hidden;
    }
    position: relative;
    width: 100%;
    [data-element-name="VideoImageWrapper"] {
      position: absolute;
      z-index: 0;
    }
    [data-element-name="VideoImagePictureWrapper"] {
      z-index: -1;
    }
  `,

  overlayWrapper: css`
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
};
