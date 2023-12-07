import { css } from 'styled-components';

export default {
  animatedDiv: ({
    disableAnimation,
  }) => css`
    will-change: auto;
    ${disableAnimation && css`
      transform: initial !important;
    `}
  `,
};
