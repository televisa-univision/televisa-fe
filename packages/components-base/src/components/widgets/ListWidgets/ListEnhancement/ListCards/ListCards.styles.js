import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  cardWrapper: css`
    margin: 0 auto 17px auto;
  `,
  listColumn: css`
    ${media.md`
      padding-right: 14px;
    `}
  `,
};
