/**
 * Styled component constants for global styles such as colors, margins,
 * z-indexes, gradients, media queries
 *
 * WARNING!!
 * This file is just for simple values, if you needs complex styles such as
 * [linear-gradient]{@link module:styled/mixin/linearGradient} use/create a mixin instead.
 * @summary styled component constants
 * @module styled/constants
 */

/**
 * Webapp Breakpoints list
 * @constant
 * @enum {number}
 * @example
 * xxs: 0
 * xs: 480
 * sm: 768
 * md: 1024
 * lg: 1280
 * xl: 1440
 */
export const APP_BREAKPOINTS = {
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
};

export const MOBILE_SCREEN_SIZE_SMALL = 375;
export const MOBILE_SCREEN_SIZE_DEFAULT = 414;

// Base variables
export const MONTSERRAT_FONT_FAMILY = 'Monserrat';
export const ROBOTO_CONDENSED_FONT_FAMILY = 'Roboto Condensed';
export const ROBOTO_FONT_FAMILY = 'Roboto';
export const NAMESPACE = 'uvs-';

// Enhancements
export const ENHANCEMENT_MARGIN_VERTICAL = '24px';

// Widgets Margins
export const WIDGETS_FIRST_MARGIN_TOP_MOBILE = '16px';
export const WIDGETS_FIRST_MARGIN_TOP_DESKTOP = '24px';
export const WIDGETS_LAST_MARGIN_BOTTOM_DESKTOP = '72px';
export const WIDGETS_LAST_MARGIN_BOTTOM_MOBILE = '32px';
export const WIDGETS_MARGIN_BOTTOM_MOBILE = '32px';
export const WIDGETS_MARGIN_BOTTOM_DESKTOP = '40px';

// Grid gutters width
export const GRID_GUTTER_WIDTH = 8;

// Webapp baseline size for cards
export const BASELINE_CARDS = 414;
export const BASELINE_CARDS_XS = 375;
export const BASELINE_CARDS_XXS = 320;

// Grayscale Palette
export const BLACK = '#000000';
export const BLACK_RGB = '0,0,0';
export const BLACK_00 = `rgba(${BLACK_RGB}, 0)`;
export const BLACK_01 = `rgba(${BLACK_RGB}, 0.1)`;
export const BLACK_03 = `rgba(${BLACK_RGB}, 0.03)`;
export const BLACK_06 = `rgba(${BLACK_RGB}, 0.06)`;
export const BLACK_08 = `rgba(${BLACK_RGB}, 0.08)`;
export const BLACK_20 = `rgba(${BLACK_RGB}, 0.2)`;
export const BLACK_35 = `rgba(${BLACK_RGB}, 0.35)`;
export const BLACK_50 = `rgba(${BLACK_RGB}, 0.5)`;
export const BLACK_70 = `rgba(${BLACK_RGB}, 0.7)`;
export const BLACK_85 = `rgba(${BLACK_RGB}, 0.85)`;
export const BLACK_80 = `rgba(${BLACK_RGB}, 0.8)`;
export const BLACK_BEAN = '#020D02';
export const BLACK_GREY = '#181818';
export const BLACK_GREY_RGB = '24,24,24';
export const BLACK_GREY_00 = `rgba(${BLACK_GREY_RGB}, 0)`;
export const BOULDER_RGB = '77,77,77';
export const BOULDER_RGB_08 = `rgba(${BOULDER_RGB}, 0.8)`;
export const DARKER_GREY = '#333333';
export const GALLERY_GREY = '#ECECEC';
export const GREY_RGB = '162, 162, 162';
export const GREY = '#A2A2A2';
export const GREY_15 = `rgba(${GREY_RGB}, 0.15)`;
export const GREY_30 = `rgba(${GREY_RGB}, 0.3)`;
export const GREY_60 = `rgba(${GREY_RGB}, 0.6)`;
export const GREY_70 = `rgba(${GREY_RGB}, 0.7)`;
export const GREY_ALTO = '#CFCFCF';
export const GREY_BLACK = '#808080';
export const GREY_SILVER_CHALICE = '#B1B1B1';
export const GREY_BOULDER = '#7C7C7C';
export const GREY_GAINSBORO = '#DADADA';
export const GREY_WHISPER = '#E8E6E6';
export const GREY_ZAMBEZI = '#5F5F5F';
export const HOT_PINK = '#FF007E';
export const LIGHT_GREY = '#d2d2d2';
export const LOADING_GRAY = '#8B8B8B';
export const KEPPEL = '#30B4A9';
export const MINE_SHAFT = '#2E2E2E';
export const MINE_SHAFT_BLACK = '#242424';
export const STEEL_GREY = '#1D1E29';
export const TRANSPARENT = `rgba(${BLACK_RGB}, 0)`;
export const VERY_LIGHT_GREY = '#F5F5F5';
export const WEDGEWOOD = '#469799';
export const WHITE = '#ffffff';
export const WHITE_RGB = '255,255,255';
export const WHITE_00 = `rgba(${WHITE_RGB}, 0)`;
export const WHITE_10 = `rgba(${WHITE_RGB}, 0.1)`;
export const WHITE_20 = `rgba(${WHITE_RGB}, 0.2)`;
export const WHITE_25 = `rgba(${WHITE_RGB}, .25)`;
export const WHITE_30 = `rgba(${WHITE_RGB}, 0.3)`;
export const WHITE_40 = `rgba(${WHITE_RGB}, 0.4)`;
export const WHITE_50 = `rgba(${WHITE_RGB}, 0.5)`;
export const WHITE_60 = `rgba(${WHITE_RGB}, 0.6)`;
export const WHITE_70 = `rgba(${WHITE_RGB}, 0.7)`;
export const WHITE_80 = `rgba(${WHITE_RGB}, 0.8)`;
export const WHITE_GREY = '#ECECEC';
export const WHITE_GREY_RGB = '236,236,236';
export const WHITE_GREY_70 = `rgba(${WHITE_GREY_RGB}, 0.7)`;
export const SOLID_BRAVE_RED = '#E71340';

