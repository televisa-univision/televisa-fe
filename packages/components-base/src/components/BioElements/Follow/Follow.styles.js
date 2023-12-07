import { css } from 'styled-components';
import { GREY_BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  followWrapper: css`
    align-items: baseline;
    display: flex;
  `,
  followText: css`
    color: ${GREY_BLACK};
    font-size: ${rem(11)};
    font-weight: 700;
    line-height: ${rem(14)};
    margin-bottom: 0;
    text-transform: uppercase;
  `,
  shareLinkWrapper: css`
    margin-left: 24px;

    :first-of-type {
      margin-left: 16px;
    }

    &:hover {
      svg {
        path {
          opacity: 0.75;
        }
      }
    }
  `,
};
