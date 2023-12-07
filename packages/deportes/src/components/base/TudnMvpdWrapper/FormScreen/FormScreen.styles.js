import { css } from 'styled-components';
import { ZINDEX_ABOVE_NAVIGATION } from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    align-items: center;
    bottom: 0;
    display: flex;
    height: auto;
    justify-content: center;
    left: 0;
    margin: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: auto;
    z-index: ${ZINDEX_ABOVE_NAVIGATION + 42};
  `,
};
