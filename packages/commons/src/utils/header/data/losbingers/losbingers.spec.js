import losbingers from '.';
import mocks from './__mocks__/data.json';
import generic from './generic';

describe('losbingers data object', () => {
  it('should return default data', () => {
    const data = losbingers();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for losbingers header', () => {
    const data = losbingers();
    expect(data).toBeDefined();
  });
  it('should return data for losbingers header', () => {
    const data = losbingers(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('losbingers');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for generic header', () => {
    const data = generic();
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('losbingers');
    expect(data.brandedNavLogoUri).toBe('/');
  });
});
