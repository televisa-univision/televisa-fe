import { css } from 'styled-components';

export default {
  indicator: ({ className }) => css`
    ${!className && css`
      left: -999em;
      position: absolute;
      top: -999em;
    `}
`,
};
