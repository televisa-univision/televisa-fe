import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  LIVE_BLOG,
  SLIDESHOW,
  SOCCER_MATCH,
  VIDEO,
} from '@univision/fe-commons/dist/constants/contentTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';

import { VIDEO_INLINE_TYPE } from '../../../constants';

export const ACTION_BAR_HEIGHT = '48px';

// Overrides to put the wrapper in a different place
// when in position absolute
const absolutePositionOverrides = {
  [SLIDESHOW]: {
    [LARGE]: css``,
    [MEDIUM]: css``,
    [SMALL]: css``,
  },
  [VIDEO]: {
    [LARGE]: css``,
    [MEDIUM]: css``,
    [SMALL]: css``,
  },
  [SOCCER_MATCH]: {
    [LARGE]: css`
      height: calc(45% - ${ACTION_BAR_HEIGHT});
    `,
    [MEDIUM]: css`
      height: calc(45% - ${ACTION_BAR_HEIGHT});
    `,
    [SMALL]: css`
      height: calc(56.25% - ${ACTION_BAR_HEIGHT});
    `,
  },
  [LIVE_BLOG]: {
    [LARGE]: css`
      margin-bottom: 0;
      top: 22.6%;

      ${media.sm`
        top: 28.9%;
      `}
    `,
    [MEDIUM]: css`
      margin-bottom: 0;
      top: 36.1%;
    `,
    [SMALL]: css`
      margin-bottom: 0;
      top: 32.6%;
    `,
  },
  [VIDEO_INLINE_TYPE]: {
    [LARGE]: css`
      bottom: auto;
      margin-bottom: 0;
      top: 63%;
    `,
    [MEDIUM]: css`
      bottom: auto;
      margin-bottom: 0;
      top: 63%;
    `,
    [SMALL]: css`
      bottom: auto;
      margin-bottom: 0;
      top: 63%;
    `,
  },
  [HOROSCOPE]: {
    [LARGE]: css`
      justify-content: flex-start;
      top: 50%;
    `,
    [MEDIUM]: css`
      justify-content: flex-start;
      top: 50%;
    `,
    [SMALL]: css`
      justify-content: flex-start;
      top: 45%;
    `,
  },
};

/**
 * Gets position absolute overrides for the content
 * @param {string} type - content type
 * @param {string} size - card size
 * @returns {func}
 */
const getAbsolutePositionOverride = ({
  type,
  size,
}) => getKey(absolutePositionOverrides, `${type}.${size}`);

export default {
  content: ({ contentOptions, type, size }) => css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    order: 2;
    position: relative;

    ${contentOptions?.positionAbsolute && css`
      bottom: 0;
      position: absolute;
      width: 100%;
      z-index: 3;

      ${getAbsolutePositionOverride({ type, size })}
    `}
  `,
};
