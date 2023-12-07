import { css } from 'styled-components';
import {
  LOADING_GRAY,
  VERY_LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  cardSizer: css`
    border-radius: 4px;
    overflow: hidden;
  `,
  loading: css`
    > div {
      color: ${LOADING_GRAY};
    }
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
  `,
};
