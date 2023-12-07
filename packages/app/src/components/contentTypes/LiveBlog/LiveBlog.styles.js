import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';

export default {
  container: css`
    margin-top: 1rem;
    overflow-x: hidden;
    padding: 0;

    a:hover {
      text-decoration: underline;
    }

    ${media.md`
      padding: inherit;
    `}

    ${media.lg`
      margin-top: 2rem;
    `}
  `,
};
