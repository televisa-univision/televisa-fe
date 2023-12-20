import {
    TRANSPARENT,
    BLACK_STARTS,
    MINE_SHAFT_BLACK,
    BLACK,
  } from '@univision/fe-utilities/styled/constants';
  import {
    LINK_HOVER_EFFECT,
    GRADIENT_UNICABLE,
    SOLID_COLOR_UNICABLE,
    YELLOW_DARK,
    WHITE,
  } from '../../../utils/styled/constants';
  import LOGOS from '../../../constants/televisaSitesData';

  /**
    * Theme object configuration
    * @returns {Object}
  */
  export const unicableThemeConfig = () => ({
    card: {
      isDark: {
        show: true,
        video: true,
        tags: false,
        error: false,
        author: false,
        search: false,
        section: true,
        article: false,
        default: false,
        liveblog: false,
        slideshow: true,
        videoLive: false,
        soccermatch: true,
        videoInline: false,
      },
      headlineFont: {
        default: 'uvs-font-b-bold',
      },
    },
    footerLogo: LOGOS.televisaWithText,
    footerLogoHeight: '54px',
    globalNavBackgroundColor: SOLID_COLOR_UNICABLE,
    globalNavLogoBackground: TRANSPARENT,
    globalNavLink: LINK_HOVER_EFFECT,
    navProviderBackgroundColor: BLACK_STARTS,
    headlineFont: {
      default: 'uvs-font-a-bold',
    },
    gradient: {
      start: YELLOW_DARK,
      end: YELLOW_DARK,
    },
    isBrandedHeaderBlack: false,
    brandedHeaderBackgroundColor: GRADIENT_UNICABLE,
    hoverGlobalNav: 'linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.04) 100%);',
    colorHoverGlobalNav: MINE_SHAFT_BLACK,
    bottomBorderGlobalNav: MINE_SHAFT_BLACK,
    colorTextGlobalNav: MINE_SHAFT_BLACK,
    brandedHeaderColor: TRANSPARENT,
    colorBrandedLabels: MINE_SHAFT_BLACK,
    colorLabelTag: MINE_SHAFT_BLACK,
    showVixLogo: false,
    mainIconIsDark: true,
    primary: TRANSPARENT,
    secondary: TRANSPARENT,
    custom: {
      'a:hover': WHITE,
      a: YELLOW_DARK,
      b: YELLOW_DARK,
    },
    titleFontSize: {
      sm: '24px',
      md: '30px',
      lg: '30px',
      xl: '30px',
    },
    titleLineHeight: {
      sm: '29px',
      md: '33px',
      lg: '33px',
      xl: '33px',
    },
    tagLabelColor: YELLOW_DARK,
    descriptionFontSize: 'regular',
    categoryColor: YELLOW_DARK,
    widgetTitleColor: YELLOW_DARK,
    widgetLinkTitleColor: BLACK,
    liveblogPostsTheme: YELLOW_DARK,
    listCardWidgetButtonBackgroundColor: YELLOW_DARK,
    listCardWidgetButtonBackgroundHoverColor: YELLOW_DARK,
    // AMP
    ampHeaderBackgroundColor: GRADIENT_UNICABLE,
    ampShareLinkBackgroundColor: GRADIENT_UNICABLE,
  });

  export default unicableThemeConfig;
