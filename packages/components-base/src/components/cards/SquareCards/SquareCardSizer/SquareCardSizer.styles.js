import { css } from 'styled-components';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    border-radius: 4px;
    flex: 1;
    height: 100%;
    position: relative;
    width: 100%;
    z-index: 0;
  `,
  aspectRatioBox: ({ isVideo }) => css`
    height: 0;
    overflow: hidden;
    padding-bottom: 88%;
    ${media.sm`
      height: 100%;
    `}
    position: relative;
    z-index: ${isVideo ? '-1' : '1'};
  `,
  innerAspectRatioBox: css`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    > * {
      height: 100%;
      width: 100%;
    }
  `,
  cardFooter: css`
    bottom: 0;
    height: 48px;
    overflow: unset;
    position: absolute;
    width: 100%;
    z-index: 2;
  `,
};
