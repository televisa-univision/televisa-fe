import { createGlobalStyle } from 'styled-components';

export default {
  bodyReset: createGlobalStyle`
  body #root {
    padding: 0;
  }
`,
  blackBody: createGlobalStyle`
  body {
    background-color: #000;
  }
`,
};
