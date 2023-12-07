import { css } from 'styled-components';

import {
  BLACK, TRANSPARENT, WOOD_SMOKE,
} from '@univision/fe-utilities/styled/constants';
import { media } from '@univision/fe-commons/dist/utils/styled/mixins';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  darkContainer: ({ hasAdSkin }) => css`
    background-color: ${BLACK};
    bottom: 0;
    box-sizing: content-box;
    height: 100%;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    position: absolute;
    right: 0;
    top: 0;
    width: 100vw;

    ${media.md`
      ${hasAdSkin && css`
        left: -16px;
        margin-left: 0;
        margin-right: 0;
        padding: 0 16px;
        width: 100%;
      `}
    `}
  `,

  titleBar: ({ theme }) => css`
    background: ${theme.primary};
    height: 2px;
    width: 94%;

    ${media.md`
      width: 100%;
    `}
  `,

  titleWrapper: ({ localMarket }) => css`
    margin-bottom: 11px;
    position: relative;

    ${localMarket && css`
      margin-top: 16px;
      width: 94%;

      ${media.md`
        width: 100%;
      `}
    `}
  `,

  cardWrapper: css`
    height: fit-content;
    padding: 2px 3px 3px 5px;
    width: 100%;
    ${media.md`
       padding: 2px 0 3px 3px;
    `}
  `,

  buttonWrapper: ({ isWorldCupMvp }) => css`
     margin-top: 14px;
     padding: 0 20px 0 0;
     width: auto;
     ${media.sm`
        padding: 0;
        width: 196px;
    `}

    ${isWorldCupMvp && css`.uvs-font-c-bold {
      color: ${WOOD_SMOKE};
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
      font-size: ${rem('14px')}
    }`}
  `,

  fullWidth: ({ isDark }) => css`
    background: ${isDark ? BLACK : TRANSPARENT};
    padding-left: 20px;
    position: relative;
    ${media.sm`
       padding-left: 0;
    `}
    ${isDark && css`
      padding-bottom: 24px;
      padding-top: 24px;
    `}
  `,

  carousel: css`
    .arrowLeft {
      left: -20px;
    }
    .arrowRight {
      right: -28px;
    }
  `,
  linkStyled: css`
     display: flex;
     width: 100%;
     ${media.md`
        width: 196px;
    `}
     > div {
      width: 100%;
    }
  `,
};
