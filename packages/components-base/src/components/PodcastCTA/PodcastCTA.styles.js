import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { GREY, GREY_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  uforiaIcon: css`
    margin-left: 8px;
  `,
  wrapper: css`
    align-items: center;
    color: ${GREY};
    display: flex;
    font-size: ${rem(10)};
    letter-spacing: 1px;
    text-transform: uppercase;

    &:hover {
      color: ${GREY_BLACK};
    }
  `,
};
