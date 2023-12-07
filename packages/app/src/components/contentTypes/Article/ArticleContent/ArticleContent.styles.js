import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import makeColOffset from '@univision/fe-utilities/styled/mixins/makeColOffset';

export default {
  offset2: css`
    ${media.md`
      ${makeColOffset(1)}
    `}

    ${media.lg`
      ${makeColOffset(2)}
    `}
  `,
  widgetsContainer: css`
    display: flex;
    justify-content: center;
    margin-top: 10px;
  `,
  containerExternal: css`
    margin: 0px;
  `,
  container: css`
    margin: 0px;
  `,
};
