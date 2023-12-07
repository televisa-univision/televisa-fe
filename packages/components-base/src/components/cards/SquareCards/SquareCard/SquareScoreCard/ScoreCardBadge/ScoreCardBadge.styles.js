import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

/**
 * Get badge position
 * @param {string} size the type of the card
 * @returns {string}
 */
const getBadgePosition = size => getFromMap(size, {
  [LARGE]: css`
    left: 24px;
    top: 52%;
  `,
  [MEDIUM]: css`
    left: 16px;
    top: 48%;
  `,
  [SMALL]: css`
    left: 8px;
    top: 35%;
  `,
});

export default {
  badge: ({ size }) => css`
    position: absolute;
    ${getBadgePosition(size)}
    z-index: 2;
  `,
};
