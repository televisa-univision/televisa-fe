import televisa from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';

describe('televisa data object', () => {
  it('should return default data', () => {
    const data = televisa();
    expect(data.title).toBeDefined();
    expect(data.links).not.toBeDefined();
  });
  it('should return data for televisa header', () => {
    const data = televisa();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg');
  });
  it('should return data for televisa header', () => {
    const data = televisa(mocks.home);
    expect(data.globalNavTop).toBe(false);
    expect(data.brandedNavLogoName).toBe('televisa');
  });
  it('should return data for televisa header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/e4/9a/5179580043c2b3fe6183579b7b01/televisa-horizontal-color.svg');
  });
});
