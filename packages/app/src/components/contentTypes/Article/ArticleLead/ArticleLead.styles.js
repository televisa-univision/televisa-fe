import { css } from 'styled-components';

import { GREY } from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  inlineImagePlaceholder: () => css`
    background: ${GREY};
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    opacity: .1;
    padding-bottom: 56%;
    position: relative;
    right: 50%;
    width: 100vw;

    ${media.md`
      left: 0;
      margin: 0;
      right: 0;
      width: 100%;
    `}
  `,
};
