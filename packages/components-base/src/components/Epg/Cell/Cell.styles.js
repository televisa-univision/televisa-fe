import { css } from 'styled-components';

import {
  BLACK_GREY,
  CRIMSON_RADIO,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import rem from '@univision/fe-utilities/styled/mixins/rem';
import numberOfLines from '@univision/fe-utilities/styled/mixins/numberOfLines';

export default {
  liveDot: css`
    margin-left: -12px;
    margin-right: -5px;
    margin-top: 1px;
  `,
  progressBar: ({ position }) => css`
    background-color: ${CRIMSON_RADIO};
    height: 64px;
    left: ${position}%;
    position: absolute;
    top: 0;
    width: 1px;
    z-index: 2;
  `,
  time: css`
    align-items: center;
    display: flex;
    font-size: ${rem(12)};
    height: 16px;
    line-height: ${rem(16)};
    margin-bottom: 1px;
    text-transform: uppercase;
  `,
  title: css`
    font-size: ${rem(12)};
    line-height: ${rem(16)};

    ${numberOfLines(2)};
  `,
  wrapper: css`
    background-color: ${BLACK_GREY};
    border-radius: 4px;
    color: ${WHITE};
    display: flex;
    flex-direction: column;
    height: 64px;
    overflow: hidden;
    padding: 7px 10px;
    position: relative;
    width: 100%;
  `,
};
