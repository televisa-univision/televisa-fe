import { css } from 'styled-components';

export default {
  logo: css`
    max-height: 50px;
  `,
  wrapper: ({ theme }) => css`
    align-items: center;
    background: ${theme.headerBackground};
    display: flex;
    flex-wrap: nowrap;
    height: 70px;
    justify-content: center;
    padding: 8px 0;
    width: 100%;
  `,
};
