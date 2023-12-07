import * as mixins from '.';
import { APP_BREAKPOINTS } from '../constants';

describe('media helper', () => {
  it('should parse the correct css', () => {
    const css = 'color: #fff';
    const md = mixins.media.md`${css}`;
    const lg = mixins.media.lg`${css}`;

    expect(md.includes(APP_BREAKPOINTS.md.toString())).toBe(true);
    expect(md.includes(css)).toBe(true);

    expect(lg.includes(APP_BREAKPOINTS.lg.toString())).toBe(true);
    expect(lg.includes(css)).toBe(true);
  });
});

describe('mediaRage helper', () => {
  it('should return the correct media query when using breakpoint names', () => {
    const css = 'color: #fff';
    const min = APP_BREAKPOINTS.xs;
    const max = APP_BREAKPOINTS.xl;

    expect(mixins.mediaRange(min, max, css))
      .toBe(`@media only screen and (max-width: 1440px) and (min-width: 480px) {${css}}`);
  });
  it('should return the correct media query when using breakpoint numbers', () => {
    const css = 'color: #fff';
    const min = 150;
    const max = 225;

    expect(mixins.mediaRange(min, max, css))
      .toBe(`@media only screen and (max-width: 225px) and (min-width: 150px) {${css}}`);
  });
  it('should return an empty string if ranges are invalid', () => {
    const css = 'color: #fff';
    const min = 'test';
    const max = -100;

    expect(mixins.mediaRange(min, max, css)).toBe('');
  });
});

describe('rem helper', () => {
  it('should return 0rem by default', () => {
    expect(mixins.rem()).toBe('0rem');
  });
  it('should reset to 16px with 0 base', () => {
    expect(mixins.rem(16, 0)).toBe('1rem');
  });
  it('should return the proper rem value', () => {
    expect(mixins.rem(10, 25)).toBe('0.4rem');
  });
  it('should take negative numbers', () => {
    expect(mixins.rem(-16)).toBe('-1rem');
  });
  it('should remove units', () => {
    expect(mixins.rem('-16px')).toBe('-1rem');
  });
});

describe('getHorizontalThemeGradient', () => {
  it('should return the expected css rule', () => {
    expect(mixins.getHorizontalThemeGradient({ end: '#000', start: '#000' }))
      .toBe('linear-gradient(229deg, #000 0%, #000 100%)');
  });
});

describe('numberOfLines helper', () => {
  it('should return css styles with ellipsis', () => {
    expect(mixins.numberOfLines(2)).toBe(`
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
  `);
  });
});
