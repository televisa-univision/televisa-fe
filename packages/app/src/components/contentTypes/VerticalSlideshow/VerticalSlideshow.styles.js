import { css } from 'styled-components';

import media from '@univision/fe-utilities/styled/mixins/media';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import makeColOffset from '@univision/fe-utilities/styled/mixins/makeColOffset';

export default {
  primaryTagContainer: ({ isTelevisa }) => css`
    text-align: left;

    ${media.md`
      text-align: ${isTelevisa ? 'left' : 'center'};
    `}
  `,
  contentHeader: ({ isTelevisa }) => css`
    text-align: left;

    ${media.md`
      text-align: ${isTelevisa ? 'left' : 'center'};
    `}

    ${isTelevisa && 'padding: 0px'}
  `,
  meta: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: ${rem('32px')} 0 ${rem('16px')} 0;

    ${media.sm`
      flex-direction: row;
    `}
  `,
  main: css`
    position: relative;
  `,
  adContainer: css`
    margin: 0 auto ${rem('32px')};
    max-width: 1440px;
  `,
  offset: css`
    ${media.md`
      ${makeColOffset(1)}
    `}

    ${media.lg`
      ${makeColOffset(2)}
    `}
  `,
  widgetsContainer: css`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    padding: 0 19px;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
  `,
  stitchedActionBarCol: css`
    ${makeColOffset(1, { breakpoint: '768px' })}

    ${media.sm`
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 0;
    `}
  `,
};
