import { css, keyframes } from 'styled-components';
import { GRADIENT_PURPLE_SHOW, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';

const ripple = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 0.16;
  }
  20% {
    transform: scale(25, 25);
    opacity: 0.16;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
`;

export default {
  arrowRight: css`
    display: inline-block;
    margin-left: 12px;
  `,
  cta: ({ theme }) => css`
    align-items: center;
    background: ${theme?.exposedNavGradient || GRADIENT_PURPLE_SHOW};
    color: ${WHITE};
    display: flex;
    flex-grow: 1;
    font-size: ${rem('12px')};
    height: 44px;
    justify-content: center;
    letter-spacing: 1px;
    line-height: ${rem('14px')};
    margin-top: 8px;
    overflow: hidden;
    padding: 0 16px;
    position: relative;
    text-transform: uppercase;

    &:hover {
      color: ${WHITE};
      opacity: 0.7;
    }

    &::after {
      background: rgba(240, 240, 255, 0.2);
      border-radius: 100%;
      content: '';
      height: 5px;
      left: 50%;
      position: absolute;
      opacity: 0;
      top: 50%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
      width: 5px;
    }

    &:focus:not(:active)::after {
      animation: ${ripple} 1s ease-out;
    }

    ${media.md`
      display: inline-flex;
    `}

    ${media.lg`
      margin-top: 12px;
    `}
  `,
};
