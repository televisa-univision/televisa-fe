import { css } from 'styled-components';

import {
  GRADIENT_BLACK_TRANSPARENT,
  GREY_BLACK,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { getCardHoverState } from '@univision/fe-components-base/dist/components/cards/helpers';

export default {
  background: css`
    display: block;
    width: 100%;
  `,
  backgroundOverlay: css`
    background: ${GRADIENT_BLACK_TRANSPARENT};
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  `,
  cta: css`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  slideCount: css`
    bottom: 9px;
    color: ${WHITE};
    font-size: ${rem('10px')};
    left: 16px;
    line-height: ${rem('14px')};
    position: absolute;
    text-transform: uppercase;
    z-index: 2;

    ${getCardHoverState(GREY_BLACK)}
  `,
  slideshowIcon: css`
    margin-right: 4px;
  `,
  title: css`
    bottom: 32px;
    color: ${WHITE};
    font-size: ${rem('14px')};
    left: 16px;
    line-height: ${rem('18px')};
    position: absolute;
    z-index: 2;

    ${getCardHoverState(GREY_BLACK)}
  `,
  wrapper: css`
    display: block;
    position: relative;
    width: 100%;
  `,
};
