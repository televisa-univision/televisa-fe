import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  ASTRONAUT,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  seeForecast: css`
      color: ${ASTRONAUT};
      display: flex;
      font-size: ${rem('12px')};
      letter-spacing:1px;
      line-height: ${rem('14px')};
      text-transform: uppercase;
      width: 100%;
      &:hover{
        color: ${ASTRONAUT}; 
      } 
    `,
  rightArrowicon: css`
      margin: 2px 0 0 15px;
    `,
};
