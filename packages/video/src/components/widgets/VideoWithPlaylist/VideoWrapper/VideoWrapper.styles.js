import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import {
  ZINDEX_ABOVE_REACTION,
} from '@univision/fe-utilities/styled/constants';

export default {
  slate: ({ slateImage }) => css`
    background-image: url(${slateImage});
    background-size: cover;
    height: auto;
    padding-bottom: 56.25%;
    width: 100%;
  `,
  tooltip: () => css`
    && {
      bottom: 130px;
      left: 0;
      max-width: 335px;
      right: auto;
      text-align: left;
      z-index: ${ZINDEX_ABOVE_REACTION};

      ${media.md`
        bottom: 115px;
        max-width: none;
      `}
     }
  `,
};
