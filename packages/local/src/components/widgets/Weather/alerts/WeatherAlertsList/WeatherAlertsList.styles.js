import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import STRIPED_BACKGROUND from '@univision/fe-commons/dist/assets/images/striped-background.svg';
import {
  ASTRONAUT,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  aside: css`
    background: url(${STRIPED_BACKGROUND});
  `,
  header: css`
    border-top: 2px solid #2F3444;
    ${media.sm`
      align-items: center;
      display: flex;
      justify-content: space-between;
    `}
  `,
  stickyAdWrapper: css`
    position: sticky;
    top: 0;
  `,
  weatherAlertsWrapper: css`
  padding-right: 15px;
`,
  weatherTitle: css`
    color: ${ASTRONAUT};
    font-weight: 900;
    line-height: ${rem('24px')};
    margin-bottom: 16px;
    padding-top: 16px;

    ${media.sm`
      display: inline-block;
      padding-top: 10px;
    `}
  `,
};
