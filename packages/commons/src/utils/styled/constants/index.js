/**
 * WARNING: deprecated use {@link @univision/fe-utilities/styled/constants} instead.
 */
import * as styled from '@univision/fe-utilities/styled/constants';
import linearGradient from '@univision/fe-utilities/styled/mixins/linearGradient';

//
// WARNING!!!!!!!:
// If you will use, or will add, or added some those
// gradient please use or extend `@univision/fe-utilities/styled/mixin/linearGradient`
//
export const GRADIENT_BLACK_TO_BLACK_GREY90 = `linear-gradient(180deg, ${styled.BLACK} 0%, rgba(24, 24, 24, .9) 100%)`;
export const GRADIENT_BLACK_TRANSPARENT = 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%)';
export const GRADIENT_BLACK_GREY_TRANSPARENT = `linear-gradient(180deg, rgba(24, 24, 24, 0) 0%, ${styled.BLACK_GREY} 100%)`;
export const GRADIENT_BLACK = 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 100%)';
export const GRADIENT_WHITE_TRANSPARENT = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${styled.WHITE} 100%)`;
export const GRADIENT_GREY_TRANSPARENT = 'linear-gradient(225deg, rgba(238,238,238,0) 0%, rgba(216,216,216,0.4) 100%)';
export const GRADIENT_GRAYISH_BLACK = `linear-gradient(225deg, ${styled.MOSTLY_BLACK} 0%, ${styled.GRAYISH_BLUE} 100%)`;
export const GRADIENT_RED_LIVE = `linear-gradient(229deg, ${styled.VELVET_RED} 0%, ${styled.TORCH_RED} 100%)`;
export const GRADIENT_BLUE_LABEL = `linear-gradient(230deg, ${styled.CERULEAN_BLUE}, ${styled.DODGER_BLUE})`;
export const GRADIENT_PINK = `linear-gradient(61.39deg, ${styled.SANGRIA} 0%, ${styled.CERISE} 54.57%, ${styled.SANGRIA} 100%)`;
export const GRADIENT_PURPLE = 'linear-gradient(61.39deg, rgba(29,29,234,0.47) 0%, rgba(198,38,182,0.48) 32.58%, #666FD7 100%)';
export const GRADIENT_PURPLE_SHOW = `linear-gradient(223.34deg, ${styled.DARKER_GREY} 0%, ${styled.MARTINIQUE} 100%)`;
export const GRADIENT_GREY_LABEL = `linear-gradient(229deg, ${styled.LIGHT_MARTINIQUE} 0%, ${styled.MARTINIQUE} 100%)`;
export const GRADIENT_ADVERTISING_LABEL = `linear-gradient(229.03deg, ${styled.GAMBOGE} 0%, ${styled.BRIGHT_SUN} 100%);`;
export const GRADIENT_WEATHER_CARD = `linear-gradient(229.03deg, ${styled.WHITE_LILAC} 0%, ${styled.SOLITUDE} 100%);`;
export const GRADIENT_WEATHER_BREAKING_CARD = `linear-gradient(to bottom, ${styled.CATSKILL_WHITE} 0%, ${styled.WHITE} 100%)`;
export const GRADIENT_MATCH_CARD = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))';
export const GRADIENT_UFORIA = `linear-gradient(228.96deg, ${styled.CRIMSON_RADIO} 0%, ${styled.POMEGRANATE} 100%)`;
export const GRADIENT_RADIO = `linear-gradient(90deg, ${styled.POMEGRANATE} 0%, ${styled.CARDINAL}  100%)`;
export const GRADIENT_LONG_FORM = 'linear-gradient(90deg, #940F78 0%, #1D1789 100%);';
export const GRADIENT_TRANSPARENT_TO_WHITE = `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 52.36%, ${styled.WHITE} 100%)`;
export const GRADIENT_TRANSPARENT_TO_GREY = 'linear-gradient(180deg, rgba(244,244,244,0) 0%, rgba(244,244,244,0.9) 100%)';
export const GRADIENT_EBONY_CLAY_TRANSPARENT = `linear-gradient(0deg, ${styled.EBONY_CLAY} 0%, ${styled.TRANSPARENT} 100%)`;
export const GRADIENT_HEADER_COMPOUND = `linear-gradient(45deg, ${styled.DARK_BLUE} 0%, ${styled.DARK_BLUE} 40.08%, ${styled.MIDNIGHT_EXPRESS} 100%)`;
export const GRADIENT_MOSTLY_BLACK_TRANSPARENT = linearGradient('180deg', 'rgba(15,17,22,0)', styled.MOSTLY_BLACK);
export const NAV_BACKGROUND_GRADIENT = `linear-gradient(80.75deg, ${styled.PRIMARY_PURPLE} 14.65%, ${styled.SECONDARY_BLUE} 94%)`;
export const GRADIENT_TRANSPARENT_GREY_TO_GREY = 'linear-gradient(to left, #333 14.65%, #30344B 84.52%)';
export const GRADIENT_BANDAMAX_TOP_NAV = 'linear-gradient(223.34deg, rgba(51, 51, 51, 0.1) 14.65%, rgba(48, 52, 75, 0.1) 84.52%)';
export const HEADER_GRADIENT = `linear-gradient(80.75deg, ${styled.PRIMARY_PURPLE} 19.09%, ${styled.SECONDARY_BLUE} 81.7%, ${styled.TERTIARY_CYAN} 94.57%, ${styled.QUATERNARY_TEAL} 106.8%)`;
export const LINK_HOVER_EFFECT = 'linear-gradient(180deg, rgba(0, 0, 0, 0.2751) 0%, rgba(0, 0, 0, 0.0374235) 100%)';
export const GRADIENT_UNICABLE = '#FFD230';
export const SOLID_COLOR_UNICABLE = '#EBC230';
export const YELLOW_DARK = '#8A6C00';
export const TOMATO_RED = '#E02D00';

export const TOP_TO_BOTTOM_WHITE_CONCRETE = `
  linear-gradient(
    0deg,
    rgba(${styled.CONCRETE_RGB},1) 20%,
    rgba(${styled.WHITE_RGB},1) 50%,
    rgba(${styled.WHITE_RGB},1) 50%
  )
