import { css } from 'styled-components';

import { ZINDEX_NAV } from '@univision/fe-utilities/styled/constants';

export default {
  progressWrapper: ({ showProgressBar, isLocal }) => css`
    opacity: 0;
    position: sticky;
    top: 0;
    transition: all .5s ease-in-out;
    visibility: hidden;
    width: 100%;
    z-index: ${ZINDEX_NAV};

    ${showProgressBar && css`
      opacity: 1;
      visibility: visible;
    `}

    ${isLocal && css`
      & {
        transition: none;
      }
    `}

    @media screen and (max-width: 767px) and (orientation: landscape) {
      display: none;
    }
  `,
};
