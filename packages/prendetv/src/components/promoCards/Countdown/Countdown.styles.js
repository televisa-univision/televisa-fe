import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  BLACK,
  MONTSERRAT_FONT_FAMILY,
  WHITE,
  WHITE_GREY,
} from '@univision/fe-utilities/styled/constants';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';

/**
 * Simulates max-width behaviour from bootstrap
 * @returns {function}
 */
const cols = () => css`
  ${media.sm`
    max-width: 768px;
  `}

  ${media.md`
    max-width: 1024px
  `}

  ${media.lg`
    max-width: 1300px
  `}

  ${media.xl`
    max-width: 1440px
  `}
`;

export default {
  add: css`
    grid-column: 3;
    grid-row: 1 / 3;
    margin-top: 18px;
    position: relative;
    right: unset;
    text-transform: uppercase;
    top: unset;

    svg {
      margin-bottom: 2px;
      width: 17px;
    }

    span {
      color: ${WHITE};
      font-family: 'Roboto Condensed', Roboto, sans-serif;
      font-size: ${rem(10)};
    }

    ${media.sm`
      grid-column: 5;
      grid-row: 1 / 3;
      margin: 0 40px 0 24px;
    `}
  `,
  by: css`
    color: ${WHITE};
    display: flex;
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(10)};
    letter-spacing: 0.4px;
    text-transform: uppercase;
  `,
  channel: css`
    align-items: center;
    margin: 0 0 0 12px;
    max-width: 30px;

    ${media.sm`
      width: 100px;
    `}
  `,
  channelWrapper: css`
    display: flex;
    grid-column: 2;
    grid-row: 4;
    padding-top: 8px;
    width: 100%;

    ${media.sm`
      align-items: center;
      align-self: center;
      border-right: 1px solid ${WHITE_GREY};
      grid-column: 4 / 5;
      grid-row: 1 / 3;
      height: 48px;
      padding: 0 24px;
      width: max-content;
    `}
  `,
  content: ({ background }) => css`
    background-size: cover;
    display: grid;
    grid-template-columns: 29% auto 35px 34px;
    grid-template-rows: 22.4% 12.72% 35.15% 18.18%;
    height: 100%;
    position: absolute;
    width: 100%;

    ${media.sm`
      grid-template-columns: 10% auto minmax(auto, 450px) max-content max-content;
      grid-template-rows: 50% 50%;
      height: 100%;
      margin: 0 auto;
      max-width: 768px;
      padding: 0;
      position: relative;
    `}

    ${cols()}

    ${background && css`
      background-image: url(${background});
    `}
  `,
  contentWrapper: css`
    overflow: hidden;
    padding-bottom: 39.85507246%;
    position: relative;
    width: 100%;

    ${media.sm`
      height: 78px;
      padding: 0;
    `}
  `,
  dateWrapper: css`
    align-items: center;
    display: flex;
    grid-column: 2 / 4;
    grid-row: 3;
    width: 100%;

    & > div {
      align-items: center;
      flex-grow: 1;
    }

    ${media.sm`
      align-self: center;
      border-left: 1px solid ${WHITE_GREY};
      border-right: 1px solid ${WHITE_GREY};
      grid-column: 3;
      grid-row: 1 / 3;
      height: 48px;
      padding-left: 28px;
    `}
  `,
  info: css`
    align-self: flex-end;
    color: ${WHITE};
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(10)};
    grid-column: 2 / 4;
    grid-row: 2;
    line-height: ${rem(18)};
    text-transform: uppercase;
    width: 100%;

    ${media.sm`
      align-self: flex-start;
      grid-column: 2;
      grid-row: 2;
      margin-top: 8px;
      padding-right: 16px;
      ${numberOfLines(1)}
    `}
  `,
  logo: css`
    &&& {
      align-items: center;
      align-self: center;
      grid-column: 1;
      grid-row: 1 / 6;
      height: 70px;
      justify-self: center;
      margin: 0;
      max-height: unset;
      max-width: unset;
      width: 70px;

      ${media.sm`
        grid-column: 1;
        grid-row: 1 / 3;
        justify-self: flex-end;
        margin-right: 16px;
        padding: 14px;
      `}
    }
  `,
  remaining: css`
    color: ${WHITE};
    display: none;
    font-family: 'Roboto Condensed', Roboto, sans-serif;
    font-size: ${rem(10)};
    letter-spacing: 0.4px;
    text-transform: uppercase;

    ${media.sm`
      display: flex;
    `}
  `,
  sponsorBy: css`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    width: 100%;

    ${cols()}

    span {
      color: ${WHITE};
    }

    picture, img {
      max-height: 23px;
      position: relative;
      width: auto;
    }

    picture {
      margin-left: 8px;
    }

    > a {
      > div {
        max-height: 24px;
        > div {
          display: none;
        }
      }
    }
  `,
  sponsorWrapper: css`
    background-color: ${BLACK};
    display: flex;
    height: 30px;
    padding-right: 22px;
    width: 100%;

    ${media.sm`
      justify-content: center;
      padding: 0;
      padding-right: 60px;
    `}
  `,
  timerTitle: css`
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(18)};
    font-weight: bold;
    line-height: ${rem(19)};
  `,
  title: css`
    align-self: flex-end;
    color: ${WHITE};
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem(12)};
    font-weight: bold;
    grid-column: 2;
    grid-row: 1;
    height: fit-content;
    letter-spacing: -0.4px;
    line-height: ${rem(16)};
    text-transform: uppercase;
    ${numberOfLines(1)}

    ${media.sm`
      font-size: ${rem(18)};
      grid-column: 2;
      grid-row: 1;
      line-height: ${rem(20)};
      padding-right: 16px;
    `}
  `,
  wrapper: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `,
};
