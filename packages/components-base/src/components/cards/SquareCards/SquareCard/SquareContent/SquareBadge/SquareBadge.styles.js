import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  ARTICLE,
  EXTERNAL_CONTENT_PROMO,
  LIVE_BLOG,
  SLIDESHOW,
  VIDEO,
  LIVE_STREAM,
} from '@univision/fe-commons/dist/constants/contentTypes';
import { ADVERTISING } from '@univision/fe-commons/dist/constants/labelTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';

import { VIDEO_INLINE_TYPE } from '../../../../constants';

const STANDARD_POSITION = {
  [LARGE]: css`
    left: 16px;
    top: -40px;

    ${media.sm`
      left: 24px;
      top: -48px;
    `}
  `,
  [MEDIUM]: css`
    left: 16px;
    top: -40px;
  `,
  [SMALL]: css`
    left: 8px;
    top: -32px;
  `,
};

const positionMap = {
  [ADVERTISING]: STANDARD_POSITION,
  [ARTICLE]: STANDARD_POSITION,
  [EXTERNAL_CONTENT_PROMO]: STANDARD_POSITION,
  [LIVE_BLOG]: {
    [LARGE]: css`
      left: 16px;
      top: -16px;

      ${media.sm`
        left: 24px;
        top: -24px;
      `}
    `,
    [MEDIUM]: css`
      left: 16px;
      top: -24px;
    `,
    [SMALL]: css`
      left: 8px;
      top: -24px;
    `,
  },
  [SLIDESHOW]: {
    [LARGE]: css`
      left: 16px;
      top: -24px;

      ${media.sm`
        left: 24px;
        top: -24px;
      `}
    `,
    [MEDIUM]: css`
      left: 16px;
      top: -26px;
    `,
    [SMALL]: css`
      left: 8px;
      top: -26px;
    `,
  },
  [VIDEO]: {
    [LARGE]: css`
      left: 16px;
      top: -16px;

      ${media.sm`
        left: 24px;
        top: -24px;
      `}
    `,
    [MEDIUM]: css`
      left: 16px;
      top: -24px;
    `,
    [SMALL]: css`
      left: 8px;
      top: -24px;
    `,
  },
  [VIDEO_INLINE_TYPE]: {
    [LARGE]: css`
      left: 16px;
      top: 16px;

      ${media.sm`
        left: 24px;
        top: 24px;
      `}
    `,
    [MEDIUM]: css`
      left: 16px;
      top: 8px;
    `,
    [SMALL]: css`
      left: 8px;
      top: 4px;
    `,
  },
  [LIVE_STREAM]: {
    [LARGE]: css`
      left: 16px;
      top: 16px;
      ${media.sm`
        left: 24px;
        top: 24px;
      `}
    `,
    [MEDIUM]: css`
      left: 16px;
      top: 8px;
    `,
    [SMALL]: css`
      left: 8px;
      top: 8px;
    `,
  },
};

/**
 * Get badge label position
 * @param {string} size the size of the card
 * @param {string} type the type of the card
 * @param {bool} isInlineVideo if in inline video card
 * @returns {string}
 */
const getBadgePosition = ({ size, type }) => getKey(positionMap, `${type}.${size}`);

export default {
  badge: ({ size, type }) => css`
    position: absolute;
    ${getBadgePosition({ size, type })};
  `,
};
