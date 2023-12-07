/**
 * @module PrendeTV Header Styles
 */
import { css } from 'styled-components';

import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  NERO, ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-utilities/styled/constants';

export default {
  wrapper: css`
    background-color: ${NERO};
    justify-content: left;
    padding: 10px 20px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: ${ZINDEX_ABOVE_NAVIGATION};

    ${media.md`
      padding: 10px;
    `}
  `,
  innerWrapper: css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;

    ${media.md`
      padding: 0 20px;
    `}
  `,
  hamburgerLogoWrapper: css`
    display: flex;
  `,
  icon: css`
    cursor: pointer;
    margin-right: 20px;
  `,
};
