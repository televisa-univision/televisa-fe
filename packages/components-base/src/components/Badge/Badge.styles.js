import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { ASTRONAUT, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  badgeWrapper: ({ onClick }) => css`
    align-items: center;
    background-color: ${ASTRONAUT};
    border-radius: 16px;
    display: inline-flex;
    justify-content: center;

    ${onClick && css`cursor: pointer;`}
  `,
  label: css`
    color: ${WHITE};
    font-size: ${rem('13px')};
    letter-spacing: 0;
    line-height: ${rem('15px')};
    padding: 10px 12px;
    user-select: none;
  `,
};
