import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  container: css`
    display: flex;
    width: 100%;
  `,
  title: ({ color }) => css`
    color: ${color};
    cursor: pointer;
    display: flex;
    font-size: ${rem('20px')};
    font-weight: bold;
    line-height: ${rem('24px')};
    width: 100%;
    ${media.sm`
      justify-content: center;
    `}
    svg {
      display: flex;
      margin-left: -4px;
      ${media.sm`
        display: none;
      `}
    }
  `,
};
