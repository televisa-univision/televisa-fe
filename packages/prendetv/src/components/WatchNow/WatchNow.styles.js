/**
 * @module PrendeTV Navigation Styles
 */
import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BITTERSWEET, CHINESE_SILVER, MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

export default {
  link: css`
    align-items: center;
    color: ${CHINESE_SILVER};
    display: flex;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(15)};
    font-weight: bold;
    letter-spacing: ${rem(1.25)};
    margin-bottom: 12px;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      color: ${BITTERSWEET};

      div {
        border-color: ${BITTERSWEET};
      }

      path {
        fill: ${BITTERSWEET};
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  `,
  watchIcon: ({ name, padding }) => css`
    display: flex;
    margin-right: 8px;
    padding: ${padding};

    ${name === 'playnocircle' && css`
      align-items: center;
      border: 2px solid ${CHINESE_SILVER};
      border-radius: 50%;
      height: 20px;
      justify-content: center;
      width: 20px;
    `}
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
  `,
};
