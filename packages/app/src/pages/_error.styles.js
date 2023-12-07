import { css } from 'styled-components';

export default {
  staticHeader: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 50px;
    justify-content: space-between;
    overflow: hidden;
    padding: 3px;

    & > a {
      display: flex;
      margin: 0 auto;
    }
  `,
};
