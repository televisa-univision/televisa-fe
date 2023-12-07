import { css } from 'styled-components';
import {
  APP_BREAKPOINTS,
  ASTRONAUT,
  BASELINE_CARDS,
  BASELINE_CARDS_XS,
  BASELINE_CARDS_XXS,
  LIGHT_GREY,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { rem, mediaRange } from '@univision/fe-commons/dist/utils/styled/mixins';

const AFTER_BASELINE_CARDS_XS = BASELINE_CARDS_XS + 1;
const AFTER_BASELINE_CARDS_XXS = BASELINE_CARDS_XXS + 1;

export default {
  arrowRight: css`
    margin-left:5px;
    `,
  ctaContainer: css`
    align-items: center;
    background-color: ${WHITE};
    border: 1px solid ${LIGHT_GREY};
    box-sizing: border-box;
    color: ${ASTRONAUT};
    display: flex;
    font-size: ${rem(12)};
    height: 44px;
    justify-content: center;
    letter-spacing: 0.75px;
    line-height: ${rem(14)};
    text-transform: uppercase;
    width: 183px;

    ${mediaRange(APP_BREAKPOINTS.xxs, BASELINE_CARDS_XXS, `
        height: 33px;
        width: 124px;
    `)}

    ${mediaRange(AFTER_BASELINE_CARDS_XXS, BASELINE_CARDS_XS, `
        height: 33px;
        width: 127px;
    `)}

    ${mediaRange(AFTER_BASELINE_CARDS_XS, BASELINE_CARDS, `
        width: 168px;
    `)}
    `,
};
