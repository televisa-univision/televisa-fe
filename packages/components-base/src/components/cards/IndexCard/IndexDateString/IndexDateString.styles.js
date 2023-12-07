import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import media from '@univision/fe-utilities/styled/mixins/media';
import { GREY_BLACK } from '@univision/fe-utilities/styled/constants';

/**
 * Index Card Date string stylesheet
 */
export default {
  container: css`
    color: ${GREY_BLACK};
    font-size: ${rem(10)};
    letter-spacing: 1px;
    line-height: ${rem(14)};
    margin-bottom: 8px;
    text-transform: uppercase;

    ${media.md`
      margin-bottom: 16px;
    `}
  `,
};
