import { css } from 'styled-components';

import { BLACK_GREY, ZINDEX_ABOVE_REACTION } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    background-color: ${BLACK_GREY};
    bottom: 0;
    left: 0;
    min-height: 100px;
    position: fixed;
    right: 0;
    width: 100vw;
    z-index: ${ZINDEX_ABOVE_REACTION};
    ${media.md`
      min-height: 85px;
    `}
  `,
  castingWrapper: css`
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100%;
    ${media.md`
      flex-direction: row;
      height: 85px;
    `}
  `,
  castingControlsButtonWrapper: css`
    display: none;
  `,
  controlsWrapper: css`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    ${media.md`
       height: 85px;
       max-width: 1280px;
    `}
  `,
  playbackWrapper: css`
    align-items: center;
    display: flex;
    flex-basis: 100%;
    flex-direction: row;
    width: auto;
    ${media.md`
      flex-basis: auto;
      flex-direction: row;
      height: 85px;
    `}
  `,
  mobileTitleWrapper: css`
    display: flex;
    padding: 0 20px;
    width: 100%;
  `,
};
