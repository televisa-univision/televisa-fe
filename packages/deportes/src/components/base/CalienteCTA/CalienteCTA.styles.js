import { css } from 'styled-components';

import rem from '@univision/fe-utilities/styled/mixins/rem';
import { CALIENTE_RED, WHITE } from '@univision/fe-utilities/styled/constants';

export default {
  betsWrapper: ({ inline }) => css`
    display: flex;
    font-size: ${rem(12)};
    gap: ${inline ? '9px' : 'none'};
    justify-content: space-between;
    line-height: ${rem(14)};
    margin: ${inline ? '0px 0px 0px 10px' : '0 10px'};
  `,
  iconWrapper: ({ inline }) => css`
    display: flex;
    margin-right: ${inline ? '8px' : '3px'};
  `,
  label: css`
    font-size: ${rem(10)};
    letter-spacing: 0.03em;
    line-height: ${rem(12)};
    margin-top: 1px;
    text-align: center;
  `,
  styledButton: ({ inline, isBetOpen }) => css`
    align-items: center;
    background: ${CALIENTE_RED};
    border-radius: 0px 0px 4px 4px;
    display: flex;
    flex-direction: row;
    height: ${inline ? '28px' : '48px'};
    min-width: ${inline && isBetOpen ? '255px' : 'none'};
    padding: ${inline ? 'none' : '16px 8px 6px'};
    width: ${inline ? 'fit-content' : '160px'};
  `,
  textWrapper: ({ inline }) => css`
    color: ${WHITE};
    display: flex;
    flex: 1;
    flex-direction: ${inline ? 'row' : 'column'};
    justify-content: ${inline ? 'space-between' : 'none'};
    text-transform: uppercase;
  `,
};
