import { css } from 'styled-components';
import {
  BLACK_GREY,
  GREY,
  TORCH_RED,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  input: ({ primaryColor }) => css`
    background-color: transparent;
    border: 1px solid ${primaryColor || GREY};
    border-radius: 4px;
    color: ${BLACK_GREY};
    display: block;
    font-size: ${rem(16)};
    height: 48px;
    line-height: ${rem(48)};
    padding: 0 8px;
    width: 100%;

    &:focus {
      outline: none;

      &::placeholder {
        color: transparent;
      }
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      box-shadow: 0 0 0px 1000px transparent inset;
      transition: background-color 5000s ease-in-out 0s;
    }
  `,
  iconWrapper: ({ isTouchable }) => css`
    height: 24px;
    position: absolute;
    right: 10px;
    top: 20px;
    width: 24px;

    ${isTouchable && css`
      cursor: pointer;
    `}
  `,
  label: ({ primaryColor }) => css`
    background-color: ${WHITE};
    color: ${primaryColor};
    display: block;
    font-size: ${rem(12)};
    left: 11px;
    letter-spacing: 0.75px;
    line-height: ${rem(14)};
    padding: 0 6px;
    position: absolute;
    top: 0;
  `,
  message: css`
    color: ${TORCH_RED};
    font-size: ${rem(12)};
    letter-spacing: 0.75px;
    line-height: ${rem(14)};
    margin: 4px 17px 0;
  `,
  wrapper: ({ width }) => css`
    padding-top: 7px;
    position: relative;
    width: ${width};
  `,
};
