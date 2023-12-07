import { telehit } from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';
import LOGOS from '../../../../constants/televisaSitesData';

describe('telehit data object', () => {
  it('should return default data', () => {
    const data = telehit();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for telehit header', () => {
    const data = telehit();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.telehit);
  });
  it('should return data for telehit header', () => {
    const data = telehit(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('telehit');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for telehit header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.telehit);
  });
});
