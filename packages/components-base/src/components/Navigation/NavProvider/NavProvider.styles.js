import { css } from 'styled-components';
import {
  ZINDEX_ABOVE_NAVIGATION,
  ZINDEX_PRIMARY_NAV,
  ZINDEX_ABOVE_REACTION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export default {
  wrapper: ({
    theme = {},
    hamburgerMenuOpen,
    isTelevisaSite,
  }) => css`
    position: relative;
    top: 0px;

    ${isTelevisaSite && css`
      background-color: ${theme.navProviderBackgroundColor};
    `}

    ${hamburgerMenuOpen ? css`
      z-index: ${ZINDEX_ABOVE_NAVIGATION};
    ` : css`
      z-index: ${ZINDEX_PRIMARY_NAV};
    `}
  `,
  logOut: css`
    position: sticky;
    top: 0px;
    transition: all .5s ease-in-out;
    z-index: ${ZINDEX_ABOVE_REACTION};
  `,
  navWrapper: css`
    padding: 0 0 8px;
    text-transform: uppercase;
  `,
};
