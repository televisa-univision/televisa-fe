import { css } from 'styled-components';

import {
  SPRING_GREEN,
} from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    margin-left: -10px;
    padding: 0 10px;
    width: 100vw;

    ${media.md`
      margin: 0 0 8px 0;
      padding: 0;
      width: 100%;
    `}
  `,
  link: css`
    align-items: center;
    border-bottom: 1px solid ${SPRING_GREEN};
    display: flex;
    justify-content: space-between;
    margin: 0 23px;
    padding: 16px 0 14px 0;

    ${media.md`
      margin: 0;
    `}
  `,
  img: css`
    max-width: 258px;
  `,
};
