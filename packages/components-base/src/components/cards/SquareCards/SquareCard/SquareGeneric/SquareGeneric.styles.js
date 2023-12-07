import { css } from 'styled-components';

import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import {
  WHITE,
  TRANSPARENT,
  BLACK_85,
} from '@univision/fe-utilities/styled/constants';
import {
  LARGE,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';

import { getSquareCardHeaderStyles } from '../../../helpers';

export default {
  promoContainer: css`
     flex-direction: column;
  `,
  promoBackgroundPicture: css`
    bottom: 0;
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    > div {
      height: 100%;
      padding-bottom: 0;
    }
  `,
  promoSchedule: ({ image }) => css`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    ${image && css`
      background-image: url(${image});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}
  `,
  promoBackgroundOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_85 })};
    bottom: 0;
    left: 0;
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,

  promoLink: css`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
  `,
  promoInfo: css`
    bottom: 60px;
    left: 16px;
    position: absolute;
    right: 16px;
    z-index: 4;
  `,
  promoLabelWrapper: ({ size }) => css`
    position: absolute;
    ${getFromMap(size,
    {
      [LARGE]: css`
       bottom: 60px;
      `,
      default: css`
        bottom: 40px;
      `,
    })}
  `,
  promoTitle: ({ size }) => css`
    ${getSquareCardHeaderStyles(size, { color: WHITE })}
    ${numberOfLines(1)}
  `,
};
