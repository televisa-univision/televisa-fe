import { css } from 'styled-components';
import {
  GRADIENT_ASTRONAUT_CHAMBRAY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  callBtnWrapper: css`
    background: ${GRADIENT_ASTRONAUT_CHAMBRAY};
    display: block;
    font-size: ${rem('12px')};
    letter-spacing: 0.75px;
    line-height: ${rem('44px')};
    margin: 3px 0 0;
    max-height: 44px;
    max-width: none;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    && {
      color: ${WHITE};
    }

    &&:hover{
      color: ${WHITE};
    }
  `,
  callBtnLabel: css`
    margin-left: 8px;
  `,
  callIcon: css`
    margin-right: 1px;
  `,
};
