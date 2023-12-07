/**
 * @module PrendeTV FAQ styles
 */
import { css } from 'styled-components';

import {
  media,
  rem,
} from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BITTERSWEET,
  BLACK,
  DARK_GREY,
  MONTSERRAT_FONT_FAMILY,
  SHAMROCK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';

import {
  PRENDETV_HEADER_FAQ_BACKGROUND_DESKTOP,
  PRENDETV_HEADER_FAQ_BACKGROUND_MOBILE,
} from '../../../constants';

export default {
  answer: css`
    margin: 30px auto 0;
    max-width: 835px;

    a {
      color: ${BITTERSWEET};
    }
  `,
  answers: css`
    background: ${WHITE};
    padding: 26px 21px;
  `,
  answerSubTitle: css`
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('16px')};
    font-weight: bold;
    line-height: ${rem('22px')};
    margin-bottom: 10px;
  `,
  answerTitle: css`
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('24px')};
    line-height: ${rem('29px')};
    margin-top: 30px;
  `,
  answerTopic: css`
    margin: 15px 0 30px;
  `,
  backToTop: css`
    align-items: center;
    background-color: ${SHAMROCK};
    border-radius: 4px;
    bottom: 100px;
    display: grid;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('14px')};
    font-weight: bold;
    height: 51px;
    justify-items: center;
    left: 85%;
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    padding: 5px 25px;
    position: sticky;
    text-transform: uppercase;
    width: 133px;
  `,
  header: css`
    align-items: flex-start;
    background: url(${PRENDETV_HEADER_FAQ_BACKGROUND_MOBILE}) no-repeat center center;
    background-size: cover;
    color: ${WHITE};
    display: grid;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('30px')};
    font-weight: bold;
    grid-auto-rows: 1fr 2fr;
    height: 142px;
    letter-spacing: ${rem('0.27px')};
    line-height: ${rem('26px')};
    position: relative;
    text-align: center;
    text-transform: uppercase;

    ${media.md`
      background-image: url(${PRENDETV_HEADER_FAQ_BACKGROUND_DESKTOP});
      font-size: ${rem('46px')};
      height: 160px;
      line-height: ${rem('45px')};
    `}
  `,
  headerContactUs: css`
    background-color: transparent;
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem(24)};
    text-transform: uppercase;

    &:hover, &:active {
      color: ${WHITE};
    }
  `,
  headerContactUsContainer: css`
    margin: 0 auto;
    max-width: 1262px;
    padding-right: 15px;
    text-align: right;
    width: 100%;

    ${media.md`
      padding-right: 0;
    `}
  `,
  question: css`
    background: ${DARK_GREY};
    border: 1px solid ${WHITE};
    border-radius: 4px;
    display: grid;
    height: 100px;
    text-align: center;

    &:hover, &:active {
      background-color: ${WHITE};

      h1, h2 {
        color: ${BLACK};
      }
    }
  `,
  questions: css`
    display: grid;
    grid-gap: 20px;
    margin: auto;
    max-width: 1262px;

    ${media.md`
      grid-auto-flow: row;
      grid-template-columns: 1fr 1fr 1fr;
    `}
  `,
  questionsContainer: css`
    background: ${BLACK};
    color: ${WHITE};
    padding: 31px 18px;
  `,
  questionSubTitle: css`
    align-self: flex-start;
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('16px')};
    font-weight: normal;
    letter-spacing: ${rem('1px')};
    line-height: ${rem('25')};
    text-align: center;
  `,
  questionTitle: css`
    align-self: flex-end;
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('20px')};
    font-weight: bold;
    line-height: ${rem('29')};
    margin-bottom: 0;
  `,
  trendingTopic: css`
    background-color: transparent;
    border-bottom: 1px solid ${WHITE};
    padding: 15px 0;

    &:hover {
      font-weight: bold;
    }
  `,
  trendingTopicsTitle: css`
    background-color: ${BLACK};
    color: ${BITTERSWEET};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('24px')};
    letter-spacing: ${rem('1.5px')};
    line-height: ${rem('40px')};
    margin: 30px auto 7px;
    max-width: 1262px;
  `,
  trendingTopicTitle: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('16px')};
    letter-spacing: ${rem('1px')};
    line-height: ${rem('25px')};
    text-align: left;
  `,
};
