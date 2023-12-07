import { css } from 'styled-components';
import {
  BLACK,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  closeWrapper: css`
    margin-right: 10px;
  `,
  userLetter: ({ isDark }) => css`
    background-color: ${isDark ? WHITE : BLACK};
    border-radius: 50%;
    color: ${isDark ? BLACK : WHITE};
    height: 24px;
    text-align: center;
    text-transform: uppercase;
    width: 24px;
  `,
  wrapper: css`
    cursor: pointer;
    display: flex;
    margin-right: 12px;
    ${media.sm`
      margin-right: 0;
    `}
  `,
};
