import { css } from 'styled-components';

import { BLACK_08 } from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { getCardAspectRatio, getCardWidth } from '../helpers';

export default {
  actionBarWrapper: css`
    bottom: 0;
    height: 48px;
    overflow: unset;
    position: absolute;
    width: 100%;
    z-index: 301;
  `,
  container: ({ type }) => css`
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 ${BLACK_08};
    flex: 1;
    position: relative;
    ${getCardWidth(type)}
    &.leadCard {
      height: 100%;
      max-width: 100%;
    }
  `,
  aspectRatioBox: ({ hasActionBar, type }) => css`
    height: 0;
    overflow: hidden;
    position: relative;
    ${!hasActionBar && media.sm`
      height: auto;
    `}
    ${getCardAspectRatio(type)}
  `,
  innerAspectRatioBox: css`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    > * {
      height: 100%;
      width: 100%;
    }
  `,
};
