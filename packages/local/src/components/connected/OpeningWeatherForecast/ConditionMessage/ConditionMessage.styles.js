import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  condensedText: ({ isValue }) => css`
    display: flex;
    font-size: clamp(${rem(12)}, 3.5vw, ${rem(14)});

    ${isValue && css`
      margin-left: 2px;
    `}
  `,
  wrapper: css`
    display: inline-flex;
    flex-shrink: 0;
  `,
};
