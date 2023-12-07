import { css, keyframes } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import {
  BLACK_20,
  DODGER_BLUE,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

export const toolTipBumble = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    visibility: visible;
  }
`;

export const toolTipHide = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
  50% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

export default {
  arrow: ({
    position,
    showToolTipUp,
    showArrowRight,
    theme,
  }) => css`
    ${showToolTipUp ? 'border-top' : 'border-bottom'}: 11px solid ${theme?.primary || DODGER_BLUE};
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    height: 0;
    ${showArrowRight ? 'right' : 'left'}: ${position - 5}%;
    position: absolute;
    top: ${showToolTipUp ? '40px' : '-11px'};
    width: 0;
  `,
  closeIcon: css`
    margin-left: 0;
  `,
  label: css`
    display: flex;
  `,
  toolTip: ({
    closeToolTip,
    visibilityDelay,
    left,
    top,
    showToolTipUp,
    theme,
  }) => css`
    align-items: center;
    animation: ${toolTipBumble} 0.3s linear;
    animation-delay: ${visibilityDelay}s;
    animation-fill-mode: forwards;
    background-color: ${theme?.primary || DODGER_BLUE};
    border-radius: 3px;
    ${showToolTipUp ? `top: ${top - 54}px` : `bottom: ${top - 54}px`};
    box-shadow: 0 7px 4px 0 ${BLACK_20};
    color: ${WHITE};
    cursor: pointer;
    display: flex;
    font-size: ${rem('14px')};
    left: ${left}px;
    line-height: ${rem('17px')};
    padding: 12px 11px 11px 16px;
    position: absolute;
    visibility: hidden;
    width: max-content;
    z-index: 1;

    ${closeToolTip && css`
      animation-delay: unset;
      animation-name: ${toolTipHide};
    `}

    p, b {
      margin: 0;
      padding-right: 5px;
    }
  `,
  iconWrapper: css`
    margin-left: 16px;
    width: auto;
  `,
};
