import getTheme, { getThemeGradients, getThemeFromVertical } from './helpers';
import * as pageCategories from '../../constants/pageCategories';

jest.mock('../../themes/famosos', () => (1));

describe('getThemeGradients', () => {
  it('should return empty object by default', () => {
    expect(getThemeGradients()).toEqual({});
  });

  it('should return gradients', () => {
    const gradients = getThemeGradients({
      primary: '#343434',
      secondary: '#ffffff',
    });

    expect(gradients).toEqual({
      alphaGradient: 'linear-gradient(to top, rgba(52, 52, 52, 0.95) 0%, rgba(52, 52, 52, 0) 50%)',
      solidGradient: 'linear-gradient(to bottom, #343434 0%, #ffffff 100%)',
      horizontalGradient: 'linear-gradient(to right, #343434 0%, #ffffff 100%)',
      horizontalLeftGradient: 'linear-gradient(to left, #343434 0%, #ffffff 100%)',
    });
  });
  it('should extend short form color', () => {
    const gradients = getThemeGradients({
      primary: '#444',
      secondary: '#ffffff',
    });

    expect(gradients).toEqual({
      alphaGradient: 'linear-gradient(to top, rgba(68, 68, 68, 0.95) 0%, rgba(68, 68, 68, 0) 50%)',
      solidGradient: 'linear-gradient(to bottom, #444 0%, #ffffff 100%)',
      horizontalGradient: 'linear-gradient(to right, #444 0%, #ffffff 100%)',
      horizontalLeftGradient: 'linear-gradient(to left, #444 0%, #ffffff 100%)',
    });
  });
  it('should fallback to black rgb gradient when primary color is not valid', () => {
    const gradients = getThemeGradients({
      primary: '#3030',
      secondary: '#ffffff',
    });
    expect(gradients).toEqual({
      alphaGradient: 'linear-gradient(to top, rgba(0,0,0, 0.95) 0%, rgba(0,0,0, 0) 50%)',
      solidGradient: 'linear-gradient(to bottom, #3030 0%, #ffffff 100%)',
      horizontalGradient: 'linear-gradient(to right, #3030 0%, #ffffff 100%)',
      horizontalLeftGradient: 'linear-gradient(to left, #3030 0%, #ffffff 100%)',
    });
  });
});

describe('getTheme suite', () => {
  it('should return the univision theme by default', () => {
    const theme = getTheme();
    expect(theme).toBeDefined();
    expect(theme).toEqual(expect.any(Object));
  });

  it('should return the univision theme when a pageCategory is not defined', () => {
    const theme = getTheme('test');
    expect(theme).toBeDefined();
    expect(theme).toEqual(expect.any(Object));
  });

  it('should return the noticias theme', () => {
    const theme = getTheme(pageCategories.NEWS);
    expect(theme).toBeDefined();
    expect(theme).toEqual(expect.any(Object));
  });

  it('should return a null value when a pageCategory is not a function', () => {
    const theme = getTheme(pageCategories.FAMOSOS);
    expect(theme).toBeNull();
  });
});

describe('getThemeFromVertical', () => {
  it('should return empty object by default', () => {
    const theme = getThemeFromVertical();
    expect(theme).toEqual({});
  });

  it('should return deportes theme when path comes from tudn', () => {
    const theme = getThemeFromVertical('http://tudn.com/futbol');
    expect(theme).toBeDefined();
    expect(theme).toEqual(expect.any(Object));
  });

  it('should return a theme when a valid vertical is provided', () => {
    const theme = getThemeFromVertical('http://univision.com/noticias');
    expect(theme).toBeDefined();
    expect(theme).toEqual(expect.any(Object));
  });

  it('should return an empty object when an invalid vertical is provided', () => {
    const theme = getThemeFromVertical('/test');
    expect(theme).toBeDefined();
    expect(theme).toEqual({});
  });
});
