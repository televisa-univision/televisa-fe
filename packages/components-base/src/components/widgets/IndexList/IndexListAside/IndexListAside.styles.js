import { css } from 'styled-components';

import STRIPED_BACKGROUND from '@univision/fe-commons/dist/assets/images/striped-background.svg';

export default {
  stickyAdWrapper: css`
    position: sticky;
    top: 0;
  `,
  wrapper: css`
    background: url(${STRIPED_BACKGROUND});
    height: 100%;
    width: 100%;
  `,
};
