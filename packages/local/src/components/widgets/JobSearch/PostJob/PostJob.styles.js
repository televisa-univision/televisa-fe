import { css } from 'styled-components';

import {
  ASTRONAUT,
  BLACK_GREY,
  LIGHT_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  applyButton: css`
    && {
      background: ${WHITE};
      border: 1px solid ${ASTRONAUT};
      border-radius: 4px;
      color: ${ASTRONAUT};
      font-size: ${rem('12px')};
      height: 44px;
      letter-spacing: 0.75px;
      line-height: ${rem('14px')};
      margin: 0;
      min-width: 169px;
      text-align: center;
      width: 100%;

      svg {
        margin: 0;
        margin-right: 12px;
      }

      &:hover {
        color: ${ASTRONAUT};
      }
    }
  `,
  title: css`
    color: ${BLACK_GREY};
    font-size: ${rem('16px')};
    letter-spacing: 0;
    line-height: ${rem('19px')};
    margin-bottom: 8px;
  `,
  subTitle: css`
    color: ${BLACK_GREY};
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};
    margin-bottom: 24px;
  `,
  wrapper: css`
    border: 1px solid ${LIGHT_GREY};
    border-radius: 4px;
    padding: 24px 16px;
    width:100%;
  `,
};
