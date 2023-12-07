import { bandamax } from '.';
import generic from './generic';
import mocks from './__mocks__/data.json';

describe('bandamax data object', () => {
  it('should return default data', () => {
    const data = bandamax();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should return data for canal5 header', () => {
    const data = bandamax();
    expect(data.title).toBeDefined();
  });

  it('should return data for bandamax header', () => {
    const data = bandamax(mocks.home);
    expect(data.globalNavTop).toBe(true);
    expect(data.brandedNavLogoName).toBe('bandamax');
    expect(data.brandedNavLogoUri).toBe('/');
  });

  it('should return data for bandamax header', () => {
    const data = generic();
    expect(data.title).toBeDefined();
  });
});
