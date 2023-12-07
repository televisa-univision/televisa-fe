/**
 * @module PrendeTV Social Network Styles
 */
import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BITTERSWEET, BLACK, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  linkWrapper: css`
    display: inline-block;
    margin-right: 33px;

    &:last-child {
      margin: 0;
    }
  `,
  wrapper: ({ isHeader }) => css`
    align-items: ${isHeader ? 'center' : 'flex-start'};
    display: flex;
    margin: ${isHeader ? '40px 0' : '0'};
    position: ${isHeader ? 'relative' : 'absolute'};
    right: 0;
    top: 0;

    a {
      margin-right: 14px;

      path {
        fill: ${WHITE};

        &:hover {
          fill: ${BITTERSWEET};
        }

        &:last-child {
          fill: ${BLACK};
        }
      }
    }

    ${media.md`
      position: relative;

      ${!isHeader && css`
        margin: 0 55px 0 0;
      `}
    `}
  `,
};
