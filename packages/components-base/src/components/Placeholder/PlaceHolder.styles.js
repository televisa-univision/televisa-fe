import { css, keyframes } from 'styled-components';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';
import media from '@univision/fe-utilities/styled/mixins/media';
import { GREY, BLACK_GREY, VERY_LIGHT_GREY } from '@univision/fe-commons/dist/utils/styled/constants';

const placeholderSkeleton = keyframes`{
  0% {
      background-position: -468px 0;
    }
  100% {
      background-position: 468px 0;
    }
  }`;

const skeletonAnimate = keyframes` {
  from {
    background-position: top left;
    }
  to {
    background-position: top right;
    }
  }`;

const contentTypeStyles = {
  content1: css`
    &&& { top: 90px;}
    `,
  content2: css`
     &&& { top: 110px;}
    `,
  content3: css`
      &&& { top: 130px;}
    `,
};

export default {
  contentPlaceholder: ({ hasWidth, hideInDesktop }) => css`
    width: 100%;
    ${media.sm`
      ${hideInDesktop && css`
        display: none;
      `}
    `}

  ${hasWidth && css`
    margin: 0 auto;
    width: 305px;
    & > div {
      padding: 15px 0;
    }
  `}
  `,
  skeletonWrapperBody: ({ animated }) => css`
    & > div {
      animation-name: ${skeletonAnimate};
      background: linear-gradient(to left, ${GREY} 0%, ${GREY} 20%, ${GREY} 40%, ${GREY} 100%);
      background-repeat: no-repeat;
      left: 15px;
      opacity: .1;
      position: absolute;
      right: 15px;
      top: 15px;
    }
    ${animated && css`
      & > div {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: ${placeholderSkeleton};
        animation-timing-function: linear;
      }
    `}
  `,
  cardWrapper: css`
    float: left;
    width: 50%;
  `,
  loadingPlaceholder: css`
    align-items: center;
    background: ${VERY_LIGHT_GREY};
    box-shadow: 0 2px 2px 0 rgba(${BLACK_GREY}, 0.2);
    display: flex;
    justify-content: center;
    width: 100%;
  `,
  skeletonSquare: css`
    background: #f6f7f8;
    height: 330px;
  `,
  openingPlaceholder: css`
    margin-top: 40px;
  `,
  skeletonWrapperInner: css`
    height: 165px;
    padding: 15px;
    position: relative;
  `,
  skeletonAvatar: ({ hasWidth }) => css`
    height: 60px;
    ${hasWidth && css`
      left: 0px;
      width: 100%;
    `}
  `,
  skeletonContent: ({ type, hasWidth }) => css`
    height: 10px;
    left: 15px;
    right: 15px;
    ${getFromMap(type, contentTypeStyles)}
    ${hasWidth && css`
      left: 0px;
      width: 100%;
    `}
 `,
};
