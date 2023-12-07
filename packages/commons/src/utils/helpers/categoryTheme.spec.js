import * as categories from '../../constants/pageCategories';
import { UNIVISION_SITE, TUDN_SITE } from '../../constants/sites';
import categoryTheme, { verticals } from './categoryTheme';
import features from '../../config/features';
import contentTypes from '../../constants/contentTypes';

let data;

describe('categoryTheme', () => {
  beforeEach(() => {
    data = {
      tracking: {
        analytics: {
          web: {
            portal_theme: 'entretenimiento',
          },
        },
      },
    };
  });

  it('aborts if there is no telium data', () => {
    expect(categoryTheme()).not.toBeDefined();
  });

  it('returns undefined if has wrong data', () => {
    expect(categoryTheme('')).toBeUndefined();
  });

  it('returns digital channel if livestream and noticias', () => {
    features.video.enableLivestreamRedesign = jest.fn(() => true);
    expect(categoryTheme({
      type: 'livestream',
      vertical: 'Noticias',
      isDigitalChannelLiveStream: true,
    })).toBe(categories.DIGITAL_CHANNEL);
  });

  it('returns correct theme for local livestream', () => {
    features.video.enableLivestreamRedesign = jest.fn(() => true);
    expect(categoryTheme({
      type: 'livestream',
      vertical: 'Local',
    })).toBe(categories.LOCAL_LIVESTREAM);
  });

  it('returns correct theme for deportes livestream', () => {
    features.video.enableLivestreamRedesign = jest.fn(() => true);
    expect(categoryTheme({
      type: 'livestream',
      vertical: 'Deportes',
    })).toBe(categories.SPORTS_LIVESTREAM);
  });

  it('returns correct theme for deportes livestream', () => {
    features.video.enableLivestreamRedesign = jest.fn(() => true);
    expect(categoryTheme({
      type: 'livestream',
      vertical: 'Noticias',
      isDigitalChannelLiveStream: false,
    })).toBe(categories.LIVESTREAMS);
  });

  it('returns correct theme for deportes livestream', () => {
    features.video.enableLivestreamRedesign = jest.fn(() => true);
    expect(categoryTheme({
      type: 'livestream',
      vertical: 'Other',
    })).toBe(categories.LIVESTREAMS);
  });

  it('first matches based on portal_theme value in bex', () => {
    const dataBex = {
      hierarchy: [
        {
          uri: 'entretenimiento',
        },
      ],
    };
    expect(categoryTheme(dataBex)).toEqual(categories.ENTERTAINMENT);
  });

  it('uses tagHierarchy values to override portal_theme, if present', () => {
    data.tagHierarchy = [{ name: 'musica', url: '/musica' }];
    expect(categoryTheme(data)).toEqual(categories.MUSIC);
  });

  it('should return undefined if there is not valid match', () => {
    data.tagHierarchy = [{ name: 'test', url: '/foo' }];
    expect(categoryTheme(data)).not.toBeDefined();
  });

  it('returns the right category for search type', () => {
    expect(categoryTheme({
      type: contentTypes.SEARCH_PORTAL,
    })).toEqual(categories.SEARCH);
  });

  it('should call every matcher and get a boolean', () => {
    Object.keys(verticals).forEach((name) => {
      verticals[name].forEach((matcher) => {
        expect(typeof matcher.match(data)).toBe('boolean');
        expect(matcher.match(data)).toBe(false);
      });
    });
  });

  it('should call every matcher and get a false it has wrong data', () => {
    Object.keys(verticals).forEach((name) => {
      verticals[name].forEach((matcher) => {
        expect(matcher.match({})).toBe(false);
      });
    });
  });

  it('should return the right category if url pattern match', () => {
    data.uri = '/deportes/futbol/partidos-de-futbol-para-hoy-en-vivo';
    expect(categoryTheme(data)).toEqual('futbol envivo');
    data.uri = '/deportes/entrevistas-y-videos/test/abc';
    expect(categoryTheme(data)).not.toEqual('entrevistas');
  });

  it('should return one of the custom categories', () => {
    const data2 = {
      type: contentTypes.SOCCER_COMPETITION,
    };
    expect(categoryTheme(data2, { reqPath: '/deportes/futbol/mls/resultados' })).toBe(categories.SOCCER_COMPETITION_RESULTS);
    expect(categoryTheme(data2, { reqPath: '/deportes/futbol/mls' })).toBe(categories.SOCCER_COMPETITION);
  });

  it('should return one of the custom categories for leagues', () => {
    const data2 = {
      sectionType: contentTypes.LEAGUE,
      type: contentTypes.SECTION,
      uri: 'https://uat.tudn.com/futbol/mls',
    };
    expect(categoryTheme(data2, { reqPath: '/deportes/futbol/mls/resultados' })).toBe(categories.SOCCER_COMPETITION_RESULTS);
  });

  it('should return the same category for pages with or without slash', () => {
    data = {
      sectionType: contentTypes.LEAGUE,
      type: contentTypes.SECTION,
      uri: 'https://uat.tudn.com/futbol/uefa-champions-league',
    };
    expect(categoryTheme(data, { reqPath: '/futbol/uefa-champions-league' })).toBe(categories.SOCCER_LEAGUE);
    expect(categoryTheme(data, { reqPath: '/futbol/uefa-champions-league/' })).toBe(categories.SOCCER_LEAGUE);
  });

  it('should load televisa site category', () => {
    data = {
      type: contentTypes.ARTICLE,
      uri: 'https://performance.lasestrellas.tv',
    };
    expect(categoryTheme(data, { reqPath: '/', site: 'lasestrellas' })).toBe('lasestrellas');
  });
});

