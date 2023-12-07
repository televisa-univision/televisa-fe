import { css } from 'styled-components';
import {
  ASPHALT,
  CLARET,
  INTL_ORANGE,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';

export default {
  wrapper: css`
    background: linear-gradient(360deg, ${ASPHALT} 1.04%, ${CLARET} 91.98%);
  `,
  zonaFutbolLabel: css`
    color: ${WHITE};
    font-family: 'Poppins', sans-serif;
    font-size: ${rem(10)};
    font-weight: 700;
    margin-right: 8px;
  `,
  zonaFutbolLink: css`
    align-items: center;
    background: ${ASPHALT};
    border: 1px solid ${INTL_ORANGE};
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 8px 16px;
    text-transform: uppercase;
    width: 162px;
  `,
  zonaFutbolWrapper: css`
    display: flex;
    flex-direction: row-reverse;
    padding: 16px 16px 0;
  `,
};
