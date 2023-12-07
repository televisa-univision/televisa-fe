import { css } from 'styled-components';

import { WHITE, SILVER_CHALICE } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    height: 100vh;
    padding: 5%;
    width: 100vw;
  `,
  container: css`
    align-items: center;
    border: 1px dashed ${SILVER_CHALICE};
    display: grid;
    grid-template-columns: repeat(4, 2fr);
    grid-template-rows: 1fr 2fr 3fr;
    height: 100%;
    padding: 15px 0;
  `,
  welcome: css`
    grid-column: 2/4;
    grid-row: 2;
    svg {
      max-height: 100%;
      max-width: 100%;
    }
  `,
  buttons: css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    grid-column: 2/4;
    grid-row: 3;
    justify-content: center;
  `,
  link: ({ color }) => css`
    align-items: center;
    background: ${color};
    color: ${WHITE};
    display: inline-flex;
    font-size: 15px;
    justify-content: center;
    line-height: 13px;
    margin: auto;
    margin: 0 5px;
    max-width: 250px;
    min-height: 50px;
    padding: 6px 10px;
    text-transform: uppercase;
    width: 100%;

    :hover {
      color: ${WHITE};
      opacity: 0.9;
    }
  `,
};
