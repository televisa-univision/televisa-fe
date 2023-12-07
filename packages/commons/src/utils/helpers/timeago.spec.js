import timeAgoStringsEs from 'react-timeago/lib/language-strings/es';
import timeAgoStringsEn from 'react-timeago/lib/language-strings/en';
import * as helpers from './timeago';

describe('liveblog helpers', () => {
  it('should return English by default', () => {
    expect(helpers.getTimeAgoStrings()).toEqual(timeAgoStringsEn);
  });
  it('should return English strings', () => {
    expect(helpers.getTimeAgoStrings('en')).toEqual(timeAgoStringsEn);
  });
  it('should return Spanish strings', () => {
    expect(helpers.getTimeAgoStrings('es')).toEqual(timeAgoStringsEs);
  });
  it('should return a formatter', () => {
    expect(typeof helpers.getTimeAgoFormatter('en')).toBe('function');
  });
});
