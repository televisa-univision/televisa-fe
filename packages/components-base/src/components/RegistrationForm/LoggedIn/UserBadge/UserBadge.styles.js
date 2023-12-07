import { css } from 'styled-components';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import { WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  circle: ({ size }) => css`
    align-items: center;
    background-color: ${WHITE};
    border-radius: ${`${Math.floor(size / 2)}px`};
    display: flex;
    height: ${`${size}px`};
    justify-content: center;
    width: ${`${size}px`};
  `,
  letter: ({ color, fontSize }) => css`
    color: ${color};
    font-size: ${rem(fontSize)};
  `,
};