describe('custom functions', () => {
  it('should return the right category for radio in bex', () => {
    expect(categoryTheme({
      radioStation: {},
    }, { reqPath: '' })).toBe(categories.RADIO);
  });
  it('should return the right category for tv station in bex', () => {
    expect(categoryTheme({
      tvStation: {},
    }, { reqPath: '' })).toBe(categories.TV);
  });
  it('should return the right category', () => {
    expect(categoryTheme({
      type: contentTypes.SOCCER_TEAM,
    }, { reqPath: '/deportes/futbol/america/resultados' })).toBe(categories.SOCCER_TEAM_RESULTS);
  });
  it('should return the right category', () => {
    expect(categoryTheme({
      type: contentTypes.SOCCER_COMPETITION,
    }, { reqPath: '/deportes/futbol/liga-mx-clausura/resultados' })).toBe(categories.SOCCER_COMPETITION_RESULTS);
  });
  it('should return empty if not data provided', () => {
    expect(categoryTheme({}, { reqPath: '/deportes/futbol/liga-mx-clausura/resultados' })).not.toBeDefined();
  });
  it('should return the right category based on type and not path', () => {
    const key = 'soccercompetition';
    expect(categoryTheme({
      type: contentTypes.SOCCER_COMPETITION,
      tracking: {
        tealium: {
          data: {
            all_tags: [key],
          },
        },
      },
    })).toBe(key);
  });
  it('should return the right category for a person page', () => {
    expect(categoryTheme({
      type: contentTypes.PERSON,
      uri: '/temas/jorge-ramos',
    })).toBe(categories.UNIVISION);
  });

  it('should return the Noticias category for a TV content promoted in national context', () => {
    expect(categoryTheme({
      type: contentTypes.ARTICLE,
      vertical: 'Local',
      hierarchy: [{ uri: '/local' }],
    })).toBe(categories.NEWS);
  });

  it('should return the Radio category for a Radio content', () => {
    expect(categoryTheme({
      type: contentTypes.ARTICLE,
      vertical: 'Local',
      hierarchy: [{ uri: '/radio/los-angeles-klve-fm' }],
    })).toBe(categories.RADIO);
  });

  it('should return the Radio category for a Radio section, even if there is no radio data', () => {
    expect(categoryTheme({
      type: 'section',
      vertical: 'Local',
      hierarchy: [{ uri: '/radio/los-angeles-klve-fm' }],
    })).toBe(categories.RADIO);
  });
});

describe('custom temas function', () => {
  it('should return the TEMAS page category when a tag page', () => {
    expect(categoryTheme({
      type: contentTypes.TAG,
      uri: '/temas/delicioso',
    }, {
      site: UNIVISION_SITE,
    })).toBe(categories.TEMAS);
  });
  it('should return Univision page category', () => {
    expect(categoryTheme({
      type: contentTypes.PERSON,
      uri: '/temas/jorge-ramos',
    })).toBe(categories.UNIVISION);
  });

  it('should return Tudn temas page category', () => {
    expect(categoryTheme({
      type: contentTypes.TAG,
      uri: '/deportes/temas/futbol',
    }, {
      site: TUDN_SITE,
    })).toBe(categories.SPORTS_TEMAS);
  });
});
