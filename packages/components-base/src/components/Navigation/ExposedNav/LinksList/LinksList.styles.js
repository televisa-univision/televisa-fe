import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  liveIcon: css`
    margin-left: -9px;
  `,
  navItem: css`
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 24px;
    ${media.md`
      margin-bottom: 0;
      margin-right: 20px;
    `}
    &:last-of-type {
      margin-right: 0;
    }
  `,
  navLink: ({ theme, underline }) => css`
    border-bottom: ${underline ? `1px ${WHITE} solid` : 0};
    color: ${theme.exposedNavLinksColor || WHITE};
    font-size: ${rem(16)};
    line-height: ${rem(17)};
    &:hover {
      border-bottom: 1px ${WHITE} solid;
      color: ${theme.exposedNavLinksColorHover || WHITE};
    }
  `,
  marketLink: css`
    color: ${WHITE};
    font-size: ${rem(16)};

    &:hover {
      color: ${WHITE};
    }
  `,
};
