import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  button: ({ isPlaybackButton, hasExtendedControls }) => css`
    cursor: pointer;
    display: flex;
    ${isPlaybackButton && css`
      margin-right: ${hasExtendedControls ? '6%' : '24px'};
    `}
    ${media.md`
      ${isPlaybackButton && css`
        margin-right: 24px;
      `}
    `}
  `,
};
