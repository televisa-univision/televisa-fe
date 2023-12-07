import eln9ve from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';

describe('eln9ve data object', () => {
  it('should return default data', () => {
    const data = eln9ve();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for eln9ve header', () => {
    const data = eln9ve();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/0d/76/7d76020a4ff6949a6fdb2d4a7847/canal9-solid.svg');
  });
  it('should return data for eln9ve header', () => {
    const data = eln9ve(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('elnu9ve');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for eln9ve header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/0d/76/7d76020a4ff6949a6fdb2d4a7847/canal9-solid.svg');
  });
});
