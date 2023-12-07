import { css } from 'styled-components';

export default {
  arrowIcon: css`
    position: absolute;
  `,
  arrowUp: css`
    border-bottom: 14px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    height: 0;
    left: 34px;
    position: absolute;
    top: -13px;
    width: 0;
  `,
  bar: css`
    position: relative;
  `,
  marketLogo: css`
    margin-left: 24px;
  `,
  marketWeatherWrapper: css`
    display: flex;
    position: absolute;
    right: 0;
    top: -7px;
  `,
  wrapper: css`
    align-items: flex-start;
    display: flex;
    position: relative;
  `,
};
