import { css } from 'styled-components';

export default {
  container: css`
    width: 100%;
  `,
  buttonWrapper: css`
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
  `,
  loading: css`
    && {
      position: relative;
    }
  `,
};
