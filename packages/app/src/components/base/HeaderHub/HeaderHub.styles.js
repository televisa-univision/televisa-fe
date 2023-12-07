import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  DAISY_BUSH,
  BLACK_GREY,
  GREY_BLACK,
  TRANSPARENT,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  follow: css`
    margin: 8px 0 16px;
    :empty {
      display: none;
    }
    ${media.md`
      margin: 14px 0;
    `}
  `,
  buttonWrapper: ({ alignCenter, isOpen }) => css`
    ${alignCenter && `
      display: flex;
      justify-content: center;
    `}
    & button {
      width: 100%;
      ${media.md`
        width: 196px;
      `}
      > svg {
        height: 10px;
        margin-left: 10px;
        margin-top: 2px;
        transform: rotate(90deg);
        width: 10px;
        ${isOpen && `
          margin-top: -7px;
          transform: rotate(270deg);`}
      }
    }
  `,
  bioContainer: ({ isOpen, showFullBio, isDarkTheme }) => css`
    color: ${BLACK_GREY};
    display:flex;
    flex-direction: column;
    font-size: ${rem(16)};
    line-height: ${rem(22)};
    margin-bottom: 18px;
    margin-top: 8px;
    max-height: 200px;
    overflow: hidden;
    position: relative;
    transition: max-height 0.5s ease-out;
    :empty {
      display: none;
    }
    ${media.md`
      margin-top: 14px;
    `}
    ${!isOpen && !showFullBio && `
      &:after {
        bottom: 0;
        position: absolute;
        width: 100%;
        content: '';
        -webkit-box-shadow: 0px 0px 15px 5px ${WHITE};
        box-shadow: 0px 0px 35px 30px ${WHITE};
      }
    `}
    ${(isOpen || showFullBio) && `
      max-height: initial;
    `}
    & > div {
      display: ${isOpen || showFullBio ? 'block' : 'none'};
      & :first-child, :nth-child(2), :nth-child(3) {
        display: block;
      }
    }
    &&&& a {
      color: #007bff;
      text-decoration: underline;
    }
    ${isDarkTheme && `
      color: ${WHITE};
      a {
       color: ${DAISY_BUSH} !important;
      }
    `}
  `,
  contentHubWrapper: ({ alignCenter, hubTag, alignTop }) => css`
    ${alignCenter && `
      && > div {
        text-align: center;
        div {
          justify-content: center;
        }
      }
    `}
    ${hubTag === false && 'margin-bottom: 40px;'}
    ${alignTop && `
      align-self: flex-start;
    `}
    ${media.md`
      padding: ${alignCenter ? '0' : '0 10px'};
    `}
  `,
  description: css`
    color: ${GREY_BLACK};
    font-size: ${rem(10)};
    letter-spacing: ${rem(1)};
    line-height: ${rem(14)};
    margin-top: 8px;
    text-transform: uppercase;
  `,
  title: ({ alignTop }) => css`
    font-size: ${rem(30)};
    letter-spacing: ${rem(-0.4)};
    line-height: ${rem(34)};
    margin-top: 20px;
    ${alignTop && 'text-align: center;'}
  `,
  pictureWrapper: css`
    border-radius: 1000px;
    flex: 0 0 auto;
    height: 303px;
    overflow: hidden;
    position: relative;
    width: 303px;
    ${media.lg`
      height: 333px;
      width: 333px;
    `}
  `,
  pictureOverlay: css`
    background: ${linearGradient({ direction: '180deg', start: TRANSPARENT, end: BLACK_GREY })};
    bottom: 0;
    left: 0;
    opacity: 0.6;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  `,
  pictureStyled: ({ image, showFallback }) => css`
    > div {
      padding-bottom: 100%;
    }
    ${image?.renditions && !showFallback && `
      > picture {
        > img {
          width: fit-content;
        }
      }
    `}
  `,
  relatedTags: ({ alignCenter }) => css`
    margin-top: 8px;
    ${alignCenter && `
      > div {
        align-items: center;
      }
    `}
    ${media.md`
      margin-top: 16px;
    `}
  `,
  wrapper: ({ alignCenter, isPerson, alignTop }) => css`
    &&& {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: fit-content;
      justify-content: ${alignTop ? 'flex-start' : 'center'};
      margin-top: 23px;
      width: 100%;
      ${media.md`
        flex-direction: row;
        ${isPerson && 'align-items: start;'}
        ${alignCenter && `
          padding: 0 15%;
        `}
      `}
    }
  `,
  leftWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: auto;
    ${media.md`
       align-items: flex-start;
    `}
  `,
  statsWrapper: css`
    display: flex;
    width: 100%;
  `,
};
