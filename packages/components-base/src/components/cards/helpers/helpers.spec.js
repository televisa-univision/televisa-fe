import {
  HALF_PORTRAIT,
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
  LIST,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';
import { JOB_LISTING } from '@univision/fe-commons/dist/constants/articleTypes';
import { BLACK_GREY, GREY_BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import {
  attachCardTypeMetaData,
  attachSquareCardMetaData,
  getCardAspectRatio,
  getCardBackground,
  getCardDescriptionStyles,
  getCardHeaderStyles,
  getCardHoverState,
  getCardLabel,
  getCardPosition,
  getCardWidth,
  getSquareCardHeaderStyles,
  getThemeGradient,
  getValidationMVP,
  isHalfPortraitCard,
  isListCard,
  isParentSameAsPage,
  isPortraitCard,
  isRectangleCard,
  isSquareCard,
  isVerticalCard,
  setAsPersonalizedContent,
} from '.';

const store = configureStore();

/** @test {Card Helpers} */
describe('getCardAspectRatio', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the correct style rules for portrait card', () => {
    expect([...getCardAspectRatio(PORTRAIT)]).toEqual([
      'padding-bottom:',
      '125',
      '%;',
    ]);
  });

  it('should return the correct style rules for rectangle card type', () => {
    expect([...getCardAspectRatio(RECTANGLE)]).toEqual([
      'padding-bottom:',
      '50',
      '%;',
    ]);
  });

  it('should return the correct style rules for square card type', () => {
    expect([...getCardAspectRatio(SQUARE)]).toEqual([
      'padding-bottom:',
      '100',
      '%;',
    ]);
  });

  it('should return the correct style rules for landscape card type', () => {
    expect([...getCardAspectRatio(LANDSCAPE)]).toEqual([
      'padding-bottom:calc(',
      '56.25',
      '% + 76px);',
    ]);
  });

  it('should return no style rules for invalid types', () => {
    expect(getCardAspectRatio('invalid')).toEqual(null);
  });
});

/** @test {Card Helpers} */
describe('getCardHoverState', () => {
  it('should return the correct style rules for the provided color type', () => {
    expect([...getCardHoverState(GREY_BLACK)]).toEqual([
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
    ]);
  });

  it('should return no style rules for invalid types', () => {
    expect(getCardHoverState(null)).toEqual(null);
  });
});

describe('is [card type] helpers', () => {
  it('should return true for isHalfPortraitCard if card type is portrait', () => {
    expect(isHalfPortraitCard(HALF_PORTRAIT)).toBeTruthy();
  });

  it('should return true for isPortraitCard if card type is portrait', () => {
    expect(isPortraitCard(PORTRAIT)).toBeTruthy();
  });

  it('should return true for isRectangleCard if card type is rectangle', () => {
    expect(isRectangleCard(RECTANGLE)).toBeTruthy();
  });

  it('should return true for isSquareCard if card type is square', () => {
    expect(isSquareCard(SQUARE)).toBeTruthy();
  });

  it('should return true for isListCard if card type is list', () => {
    expect(isListCard(LIST)).toBeTruthy();
  });

  it('should return true for isVerticalCard if card type is vertical', () => {
    expect(isVerticalCard(VERTICAL)).toBeTruthy();
  });
});

