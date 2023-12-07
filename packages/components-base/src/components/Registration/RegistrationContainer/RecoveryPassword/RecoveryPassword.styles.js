import { css } from 'styled-components';
import {
  DARKER_GREY,
  GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: ({ theme }) => css`
    align-items: center;
    background: ${DARKER_GREY} url(${theme?.backgroundMobile}) no-repeat;
    background-size: cover;
    display: flex;
    height: 90vh;
    justify-content: center;
    width: 100%;
    ${media.md`
      border-radius: 4px;
      background-image: url(${theme?.backgroundDesktop});
      height: 476px;
      margin-top: 28px;
      width: 731px;
    `}
  `,
  formContainer: css`
    width: 95%;
    ${media.md`
      width: 376px;
    `}
  
  `,
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
  title: css`
    color: ${WHITE};
    font-size: ${rem('20px')};
    line-height: ${rem('24px')};
    margin-bottom: 30px;
    text-align: center;
  `,
  titleBack: css`
    display: block;
    margin: 15px 0;
    margin-left: 15px;
    width: 100%;
    ${media.md`
      display: none;
    `}
  `,
  wrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    ${media.md`
      justify-content: center;
    `}
  `,
};
