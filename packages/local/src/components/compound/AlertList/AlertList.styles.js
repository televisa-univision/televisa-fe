import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK_GREY,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  container: css`
    margin-bottom: 32px;
    max-width: 836px;
  `,
  title: css`
    color: ${BLACK_GREY};
    font-size: ${rem('16px')};
    letter-spacing: 0;
    line-height: ${rem('19px')};

    ${media.lg`
      font-size: ${rem('18px')};
      line-height: ${rem('22px')};
    `}
  `,
};