// Default theme fallback
export const THEME_DEFAULT_PRIMARY = '#3A3A3A';
export const THEME_DEFAULT_SECONDARY = BLACK;

// Standard Colors (http://chir.ag/projects/name-that-color for creating standardized color names)
export const ALABASTER = '#FAFAFA';
export const ALABASTER_00 = 'rgba(250, 250, 250, 0)';
export const ALICE_BLUE = '#FCFEFF';
export const ALIZARIN_CRIMSON = '#E21B1B';
export const ALIZARIN_CRIMSON_BRIGHTER = '#EE2124';
export const ALTO = '#D9D9D9';
export const AQUA_DEEP = '#005239';
export const ASTRONAUT = '#2B3B70';
export const ASTRONAUT_BLUE = '#2B3A70';
export const ATHENS_GRAY = '#F8F8F9';
export const BLACK_GREEN_BEAN = '#09240C';
export const BLACK_PEARL = '#122A33';
export const BLACK_SQUEEZE = '#EDF4F8';
export const BLUE = '#0f5598';
export const BLUE_GEM = '#38109B';
export const BORDEAUX = '#4B0019';
export const BRIGHT_PURPLE = '#b5008f';
export const BRIGHT_SUN = '#FFCB44';
export const BRITISH_RACING_GREEN = '#003F2C';
export const BUTTERCUP = '#F5A623';
export const CALIENTE_RED = '#EE2A2B';
export const CARDINAL = '#D41D31';
export const CARNATION_PINK = '#FFA0D2';
export const CARIBBEAN_GREEN = '#0CBFAE';
export const CASABLANCA = '#FAB446';
export const CYAN = '#00ffff';
export const CATSKILL_WHITE = '#ECF4F7';
export const CERISE = '#C626B6';
export const CERISE_RED = '#e41f7b';
export const CERULEAN_BLUE = '#2358BF';
export const CHAMBRAY = '#3D549F';
export const CHARADE = '#272837';
export const CHATHAMS_BLUE = '#113967';
export const CINNABAR = '#EA4949';
export const CLOUD_BURST = '#232F59';
export const COD_GRAY_RGB = '14,14,14';
export const CONCRETE = '#F3F3F3';
export const CONCRETE_RGB = '242,242,242';
export const CORAL_RED = '#FF3D44';
export const CORNFLOWER_BLUE = '#7367F0';
export const CRIMSON_RADIO = '#EC1B23';
export const DAISY_BUSH = '#571C8F';
export const DAISY_BUSH_RGB = '87,28,143';
export const DAISY_BUSH_40 = `rgba(${DAISY_BUSH_RGB},0.4)`;
export const DARK_BLUE = '#222E57';
export const DARK_BLUE_LONGFORM = '#4305D6';
export const DARK_GOLDEN_ROD = '#B7018D';
export const DARK_GREY = '#363636';
export const DARK_PURPLE = '#391042';
export const DARK_RED = '#c82228';
export const DARK_VELVET_RED = '#7F0E12';
export const DEEP_CERISE = '#DA1D78';
export const DEEP_KOMARU = '#1D1789';
export const DEEP_ROSE = '#CA2173';
export const DODGER_BLUE = '#3374F2';
export const DOVE_GRAY = '#6F6E6E';
export const DESERT_STORM = '#fcfcfb';
export const EBONY = '#10162B';
export const EBONY_CLAY = '#2F3444';
export const ELETRIC_VIOLET = '#7947F5';
export const EMPEROR = '#4f4f4f';
export const FIORD = '#6195ED';
export const FLIRT = '#BA00AA';
export const FREE_SPEECH_RED = '#C30000';
export const FREE_SPEECH_RED_DARK = '#A70000';
export const FUEL_YELLOW = '#EEA423';
export const GAMBOGE = '#E9AD11';
export const GERALDINE = '#FB9595';
export const GIGAS = '#41479B';
export const GO_BEN = '#766f4f';
export const GOSSAMER = '#079F70';
export const GREEN = '#00c473';
export const GREEN_DARKER = '#007350';
export const GREEN_HAZE = '#019940';
export const HAITI = '#0F1732';
export const HALF_BAKED = '#92CDCE';
export const HEAVY_METAL = '#212721';
export const HOKEY_POKEY = '#C6A724';
export const INCH_WORM = '#C0E41B';
export const INTERNATIONAL_ORANGE = '#FF5900';
export const INTERNATIONAL_ORANGE_DARKISH = '#F83B15';
export const INTERNATIONAL_PURPLE = '#D42B5F';
export const LAVENDER = '#C24FDE';
export const LIGHT_BLUE = '#23a2ee';
export const LIGHT_MARTINIQUE = '#4E5167';
export const LIGHT_RED = '#e44233';
export const LINK_WATER = '#DEEAF4';
export const LUCKY_POINT = '#17216A';
export const MAGENTA = '#EC09E7';
export const MARINE_BLUE = '#001BFF';
export const MAROON = '#4d0010';
export const MARTINIQUE = '#30344b';
export const MEDIUM_PURPLE = '#784FDE';
export const MERCURY = '#e9e9e9';
export const MIDNIGHT = '#222D3F';
export const MIDNIGHT_EXPRESS = '#101833';
export const MILANO_RED = '#BC0D0D';
export const MOJO = '#C8414B';
export const MOODY_BLUE = '#666FD7';
export const MULBERRY_WOOD = '#660840';
export const MUSTARD = '#FFD250';
export const OCHRE = '#DE7A29';
export const ORANGE = '#dc7d69';
export const PERIWINKLE_GRAY = '#CEDDED';
export const POMEGRANATE = '#E63E10';
export const PURPLE = '#863699';
export const PURPLE_HEART = '#7C1ED4';
export const RED = '#de252c';
export const RED_VIOLET = '#DF128D';
export const RESOLUTION_BLUE = '#001B82';
export const ROYAL_BLUE = '#1D4592';
export const SANGRIA = '#A00000';
export const SCARLET_GUM = '#40146A';
export const SEANCE = '#67167A';
export const SEA_BUCKTHORN = '#FDA929';
export const SILVER = '#BBBBBB';
export const SILVER_CHALICE = '#a3a3a3';
export const SILVER_SAND = '#bac0c0';
export const SOLITUDE = '#E9F7FF';
export const SUNFLOWER = '#E2BE25';
export const SUNSET_ORANGE = '#FF4B55';
export const TAMARILLO = '#9E1517';
export const TORCH_RED = '#f31c1c';
export const TRINIDAD = '#F35503';
export const TROPICAL_RAIN_FOREST = '#007350';
export const TUNDORA = '#4a4a4a';
export const VELVET_RED = '#bc0d0d';
export const VIOLET_EGGPLANT = '#940F78';
export const WATERCOURSE = '#016849';
export const WATERCOURSE_TUDN = '#047e5a';
export const WHITE_LILAC = '#F8F9FC';
export const EXPRESS_MIDNIGHT = '#272B36';
export const BLACK_RUSSIAN = '#07080C';
export const YELLOW = '#FFDE15';
export const DUSTY_GRAY = '#979797';
export const YELLOW_ORANGE = '#FFB441';
export const SIREN = '#750047';
export const FRESH_EGGPLANT = '#920059';
export const BLACKBERRY = '#590036';
export const FLIRT_OPAQUE = '#BA0071';
export const ROSE = '#F50072';
export const SLATE_GREY = '#8D8A8A';
export const ABSOLUTE_ZERO_BLUE = '#007AFF';
export const STORM_GREY = '#F2F2F2';

