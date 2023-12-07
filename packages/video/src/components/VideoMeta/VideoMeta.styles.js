import { css } from 'styled-components';

export default {
  headerWrapper: ({ isMobile }) => css`
    ${isMobile && css`
      left: 50%;
      margin-left: -50vw;
      margin-right: -50vw;
      position: relative;
      right: 50%;
      width: 100vw;
    `}
  }
  `,
  titleWrapper: ({ isMobile, isNewsDigitalChannel }) => css`
    ${isNewsDigitalChannel && css`
      padding: 16px 0;
    `}

    ${isMobile && css`
      border-bottom: 1px solid rgba(128, 128, 128, 0.3);
      padding: 12px 20px 11px 20px;
    `}
    }
  `,
};
