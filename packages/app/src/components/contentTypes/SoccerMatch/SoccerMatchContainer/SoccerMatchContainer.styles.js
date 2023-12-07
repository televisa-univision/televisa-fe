import { css } from 'styled-components';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  WIDGETS_MARGIN_BOTTOM_MOBILE,
  WIDGETS_MARGIN_BOTTOM_DESKTOP,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  separator: css`
    margin-bottom: ${WIDGETS_MARGIN_BOTTOM_MOBILE};

    ${media.md`
      margin-bottom: ${WIDGETS_MARGIN_BOTTOM_DESKTOP};
    `}
  `,
};