// Colors rebrand
export const WOOD_SMOKE = '#0a0b0b';
export const AQUAMARINE = '#5effcd';
export const AQUAMARINE_40 = '#2bffbd';
export const BREAKING = '#E12D05';
export const CEDAR_WOOD_FINISH = '#6B1400';
export const SPRING_GREEN = '#00ffb0';
export const DARK_CERULEAN = '#014F79';
export const DARK_TAN = '#690F2C';
export const DEEP_SEA = '#03865d';
export const FUN_GREEN = '#026445';
export const RADICAL_RED = '#ff2b6d';
export const FOLLY = '#ff004f';
export const BURGUNDY = '#990030';
export const BORDEAUX_CONTRAST = '#660020';
export const BLAZE_ORANGE = '#ff6a00';
export const ROSE_OF_SHARON = '#c25100';
export const GOLDEN_TAINOI = '#ffc74d';
export const BUTTEREDRUM = '#9a6c09';
export const MALIBU = '#63d3f4';
export const ALLPORTS = '#02799c';
export const SNOW_FLURRY = '#e1ffcc';
export const REEF = '#bbffaa';
export const FIORD_REBRAND = '#3c5764';
export const TUNDORA_REBRAND = '#404040';
export const HARLEQUIN = '#2aff00';
export const JAPANESE_LAUREL = '#198703';
export const RED_ORANGE = '#ff3333';
export const RE_RIBBON = '#E7044A';
export const MUNSELL = '#0C8BB0';
export const MONZO = '#d50b0b';
export const CAPECOD = '#3a4040';
export const SPRING_WING = '#00FFB0';
export const SIROCCO = '#6b7676';
export const BLACK_HAZE = '#eff0f0';
export const LIGTH_CRIMSON = '#ff5e90';
export const WOODSMOKE = '#0A0B0B';
export const WHITE_LINEN = '#F8F4E9';
export const PARCHMENT = '#F0E8D2';
export const ASPHALT = '#1C0714';
export const CLARET = '#741733';
export const MELANZANE = '#38061B';
export const GENOA = '#138761';
export const SNUFF = '#EAE0EB';
export const INTL_ORANGE = '#FF5901';
export const JACARANDA = '#1C0111';
export const CAB_SAV = '#47081B';
export const PRIMARY_PURPLE = '#5B2897';
export const SECONDARY_BLUE = '#3F7AB1';
export const TERTIARY_CYAN = '#339EBC';
export const QUATERNARY_TEAL = '#25C9C9';

