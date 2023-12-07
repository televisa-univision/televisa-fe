import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import makeColOffset from '@univision/fe-utilities/styled/mixins/makeColOffset';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  LIGHT_GREY, RED, WHITE, FOLLY, DEEP_SEA,
} from '@univision/fe-utilities/styled/constants';

export default {

  container: css`
    -webkit-font-smoothing: antialiased;
    margin-bottom: 24px;
    padding: 0 20px;

    ${media.sm`
      padding: 0 20px;
    `}

    ${media.md`
      padding: 0;
    `}
  `,
  offset2: css`
    ${media.md`
      ${makeColOffset(1)}
    `}

    ${media.lg`
      ${makeColOffset(2)}
    `}
  `,
  labelWrapper: ({ isWorldCupMVP, isTelevisaSite }) => css`
    display: flex;
    margin-bottom: 16px;

    ${media.md`
      justify-content: center;
    `}
    ${isTelevisaSite && css`
      border-radius: 4px;
    `}
    ${isWorldCupMVP && css`.uvs-font-a-bold{
      font-family: 'Poppins', Helvetica, Arial, sans-serif;
      font-size: ${rem('12px')};
      font-style: normal;
      font-weight: 700;
      line-height: ${rem('18px')};
      ${media.md`
      font-size: ${rem('10px')};
      line-height: ${rem('15px')};
    `}
    }`}
  `,
  label: ({ isWorldCupMVP, isTelevisaSite }) => css`
    background-color: RED;
    color: ${WHITE};
    font-size: ${rem('14px')};
    line-height: ${rem('17px')};
    padding: 8px 24px;
    text-align: center;
    text-transform: uppercase;

    ${isWorldCupMVP && css`
      background-color: ${FOLLY};
      font-size: ${rem('26px')};
      padding: 4px 8px;
    `}

    ${isTelevisaSite && css`
        background-image: linear-gradient(#BC0D0D, #F31C1C);
        border-radius: 4px;
        font-size: ${rem('10px')};
        letter-spacing: ${rem('0.75px')};
        line-height: ${rem('12px')};
        padding: 6px 12px;
    `}

    span {
      display: inline-block;
      margin-right: 6px;
      transform: translateY(-1px);
      ${isTelevisaSite && css`
        font-size: ${rem('10px')};
        margin-right: 0px;
      `}
    }
  `,
  contentHeader: ({ isWorldCupMVP, isTelevisaSite }) => css`
    body & {
      padding: 0;
      text-align: left;

      p {
        margin: 0;
      }

      div {
        line-height: ${rem('26px')};
        ${isTelevisaSite && css`
            font-size: ${rem('16px')};
            line-height: ${rem('22px')};
        `}
      }

      h1 {
        font-size: ${rem('28px')};
        line-height: ${rem('32px')};
        ${isTelevisaSite && css`
            font-size: ${rem('30px')};
            letter-spacing: -0.24px;
            line-height: ${rem('34px')};
            margin-bottom: 16px;
        `}
      }

      ${media.md`
        text-align: ${isTelevisaSite ? 'left' : 'center'};
      `}

      ${media.lg`
        h1 {
          font-size: ${rem('38px')};
          line-height: ${rem('44px')};
          ${isWorldCupMVP && css`
            font-size: ${rem('42px')};
            letter-spacing: -0.24px;
            line-height: ${rem('50px')};
            text-align: left;
          `}
          ${isTelevisaSite && css`
            font-size: ${rem('30px')};
            letter-spacing: -0.24px;
            line-height: ${rem('34px')};
            margin-bottom: 16px;
          `}
        }
      `}
    }
  `,
  meta: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 16px 0 16px;

    ${media.sm`
      flex-direction: row;
    `}
  `,
  lead: css`
    margin-bottom: 16px;

    > div {
      margin-bottom: 0;
    }
  `,
  separator: ({ isWorldCupMVP }) => css`
    background: none;
    border: none;
    border-bottom: 1px solid ${LIGHT_GREY};
    margin: 0;
    ${isWorldCupMVP && css`
      border-bottom: 1px solid ${DEEP_SEA};
    `}
  `,
  shareBar: css`
    margin-top: 20px;

    ${media.sm`
      margin-top: 0;
    `}
  `,
};
