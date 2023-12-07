import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  wrapper: css`
    align-items: flex-start;
    display: flex;
    flex-basis: 58px;
    flex-grow: 1;
    margin: 16px;
    margin-left: 0;
    max-height: 58px;
    max-width: 58px;
    overflow: hidden;
    padding: 0;

    ${media.md`
      align-items: center;
    `}
  `,
};
