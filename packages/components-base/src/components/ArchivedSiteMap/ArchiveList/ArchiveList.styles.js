import { css } from 'styled-components';

import {
  BLACK_GREY,
  GREY_WHISPER,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  archive: css`
    border-bottom: 1px solid ${GREY_WHISPER};
    font-size: ${rem('16px')};
    font-weight: bold;
    line-height: ${rem('19px')};
    margin: 0;
    padding: 16px 0;
    a {
      color: ${BLACK_GREY};
    }
  `,
  description: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
    margin-bottom: 8px;
  `,
  listWrapper: css`
    list-style-type: none;
    padding: 0;
  `,
  wrapper: css`
    color: ${BLACK_GREY};
    padding: 0 15px;
    width: 100%;
    ${media.sm`
      padding: 0;
      width: 620px;
    `}
  `,
};
