/**
 * @module PrendeTV News Item Styles
 */
import { css } from 'styled-components';

import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET,
  BLACK,
  BLACK_GREY,
  CHINESE_SILVER,
  GREY_BLACK_LIGHT_WITH_ALPHA,
  MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: css`
    border-bottom: 1px solid ${GREY_BLACK_LIGHT_WITH_ALPHA};
    margin: 20px 0 0;
    width: 100%;

    ${media.md`
      padding: 0 0 25px;
    `}
  `,
  link: css`
    display: block;
    text-decoration: none;
    &:hover{
      text-decoration: none;
    }

    ${media.md`
      display: flex;
      justify-content: space-between;
    `}
  `,
  imageWrapper: css`
    max-height: 103px;
    max-width: 183px;
    overflow: hidden;
    ${media.md`
      max-height: 150px;
      max-width: 267px;
    `}
  `,
  image: css`
    border-bottom: 1px solid ${CHINESE_SILVER};
    width: 100%;
  `,
  infoWrapper: css`
    display: block;
    margin: 10px 0 15px;

    ${media.md`
      margin: 0;
      width: 70%;
    `}
  `,
  title: css`
    color: ${BLACK};
    display: flex;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(16)};
    font-weight: 500;
    justify-content: space-between;
    letter-spacing: ${rem(1)};
    line-height: ${rem(20)};
    margin: 0;

    ${media.md`
      display: -webkit-box;
      font-size: ${rem(20)};
      letter-spacing: ${rem(1.25)};
      line-height: ${rem(24)};
      max-height: 43px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    `}
  `,
  titleText: css`
    width: 49%;

    ${media.md`
      width: 100%;
    `}
  `,
  description: css`
    color: ${BLACK_GREY};
    font-family: 'Roboto', sans-serif;
    font-size: ${rem(16)};
    font-weight: 300;
    line-height: ${rem(22)};
    margin: 14px 0 0;

    ${media.md`
      display: -webkit-box;
      height: 62px;
      margin: 16px 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    `}
  `,
  seeMore: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: 500;
    letter-spacing: ${rem(1)};
    line-height: ${rem(14)};
    margin: 10px 0 0;

    ${media.md`
      display: block;
      margin: 15px 0 0;
    `}
  `,
  onlyMobile: css`
    ${media.md`
      display: none;
    `}
  `,
  onlyDesktop: css`
    display: none;
    ${media.md`
      display: block;
    `}
  `,
};
