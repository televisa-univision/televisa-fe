import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY_BLACK, WHITE } from '@univision/fe-utilities/styled/constants';

/**
 * Index card Meta content stylesheet
 */
export default {
  container: css`
    font-size: ${rem(10)};
    line-height: 14px;
    text-transform: uppercase;
  `,
  label: ({ isDark }) => css`
    color: ${isDark ? WHITE : GREY_BLACK};
    padding-left: 6px;
  `,
};
