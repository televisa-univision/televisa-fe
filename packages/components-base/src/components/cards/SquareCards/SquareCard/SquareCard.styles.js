import { css } from 'styled-components';

import {
  WHITE,
  BLACK_GREY,
  BLACK_06,
  BLACK_20,
} from '@univision/fe-utilities/styled/constants';

export default {
  cardSizer: ({ isDark }) => css`
    background: ${isDark ? BLACK_GREY : WHITE};
    border-radius: 4px;
    box-shadow: 0 -1px 3px 0px ${BLACK_06}, 0 2px 3px 0 ${BLACK_20};
    overflow: hidden;
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
  `,
};
