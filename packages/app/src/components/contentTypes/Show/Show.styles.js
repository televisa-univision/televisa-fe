import { createGlobalStyle, css } from 'styled-components';
import {
  WHITE,
  BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  global: createGlobalStyle`
    ([data-widget-type="LongFormTrailer"]) {
      display: none;
    }
  `,
  showBackground: ({ tabVariant }) => css`
    ${tabVariant === 'dark' && css`
      background-color: ${BLACK};
      color: ${WHITE};
    `}
    ${tabVariant === 'light' && css`
      background-color: ${WHITE};
    `}
  `,
};
