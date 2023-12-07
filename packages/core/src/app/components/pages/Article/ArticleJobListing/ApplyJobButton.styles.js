import { css } from 'styled-components';
import { WHITE, GRADIENT_ASTRONAUT_CHAMBRAY } from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  applyJobBtnWrapper: css`
    background: ${GRADIENT_ASTRONAUT_CHAMBRAY};
    display: block;
    font-size: ${rem('12px')};
    letter-spacing: 0.75px;
    line-height: ${rem('44px')};
    margin: 25px 0;
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
};
