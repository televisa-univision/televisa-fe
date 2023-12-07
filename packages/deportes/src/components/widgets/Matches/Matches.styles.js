import { css } from 'styled-components';
import {
  WHITE_GREY,
  DEEP_SEA,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  content: ({ showTabs }) => css`
    ${showTabs && css`margin-top: 0;`}
  `,

  nav: ({ isValidSponsor }) => css`
    -ms-overflow-style: none;
    margin-top: 14px;
    overflow: -moz-scrollbars-none;
    overflow-x: auto;
    z-index: unset;
    &::-webkit-scrollbar {
      display: none;
    }
    ${media.sm`
      overflow-x: visible;
    `}
    > button {
      ${media.xs`
         width: calc(100% * (1/3) - 16px);
         div {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }
      `}
    }
    > div {
      margin-right: 0;
      z-index: unset;
    }
    ${isValidSponsor && css`
      flex-basis: 100%;
    `}
  `,

  footer: css`
    display: flex;
    height: 44px;
    justify-content: flex-end;
    margin: 16px;
    position: relative;
    > button {
      margin-right: 14px;
      max-width: 90%;
      ${media.sm`
        max-width: 284px;
        margin-right: 16px;
      `}
      &:last-child {
        margin-right: 0;
      }
    }
  `,

  title: ({ isValidSponsor, isWorldCupMVP }) => css`
    line-height: 30px;
    ${isWorldCupMVP && css`
      color: ${DEEP_SEA};
    `}
    ${isValidSponsor && css`
      flex-basis: 50%;
    `}
  `,

  titleWrapper: ({
    showTabs,
    isValidSponsor,
    isWorldCupMVP,
  }) => css`
    margin-bottom: ${isWorldCupMVP ? 20 : 0}px;
    z-index: unset;
    > div {
      z-index: unset;
    }
    ${showTabs && css`
      > div {
        padding-bottom: 0;
      }
    `}
    ${isValidSponsor && css`
      > div {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    `}
  `,

  noPadding: css`
    > div {
      padding-bottom: 0;
    }
  `,

  noMargin: css`
    margin-bottom: 0;
  `,

  sponsor: ({ isValidSponsor }) => css`
    display: flex;
    justify-content: flex-end;
    img {
      height: 45px;
    }
    ${isValidSponsor && css`
      flex-basis: 50%;
    `}
  `,

  wrapper: css`
    margin-top: 16px;
    ${media.sm`
      margin-top: 0;
    `}
  `,

  tabs: css`
    display: flex;
    justify-content: space-between;
    margin-top: 0;

    > div {
      flex: 0 0 20%;
      &:nth-child(1),
      &:nth-child(3) {
        border-bottom-width: 0;
      }
      &:nth-child(2) {
        flex: 0 0 60%;
        &:hover {
          background-color: ${WHITE_GREY};
        }
      }
    }
    ${media.sm`
      > div {
        flex: 0 0 25%;
        &:nth-child(2) {
          flex: 0 0 50%;
        }
      }
    `}
  `,
};