/** @test {Card Helpers} */
// TODO: migrate those styles test to snapshots
describe('getCardHeaderStyles', () => {
  it('should return the correct style rules for the type=PORTRAIT', () => {
    expect([...getCardHeaderStyles(PORTRAIT)]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '1.125rem',
      ';line-height:',
      '1.3125rem',
      ';',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 1.25rem;
          line-height: 1.5rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.8125rem',
      `;
          line-height: `,
      '2.1875rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '1.375rem',
      `;
          line-height: `,
      '1.625rem',
      `;
        `,
      ';}',
    ]);
  });

  it('should return the correct style rules for the type=SQUARE', () => {
    expect([...getCardHeaderStyles(SQUARE)]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '0.875rem',
      ';line-height:',
      '1.0625rem',
      ';',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 1rem;
          line-height: 1.1875rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.4375rem',
      `;
          line-height: `,
      '1.6875rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '1rem',
      `;
          line-height: `,
      '1.1875rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1440',
      'px){',
      `
          font-size: `,
      '1.125rem',
      `;
          line-height: `,
      '1.3125rem',
      `;
        `,
      ';}',
      ' ',
    ]);
  });

  it('should return the correct style rules for the type=SQUARE with hasAdSkin', () => {
    expect([...getCardHeaderStyles(SQUARE, { hasAdSkin: true })]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '0.875rem',
      ';line-height:',
      '1.0625rem',
      ';',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 1rem;
          line-height: 1.1875rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.4375rem',
      `;
          line-height: `,
      '1.6875rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '1rem',
      `;
          line-height: `,
      '1.1875rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1440',
      'px){',
      `
          font-size: `,
      '1.125rem',
      `;
          line-height: `,
      '1.3125rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1440',
      'px){',
      `
          font-size: `,
      '1rem',
      `;
          line-height: `,
      '1.1875rem',
      `;
        `,
      ';}',
    ]);
  });

  it('should return the correct style font size rules for description with type=SQUARE', () => {
    expect([...getCardDescriptionStyles(SQUARE)]).toEqual([
      'color:',
      '#ffffff',
      ';font-size:',
      '0.75rem',
      ';line-height:',
      '1rem',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 0.875rem;
          line-height: 1.125rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.25rem',
      `;
          line-height: `,
      '1.625rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '0.9375rem',
      `;
          line-height: `,
      '1.25rem',
      `;
        `,
      ';}',
    ]);
  });

  it('should return null for description when a valid type is not provided', () => {
    expect(getCardDescriptionStyles(null)).toEqual(null);
  });

  it('should return the correct style rules for the type=RECTANGLE', () => {
    expect([...getCardHeaderStyles(RECTANGLE)]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '0.75rem',
      ';line-height:',
      '1rem',
      ';',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 0.875rem;
          line-height: 1.125rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.25rem',
      `;
          line-height: `,
      '1.625rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '1rem',
      `;
          line-height: `,
      '1.25rem',
      `;
        `,
      ';}',
      ' ',
    ]);
  });

  it('should return the correct style rules for the type=RECTANGLE with hasAdSkin', () => {
    expect([...getCardHeaderStyles(RECTANGLE, { hasAdSkin: true })]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '0.75rem',
      ';line-height:',
      '1rem',
      ';',
      `@media only screen and (max-width: 768px) and (min-width: 414px) {
          font-size: 0.875rem;
          line-height: 1.125rem;
        }`,
      ' ',
      '@media (min-width:',
      '768',
      'px){',
      `
          font-size: `,
      '1.25rem',
      `;
          line-height: `,
      '1.625rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1024',
      'px){',
      `
          font-size: `,
      '1rem',
      `;
          line-height: `,
      '1.25rem',
      `;
        `,
      ';}',
      ' ',
      '@media (min-width:',
      '1440',
      'px){',
      `
          font-size: `,
      '0.875rem',
      `;
          line-height: `,
      '1.125rem',
      `;
        `,
      ';}',
    ]);
  });

  it('should return the correct style rules for the type=LANDSCAPE', () => {
    expect([...getCardHeaderStyles(LANDSCAPE)]).toEqual([
      'color:',
      '#ffffff',
      ';a{color:',
      '#ffffff',
      ';',
      '&:hover{color:',
      '#808080',
      ';& > svg path{fill:',
      '#808080',
      ' !important;}}',
      '}',
      'font-size:',
      '1.5rem',
      ';line-height:',
      '1.8125rem',
      ';',
    ]);
  });

  it('should return null if type was not provided', () => {
    expect(getCardHeaderStyles()).toEqual(null);
  });
});

/** @test {Card Helpers} */
describe('getCardBackground', () => {
  it('should return BLACK_GREY if dark mode', () => {
    expect(getCardBackground({ isDark: true })).toEqual(BLACK_GREY);
  });
  it('should return WHITE is dark mode', () => {
    expect(getCardBackground({ isDark: false })).toEqual(WHITE);
  });
});

describe('setAsPersonalizedContent', () => {
  it('should return an empty object by default', () => {
    expect(setAsPersonalizedContent()).toEqual({});
  });
  it('should return the metadata as personalized content', () => {
    const content = setAsPersonalizedContent({
      widgetContext: {
        metaData: {
          test: 'test',
        },
      },
    });
    const asPersonalizedContent = setAsPersonalizedContent(content);
    expect(asPersonalizedContent.widgetContext.metaData.isPersonalized).toBe(true);
  });
});

