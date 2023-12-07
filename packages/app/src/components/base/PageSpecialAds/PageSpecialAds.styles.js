import { css } from 'styled-components';
import { ZINDEX_ABOVE_NAVIGATION } from '@univision/fe-utilities/styled/constants';

export default {
  /* Creating space for the interstitial to fire */
  specialAds: css`
    height: 1px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1px;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 100};
  `,
};
