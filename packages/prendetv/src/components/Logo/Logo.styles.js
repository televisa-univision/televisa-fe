/**
 * @module PrendeTV Logo Styles
 */
import { css } from 'styled-components';

export default {
  image: ({ hamburgerMenuLogo }) => css`
    max-height: ${hamburgerMenuLogo ? 45 : 35}px;
    user-select: none;

    ${hamburgerMenuLogo && css`
      width: 132px;
    `}
  `,
  link: css`
    display: inline-block;
    text-decoration: none;
    user-select: none;
  `,
};
