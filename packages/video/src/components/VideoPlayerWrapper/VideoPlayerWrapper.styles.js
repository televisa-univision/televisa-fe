import { css } from 'styled-components';
import {
  BLACK,
  BLACK_GREY,
  MOSTLY_BLACK_00,
  MOSTLY_BLACK,
  TRANSPARENT,
  ZINDEX_ABOVE_NAVIGATION,
  ZINDEX_PRIMARY_NAV,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  actionBar: css`
  background-color: ${BLACK};
  height: 48px;
  margin-left: -15px;
  margin-right: -15px;
  `,
  buttonWrapper: css`
    display: block;
    width: 100%;
  `,
  epgWrapper: css`
    margin-bottom: 16px;
    margin-top: -10px;
  `,
  videoPlayerWrapper: ({
    isAnchor,
    isCasting,
    isMobile,
    isExpanded,
    isSticky,
    hasAdSkin,
  }) => css`
    ${isAnchor && css`
      left: auto;
      margin-top: 0;
      position: fixed;
      top: auto;
      z-index: ${ZINDEX_PRIMARY_NAV};
      ${!isMobile && css`
        bottom: 0;
        max-height: calc(100vh - 90px);
        right: 0;
        & > div {
          box-shadow: 0 0 30px 0 rgba(0,0,0,0.12), 0 20px 30px 0 rgba(0,0,0,0.24);
        }
        ${media.xs`
          width: 45%;
          max-width: 348px;
        `}
        ${media.md`
          width: 36%;
          max-width: 364px;
        `}
        ${media.lg`
          ${hasAdSkin && css`
            max-width: 364px;
          `}
        `}
        ${media.xl`
          max-width: 512px;
        `}
      `}
      ${isMobile && css`
        bottom: 0;
        max-width: 80vh;
        right: 0;
        width: 84%;
      `}
    `}
    ${isExpanded && css`
      max-height: 100%;
    `}
    ${isSticky && css`
      height: 225px;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: ${ZINDEX_ABOVE_NAVIGATION};
    `}
    ${isCasting && isAnchor && css`
      height: 0;
      opacity: 0;
      width: 0;
    `}
  `,
  iframeContainer: css`
    height: 10vh;
    margin-bottom: -8px !important;
    width: 100%;

    ${media.sm`
      height: 15vh;
    `}

    ${media.md`
      height: 17vh;
    `}
  `,
  iframeWrapper: css`
    border: 0;
  `,
  innerVideoPlayerWrapper: ({ isAnchor, isMobile }) => css`
    ${isAnchor && css`
      width: 100% !important;
      ${!isMobile && css`
        box-shadow: none !important;
      `}
    `}
  `,
  metaWrapper: ({ isExpanded, visible, isNewsDigitalChannel }) => css`
    display: ${visible ? 'flex' : 'none'};
    flex-direction: column;
    overflow: hidden;
    padding: ${isExpanded && !isNewsDigitalChannel ? '8px 16px' : '0 16px'};

    ${isNewsDigitalChannel && !isExpanded && css`
      background: url('https://st1.uvnimg.com/45/e7/39a1a3c24f3c9ccaa59786d08d28/24-7-bg.png') no-repeat;
      background-position: 100% 60%;
    `}

    ${isExpanded && css`
      background-color: ${MOSTLY_BLACK};
    `}
    ${isExpanded && !isNewsDigitalChannel && css`
      background-color: ${BLACK_GREY};
    `}
  `,
  playlistWrapper: ({ isNewsDigitalChannel }) => css`
    ${isNewsDigitalChannel ? css`
    background-color: ${MOSTLY_BLACK};
    ` : css`
    background-color: ${BLACK};
    `}
    display: block;
    margin-top: -1px;
    overflow-y: auto;
    padding: 16px;
    &:after {
      ${isNewsDigitalChannel ? css`
        background: linear-gradient(0deg, ${MOSTLY_BLACK} 0, ${MOSTLY_BLACK_00} 100%) !important;
      ` : css`
        background: linear-gradient(180deg, ${TRANSPARENT}, ${BLACK}) !important;
      `}
      bottom: 0;
      content: '';
      height: 56px !important;
      left: 0;
      opacity: 1 !important;
      position: absolute;
      right: 6px;
      width: 100%;
      z-index: 2;
    }
  `,
};
