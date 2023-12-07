import { css } from 'styled-components';

import {
  BLACK,
  BLACK_06,
  BLACK_08,
  BLACK_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {

  wrapper: ({ isDark }) => css`
    align-items: center;
    background: ${isDark ? BLACK_GREY : WHITE};
    border-radius: 4px;
    box-shadow: 0 -1px 3px 0px ${BLACK_06}, 0 2px 3px 0 ${BLACK_08};
    color: ${BLACK};
    display: flex;
    flex-direction: row;
    height: 80px;
    justify-content: flex-start;
    margin: 8px;
    position: relative;
    width: 95%;

    ${isDark && css`
      color: ${WHITE};
    `}

    ${media.sm`
      width: 100%;
    `}
  `,
  avatarItem: css`
    border-radius: 50%;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
    width: 60px;
    `,
  arrowItem: css`
    display: flex;
    margin-left: auto;
    margin-right: 10px;
    `,
};
