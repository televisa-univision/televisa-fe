import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import {
  GREY,
} from '@univision/fe-utilities/styled/constants';

export default {
  label: ({ isWorldCupMVP }) => css`
    display: inline-block;
    font-size: ${rem('11px')};
    letter-spacing: ${rem('1px')};
    line-height: ${rem('13px')};
    padding-top: 8px;
    text-transform: uppercase;
    &:hover {
      color: ${GREY};
    }
  ${isWorldCupMVP && css`
    font-family: 'Roboto Flex', Helvetica, Arial, sans-serif;
    font-size: ${rem('12px')};
    font-style: normal;
    line-height: ${rem('16px')};
    margin-bottom: ${rem('8px')};
    padding: 0;
    `}
  `,

  icon: css`
    margin-right: 4px;
  `,
};
