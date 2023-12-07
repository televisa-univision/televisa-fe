import { css } from 'styled-components';

import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import { MEDIUM, SMALL } from '@univision/fe-commons/dist/constants/cardSizes';
import {
  BLACK,
  MOODY_BLUE,
} from '@univision/fe-utilities/styled/constants';

/**
 * gets the badge container margin
 * @param {string} size - size of the card
 * @returns {func}
 */
const getBadgeContainerMargin = size => getFromMap(size, {
  [SMALL]: css`
    top: 8.3%;
  `,
  [MEDIUM]: css`
    top: 11.4%;
  `,
  default: css`
    top: 21%;
  `,
});

export default {
  badgeContainer: ({ size }) => css`
    position: absolute;
    width: 100%;
    ${getBadgeContainerMargin(size)}
  `,
  imageWrapper: css`
    height: 100%;
    position: absolute;
    width: 100%;
  `,
  picture: css`
    > div {
      padding-bottom: 100%;
    }
  `,
  pictureMask: css`
    background: linear-gradient(61.39deg, rgba(29,29,234,0.47) 0%, rgba(198,38,182,0.48) 32.58%, ${MOODY_BLUE} 100%);
    height: 100%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    width: 100%;
  `,
  wrapper: css`
    background-color: ${BLACK};
    height: 100%;
    position: absolute;
    width: 100%;
  `,
};
