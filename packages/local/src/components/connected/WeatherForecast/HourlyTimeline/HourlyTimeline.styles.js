import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  wrapper: ({ width }) => css`
    height: 162px;
    position: relative;
    width: ${width + 25}px;

    ${media.sm`
      height: 185px;
    `}
  `,
  hourlyGraphic: ({ padding }) => css`
    left: 0;
    padding: 0 ${padding}px;
    position: absolute;
    top: 34px;

    ${media.sm`
      bottom: 24px;
    `}
  `,
  tempItem: ({ xPos, yPos }) => css`
    height: 16px;
    position: absolute;
    text-align: center;
    transform: translate3d(${xPos}px, ${yPos}px, 0);
    width: 60px;
  `,
  hourlyItem: ({ xPos }) => css`
    bottom: 3px;
    position: absolute;
    transform: translate3d(${xPos}px, 0, 0);
    width: 60px;

    ${media.sm`
      bottom: 24px;
    `}
  `,
};
