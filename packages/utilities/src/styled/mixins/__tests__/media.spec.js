import { APP_BREAKPOINTS } from '../../constants';
import media from '../media';

/**
 * @test {media}
 */
describe('media mixin test', () => {
  it('should parse the correct css', () => {
    const css = 'color: #fff';
    const md = media.md`${css}`;
    const lg = media.lg`${css}`;

    expect(md.includes(APP_BREAKPOINTS.md.toString())).toBe(true);
    expect(md.includes(css)).toBe(true);

    expect(lg.includes(APP_BREAKPOINTS.lg.toString())).toBe(true);
    expect(lg.includes(css)).toBe(true);
  });

  it('should have list of available breakpoints', () => {
    expect(media).toHaveProperty('breakpoints', Object.keys(APP_BREAKPOINTS));
  });
});
