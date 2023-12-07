import { css } from 'styled-components';
import {
  BLACK_85,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

export default {
  backgroundOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_85 })};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  `,
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
  picture: css`
    img {
      height: auto;
    }
  `,
  squareImageWrapper: css`
    display: block;
    position: relative;
    width: 100%;
  `,
};
