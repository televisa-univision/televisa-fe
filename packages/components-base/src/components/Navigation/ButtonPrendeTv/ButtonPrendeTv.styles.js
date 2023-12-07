import { css } from 'styled-components';

export default {
  actionLink: css`
    &&& {
      border-radius: 4px;
      height: 24px;
      margin: 0;
      min-height: 24px;
      min-width: 60px;
      width: 60px;
      @media (max-width: 405px) {
        min-width: 50px;
        width: 50px;
        padding: 0 4px;
      }
    }
  `,
  iconWrapper: css`
    &&& {
      align-items: center;
      display: flex;
      height: 17px;
      justify-content: center;
      overflow: hidden;
      position: relative;
      width: 48px;

      > svg {
        height: 32px;
        position: absolute;
        width: 32px;
      }
    }
  `,
};
