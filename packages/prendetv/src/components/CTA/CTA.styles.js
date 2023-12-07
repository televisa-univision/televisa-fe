/**
 * @module PrendeTV Call To Action style
 */
import { css } from 'styled-components';

import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import { BLACK, MONTSERRAT_FONT_FAMILY, SHAMROCK } from '@univision/fe-utilities/styled/constants';

export default {
  link: css`
    align-items: center;
    background-color: ${SHAMROCK};
    border-radius: 4px;
    color: ${BLACK};
    display: inline-flex;
    font-family: ${MONTSERRAT_FONT_FAMILY};
    font-size: ${rem('14px')};
    height: 44px;
    justify-content: center;
    letter-spacing: ${rem('0.75px')};
    line-height: ${rem('14px')};
    min-width: 167px;
    padding: 5px 25px;
    text-align: center;
    text-transform: uppercase;

    &:hover {
      color: ${BLACK};
    }
  `,
};
