import { css } from 'styled-components';

import { WOOD_SMOKE } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  loadingWrapper: css`
    position: relative;
  `,
  buttonStyled: css`
    > div {
      > svg {
        margin-left: 5px;
      }
    }
  `,
  buttonWrapper: ({ isWorldCupMvp, theme }) => css`
   ${theme?.listCardWidgetButtonBackgroundColor && css`
      > div > button {
        background: ${theme.listCardWidgetButtonBackgroundColor};
      }
      > div > button:hover {
        background: ${theme.listCardWidgetButtonBackgroundHoverColor};
      }
   `}
    margin: 0;
    padding: 0;
    width: auto;

    ${!isWorldCupMvp
    && media.md`
      padding-right: 7px;
     `}

    ${media.xl`
      width: 834px;
    `}

     div > div:last-child {
      display: none;
     }

     ${isWorldCupMvp && css`
    height: 48px;

    .uvs-font-c-bold {
      color: ${WOOD_SMOKE};
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
      font-size: ${rem('14px')} ;
    }

    ${media.xl`
      width: 195px;
    `}

    `}
  `,
};
