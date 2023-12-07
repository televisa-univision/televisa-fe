import { css } from 'styled-components';

export default {
  lotteryWrapper: css`
    min-height: 1500px;
    text-align: center;
    width: 100%;
  `,
  lotteryFrame: ({ mobileHeight, desktopHeight }) => css`
    border: 0;
    height: ${mobileHeight}px;
    width: 100%;

    @media (min-width: 480px) {
      height: ${desktopHeight}px;
    }
  `,
  adWrapper: css`
    margin-bottom: 16px;
  `,
};
