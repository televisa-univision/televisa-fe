import lasestrellas from '.';
import mocks from './__mocks__/data.json';
import generic from './generic';

describe('lasestrellas data object', () => {
  it('should return default data', () => {
    const data = lasestrellas();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for lasestrellas header', () => {
    const data = lasestrellas();
    expect(data).toBeDefined();
  });
  it('should return data for lasestrellas header', () => {
    const data = lasestrellas(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('lasestrellas');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for generic header', () => {
    const data = generic();
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('lasestrellas');
    expect(data.brandedNavLogoUri).toBe('/');
  });
});
