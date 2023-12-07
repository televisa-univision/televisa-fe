import { css } from 'styled-components';

import {
  BLACK,
  BLACK_20,
  VERY_LIGHT_GREY,
  WHITE,
  DARKER_GREY,
  TRANSPARENT,
  ZINDEX_SECONDARY_NAV,
} from '@univision/fe-utilities/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export default {
  arrow: css`
    margin-left: 4px;
    padding-top: 5px;
  `,
  arrowUp: css`
    border-bottom: 8px solid white;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    height: 0;
    left: 12px;
    position: absolute;
    top: 39px;
    width: 0;
  `,
  hoverSquare: ({ isVisible, isWorldCupMVP }) => css`
    background-color: ${isWorldCupMVP ? TRANSPARENT : BLACK};
    border-radius: 4px;
    display: ${isVisible ? 'block' : 'none'};
    height: 40px;
    left: -16px;
    opacity: 0.3;
    position: absolute;
    top: -6px;
    width: calc(100% + 25px);
    z-index: ${ZINDEX_SECONDARY_NAV};
  `,
  optionLink: css`
    color: ${DARKER_GREY};
    display: block;
    max-width: max-content;
    min-width: 100%;
    padding: 16px;
    width: max-content;

    &:hover {
      background-color: ${VERY_LIGHT_GREY};
      color: ${BLACK};
    }
  `,
  optionsList: css`
    background-color: ${WHITE};
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 ${BLACK_20};
    margin-top: 47px;
    min-width: 190px;
    overflow: hidden;
    position: relative;
  `,
  optionsWrapper: ({ isVisible }) => css`
    display: ${isVisible ? 'block' : 'none'};
    height: max-content;
    left: 0;
    min-width: 100%;
    position: absolute;
    top: 0;
    z-index: ${ZINDEX_SECONDARY_NAV};
  `,
  title: css`
    align-items: center;
    color: ${WHITE};
    cursor: pointer;
    display: flex;
    font-size: ${rem(16)};
    letter-spacing: 0.29px;
    line-height: ${rem(17)};
    position: relative;
    user-select: none;
    width: max-content;
    z-index: auto;
  `,
  wrapper: css`
    position: relative;
    width: fit-content;
  `,
};
