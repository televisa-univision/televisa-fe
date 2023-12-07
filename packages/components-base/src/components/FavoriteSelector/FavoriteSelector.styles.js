import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    padding: 0 4px 16px 4px;
  `,
  itemContainer: css`
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: scroll;
    padding-bottom: 5px;
    scrollbar-width: none;
    white-space: nowrap;
  `,
  item: css`
    display: inline-block;
    margin-right: 8px;

    &:first-of-type {
      margin-left: 16px;
    }
    &:last-of-type {
      margin-right: 16px;
    }

    ${media.sm`
      margin-right: 16px;

      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
    `}
  `,
  topBorder: ({ color }) => css`
    background-color: ${color || BLACK};
    height: 2px;
  `,
  title: ({ color }) => css`
    color: ${color || BLACK};
    font-size: 20px;
    font-weight: bold;
    margin: 16px 0;
  `,
};
