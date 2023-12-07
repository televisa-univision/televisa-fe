import { css } from 'styled-components';

import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK,
  GREY_BLACK,
  LIGHT_GREY,
  LIGHT_RED,
  WHITE,
  WHITE_GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  timerContent: css`
    align-items: center;
    display: flex;
    flex-grow: 0;
    justify-content: flex-start;
    width: auto;

    & + div {
      padding-left: 0;
      ${media.sm`
        padding-left: 16px;
        &:before {
          content: "";
          display: flex;
          border-left: 1px solid ${WHITE_GREY};
          height: 60px;
          margin-right: 16px;
        }
      `}
    }
  `,
  calReplyWrapper: css`
    .calReply {
      align-items: flex-start;
      align-self: flex-start;
      flex-direction: row;
      justify-content: flex-end;
      left: initial;
      margin: 12px 0;
      padding-left: 16px;
      padding-right: 16px;
      position: absolute;
      right: 0;
      top: 0;

      ${media.xs`
        position: relative;
      `}

      a {
        flex-direction: column;
        justify-content: center;

        > span {
          padding: 0;
          font-size: ${rem('9px')};
          line-height: ${rem('11px')};
          color: ${GREY_BLACK};
        }
      }

      svg {
        background-color: ${LIGHT_RED};
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 rgba(${BLACK},0.23);
        fill: ${WHITE};
        height: 40px;
        margin-bottom: 8px;
        overflow: visible;
        padding: 8px;
        width: 40px;
      }

      ${media.sm`
        align-self: center;
        padding-right: 0;
        padding-left: 20px;
      `}

      ${media.md`
        flex-grow: 0;
        align-items: center;
        width: auto;
      `}
    }
  `,
  container: ({ countBg }) => css`
    background-color: ${WHITE};
    background-size: cover;
    margin: 0 auto;
    margin-top: 20px;
    max-width: 414px;
    padding: 0px;
    padding-bottom: 1px;
    padding-top: 1px;
    width: 100%;

    ${media.sm`
      max-width: initial;
    `}

    ${media.md`
      margin-left: auto;
      margin-right: auto;
    `}

    ${media.lg`
      padding-left: 0;
      padding-right: 0;
    `}

    ${countBg && css`
      background-image: url(${countBg});

      h2 > div, .dateText, p, span {
        color: ${WHITE};
      }
    `}

    .widget[data-widget-type="CountdownTimer"] {
      h2 {
        margin-top: 8px;
      }
    }

    .sponsor {
      align-items: center;
      background-color: ${WHITE};
      border-top: 1px solid ${LIGHT_GREY};
      display: flex;
      flex-basis: 100%;
      height: 43px;
      justify-content: flex-end;
      width: 100%;

      picture, img {
        position: relative;
        max-height: 32px;
        width: auto;
      }

      picture {
        margin-left: 25px;
      }

      > a {
        > div {
          max-height: 40px;
          > div {
            display: none;
          }
        }
      }

      span:nth-child(2) {
        > div {
          max-height: 40px;
          > div {
            display: none;
          }
        }
      }

      ${countBg && css`
        > span {
            color: ${BLACK};
          }
      `}
    }
  `,
  content: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 132px;
    padding: 6px 16px;
    position: relative;

    ${media.sm`
      min-height: 90px;
      padding: 0 16px;
    `}

    ${media.md`
      min-height: 80px;
    `}
  `,
  innerContent: css`
    display: flex;
    flex-basis: 0;
    flex-direction: column;
    flex-grow: 1;
    justify-content: flex-end;
    padding: 0;

    ${media.sm`
      flex-direction: row;
      align-items: center;
    `}
  `,
  timerTitle: ({ status, countBg }) => css`
    display: flex;
    font-size: ${rem('22px')};
    font-weight: 700;
    line-height: ${rem('26px')};

    ${countBg && css`
      color: ${WHITE};
    `}

    ${getFromMap(status,
    {
      active: css`
        display: none;
      `,
      finished: css`
        text-transform: uppercase;
      `,
    })}

    ${media.md`
      justify-content: center;
      padding-bottom: 12px;

      ${status === 'active' && css`
        display: flex;
      `}

      &:last-child {
        padding-bottom: 0;
      }
    `}
  `,
  timer: ({ countBg }) => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    ${countBg && css`
      > div {
          color: ${WHITE};
        }

      span {
        color: ${WHITE};
      }
    `}
  `,
};
