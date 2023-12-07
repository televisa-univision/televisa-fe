import { css } from 'styled-components';
import { GREY } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  pictureWrapper: css`
    overflow: hidden;
    position: relative;
    width: 100%;
    z-index: 0;
  `,
  placeholderWrapper: ({ showBackground, isVertical }) => css`
    height: 0;
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    width: 100%;
    z-index: 1;

    ${showBackground && css`
      background: ${GREY};
      opacity: .1;
      z-index: 0;
    `}

    ${isVertical && css`
    position: absolute;
    `}
  `,
  pictureEl: ({ isVertical }) => css`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;

    ${isVertical && css`
    position: relative;
    `}
  `,
  imageEl: ({ isBlurred }) => css`
    width: 100%;
    ${isBlurred && css`
      filter: blur(27px);
      object-fit: none;
    `}
  `,
};
