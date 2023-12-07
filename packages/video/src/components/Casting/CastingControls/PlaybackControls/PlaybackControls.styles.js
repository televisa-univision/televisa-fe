import { css } from 'styled-components';

import { WHITE } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  playbackWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 48px;
    width: auto;
    ${media.md`
      height: 85px;
    `}
  `,
  controlsWrapper: css`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 48px;
    width: auto;
    ${media.md`
      height: 85px;
    `}
  `,
  castingTime: css`
    color: ${WHITE};
    font-size: ${rem(16)};
    margin: 0 19px 0 5px;
    white-space: nowrap;
    ${media.md`
      margin: 0 24px 0 20px;
    `}
  `,
};
