import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { MILANO_RED } from '@univision/fe-icons/dist/constants/colors';

export default {
  badge: ({ larger }) => css`
    align-items: center;
    background-color: ${MILANO_RED};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    height: 16px;
    justify-content: center;
    width: ${larger ? '20px' : '16px'};
`,

  labelAlert: css`
    color: ${WHITE};
    font-size: ${rem('13px')};
    letter-spacing: 0;
    line-height: ${rem('15px')};
`,
};
