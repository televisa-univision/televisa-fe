import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK_GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  temp: css`
    color: ${BLACK_GREY};
    font-size: ${rem(12)};
    margin-left: 4px;
  `,
  wrapper: ({ isMax }) => css`
    align-items: center;
    display: inline-flex;

    ${!isMax && css`
      margin-left: 5px;
    `}
  `,
};
