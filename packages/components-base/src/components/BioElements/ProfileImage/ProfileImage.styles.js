import { css } from 'styled-components';

export default {
  profileWrapper: css`
    display: flex;
    height: max-content;
    margin-bottom: 16px;
    overflow: hidden;
    user-select: none;
    width: 100%;

    > div {
      padding-bottom: 44%;
    }

    picture {
      width: 100%;
    }
  `,
};
