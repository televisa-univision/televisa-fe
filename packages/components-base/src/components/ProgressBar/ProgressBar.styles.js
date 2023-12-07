import { css } from 'styled-components';

export default {
  trail: css`
    height: 10px;
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 3;
  `,
  bar: css`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  `,
};
