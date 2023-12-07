import { css } from 'styled-components';
import {
  BLACK_85,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

export default {
  filter: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_85 })};
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: .5s ease;
    width: 100%;
    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
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
  squareImageWrapper: css`
    display: block;
    height: 100%;
    position: relative;
    width: 100%;
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
};