// Longform palette
export const CRIMSON = '#dc1830';
export const CRIMSON_RGB = '220,24,51';
export const CRIMSON_50 = `rgba(${CRIMSON_RGB}, 0.5)`;
export const ELECTRIC_BLUE = '#4400e8';
export const ELECTRIC_BLUE_RGB = '68,0,232';
export const ELECTRIC_BLUE_90 = `rgba(${ELECTRIC_BLUE_RGB}, 0.9)`;
export const PACIFIC_BLUE = '#00bed5';
export const PACIFIC_BLUE_RGB = '0,190,213';
export const PACIFIC_BLUE_50 = `rgba(${PACIFIC_BLUE_RGB}, 0.5)`;
export const SUSHI = '#6db43e';
export const BRIGHT_TURQUOISE = '#02eac0';
export const CERULEAN = '#03b5d9';
export const SCIENCE_BLUE = '#0479e0';
export const BLUE_RIBBON = '#0734fb';
export const ELECTRIC_VIOLET = '#6d04de';
export const ELECTRIC_PURPLE = '#ad03e7';
export const HOLLYWOOD_CERISE = '#ca02a5';
export const ELECTRIC_PINK = '#de027b';
export const GRAYISH_BLUE = '#4f5a6e';
export const GRAYISH_BLUE_DARK = '#2f3544';
export const MOSTLY_BLACK = '#0F1116';
export const MOSTLY_BLACK_RGB = '15,17,22';
export const MOSTLY_BLACK_00 = `rgba(${MOSTLY_BLACK_RGB}, 0)`;