`;
export const TOP_TO_BOTTOM_BLACK_BLACK_GREY = `
  linear-gradient(
    0deg,
    rgba(${styled.COD_GRAY_RGB},1) 20%,
    rgba(${styled.BLACK_RGB},1) 50%,
    rgba(${styled.BLACK_RGB},1) 50%
  )
`;
export const GRADIENT_DESTINO_2020_NATIONAL = `
  linear-gradient(240.58deg, #141C56 0%, #2635B6 42.75%, #192276 100%),
  linear-gradient(63.43deg, #DC1830 0%, rgba(220,24,48,0) 100%),
  linear-gradient(180deg, rgba(0,190,213,0.5) 0%, rgba(0,190,213,0) 100%),
  linear-gradient(25.58deg, rgba(68,207,123,0) 0%, #6DB43E 100%),
  linear-gradient(129.91deg, rgba(68,0,232,0) 0%, rgba(68,0,232,0.98) 100%, #4400E8 100%),
  linear-gradient(315.3deg, rgba(68,0,232,0) 0%, #00BED5 100%);
`;
export const GRADIENT_ASTRONAUT_CHAMBRAY = `linear-gradient(229.03deg, ${styled.ASTRONAUT} 0%, ${styled.CHAMBRAY} 100%)`;

// Longform gradients
export const LONGFORM_GRADIENT_RIGHT = `linear-gradient(
  to right,
  ${styled.BRIGHT_TURQUOISE} 0,
  ${styled.CERULEAN} 17%,
  ${styled.SCIENCE_BLUE} 29%,
  ${styled.BLUE_RIBBON} 48%,
  ${styled.ELECTRIC_VIOLET} 64%,
  ${styled.ELECTRIC_PURPLE} 75%,
  ${styled.HOLLYWOOD_CERISE} 83%,
  ${styled.ELECTRIC_PINK} 99%
)`;
export const LONGFORM_GRADIENT_LABEL = `linear-gradient(
  270deg,
  ${styled.TRANSPARENT},
  ${styled.ELECTRIC_BLUE_90} 150%,
  ${styled.ELECTRIC_BLUE} 0
),
linear-gradient(0, ${styled.CRIMSON}, ${styled.TRANSPARENT}),
linear-gradient(180deg, ${styled.PACIFIC_BLUE_50}, ${styled.TRANSPARENT}),
linear-gradient(25.58deg, ${styled.TRANSPARENT}, ${styled.SUSHI}),
linear-gradient(315.3deg, ${styled.TRANSPARENT}, ${styled.PACIFIC_BLUE})`;
export const LONGFORM_GRADIENT_LEFT = `linear-gradient(
  to left,
  ${styled.BRIGHT_TURQUOISE} 0,
  ${styled.CERULEAN} 17%,
  ${styled.SCIENCE_BLUE} 29%,
  ${styled.BLUE_RIBBON} 48%,
  ${styled.ELECTRIC_VIOLET} 64%,
  ${styled.ELECTRIC_PURPLE} 75%,
  ${styled.HOLLYWOOD_CERISE} 83%,
  ${styled.ELECTRIC_PINK} 99%
)`;
export const LONGFORM_GRADIENT_CIRCLE = `radial-gradient(
  circle at top left,
  ${styled.BRIGHT_TURQUOISE} 0%,
  ${styled.CERULEAN} 15%,
  ${styled.SCIENCE_BLUE} 25%,
  ${styled.BLUE_RIBBON} 45%,
  ${styled.ELECTRIC_VIOLET} 65%,
  ${styled.ELECTRIC_PURPLE} 75%,
  ${styled.HOLLYWOOD_CERISE} 85%,
  ${styled.CRIMSON} 100%
)`;

export const BLACK_BEAN_MIDNIGHT_GRADIENT = `linear-gradient(
  229deg, ${styled.BLACK_BEAN} 0%, ${styled.BLACK_GREEN_BEAN} 30%, ${styled.BLACK_PEARL} 56%, ${styled.MIDNIGHT} 100%
)`;

export const PURPLE_ORANGE_ORANGE_DARK = `
  linear-gradient(
    120deg,
    ${styled.INTERNATIONAL_PURPLE} 5%,
    ${styled.INTERNATIONAL_ORANGE} 50%,
    ${styled.INTERNATIONAL_ORANGE_DARKISH} 90%
  )
`;

export * from '@univision/fe-utilities/styled/constants';
