import { css } from 'styled-components';

import {
  media,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  WHITE,
  GREY_BLACK,
  DARKER_GREY,
} from '@univision/fe-utilities/styled/constants';
import {
  ARTICLE,
  LIVE_BLOG, SLIDESHOW, VIDEO,
} from '@univision/fe-commons/dist/constants/contentTypes';
import {
  ADVERTISING,
} from '@univision/shared-components/dist/constants/labelTypes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';

const STANDARD_POSITION = {
  [LARGE]: css`
    margin-bottom: 16px;
    margin-left: 16px;

    ${media.sm`
      margin-bottom: 24px;
      margin-left: 24px;
    `};
  `,
  [MEDIUM]: css`
    margin-bottom: 16px;
    margin-left: 16px;
  `,
  [SMALL]: css`
    margin-bottom: 8px;
    margin-left: 8px;
  `,
};

const positionMap = {
  [ARTICLE]: STANDARD_POSITION,
  [LIVE_BLOG]: STANDARD_POSITION,
  [VIDEO]: STANDARD_POSITION,
  [SLIDESHOW]: STANDARD_POSITION,
  [ADVERTISING]: STANDARD_POSITION,
  [HOROSCOPE]: {
    ...STANDARD_POSITION,
    [SMALL]: css`
      margin-bottom: 16px;
      margin-left: 16px;
    `,
  },
};

/**
 * Get play container size
 * @param {string} size the size of the card
 * @returns {string}
 */
const getPlayContainerSize = size => getFromMap(size, {
  [LARGE]: css`
    height: 20px;
    width: 20px;
  `,
  default: css`
    height: 16px;
    width: 16px;
  `,
});

/**
 * Get published position
 * @param {string} size the size of the card
 * @param {string} type the card type
 * @returns {string}
 */
const getPublishedPosition = ({ size, type }) => getKey(positionMap, `${type}.${size}`);

export default {
  articleIcon: css`
    margin-right: 10px;
    margin-top: -2px;
  `,
  playContainer: ({ size }) => css`
    align-items: center;
    border: ${size === LARGE ? '2px' : '1px'} solid ${WHITE};
    border-radius: 50%;
    display: flex;
    height: 20px;
    justify-content: center;
    margin-right: 10px;
    position: relative;
    width: 20px;
    ${getPlayContainerSize(size)}
  `,
  published: ({
    size, isDark, type, isWorldCupMVP,
  }) => css`
    align-items: center;
    color: ${isDark ? WHITE : DARKER_GREY};
    display: flex;
    font-size: ${rem(10)};
    height: 20px;
    justify-content: flex-start;
    text-transform: uppercase;
    ${getPublishedPosition({ size, type })}

    &:hover {
      color: ${GREY_BLACK};
    }
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
      font-size: ${rem('12px')};
      font-weight: 400;
      letter-spacing: 0.48px;
      line-height: ${rem('21px')};
      text-transform: lowercase;
    `}
  `,
  slideIcon: css`
    margin-right: 10px;
  `,
  sponsor: css`
    align-items: center;
    display: flex;
    justify-content: center;

    span {
      font-size: ${rem(10)};      
    }
    
    &:before {
      content: "|";
      margin: 0 5px;
    }
  `,
};
