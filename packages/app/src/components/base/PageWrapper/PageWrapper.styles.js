import { css } from 'styled-components';
import { BLACK } from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: ({ theme }) => css`
    ${theme?.isDark && css`
      background: ${BLACK};
    `}
  `,
};
