import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: ({ isDark }) => css`
    ${isDark && css`
      background-color: ${BLACK};
    `}
    .widget {
      margin: 0 auto;
      padding-bottom: 16px;
      &:first-of-type {
        margin-top: 0;
        & > .uvs-widget-lead {
          margin-top: 0;
          padding-bottom: 0;
          padding-top: 16px;
          ${media.sm`
            padding-top: 24px;
          `}
        }
      }
      &:last-of-type {
        margin-bottom: 0;
        padding-bottom: 0;
        & > .uvs-widget-lead {
          padding-bottom: 16px;
          padding-top: 16px;
          ${media.sm`
            padding-bottom: 24px;
          `}
        }
      }
      ${media.sm`
        padding-bottom: 24px;
      `}
    }
  `,
};
