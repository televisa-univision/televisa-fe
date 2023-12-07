import { css } from 'styled-components';
import { rem, media } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  title: css`
    color: ${BLACK};
    font-size: ${rem(28)};
    line-height: ${rem(32)};

    ${media.md`
      font-size: ${rem(38)};
      line-height: ${rem(44)};
    `}
  `,
};
