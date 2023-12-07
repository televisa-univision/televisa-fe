import * as helpers from './helpers';
import mockData from './data/mock.json';
import * as contentTypes from '../../constants/contentTypes';
import * as subNavTypes from '../../constants/subNavTypes';

jest.mock('../brandable');

describe('getHeaderTitle', () => {
  it('should return an undefined value by default', () => {
    expect(helpers.getHeaderTitle()).toBeUndefined();
  });
  it('should return the section title', () => {
    expect(helpers.getHeaderTitle(mockData.univision)).toBe(mockData.univision.title);
  });
  it('should return the parent title', () => {
    expect(helpers.getHeaderTitle(mockData.famososContent))
      .toBe(mockData.famososContent.parent.title);
  });
  it('should fallback to own title when parent is not defined', () => {
    const data = {
      type: 'test',
      title: 'test',
    };
    expect(helpers.getHeaderTitle(data)).toBe(data.title);
  });
});

describe('getHeaderLink', () => {
  it('should return null by default', () => {
    expect(helpers.getHeaderLink()).toBeNull();
  });

  it('should return uri for content without parent/hierarchy', () => {
    expect(helpers.getHeaderLink(mockData.temasPerson)).toBe('/temas/jorge-ramos');
  });

  it('should return the section uri', () => {
    expect(helpers.getHeaderLink(mockData.univision)).toBe(mockData.univision.uri);
  });

  it('should return to the parent URL if this is a section', () => {
    expect(helpers.getHeaderLink(mockData.famososSectionSection))
      .toBe(mockData.famososSectionSection.parent.uri);
    expect(helpers.getHeaderLink(mockData.radioSection))
      .toBe('/radio');
  });

  it('should return the top uri if this is an article', () => {
    expect(helpers.getHeaderLink(mockData.famososContent))
      .toBe(mockData.famososContent.parent.uri);
    expect(helpers.getHeaderLink(mockData.noticiasArticle))
      .toBe('/noticias');
  });

  it('should return the parent uri if the top uri is a root and this is an article', () => {
    expect(helpers.getHeaderLink(mockData.tudnArticle))
      .toBe('/nfl');
  });
});

describe('getSubNavType', () => {
  it('should return CONTENT_SUBNAV by default if the parameter null', () => {
    expect(helpers.getSubNavType(null)).toBe(subNavTypes.CONTENT_SUBNAV);
  });

  it('should return SECTION_CONTENT by default if the parameter undefined', () => {
    expect(helpers.getSubNavType()).toBe(subNavTypes.CONTENT_SUBNAV);
  });

  it('should return SECTION_SUBNAV if the parameter `section', () => {
    expect(helpers.getSubNavType(contentTypes.SECTION)).toBe(subNavTypes.SECTION_SUBNAV);
  });

  it('should return SECTION_CONTENT if the parameter is `content`', () => {
    expect(helpers.getSubNavType('content')).toBe(subNavTypes.CONTENT_SUBNAV);
  });
  it('should return EMPTY_SUBNAV if the parameter is any temas page', () => {
    expect(helpers.getSubNavType(contentTypes.TAG)).toBe(subNavTypes.SECTION_SUBNAV);
  });
});

describe('getActivePath suite', () => {
  it('should return null by default', () => {
    expect(helpers.getActivePath()).toBeNull();
  });
  it('should return null when no uri is available in the tag hierarchy', () => {
    const tagHierarchy = [{
      foo: 'bar',
    }];
    expect(helpers.getActivePath({ tagHierarchy })).toBeNull();
  });
  it('should return the correct path when uri is available in the tag hierarchy', () => {
    const tagHierarchy = [{
      uri: 'http://domain.com/test',
    }];
    expect(helpers.getActivePath({ tagHierarchy })).toBe('http://domain.com/test');
  });
  it('should return page uri if tag hierarchy is not available', () => {
    const tagHierarchy = [];
    const uri = 'http://domain.com/test';
    expect(helpers.getActivePath({ uri, tagHierarchy })).toBe(uri);
  });
});

describe('shouldRenderMvpd suite', () => {
  it('should return false by default', () => {
    expect(helpers.shouldRenderMvpd()).toBe(false);
  });

  it('should return false when type is undefined', () => {
    expect(helpers.shouldRenderMvpd({ foo: 'bar' })).toBe(false);
  });

  it('should return true when the appropiate type is provided', () => {
    expect(helpers.shouldRenderMvpd({ type: 'video' })).toBe(true);
  });
});

describe('getTudnCoverage suite', () => {
  it('should return null if not found coverage', () => {
    expect(helpers.getTudnCoverage()).toBeNull();
  });

  it('should return correct coverage', () => {
    expect(helpers.getTudnCoverage({ coverage: 'Performance' })).toBe('Performance');
  });

  it('should return correct coverage from league object', () => {
    expect(helpers.getTudnCoverage({ league: { coverage: 'Core' } })).toBe('Core');
  });

  it('should return correct coverage from competition season object', () => {
    expect(helpers.getTudnCoverage({
      soccerCompetitionSeason: {
        league: { coverage: 'Core' },
      },
    })).toBe('Core');
  });
});

describe('getBracketsSupport suite', () => {
  it('should return false if not found brackets support', () => {
    expect(helpers.getBracketsSupport()).toBe(false);
  });

  it('should return correct support', () => {
    expect(helpers.getBracketsSupport({
      soccerCompetitionSeason: {
        soccerCompetition: {
          hasBracketsSupport: true,
        },
      },
    })).toBe(true);
  });
});

describe('isVerticalTelevisaByUri suite', () => {
  it('should return false if not found brackets support', () => {
    expect(helpers.isVerticalTelevisaByUri('www.lasestrellas.tv')).toBe(true);
  });
});
