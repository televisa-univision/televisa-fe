import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import getLogos from './logos';

describe('getLogos', () => {
  it('should return a valid logo for each page category', () => {
    Object.values(categories)
      .forEach(category => expect(getLogos({}, category).src).toBeDefined());
  });

  it('should use default logo for unknown category', () => {
    expect(getLogos({}, '').url).toBe('/');
  });

  it('should return logo with bex', () => {
    const pageData = {
      hierarchy: [
        {
          uri: 'noticias',
        },
      ],
    };
    expect(getLogos(pageData, 'NEW_CATEGORY').url).toBe('/noticias');
  });

  it('should return default logo with bex', () => {
    const pageData = {
      hierarchy: [
        {
          uri: 'fake',
        },
      ],
    };
    expect(getLogos(pageData, 'NEW_CATEGORY').url).toBe('/');
  });
});
