import { css } from 'styled-components';
import {
  WHITE,
  ZINDEX_PRIMARY_NAV,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  container: css`
    display: flex;
    flex-wrap: wrap-reverse;
    height: fit-content;
    margin: auto;
    padding-left: 0 !important;
    padding-right: 0 !important;
    ${media.sm`
      height: 100%;
      flex-wrap: nowrap;
    `}
  `,
  wrapper: css`
    background-color: ${WHITE};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    right: 0;
    width: 100%;
    z-index: ${ZINDEX_PRIMARY_NAV};
    ${media.sm`
      overflow-y: hidden;
    `}
  `,
};
