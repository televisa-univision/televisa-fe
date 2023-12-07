import { css } from 'styled-components';

import { ZINDEX_ABOVE_NAVIGATION } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  modalBackground: ({ backgroundColor }) => css`
    background-color: ${backgroundColor};
    height: 100vh;
    width: 100vw;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};
  `,
};
