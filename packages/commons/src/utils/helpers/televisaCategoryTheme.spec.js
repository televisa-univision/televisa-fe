import getTelevisaCategory from './televisaCategoryTheme';

describe('getTelevisaCategory', () => {
  it('should return the correct category for a given path', () => {
    const data = {
      uri: 'https://performance.lasestrellas.tv',
    };
    const site = 'lasestrellas';
    const path = '/';
    const actual = getTelevisaCategory(data, site, path);
    const expected = 'lasestrellas';
    expect(actual).toEqual(expected);
  });

  it('should return default category when no match is found', () => {
    const data = {
      uri: 'https://performance.canaldemo.com',
    };
    const site = 'canaldemo';
    const path = '/no-match';
    const actual = getTelevisaCategory(data, site, path);
    const expected = 'canaldemo';
    expect(actual).toEqual(expected);
  });

  it('should set default category when no verticals are defined', () => {
    const data = {
      uri: 'https://performance.elnu9ve.televisa.com',
    };
    const site = 'elnu9ve';
    const path = '/no-match';
    const actual = getTelevisaCategory(data, site, path);
    const expected = 'elnu9ve';
    expect(actual).toEqual(expected);
  });
});
