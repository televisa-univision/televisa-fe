import { createGlobalStyle } from 'styled-components';

export default {
  global: createGlobalStyle`
    html, body {
      min-height: 100%;
    }
    #root {
      padding: 20px;
      min-height: 100%;
    }
  `,
};
