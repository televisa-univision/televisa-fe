import { css } from 'styled-components';

import {
  BLACK_50,
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-utilities/styled/constants';

export default {
  overlay: css`
    background: ${BLACK_50};
    bottom:0;
    left:0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};
  `,
};
