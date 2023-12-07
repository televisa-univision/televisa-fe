import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  contentWrapper: css`
    margin-bottom: 24px;
    width: 95%;
    ${media.sm`
      width: 410px;
    `}
  `,
  form: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 95%;
    ${media.sm`
        width: 410px;
    `}
  `,
  inputWrapper: css`
    margin-bottom: 24px;
    width: 100%;
  `,
  pageDesc: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    text-align: center;
  `,
  wrapper: css`
    align-items: center;
    background-color: ${VERY_LIGHT_GREY};
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-left: 7px;
    padding-right: 7px;
    width: 100%;
    ${media.sm`
      background-color: ${WHITE};
      height: 100%;
      padding-top: 35px;
      ${media.sm`
        padding-top: 92px;
      `}
    `}
  `,
};
