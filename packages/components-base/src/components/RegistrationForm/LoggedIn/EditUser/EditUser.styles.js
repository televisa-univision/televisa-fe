import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  DARKER_GREY,
  GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  inputItem: css`
    margin-bottom: 16px;

    label, input {
      color: ${WHITE};
      background-color: ${DARKER_GREY};
    }

    input {
      background-color: transparent;
      border-color: ${GREY};
    }
  `,
  logOutButton: css`
    color: ${GREY};
    font-size: ${rem(12)};
    letter-spacing: 0.79px;
    line-height: ${rem(15)};
    margin-top: 24px;
    text-transform: uppercase;
  `,
  wrapper: css`
    padding-bottom: 20px;
    width: 100%;
  `,
};
