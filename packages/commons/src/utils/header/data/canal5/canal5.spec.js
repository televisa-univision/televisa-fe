import { canal5 } from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';
import LOGOS from '../../../../constants/televisaSitesData';

describe('canal5 data object', () => {
  it('should return default data', () => {
    const data = canal5();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for canal5 header', () => {
    const data = canal5();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.canal5);
  });
  it('should return data for canal5 header', () => {
    const data = canal5(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('canal5');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for canal5 header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.canal5);
  });
});
