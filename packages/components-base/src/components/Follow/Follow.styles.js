import { css } from 'styled-components';
import {
  GREY_BLACK,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  followWrapper: () => css`
    align-items: center;
    display: flex;
  `,
  followTitle: css`
    color: ${GREY_BLACK};
    font-size: ${rem('12px')};
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    margin: 0 16px 0 0;
    text-transform: uppercase;
  `,
  socialLink: css`
    align-items: center;
    border-radius: 40px;
    display: flex;
    height: 40px;
    justify-content: center;
    margin-right: 22px;
    width: 40px;
    ${media.sm`
      margin-right: 35px;
    `}
    && svg {
      margin: 0;
    }
    &:last-child {
      margin: 0;
    }
    && a {
      padding: 0;
      text-align: center;
    }
  `,
};
