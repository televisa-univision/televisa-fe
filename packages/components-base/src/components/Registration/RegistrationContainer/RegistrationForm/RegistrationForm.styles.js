import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  form: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;

    button {
      margin-top: 23px;
    }
  `,
  inputItem: css`
    margin-bottom: 17px;
    padding: 0 16px;
    width: 100%;

    label {
      background-color: ${VERY_LIGHT_GREY};

      ${media.sm`
        background-color: ${WHITE};
      `}
    }

    ${media.sm`
      padding: 0;
      width: 410px;
    `}
  `,
  pageDesc: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    padding-bottom: 32px;
    text-align: center;
  `,
  login: css`
    font-size: ${rem('16px')};
    line-height: ${rem('19px')};
    text-align: center;
    a {
      color: inherit;
      text-decoration: underline;
    }
`,
  terms: css`
    font-size: ${rem('14px')};
    line-height: ${rem('18px')};
    margin-bottom: 40px;
    margin-top: 24px;
    text-align: center;
    a {
      color: inherit;
      text-decoration: underline;
    }
  `,
  title: css`
    margin-bottom: 24px;
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    height: 100vh;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 24px;
    width: 100%;
    ${media.sm`
      background-color: ${WHITE};
      height: 100%;
      padding-top: 136px;
    `}
  `,
};
