import { css } from 'styled-components';
import {
  LIGHT_GREY,
  DARKER_GREY,
  BLACK_GREY,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  container: css`
    justify-content: flex-start;
    margin: 0 auto;
    padding: 0px 0 10px;
    width: 100%;
  `,

  invisible: css`
    opacity: 0;
  `,

  bar: css`
    flex-wrap: wrap;
  `,

  title: css`
    margin-bottom: 14px;
    margin-left: 8px;
    margin-top: 14px;
    ${media.sm`
      margin-right: 10px;
    `}
    ${media.md`
      margin-right: 17px;
    `}
    ${media.lg`
      margin-right: 20px;
    `}
  `,

  team: css`
    border: 1px solid ${LIGHT_GREY};
    color: ${BLACK_GREY};
    display: flex;
    height: 126px;
    justify-content: center;
    margin: 8px;
    overflow: hidden;
    padding: 10px;
    width: calc(50% - 16px);
    &:hover,
    &:active {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      color: ${DARKER_GREY};
    }
    .bar & {
      flex-direction: row;
      height: 48px;
      justify-content: flex-start;
      padding: 0 10px;
      width: calc(50% - 20px);
      ${media.sm`
        width: calc(33.3% - 20px);
        height: 56px;
      `}
      ${media.md`
        width: calc(25% - 20px);
      `}
    }
    ${media.sm`
      width: calc(100% * (1 / 6) - 16px);
      height: 110px;
    `}
    
    ${media.md`
      width: calc(100% * (1 / 8) - 16px);
      height: 105px;
    `}

    ${media.lg`
      width: calc(100% * (1 / 9) - 16px);
      height: 120px;
    `}
  `,

  message: css`
    align-items: center;
    display: flex;
    font-size: ${rem('14px')};
    justify-content: center;
    padding: 30px 0;
    text-transform: uppercase;
  `,

  footer: css`
    display: flex;
    height: 44px;
    justify-content: flex-end;
    margin: 0 16px 16px;
    position: relative;
    > button {
      max-width: 100%;
      ${media.sm`
        max-width: 284px;
      `}
    }
  `,

  teamItem: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    text-align: center;
    p {
      font-size: ${rem('11px')};
      line-height: ${rem('13px')};
      min-height: 26px;
    }
    div {
      text-align: center;
    }
    .bar & {
      flex-direction: row;
      justify-content: flex-start;
      text-align: left;
      div {
        &:first-child {
          height: 28px;
          width: 28px;
          ${media.md`
            width: 40px;
            height: 40px;
          `}
        }
        &:last-child {
          p {
            font-size: ${rem('14px')};
            line-height: ${rem('17px')};
            margin-left: 0;
            max-width: 99px;
            min-height: initial;
            overflow: hidden;
            padding-left: 8px;
            text-overflow: ellipsis;
            white-space: nowrap;
            ${media.sm`
              max-width: 229px;
              line-height: ${rem('22px')};
              font-size: ${rem('20px')};
            `}
            ${media.md`
              max-width: 300px;
            `}
          }
        }
      }
    }
  `,
};