describe('getCardLabels', () => {
  it('should return an object with label props with default type', () => {
    expect(getCardLabel()).toEqual({
      href: '',
      text: '',
      type: 'default',
    });
  });
  it('should label for liveblog', () => {
    const options = {
      cardLabel: 'liveblog',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ uri: 'url' }],
      type: 'liveblog',
      articleType: 'liveblog',
      uri: 'liveblogUrl',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'liveblogUrl',
      text: 'liveblog',
      type: 'liveblog',
    });
  });
  it('should return label props for Futbol', () => {
    const options = {
      vertical: 'deportes',
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'futbol', uri: 'url', title: 'fútbol' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'fútbol',
      type: 'futbol',
    });
  });
  it('should return label props for shows', () => {
    const options = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ title: 'shows', uri: 'url', name: 'shows' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'shows',
      type: 'shows',
    });
  });
  it('should label props for opinion', () => {
    const options = {
      cardLabel: 'OPINION',
      contentPriority: 'standard',
      authors: [{ fullName: 'author', uri: 'url/author' }],
      hierarchy: [],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url/author',
      text: 'author',
      type: 'opinion',
    });
  });
  it('should label props for advertisement', () => {
    const options = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [],
      type: 'advertising',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: '',
      text: 'Publicidad',
      type: 'advertising',
    });
  });
  it('should label props for advertisement for article type job listing', () => {
    const options = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'jobs', uri: 'url' }],
      type: 'advertising',
      articleType: JOB_LISTING,
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'Publicidad',
      type: 'advertising',
    });
  });
  it('should label props for channel promo', () => {
    const options = {
      textLabel: 'opinion',
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'jobs', uri: 'url' }],
      type: 'videochannelpromo',
      articleType: JOB_LISTING,
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'Canal Digital',
      type: 'shows',
    });
  });
  it('should get livestream label', () => {
    const options = {
      cardLabel: 'en vivo',
      type: 'livestream',
    };
    expect(getCardLabel(options)).toEqual({
      text: 'en vivo',
      href: '',
      type: 'liveblog',
    });
  });
  it('should get livestream label with empty text and href', () => {
    const options = {
      cardLabel: null,
      type: 'livestream',
    };
    expect(getCardLabel(options)).toEqual({
      text: '',
      href: '',
      type: 'liveblog',
    });
  });
  it('should return label props for delicioso', () => {
    const options = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'delicioso', uri: 'url', title: 'delicioso' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'delicioso',
      type: 'delicioso',
    });
  });
  it('should return label props for famosos', () => {
    const options = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'famosos', uri: 'url', title: 'famosos' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'famosos',
      type: 'famosos',
    });
  });
  it('should return label props for estilo de vida', () => {
    const options = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'estilo de vida', uri: 'url', title: 'estilo de vida' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url',
      text: 'estilo de vida',
      type: 'estiloDeVida',
    });
  });
  it('should return label props for other sports', () => {
    const options = {
      vertical: 'deportes',
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'deportes', uri: 'url' }, { name: 'box', uri: 'url/box', title: 'box' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url/box',
      text: 'box',
      type: 'otherSports',
    });
  });
  it('should return label props for breaking news', () => {
    const options = {
      vertical: 'deportes',
      textLabel: null,
      contentPriority: 'breaking_news',
      authors: [],
      hierarchy: [{ name: 'deportes', uri: 'url' }, { name: 'box', uri: 'url/uefa' }],
      type: 'article',
      uri: 'url/breaking',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url/breaking',
      text: 'Última hora',
      type: 'breakingNews',
    });
  });
  it('should return label props for horoscopos', () => {
    const options = {
      textLabel: null,
      contentPriority: 'standard',
      authors: [],
      hierarchy: [{ name: 'horoscopos', uri: 'url/sagitario', title: 'horóscopos' }],
      type: 'article',
    };
    const labelData = getCardLabel(options);
    // cardLabel, contentPriority, authors, hierarchy, cardType,
    expect(labelData).toEqual({
      href: 'url/sagitario',
      text: 'horóscopos',
      type: 'horoscopos',
    });
  });
});

describe('getSquareCardHeaderStyles', () => {
  it('should return null by default', () => {
    expect(getSquareCardHeaderStyles()).toEqual(null);
  });
  it('should return correct color if passed in options', () => {
    expect(getSquareCardHeaderStyles('large', { color: BLACK_GREY, hoverColor: WHITE }))
      .toEqual(expect.arrayContaining([BLACK_GREY]));
  });
  it('should return default color', () => {
    expect(getSquareCardHeaderStyles('large', {}))
      .toEqual(expect.arrayContaining([WHITE]));
  });
});

