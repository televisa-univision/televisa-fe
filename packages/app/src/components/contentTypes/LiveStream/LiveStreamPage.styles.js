import { css } from 'styled-components';
import media from '@univision/fe-utilities/styled/mixins/media';
import { TRANSPARENT } from '@univision/fe-utilities/styled/constants';

export default {
  themeWrapper: ({ theme }) => css`
    background-color: ${theme?.layoutColor ? theme?.layoutColor : TRANSPARENT};
    overflow-x: hidden;
    padding-top: 0;
    ${media.md`
      padding-top: 1.5rem;
    `}
  `,
};
