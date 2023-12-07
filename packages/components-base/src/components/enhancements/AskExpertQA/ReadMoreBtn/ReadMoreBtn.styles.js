import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  arrowIcon: css`
    margin-left: 8px;  
    `,
  ctaBtn: css`
    color: ${ASTRONAUT};
    cursor: pointer;
    font-size: ${rem(12)};
    letter-spacing: 1px;
    line-height: ${rem(14)};
    margin: 14px 0 0 0;
    text-transform: uppercase;
    `,
};
