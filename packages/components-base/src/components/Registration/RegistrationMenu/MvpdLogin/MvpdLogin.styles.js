import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  GREY_ZAMBEZI,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    align-items: center;
    color: ${GREY_ZAMBEZI};
    display: flex;
    font-size: ${rem('12px')};
    line-height: ${rem('16px')};
    position: absolute;
    right: 19px;
    top: 0;
    span {
      margin-left: 8px;
      text-transform: uppercase;
    }
  `,
};
