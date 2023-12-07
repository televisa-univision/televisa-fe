import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  WHITE,
  BLACK_GREY,
  GREY_BLACK,
  DARKER_GREY,
  VERY_LIGHT_GREY,
  LIGHT_VARIANT,
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';

const variantBg = {
  [DARK_VARIANT]: BLACK_GREY,
  [LIGHT_VARIANT]: VERY_LIGHT_GREY,
};

const activeFg = {
  [DARK_VARIANT]: WHITE,
  [LIGHT_VARIANT]: DARKER_GREY,
};

const defaultFg = {
  [DARK_VARIANT]: WHITE,
  [LIGHT_VARIANT]: GREY_BLACK,
};

export default {
  wrapper: css`
    display: flex;
    margin: 8px -4px 0 -4px;

    ${media.md`
      margin-top: 0;
      margin-bottom: 6px;
   `}
  `,

  tabWrapper: css`
    display: flex;
    width: 100%;
  `,

  tab: ({ theme, isActive, variant }) => css`
    -webkit-appearance: none;
    background-color: ${variantBg[variant]};
    border-bottom: 4px solid ${variantBg[variant]};
    border-radius: 0;
    color: ${defaultFg[variant]};
    font-size: ${rem('12px')};
    height: 48px;
    letter-spacing: 1px;
    line-height: normal;
    overflow: visible;
    padding: 5px 10px;
    text-transform: uppercase;
    width: 100%;

    ${isActive && css`
      border-bottom: 4px solid ${theme.primary};
      color: ${activeFg[variant]};
   `}

    &:hover {
      opacity: 0.8;
    }
  `,
};
