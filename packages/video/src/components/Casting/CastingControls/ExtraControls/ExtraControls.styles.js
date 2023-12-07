import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  extraWrapper: css`
    align-items: center;
    display: flex;
    height: 48px;
    margin-right: 6%;
    ${media.md`
      height: 85px;
      margin-right: 24px;
    `}
  `,
};
