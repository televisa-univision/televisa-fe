import { css } from 'styled-components';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { getThemeGradient } from '../../../cards/helpers';

export default {
  button: ({ theme, isWorldCupMVP }) => css`
    align-items: center;
    background: ${getThemeGradient(theme)};
    border-radius: 4px;
    color: ${WHITE};
    display: flex;
    height: 44px;
    justify-content: center;
    width: 100%;
    ${isWorldCupMVP && css`
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    `}
  `,
  text: css`
    font-size: ${rem(12)};
    letter-spacing: 0.75px;
    line-height: ${rem(14)};
    margin-right: 8px;
    text-transform: uppercase;
  `,
};
