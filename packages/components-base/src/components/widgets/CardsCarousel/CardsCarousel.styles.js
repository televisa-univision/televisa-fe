import { css } from 'styled-components';

import {
  BLACK,
  GREY_BLACK,
} from '@univision/fe-utilities/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { getThemeGradient } from '../../cards/helpers';

export default {
  darkContainer: ({ hasAdSkin }) => css`
    background-color: ${BLACK};
    bottom: 0;
    box-sizing: content-box;
    height: 100%;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: absolute;
    right: 0;
    top: 0;
    width: 100vw;

    ${media.md`
      ${hasAdSkin && css`
        left: -16px;
        margin-left: 0;
        margin-right: 0;
        padding: 0 16px;
        width: 100%;
      `}
    `}
  `,
  titleBar: ({ theme }) => css`
    background: ${theme.isDark ? getThemeGradient(theme) : theme.primary};
    height: 2px;
    width: 100%;
  `,
  title: ({ color }) => css`
    color: ${color};
    font-size:  ${rem('20px')};

    a {
      color: ${color};

      &:hover {
        color: ${GREY_BLACK};
      }
    }
  `,
  titleWrapper: css`
    margin-top: 16px;
    position: relative;
  `,
};
