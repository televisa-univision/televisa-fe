import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  loading: ({ maxHeight, isNewsDigitalChannel }) => css`
    max-height: ${maxHeight || '190'}px;
    overflow: hidden;
    ${media.sm`
      max-height: ${isNewsDigitalChannel ? '390' : '190'}px;
      overflow: auto;
    `}
  `,
};
