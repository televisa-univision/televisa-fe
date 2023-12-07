import { createGlobalStyle } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  NAMESPACE,
  WIDGETS_MARGIN_BOTTOM_MOBILE,
  WIDGETS_MARGIN_BOTTOM_DESKTOP,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  global: createGlobalStyle`
   .app-container {
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
