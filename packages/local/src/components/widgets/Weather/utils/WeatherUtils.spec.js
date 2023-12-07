import {
  getLocalMarketFromUri,
  getWeatherImageAlt,
  getWeatherImageUrl,
} from '.';

describe('getLocalMarketFromUri()', () => {
  it('should return a proper `call` and `city`', () => {
    const uri = '/san-francisco/kdtv';
    const result = { city: 'AreadelaBahia', call: 'KDTV' };
    expect(getLocalMarketFromUri(uri)).toEqual(result);
  });

  it('should return a proper `call` and `city` with no leading `/` in uri', () => {
    const uri = 'san-francisco/kdtv';
    const result = { city: 'AreadelaBahia', call: 'KDTV' };
    expect(getLocalMarketFromUri(uri)).toEqual(result);
  });

  it('should render if call is listed in the exceptions list', () => {
    const uri = '/atlanta/wuvg';
    const result = { city: 'Atlanta', call: 'WUGV' };
    expect(getLocalMarketFromUri(uri)).toEqual(result);
  });
});

describe('getWeatherImageAlt()', () => {
  it('should return valid alt text', () => {
    const uri = '/miami/wltv';
    const option = { alt: 'This is alt text from' };
    const result = 'This is alt text from Miami';
    expect(getWeatherImageAlt(uri, option)).toEqual(result);
  });

  it('should return valid alt text w/ spaced & translated city text', () => {
    const uri = '/san-francisco/kdtv';
    const option = { alt: 'This is alt text from' };
    const result = 'This is alt text from Areadela Bahia';
    expect(getWeatherImageAlt(uri, option)).toEqual(result);
  });
});

describe('getWeatherImageUrl()', () => {
  it('should return a valid image url', () => {
    const uri = '/san-francisco/kdtv';
    const timestamp = '5000';
    const type = 'widget';
    const option = { format: 'gif', name: 'option' };
    const result = 'http://cdn1.uvnimg.com/weather-widget/option_AreadelaBahia_KDTV.gif?ts=5000';
    expect(getWeatherImageUrl(uri, type, option, timestamp)).toEqual(result);
  });

  it('should return a valid image url for tropical conditions widget', () => {
    const uri = '/san-francisco/kdtv';
    const timestamp = '5000';
    const type = 'noticiascardtropicalweatherconditions';
    const option = { name: 'option' };
    const result = 'http://cdn1.uvnimg.com/weather-widget/option_TROPICAL.jpg?ts=5000';
    expect(getWeatherImageUrl(uri, type, option, timestamp)).toEqual(result);
  });
});
