import { css } from 'styled-components';

import truncateGradient from '../truncateGradient';

/**
 * @test {truncateGradient}
 */
describe('truncateGradient mixin test', () => {
  it('should return the expected css rules', () => {
    const expected = css`
      position: relative;
      &::after {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
        bottom: 0;
        content: "";
        left: 0;
        position: absolute;
        right: 0;
        top: 50%;
      }
    `.join('').replace(/\s+/gm, '');
    expect(truncateGradient().join('').replace(/\s+/gm, '')).toEqual(expected);
  });
});
