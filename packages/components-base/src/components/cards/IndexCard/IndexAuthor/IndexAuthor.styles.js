import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY_BLACK } from '@univision/fe-utilities/styled/constants';

export default {
  authorLink: css`
    color: ${GREY_BLACK};
    padding-left: 4px;
    text-decoration: underline;

    &:hover {
      color: inherit;
    }
  `,
  container: css`
    color: ${GREY_BLACK};
    font-size: ${rem(10)};
    letter-spacing: 0.83px;
    line-height: ${rem(14)};
    margin-bottom: 4px;
    text-transform: uppercase;
  `,
};
