import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  button: ({
    width,
    isRounded,
    backgroundColor,
    borderColor,
    gradient,
    showIconRight,
  }) => css`
    align-items: center;
    background-color: ${backgroundColor};
    ${borderColor && `border: 1px solid ${borderColor};`}
    border-radius: ${isRounded ? '24px' : '4px'};
    display: flex;
    font-size: ${isRounded ? rem(16) : rem(12)};
    height: 48px;
    justify-content: center;
    letter-spacing: ${isRounded ? 'normal' : '0.75px'};
    text-transform: ${isRounded ? 'none' : 'uppercase'};
    transition: opacity 0.8s;
    width: ${width};
    ${showIconRight && 'flex-direction: row-reverse;'}

    ${(gradient?.end && gradient?.start) && css`
      background: linear-gradient(90deg, ${gradient.start} 0%, ${gradient.end} 100%);
    `}

    &:active {
      opacity: 0.5;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.25;
    }
  `,
  label: ({
    colorLabel, icon, isRounded,
  }) => css`
    color: ${colorLabel || WHITE};
    ${icon && css`
      margin-left: ${isRounded ? '16px' : '5px'};
    `}
  `,
};
