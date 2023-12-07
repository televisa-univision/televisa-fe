import { css } from 'styled-components';

export default {
  videoWrapper: css`
    & > div > div:last-child {
      @media (max-width: 768px) {
        bottom: 12vh;
      }
    }
  `,
};
