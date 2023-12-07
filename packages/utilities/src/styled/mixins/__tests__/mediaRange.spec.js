import { APP_BREAKPOINTS } from '../../constants';
import mediaRange from '../mediaRange';

/**
 * @test {mediaRange}
 */
describe('mediaRage test', () => {
  it('should return the correct media query when using breakpoint names', () => {
    const css = 'color: #fff';
    const min = APP_BREAKPOINTS.xs;
    const max = APP_BREAKPOINTS.xl;

    expect(mediaRange(min, max, css))
      .toBe(`@media only screen and (max-width: 1440px) and (min-width: 480px) {${css}}`);
  });
  it('should return the correct media query when using breakpoint numbers', () => {
    const css = 'color: #fff';
    const min = 150;
    const max = 225;

    expect(mediaRange(min, max, css))
      .toBe(`@media only screen and (max-width: 225px) and (min-width: 150px) {${css}}`);
  });
  it('should return an empty string if ranges are invalid', () => {
    const css = 'color: #fff';
    const min = 'test';
    const max = -100;

    expect(mediaRange(min, max, css)).toBe('');
  });
});
