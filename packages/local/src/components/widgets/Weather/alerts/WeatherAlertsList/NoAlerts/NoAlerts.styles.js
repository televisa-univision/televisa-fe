import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  CERULEAN_BLUE,
  BLACK_GREY,
  GREY_15,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  icon: css`
    margin-right: 8px;
  `,
  info: css`
    line-height: ${rem('18px')};
    width: 210px;
  `,
  link: css`
    align-items: center;
    color: ${CERULEAN_BLUE};
    display: flex;
    font-size: ${rem('12px')};
    letter-spacing: 0.75px;
    line-height: ${rem('14px')};
    text-transform: uppercase;
  `,
  textWrapper: css`
    display: flex;
    flex-direction: column;
    height: 64px;
    justify-content: space-between;
    margin-left: 8px;
  `,
  title: css`
    color: ${BLACK_GREY};
    font-size: ${rem('14px')};
    letter-spacing: 0;
    line-height: ${rem('18px')};

    &:before {
      content: '';
      float: right;
      height: 10px;
      width: 50px;
    }
  `,
  wrapper: css`
    align-items: center;
    border: 1px solid ${GREY_15};
    border-radius: 4px;
    display: flex;
    height: 120px;
    justify-content: center;
  `,
};
