import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  crossVerticalListWrapper: css`
    max-width: 100%;
    ${media.sm`
      margin: 0;
      max-width: 830px;
    `}
  `,
  title: ({ color, isDark }) => css`
    color: ${isDark ? WHITE : color};
    font-size:  ${rem(20)};
    a {
      color: ${isDark ? WHITE : color};
      text-decoration: none;
      &:hover {
        color: ${isDark ? WHITE : color};
      }
    }
  `,
  row: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,
  titleWrapper: css`
    margin-bottom: 16px;
    ${media.sm`
      margin-left: 6px;
    `}
    position: relative;
  `,
  verticalCardWrapper: ({ item }) => css`
    display: flex;
    height: 125px;
    justify-content: center;
    margin-bottom: 8px;
    padding: 0;
    width: 100%;
    > div {
      width: 100%;
    }
    ${media.sm`
      display: unset;
      height: 136px;
      width: 410px;
      margin-bottom: 16px;
      ${item % 2 === 0 ? css`
        padding-right: 8px;
      ` : css`
        padding-left: 8px;
      `}
    `}
  `,
};
