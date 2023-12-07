import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { BLACK, GREY_BLACK } from '@univision/fe-utilities/styled/constants';

export default {
  eventContainer: css`
    align-items: center;
    display: flex;
    flex: 1;
  `,
  eventInfo: ({ isWorldCupMVP }) => css`
    padding: 0;

    .dateText {
      align-items: center;
      align-self: center;
      color: ${GREY_BLACK};
      display: flex;
      flex: 1;
      font-size: 11px;
      justify-content: flex-start;
      line-height: 1;
      padding: 8px 0;
      text-transform: uppercase;

      p {
        margin: 0;
      }

      ${media.md`
        padding-bottom: 0;
      `}
      ${isWorldCupMVP && css`
        font-size: ${rem('12px')};
        ${media.md`
          font-size: ${rem('14px')};
        `}
      `}
    }

    ${media.md`
      padding: 0 16px;
    `}
  `,
  topicBarContainer: css`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin-right: 30px;
    min-height: auto;
    position: relative;

    ${media.md`
      margin-right: auto;
      padding-right: 16px;
      width: 100%;
    `}

    .topicBar {
      color: ${BLACK};
      margin: 0;
      padding: 0;
      text-align: left;

      div {
        font-size: ${rem('18px')};
        line-height: ${rem('22px')};
        text-transform: none;

        &:first-of-type{
          display: none;
        }
      }

      ${media.md`
        min-height: auto;
        justify-content: flex-start;

        div {
          font-size: ${rem('22px')};
          line-height: ${rem('26px')};
        }
      `}
    }
  `,
  match: ({ isWorldCupMVP }) => css`
    align-items: center;
    display: flex;
    flex: 1;
    width: 100%;

    .team {
      p {
        font-size: ${rem('22px')};
        line-height: ${rem('26px')};
        ${isWorldCupMVP && css`
          font-size: ${rem('26px')};
          font-weight: 400;
        `}
      }
    }

    span {
      color: ${BLACK};
      font-size: ${rem('22px')};
      font-weight: bold;
      line-height: ${rem('26px')};
      padding: 0 10px;
      ${isWorldCupMVP && css`
        font-weight: 400;
        text-transform: uppercase;
      `}
    }
  `,
};
