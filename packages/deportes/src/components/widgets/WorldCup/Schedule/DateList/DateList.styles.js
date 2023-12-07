import { css } from 'styled-components';
import {
  GENOA,
  WHITE,
  WHITE_50,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  button: ({ isActive }) => css`
    background-color: transparent;
    opacity: 0.4;
    padding: 8px 12px 12px;
    text-align: left;
    width: 80px;

    ${isActive && css`
      border-bottom: 3px solid ${GENOA};
      opacity: 1;
      padding-bottom: 9px;
    `}
  `,
  dateLabel: css`
    color: ${WHITE};
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(16)};
    font-weight: 700;
    line-height: ${rem(19)};
  `,
  dayLabel: css`
    color: ${WHITE};
    font-family: 'Roboto Flex', sans-serif;
    font-size: ${rem(12)};
    font-weight: 400;
    text-transform: uppercase;
  `,
  wrapper: css`
    border-bottom: 0.5px solid ${WHITE_50};
  `,
};
