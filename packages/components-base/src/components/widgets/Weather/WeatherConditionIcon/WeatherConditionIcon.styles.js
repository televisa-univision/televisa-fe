import { css } from 'styled-components';
import {
  ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: css`
    align-items: center;
    display: flex;
    position: relative;

  `,
  weatherWrapper: ({ isOpen }) => css`
    align-items: center;
    cursor: pointer;
    display: flex;
    user-select: none;

    ${isOpen && css`
      z-index: ${ZINDEX_ABOVE_NAVIGATION + 1};
    `}
  `,
  weatherIcon: css`
    margin-right: 4px;
  `,
  weatherAlertWrapper: css`
    bottom: 57px;
    left: 62px;
    margin-right: 10px;
    position: absolute;
    top: -5px;
  `,

};
