import { css, keyframes } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

const showupAnimation = keyframes`
  0% {
    filter: blur(10px);
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    filter: blur(0);
    opacity: 1;
    transform: scale(1);
  }
`;

export default {
  animationWrapper: css`
    animation: ${showupAnimation} .2s ease-in;
  `,
  container: css`
    height: fit-content;
    width: 100%;
    ${media.sm`
      height: 100%;
      width: 77%;
    `}
  `,
};
