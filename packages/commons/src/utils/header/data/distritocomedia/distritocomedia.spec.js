import { distritocomedia } from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';
import LOGOS from '../../../../constants/televisaSitesData';

describe('distritocomedia data object', () => {
  it('should return default data', () => {
    const data = distritocomedia();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for distritocomedia header', () => {
    const data = distritocomedia();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.distritocomedia);
  });
  it('should return data for distritocomedia header', () => {
    const data = distritocomedia(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('distritocomedia');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for distritocomedia header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.distritocomedia);
  });
});
