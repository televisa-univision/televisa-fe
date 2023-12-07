import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK_GREY,
  GREY_ZAMBEZI,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    cursor: pointer;
    margin-bottom: 32px;
    width: 100%;
    ${media.sm`
      margin-bottom: 32px;
    `}
  `,
  description: css`
   color: ${GREY_ZAMBEZI};
   font-size: ${rem('14px')};
   line-height: ${rem('18px')};
   width: 100%;
`,
  title: css`
   color: ${BLACK_GREY};
   font-size: ${rem('16px')};
   line-height: ${rem('19px')};
   margin-bottom: 4px;
   width: 100%;
`,
};
