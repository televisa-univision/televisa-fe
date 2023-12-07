import { css } from 'styled-components';
import {
  WHITE, LIGHT_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  testCard: css`
    background-color: ${WHITE};
    border: 1px solid ${LIGHT_GREY};
    border-radius: 3px;
    position: relative;
  `,

  footer: css`
    bottom: 0;
    position: absolute;
    width: 100%;
  `,
};
