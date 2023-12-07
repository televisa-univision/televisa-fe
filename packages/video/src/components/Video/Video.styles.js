import { css } from 'styled-components';
import {
  BLACK,
  TRANSPARENT,
} from '@univision/fe-utilities/styled/constants';

export default {
  placeholderWrapper: ({ shouldHide, isVideoLayout }) => css`
    background: ${isVideoLayout ? BLACK : TRANSPARENT};
    position: relative;
    z-index: ${shouldHide ? 1 : 3};
  `,
};
