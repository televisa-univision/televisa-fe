import { css, createGlobalStyle } from 'styled-components';
import {
  NAMESPACE,
  WIDGETS_MARGIN_BOTTOM_MOBILE,
  WIDGETS_MARGIN_BOTTOM_DESKTOP,
  ZINDEX_ABOVE_REACTION,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  // Add a static height on header to avoid DOM position changes
  openingWrapper: ({ hasMatchId }) => css`
    display: block;
    height: 265px;

    ${media.md`
      height 245px;
    `}

    ${!hasMatchId && css`
      height: 190px;

      ${media.md`
        height 170px;
      `}
    `}
  `,
  sticky: css`
    z-index: ${ZINDEX_ABOVE_REACTION};
  `,
  global: createGlobalStyle`
   .openingWrapper {
      .widget:last-of-type {
        margin-bottom: 0;
        & > .${NAMESPACE}widget {
          margin-bottom: ${WIDGETS_MARGIN_BOTTOM_MOBILE};
          ${media.md`
            margin-bottom: ${WIDGETS_MARGIN_BOTTOM_DESKTOP};
          `}
        }
      }
      .widget[data-widget-type="DeportesGridSoccerMatchCenterOpening"] {
        margin-top: 0;
      }
    }
    :target:before {
      content: "";
      display: block;
      height: 190px;
      margin: -190px 0 0;
    }
  `,
};
