import { css } from 'styled-components';

import {
  BLACK_GREY,
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  buttonWrapper: css`
    margin-top: 32px;
  `,
  forgotPassword: css`
    color: ${BLACK_GREY};
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    margin: 24px 0 32px;
    text-decoration: underline;
  `,
  inputItem: css`
    margin-bottom: 16px;

    label, input {
      background-color: ${VERY_LIGHT_GREY};
    }

    ${media.md`
      label, input {
        background-color: ${WHITE};
      }
    `}
  `,
  intro: css`
    font-size: ${rem(16)};
    line-height: ${rem(22)};
    margin-bottom: 25px;
  `,
  title: css`
    margin-bottom: 18px;
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    height: 100%;
    padding: 24px 19px;
    text-align: center;
    width: 100%;

    ${media.md`
      background-color: ${WHITE};
    `}
  `,
};
