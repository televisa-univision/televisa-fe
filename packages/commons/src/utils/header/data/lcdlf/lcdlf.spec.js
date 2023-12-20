import lcdlf from '.';
import mocks from './__mocks__/data.json';
import generic from './generic';

describe('lacasadelosfamosos data object', () => {
  it('should return default data', () => {
    const data = lcdlf();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for lcdlf header', () => {
    const data = lcdlf();
    expect(data).toBeDefined();
  });
  it('should return data for lcdlf header', () => {
    const data = lcdlf(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('lcdlf');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for generic header', () => {
    const data = generic();
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('lcdlf');
    expect(data.brandedNavLogoUri).toBe('/');
  });
});
