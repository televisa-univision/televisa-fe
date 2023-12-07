import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { DARKER_GREY, WHITE, GREY_ALTO } from '@univision/fe-utilities/styled/constants';

export default {
  badgeWrapper: css`
    margin-bottom: 16px;

    ${media.md`
      margin: 0 16px 0 0;
    `}
  `,
  container: css`
    align-items: center;
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    left: 0;
    padding: 30px 0;
    position: absolute;
    top: 0;
    width: 100%;

    ${media.md`
      flex-direction: row;
      justify-content: flex-start;
      margin: 0 auto;
      max-width: 376px;
      padding: 43px 0 34px;
      position: relative;
    `}
  `,
  editAccountButton: css`
    color: ${GREY_ALTO};
    font-size: ${rem(12)};
    letter-spacing: 0;
    line-height: ${rem(18)};
    text-transform: uppercase;

    ${media.md`
      display: none;
    `}
  `,
  formContainer: css`
    display: none;
    margin: 0 auto;
    max-width: 376px;

    ${media.md`
      display: block;
    `}
  `,
  userName: css`
    color: ${WHITE};
    font-size: ${rem(20)};
    line-height: ${rem(24)};
    margin-bottom: 16px;
    text-align: center;

    ${media.md`
      margin: 0 0 0 18px;
    `}
  `,
  wrapper: ({ theme }) => css`
    align-items: center;
    background: ${DARKER_GREY} url(${theme?.backgroundMobile}) no-repeat;
    background-size: cover;
    height: 0;
    padding-bottom: 56.2%;
    position: relative;
    width: 100%;

    ${media.md`
      border-radius: 4px;
      background-image: url(${theme?.backgroundDesktop});
      height: auto;
      padding-bottom: 0;
    `}
  `,
};
