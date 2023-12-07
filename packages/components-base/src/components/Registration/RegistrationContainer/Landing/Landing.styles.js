import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  VERY_LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  buttonContainer: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding-left: 5px;
    padding-right: 5px;
    width: 100%;
  `,
  loginWithEmail: css`
    background: transparent;
    height: 48px;
    outline: none;
    text-align: center;
    text-decoration: underline;
  `,
  title: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    padding-bottom: 16px;
    text-align: center;
  `,
  wrapper: css`
    background-color: ${VERY_LIGHT_GREY};
    height: 100%;
    padding-top: 24px;
    width: 100%;
    ${media.sm`
      background-color: ${WHITE};
      padding-top: 87px;
    `}
    button {
      margin-bottom: 16px;
      width: 95%;
      ${media.sm`
        width: 376px;
      `}
    }
  `,
};
