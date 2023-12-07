import { css } from 'styled-components';
import { GREY_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import { getCardHoverState } from '../cards/helpers';

export default {
  cardOptionsWrapper: ({ color }) => css`
    display: flex;
    justify-content: flex-star;
    && {
      > * {
        border-left: 1px solid ${color};
        padding: 0 8px;
        &:first-child {
          border: none;
          padding-left: 0;
        }
      }
      button, a {
        ${getCardHoverState(GREY_BLACK)}
      }
    }
  `,
};
