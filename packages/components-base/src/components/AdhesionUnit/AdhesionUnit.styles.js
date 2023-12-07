import { css } from 'styled-components';
import { GREY } from '@univision/fe-utilities/styled/constants';

export default {
  closeWrapper: css`
    align-items: center;
    background-color: ${GREY};
    cursor: pointer;
    display: flex;
    height: 12px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 12px;
  `,
  stickyAdWrapper: () => css`
    align-items: center;
    bottom: 15px;
    display: flex;
    height: 50px;
    justify-content: center;
    left: 50%;
    position: fixed;
    transform: translate(-50%, 0);
    width: 320px;
    z-index: 5;
  `,
};
