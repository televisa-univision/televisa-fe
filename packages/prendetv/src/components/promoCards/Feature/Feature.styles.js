/**
 * @module PrendeTV Feature with headlines
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import {
  BLACK,
  BITTERSWEET,
  MONTSERRAT_FONT_FAMILY,
} from '@univision/fe-utilities/styled/constants';

import { FLAVORS } from '../../../constants';

export default {
  bottomHeadline: css`
    background-color: ${BITTERSWEET};
    color: ${BLACK};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(16)};
    font-weight: 600;
    letter-spacing: ${rem(1)};
    line-height: ${rem(19)};
    margin: 0;
    padding: 14px 0;
    text-align: center;
    ${media.md`
      font-size: ${rem(28)};
      letter-spacing: ${rem(1.75)};
      line-height: ${rem(36)};
      padding: 12px 0;
    `}
  `,
  bullets: ({ flavor }) => css`
    color: ${FLAVORS[flavor].text};
    display: grid;
    list-style: none;
    margin-bottom: 45px;
    padding: 0;
    row-gap: 15px;

    ${media.md`
      max-width: 886px;
      row-gap: 30px;
    `}
  `,
  bulletItem: ({ flavor }) => css`
    color: ${FLAVORS[flavor].text};
    display: block;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(20)};
    letter-spacing: ${rem(1.25)};
    line-height: ${rem(24)};
    text-align: center;

    ${media.md`
      font-size: ${rem(32)};
      letter-spacing: ${rem(2)};
      line-height: ${rem(40)};
    `}
  `,
  headline: ({ flavor }) => css`
    align-items: center;
    background-color: ${FLAVORS[flavor].headlineBackgroundColor};
    display: flex;
    flex-direction: column;
    padding: 31px 15px;
    text-align: center;
    width: 100%;
    ${media.md`
      padding: 75px 0 60px;
    `}
  `,
  image: ({ leadFullWidth }) => css`
    display: block;
    margin: 0 auto;
    max-height: 500px;
    max-width: 1260px;
    width: 90vw;

    ${leadFullWidth && 'width: 100vw;'}

    ${media.md`
      width: auto;
    `}
  `,
  title: ({ flavor }) => css`
    color: ${FLAVORS[flavor].title};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: ${rem(0.27)};
    line-height: ${rem(26)};
    margin-bottom: 25px;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: ${rem(0.96)};
      line-height: ${rem(43)};
      margin: 0 auto 30px;
      max-width: 1182px;
    `}
  `,
  wrapper: ({ flavor, isVideo, leadFullWidth }) => css`
    background-color: ${FLAVORS[flavor].backgroundColor};
    width: 100%;

    ${(!leadFullWidth && !isVideo) && 'padding: 50px 0 20px;'}
  `,
  storeLinks: css`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto 22px;
    padding: 0px 15px;
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
  storeImage: css`
    height: 43px;
    ${media.md`height: 63px;`}
  `,
};
