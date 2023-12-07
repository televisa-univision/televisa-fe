import Matcher from './Matcher';
import { matchIncludesPath } from '.';

describe('Matcher', () => {
  it('should set the type and function', () => {
    const matcher = new Matcher('test', jest.fn);
    expect(matcher.type).toBe('test');
    expect(matcher.func).toBe(jest.fn);
  });
  it('should return the function value', () => {
    const matcher = new Matcher('test', () => true);
    expect(matcher.match(null)).toBe(true);
  });
  it('should return false if there is not a valid function', () => {
    const matcher = new Matcher('test', null);
    expect(matcher.match(null)).toBe(false);
  });

  it('should return true if the path is included', () => {
    const matcher = matchIncludesPath('/some-test-path');
    const data = {
      uri: null,
    };
    const path = '/some-test-path';
    const site = 'lasestrellas';
    expect(matcher.match({ data, path, site })).toBe(false);

    const data2 = {
      uri: 'https://performance.lasestrellas.tv/some-test-path',
    };
    expect(matcher.match({ data: data2, path, site })).toBe(true);

    const data3 = {
      uri: null,
    };
    expect(matcher.match({ data: data3, path, site })).toBe(false);
  });
});
