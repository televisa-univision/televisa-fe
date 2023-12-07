/**
 * @module PrendeTV Hero Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  BITTERSWEET, BLACK, MONTSERRAT_FONT_FAMILY, WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: css`
    background-color: ${BITTERSWEET};
    margin: 0 auto;
    min-height: 220px;
    width: 100%;
  `,
  innerWrapper: css`
    padding: 30px 15px;
    text-align: center;
    width: 100%;

    ${media.md`
      margin: 0 auto;
      padding: 44px 0;
    `}
  `,
  storeImage: css`
    height: 43px;
    ${media.md`height: 63px;`}
  `,
  image: css`
    height: 100%;
    width: 100%;
  `,
  title: css`
    color: ${BLACK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: ${rem(0.27)};
    line-height: ${rem(28)};
    margin: 0 auto;
    max-width: 1082px;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: ${rem(0.96)};
      line-height: ${rem(43)};
    `}
  `,
  subHeadline: css`
    color: ${BLACK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    font-weight: 400;
    letter-spacing: ${rem(1.25)};
    line-height: ${rem(24)};
    margin: 20px auto 0;
    max-width: 1082px;
    text-align: center;

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing: ${rem(2)};
      line-height: ${rem(40)};
    `}
  `,
  text: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(17)};
    font-weight: 700;
    letter-spacing: ${rem(1)};
    line-height: ${rem(19)};
    margin: 30px auto 0;
    max-width: 837px;
    text-align: center;

    ${media.md`
      font-size: ${rem(31)};
      letter-spacing: ${rem(1.75)};
      line-height: ${rem(34)};
    `}
  `,
  storeLinks: css`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto 22px;
    width: 100%;

    ${media.md`
      margin-bottom: 40px;
    `}
  `,
  link: css`
    margin: 8px;

    ${media.md`
      margin: 0 16px;
    `}
  `,
  platforms: ({ larger }) => css`
    -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
    }
    align-items: center;
    background-color: ${BLACK};
    display: flex;
    height: 50px;
    margin-top: 0;
    ${larger && 'justify-content: flex-start;'}
    ${!larger && 'justify-content: center;'}

    overflow-x: auto;
    scrollbar-width: none;
    user-select: none;
    white-space: nowrap;
    width: 100vw;

    & > img:first-child {
      margin-left: 16px;
    }

    ${media.md`
      height: 70px;
      margin-top: 0;
      padding: 20px 35%;
    `}
  `,
  platformImage: css`
    height: 25px;
    margin: 0 15px;
    max-width: max-content;

    ${media.md`
      height: 30px;
      margin: 0 20px;
    `}
  `,
  gradient: css`
    background: linear-gradient(90deg, rgba(1,0,0,0) 0%, #010101);
    height: 50px;
    position: absolute;
    right: 0;
    width: 50px;
  `,
};
