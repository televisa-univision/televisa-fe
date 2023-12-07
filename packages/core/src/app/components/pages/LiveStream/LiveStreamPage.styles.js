import { css } from 'styled-components';
import { TRANSPARENT } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  themeWrapper: ({ theme }) => css`
    background-color: ${theme?.layoutColor ? theme?.layoutColor : TRANSPARENT};
  `,
};
