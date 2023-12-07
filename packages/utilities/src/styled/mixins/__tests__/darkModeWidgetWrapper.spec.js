import darkModeWidgetWrapper from '../darkModeWidgetWrapper';

/**
 * @test darkModeWidgetWrapper
 */
describe('darkModeWidgetWrapper test', () => {
  it('should return null by default', () => {
    expect(darkModeWidgetWrapper({})).toBe(null);
  });
  it('should return a string when flag is enabled', () => {
    expect(darkModeWidgetWrapper({ isDark: true })).toEqual(
      expect.any(String)
    );
  });
});
