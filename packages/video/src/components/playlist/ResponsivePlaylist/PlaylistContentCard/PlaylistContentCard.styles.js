import { css } from 'styled-components';
import {
  BLACK_06,
  BLACK_08,
  BLACK_GREY,
} from '@univision/fe-utilities/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

/* istanbul ignore next */
export default {
  playlistContentCard: ({ variant, isAnchor, isNewsDigitalChannel }) => css`
    > div {
      ${!isNewsDigitalChannel && variant === 'dark' && css`
        background: ${BLACK_GREY};
      `}
      border-radius: 4px;
      box-shadow: 0 -1px 3px 0px ${BLACK_06}, 0 2px 3px 0 ${BLACK_08};
      max-width: 99%;
      overflow: hidden;
      ${media.md && !isAnchor && css`
        height: 132px;
        img {
          max-height: 132px;
        }
      `}
    }
  `,
};
