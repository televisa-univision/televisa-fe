import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { GREY_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  description: css`
    color: ${GREY_BLACK};
    font-size: ${rem(11)};
    line-height: ${rem(13)};
    margin-bottom: 16px;
    text-transform: uppercase;
  `,
};