// Z-index
export const ZINDEX_BASE = 121000;
export const ZINDEX_BASE_SCREEN = ZINDEX_BASE + 1;
export const ZINDEX_BASE_BEHIND = ZINDEX_BASE - 10;
// base for all navigation z-index
export const ZINDEX_PRIMARY_NAV = ZINDEX_BASE + 100;
export const ZINDEX_SECONDARY_NAV = ZINDEX_PRIMARY_NAV - 10;
export const ZINDEX_NAV = ZINDEX_BASE + 10;
export const ZINDEX_ABOVE_NAVIGATION = ZINDEX_PRIMARY_NAV + 30;
export const ZINDEX_ABOVE_NAVIGATION_AND_SEARCH = ZINDEX_ABOVE_NAVIGATION + 1;
export const ZINDEX_MEGA_MENU = ZINDEX_ABOVE_NAVIGATION + 40;

// Video Player z-index
export const ZINDEX_VIDEO_PLAYER = ZINDEX_PRIMARY_NAV - 50;
export const ZINDEX_REACTION = ZINDEX_VIDEO_PLAYER + 5;
export const ZINDEX_ABOVE_REACTION = ZINDEX_REACTION + 5;

// Social Media
export const FACEBOOK_BACKGROUND = '#486BB4';
export const FACEBOOK_TELEVISA_BACKGROUND = '#1877F2';
export const INSTAGRAM_BACKGROUND = '#C9007E';
export const INSTAGRAM_TELEVISA_BACKGROUND = '#C407C3';
export const TWITTER_BACKGROUND = '#63ACFC';
export const TWITTER_TELEVISA_BACKGROUND = '#000000';
export const WHATSAPP_BACKGROUND = '#25d366';
export const YOUTUBE_BACKGROUND = 'red';
export const FACEBOOK_HOVER = 'rgba(59, 89, 152, 0.7)';
export const TWITTER_HOVER = 'rgba(32, 159, 239, 0.7)';
export const WHATSAPP_HOVER = 'rgba(37, 211, 102, 0.7)';

// Variants
export const DARK_VARIANT = 'dark';
export const LIGHT_VARIANT = 'light';
export const ROUNDED_VARIANT = 'rounded';
export const COLOR_VARIANT = 'color';
export const DARK_ALT = 'dark_alt';
export const LIGHT_ALT = 'light_alt';

// Shadows
export const CARD_SHADOW = `0 2px 4px 0 ${BLACK_08};`;

// Gradients
export const UVN_GRADIENT = {
  end: OCHRE,
  start: FUEL_YELLOW,
};

// Prende TV
export const BITTERSWEET = '#FA6464';
export const SPRING_STRAWBERRY = '#FF4545';
export const CHINESE_SILVER = '#CCCCCC';
export const DARK_GRAY = '#999999';
export const DARKISH_GRAY = '#21242E';
export const NERO = '#262626';
export const SHAMROCK = '#3CD4AF';
export const HAMBURGER_MENU_GRADIENT = {
  end: BLACK,
  start: NERO,
};
export const GREY_BLACK_LIGHT_WITH_ALPHA = 'rgba(151, 151, 151, 0.24)';

export const TUDN_GRADIENT = {
  end: TROPICAL_RAIN_FOREST,
  start: GOSSAMER,
};

export const SHOWS_GRADIENT = {
  end: VIOLET_EGGPLANT,
  start: DEEP_KOMARU,
};

export const LOCAL_GRADIENT = {
  end: CHAMBRAY,
  start: ASTRONAUT,
};

export const GLOBAL_GRADIENT = {
  end: MARTINIQUE,
  start: DARKER_GREY,
};

// Las estrellas
export const MAGENTA_RGB = 'rgba(220, 6, 106, 1)';
export const BLACK_STARTS = '#121212';

// Elnu9ve
export const MERMAID_NET = '#26CDCD';

// Televisa
export const BRIGHT_GREY = '#313447';
export const BLUE_ZODIAC = '#102C51';

// Los Bingers
export const WATER_SPORTS = '#E2FFFF';

// LCDLF
export const BALL_BLUE = '#16162A';
