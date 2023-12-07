import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';

const fontSizes = {
  small: css`
    font-size: ${rem('14px')};
    line-height: ${rem('20px')};
  `,

  regular: css`
    font-size: ${rem('16px')};
    line-height: ${rem('22px')};
  `,

  large: css`
    font-size: ${rem('18px')};
    line-height: ${rem('26px')};
    margin: 0 auto;
  `,
};

export default {
  richTextCmp: ({ size }) => css`
    ${fontSizes[size]}
  `,

  richText: ({ size }) => css`
    ${fontSizes[size]}

    a:hover {
      text-decoration: underline;
    }

    margin: 0;
    & > * {
      /* avoids double spacing for immediate children */
      margin-bottom: 0;
    }
  `,
};
