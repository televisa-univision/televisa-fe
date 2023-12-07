import { css } from 'styled-components';
import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import {
  BLACK_GREY,
  GALLERY_GREY,
  TRANSPARENT,
  BLACK,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import {
  LARGE,
  MEDIUM,
} from '@univision/fe-commons/dist/constants/cardSizes';

/**
 * Function to get picture size
 * @param {string} size - size of card
 * @returns {string}
 */
const getPictureSize = size => getFromMap(size, {
  [LARGE]: css`
    height: 182px;
    width: 182px;
  `,
  [MEDIUM]: css`
    height: 182px;
    width: 182px;
  `,
  default: css`
    height: 38.6vw;
    width: 38.6vw;
    ${media.sm`
      height: 18.8vw;
      width: 18.8vw;
    `}
  `,
});

export default {
  wrapper: ({ size }) => css`
    ${getFromMap(size,
    {
      [LARGE]: css`
        height: 622px;
      `,
      [MEDIUM]: css`
        height: 376px;
      `,
      default: css`
        height: 300px;
      `,
    })};
  `,
  playerContent: css`
    align-items: center;
    color: ${BLACK};
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  `,
  playerContainer: ({ size }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-bottom: 21px;
        margin-top: 80px;
      `,
      default: css`
        height: 55%;
        margin-bottom: 3vw;
        margin-top: 16.8vw;
        ${media.sm`
          margin-bottom: 0;
          margin-top: 10.4vw;
        `}
      `,
    })};
  `,
  playerPictureContainer: ({ size }) => css`
    display: flex;
    width: 50%;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        padding-left: 32px;
      `,
      default: css`
        padding-left: 6.4vw;
        ${media.sm`
          padding-left: 3.1vw;
        `}
      `,
    })}
  `,
  playerInfoContainer: ({ size }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        height: 182px;
        width: 35%;
      `,
      default: css`
        height: 38.6vw;
        width: 38%;
        ${media.sm`
          height: 18.8vw;
        `}
      `,
    })}
  `,
  playerPictureWrapper: ({ size }) => css`
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
    ${getFromMap(size,
    {
      [LARGE]: css`
        border-radius: 182px;
        height: 182px;
        width: 182px;
      `,
      [MEDIUM]: css`
        border-radius: 182px;
        height: 182px;
        width: 182px;
      `,
      default: css`
        border-radius: 38.6vw;
        height: 38.6vw;
        width: 38.6vw;
        ${media.sm`
          border-radius: 18.8vw;
          height: 18.8vw;
          width: 18.8vw;
        `}
      `,
    })}
  `,
  playerPictureOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    left: 0;
    opacity: 0.6;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
  `,
  playerPicture: ({ size }) => css`
    > div {
      padding-bottom: 100%;
    }
    > picture {
        > img {          
          ${getPictureSize(size)}
        }
      }
  `,
  playerName: ({ size, isDark }) => css`
    color: ${isDark ? WHITE : BLACK_GREY};
    letter-spacing: -0.4px;
    a {
      color: ${isDark ? WHITE : BLACK_GREY};
    }
    width: 94%;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        font-size: ${rem('20px')};
        line-height: ${rem('24px')};
      `,
      default: css` 
        font-size: ${rem('16px')};
        line-height: ${rem('20px')};
      `,
    })};
  `,
  logoContainer: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 40px;
    justify-content: flex-start;
    width: 100%;
  `,
  separator: ({ isSmall }) => css`
    border-left: 1px solid ${GALLERY_GREY};
    height: ${isSmall ? '12px' : '32px'};
    margin: ${isSmall ? '0 8px' : '0 7%'};
    width: 1px;
    ${media.md`
      margin: ${isSmall ? '0 8px 0 12px' : '0 10px'};
    `}
  `,
  playerPosition: ({ size }) => css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 20px;
    justify-content: flex-start;
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin: 40px 0;
      `,
      default: css`
        margin: 15% 0;
      `,
    })};
  `,
  position: ({ isDark }) => css`
    color: ${isDark ? WHITE : BLACK_GREY};
    font-size: ${rem('10px')};
    letter-spacing: 1px;
    line-height: 9px;
    text-transform: uppercase;
  `,
  positionNumber: ({ isDark }) => css`
    color: ${isDark ? WHITE : BLACK_GREY};
    font-size: ${rem('12px')};
    letter-spacing: -0.4px;
    line-height: 20px;
  `,
  team: css`
    > div:last-child {
      display: none;
    }
  `,
  footer: ({ size }) => css`
    ${getFromMap(size,
    {
      [MEDIUM]: css`
        margin-top: 19px;
      `,
      default: css`
        margin-top: 0;
      `,
    })};
  `,
};
