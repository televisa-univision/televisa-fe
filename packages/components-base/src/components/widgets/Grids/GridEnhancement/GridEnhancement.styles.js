import { css } from 'styled-components';

import { BLACK, WOOD_SMOKE } from '@univision/fe-utilities/styled/constants';
import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  gridContainer: ({ isDark }) => css`
    padding-top: ${isDark ? '8px' : '0'};
    position: relative;
  `,

  darkContainer: css`
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
  `,

  fixedNativeCard: {
    height: '417.31px',
  },

  nativeCard: {
    height: '100%',
  },

  wrapper: css`
    padding: 0 19px;
  `,

  buttonWrapper: ({ isWorldCupMVP }) => css`
     margin-top: 14px;
     width: 100%;
     ${media.md`
        padding: 0;
        width: 196px;
    `}
    ${isWorldCupMVP && css`.uvs-font-c-bold {
      color: ${WOOD_SMOKE};
      font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
      font-size: ${rem('14px')}
    }`}
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
