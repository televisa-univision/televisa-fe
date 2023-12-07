import { css } from 'styled-components';
import flavorWidgetWrapper from '@univision/fe-utilities/styled/mixins/flavorWidgetWrapper';
import {
  WHITE_GREY,
  WOODSMOKE,
  SIROCCO,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  content: ({ showTabs }) => css`
    ${showTabs && css`margin-top: 0;`}
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

  titleWrapper: ({
    showTabs,
    isValidSponsor,
    isWorldCupMVP,
    isLiveWidget,
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

    ${isLiveWidget && css`
      margin-top: -24px;
    `}
    ${media.xs`
      margin-top: 15px;
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

  wrapper: ({
    backgroundImage = null,
    flavor = 'rebrand',
    primary = WOODSMOKE,
    enablePadding = false,
  }) => css`
    border-top: 1px solid ${SIROCCO};
    margin-top: 16px;
    ${media.md`
      border-top: 0;
    `}
    ${media.sm`
      margin-top: 0;
    `}
    ${media.xs`
      margin-top: -15px;
    `}
    ${flavorWidgetWrapper({
    flavor,
    backgroundImage,
    primary,
    enablePadding,
  })}
  `,

  wrapperStat: css`
    margin-top: -15px;
    overflow-x: visible;    
    ${media.sm`
      margin-top: -24px;
    `}
  `,

  tabs: css`
    background-color: ${WHITE_GREY};
    display: flex;
    justify-content: space-between;
    margin-top: 0;
  `,

  tabDirection: css`
    border-bottom-width: 0;
    display: flex;
    flex: 0 0 20%;
    justify-content: center;
    margin-top: 0;
    
    ${media.sm`
      flex: 0 0 25%;      
    `}
  `,

  tabName: css`
    border-bottom-width: 0;
    display: flex;
    flex: 0 0 60%;
    justify-content: center;
    margin-top: 0;
    &:hover {
      background-color: ${WHITE_GREY};
    }
    ${media.sm`
      flex: 0 0 50%;
    `}
  `,
};
