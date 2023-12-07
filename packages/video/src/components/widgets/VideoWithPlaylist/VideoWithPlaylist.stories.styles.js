import { createGlobalStyle } from 'styled-components';

import {
  BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  global: createGlobalStyle`
    #root {
      background-color: ${isDark => (isDark ? BLACK : WHITE)};
    }
  `,
};
