import { css } from 'styled-components';

import {
  WHITE,
} from '@univision/fe-utilities/styled/constants';

export default {
  radioLogo: css`
    background: transparent;
    bottom: 0;
    display: flex;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
  `,
  radioLogoImage: css`
    width: 100%;
  `,
  radioPlayButton: css`
    align-items: center;
    background: transparent;
    border: 1px solid ${WHITE};
    border-radius: 100px;
    bottom: 8px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    height: 24px;
    justify-content: center;
    position: absolute;
    svg {
      left: 1px;
      position: relative;
    }
    right: 8px;
    width: 24px;
  `,
};
