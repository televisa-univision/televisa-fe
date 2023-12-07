import { css } from 'styled-components';

import { getFromMap } from '@univision/fe-commons/dist/utils/helpers';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  BLACK,
} from '@univision/fe-utilities/styled/constants';

export default {

  title: ({ hidden, size }) => css`
    font-weight: 700;

    ${getFromMap(size,
    {
      xsmall: css`
        font-size: ${rem('16px')};
        line-height: ${rem('19px')};

        ${media.md`
          font-size: ${rem('18px')};
          line-height: ${rem('22px')};
        `}
      `,

      small: css`
        font-size: ${rem('14px')};
        line-height: ${rem('18px')};

        ${media.md`
          font-size: ${rem('18px')};
          line-height: ${rem('22px')};
        `}
      `,

      regular: css`
        font-size: ${rem('20px')};
        line-height: ${rem('23px')};
      `,

      large: css`
        font-size: ${rem('24px')};
        line-height: ${rem('29px')};

        ${media.md`
          font-size: ${rem('28px')};
          line-height: ${rem('32px')};
        `}

        ${media.lg`
          font-size: ${rem('32px')};
          line-height: ${rem('37px')};
        `}
      `,
    })}

    ${hidden && css`
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute !important;
      width: 1px;
      word-wrap: normal;
    `}
  `,
  titleMVP: () => css`
    > a {
      color: ${BLACK};
      font-family: 'Roboto Flex', sans-serif;
      font-size: ${rem('12px')};
      font-style: normal;
      font-weight: 700;
      line-height: ${rem('16px')};
      order: 0;
    }
  `,
};