describe('getCardWidth', () => {
  it('should return set width for landscape', () => {
    expect(getCardWidth('landscape')).toEqual(['width:730px;']);
  });

  it('should return set width for vertical', () => {
    expect(getCardWidth('vertical')).toEqual(['width:140px;']);
  });

  it('should return card width for the current breakpoint', () => {
    expect([...getCardWidth()]).toEqual(
      [
        'max-width:376px;width:100%;',
        '@media (min-width:',
        '480',
        'px){',
        '\n      max-width: 560px;\n    ',
        ';}',
        ' ',
        '@media (min-width:',
        '768',
        'px){',
        '\n      max-width: 646px;\n    ',
        ';}',
        ' ',
        '@media (min-width:',
        '1024',
        'px){',
        '\n      max-width: 410px;\n    ',
        ';}',
      ]
    );
  });
});

describe('getCardPosition', () => {
  it('should return the first card position', () => {
    expect(getCardPosition(0)).toEqual(['align-items:center;display:flex;grid-column:1 / 2;grid-row:1 / 3;']);
  });

  it('should return second card position ', () => {
    expect(getCardPosition(1)).toEqual(['grid-column:2 / 3;grid-row:1 / 2;']);
  });
});

describe('attachSquareCardMetadata', () => {
  it('should return null by default', () => {
    expect(attachSquareCardMetaData({}, '')).toEqual(null);
  });
  it('should return correct card name with no content type or card type param', () => {
    expect(attachSquareCardMetaData({ id: '0' }))
      .toEqual({
        id: '0',
        widgetContext: {
          metaData: {
            cardName: 'StoryCard2',
            cardType: 'square',
          },
        },
      });
  });
  it('should return correct card name', () => {
    expect(attachSquareCardMetaData({ type: 'article' }, 'square'))
      .toEqual({
        type: 'article',
        widgetContext: {
          metaData: {
            cardName: 'StoryCard2',
            cardType: 'square',
          },
        },
      });
  });
  it('should return default card name for type video preview', () => {
    expect(attachSquareCardMetaData({ type: 'video' }, 'square'))
      .toEqual({
        type: 'video',
        widgetContext: {
          metaData: {
            cardName: 'VideoCard2 preview',
            cardType: 'square',
          },
        },
      });
  });
  it('should return default card name for type video inline', () => {
    expect(attachSquareCardMetaData({ type: 'video', isInlineVideo: true }, 'square'))
      .toEqual({
        type: 'video',
        isInlineVideo: true,
        widgetContext: {
          metaData: {
            cardName: 'VideoCard2 instream',
            cardType: 'square',
          },
        },
      });
  });
});

describe('attachCardTypeMetaData', () => {
  it('should attach card type when metadata is provided', () => {
    const result = attachCardTypeMetaData({ widgetContext: { metaData: { cardType: '' } } }, 'square');

    expect(result.widgetContext.metaData.cardType).toEqual('square');
  });
});

describe('isParentSameAsPage', () => {
  it('should return false when not same as parent', () => {
    store.dispatch(setPageData({
      data: {
        uri: 'http://www.tudn.com/boxeo',
        parent: {
          uri: 'http://www.tudn.com',
        },
      },
    }));
    expect(isParentSameAsPage('http://www.tudn.com/boxeo')).toEqual(false);
  });

  it('should return true when same as parent', () => {
    store.dispatch(setPageData({
      data: {
        uri: 'http://www.tudn.com',
        parent: {
          uri: 'http://www.tudn.com',
        },
      },
    }));
    expect(isParentSameAsPage('http://www.tudn.com')).toEqual(true);
  });
});

describe('getThemeGradient', () => {
  it('should return with gradient if available on theme', () => {
    const theme = {
      gradient: {
        start: '#000',
        end: '#FFF',
      },
    };
    expect(getThemeGradient(theme)).toEqual('linear-gradient(270deg, #000 0%, #FFF 100%)');
  });

  it('should return default to theme color if no gradient available', () => {
    const theme = {
      primary: '#FF0',
      secondary: '#0F0',
    };
    expect(getThemeGradient(theme)).toEqual('linear-gradient(270deg, #FF0 0%, #0F0 100%)');
  });
});

/** @test {ListCard Helpers} */
describe('method getValidationMVP for CT', () => {
  it('should return true if the CT article is included in the array of CT', () => {
    const contentType = 'article';
    expect(getValidationMVP(contentType)).toBe(true);
  });
  it('should return true if the CT slideshow is included in the array of CT', () => {
    const contentType = 'slideshow';
    expect(getValidationMVP(contentType)).toBe(true);
  });
  it('should return false if the CT livestream is not included in the array of CT', () => {
    const contentType = 'livestream';
    expect(getValidationMVP(contentType)).toBe(false);
  });
});
