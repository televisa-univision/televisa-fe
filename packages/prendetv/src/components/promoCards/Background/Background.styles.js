/**
 * @module PrendeTV Background Styles
 */
import { css } from 'styled-components';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

import { MONTSERRAT_FONT_FAMILY, WHITE } from '@univision/fe-utilities/styled/constants';

const Text = css`
  color: ${WHITE};
  font-family: ${MONTSERRAT_FONT_FAMILY};
  font-size: ${rem(20)};
  font-weight: 400;
  letter-spacing: ${rem(1.25)};
  line-height: ${rem(24)};
  margin: 20px auto 0;
  text-align: center;

  ${media.md`
    margin: 40px auto 0;
    font-size: ${rem(32)};
    letter-spacing: ${rem(2)};
    line-height: ${rem(40)};
    max-width: 960px;
  `}
`;

export default {
  wrapper: ({ background, opening }) => css`
    background-image: url(${background?.renditions?.original?.href});
    background-position-x: 50%;
    background-size: cover;
    margin: 0 auto;
    max-width: ${opening ? '1264px' : 'none'};
    padding: ${opening ? '49px 15px 47px' : '39px 15px 30px'};
    width: 100%;

    ${media.md`
      background-position: center center;
      background-size: ${opening ? '1264px 100%' : '1920px 1080px'};
      padding: ${opening ? '170px 0 155px' : '94px 0 64px'};
    `}
  `,
  innerWrapper: css`
    margin: 0 auto;
    text-align: center;
    width: 100%;

    ${media.md`
      max-width: 1051px;
    `}
  `,
  title: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(30)};
    font-weight: 900;
    letter-spacing: ${rem(0.27)};
    line-height: ${rem(26)};
    margin: 0;

    ${media.md`
      font-size: ${rem(44)};
      letter-spacing: ${rem(0.96)};
      line-height: ${rem(43)};
    `}
  `,
  subHeadline: Text,
  text: css`
    ${Text}
    font-size: ${rem(17)};
    font-weight: 700;
    ${media.md`
      font-size: ${rem(31)};
    `}
  `,
  ctaButton: css`
    margin: 35px auto 0;

    ${media.md`
      margin: 60px auto 0;
    `}
  `,
};
