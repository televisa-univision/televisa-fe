import { css } from 'styled-components';

export default {
  maskWrapper: ({ isSnap, hasDesktopSSROverflow }) => css`
    -webkit-overflow-scrolling: touch;
    display: flex;
    margin: 0 -4px -20px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 20px;
    scroll-snap-type: none;

    ${(isSnap) && css`
      scroll-snap-type: x mandatory;
    `}

    ${hasDesktopSSROverflow && css`
      overflow: visible;
      width: 100%;
    `}
  `,
  maskContainer: css`
    display: flex;
    flex-direction: row;
    width: 100%;
  `,
};
