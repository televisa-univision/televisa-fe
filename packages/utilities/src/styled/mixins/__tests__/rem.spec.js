import rem from '../rem';

/**
 * @test {rem}
 */
describe('rem mixin test', () => {
  it('should return 0rem by default', () => {
    expect(rem()).toBe('0rem');
  });

  it('should reset to 16px with 0 base', () => {
    expect(rem(16, 0)).toBe('1rem');
  });

  it('should return the proper rem value', () => {
    expect(rem(10, 25)).toBe('0.4rem');
  });

  it('should take negative numbers', () => {
    expect(rem(-16)).toBe('-1rem');
  });

  it('should remove units', () => {
    expect(rem('-16px')).toBe('-1rem');
  });
});
