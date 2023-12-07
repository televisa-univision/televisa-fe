import { css } from 'styled-components';

import { GREY_WHISPER } from '@univision/fe-utilities/styled/constants';

export default {
  item: css`
    border-bottom: 1px solid ${GREY_WHISPER};

    &:last-of-type {
      border-bottom: 0;
    }
  `,
};
