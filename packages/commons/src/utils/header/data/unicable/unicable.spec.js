import { unicable } from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';
import LOGOS from '../../../../constants/televisaSitesData';

describe('unicable data object', () => {
  it('should return default data', () => {
    const data = unicable();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for unicable header', () => {
    const data = unicable();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.unicable);
  });
  it('should return data for unicable header', () => {
    const data = unicable(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('unicable');
    expect(data.brandedNavLogoUri).toBe('/');
  });
  it('should return data for unicable header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual(LOGOS.unicable);
  });
});
