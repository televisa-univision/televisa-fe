import flavorWidgetWrapper from '../flavorWidgetWrapper';

const options = {
  flavor: 'test',
  primary: '#000',
  backgroundImage: {
    mobile: 'test-mobile.png',
    desktop: 'test-desktop.png',
  },
};

/**
 * @test flavorWidgetWrapper
 */
describe('flavorWidgetWrapper test', () => {
  it('should return null by default', () => {
    expect(flavorWidgetWrapper({})).toBe(null);
  });
  it('should the overriden values', () => {
    expect(flavorWidgetWrapper(options)).toEqual(
      expect.any(Array)
    );
  });
  it('should not override background image when invalid object', () => {
    const newOptions = {
      ...options,
      backgroundImage: {},
    };
    expect(flavorWidgetWrapper(newOptions)).toEqual(
      expect.any(Array)
    );
  });
  it('should have padding if required', () => {
    const newOptions = {
      ...options,
      enablePadding: true,
    };
    expect(flavorWidgetWrapper(newOptions)).toEqual(
      expect.any(Array)
    );
  });
  it('should not override desktop background image when not available', () => {
    const newOptions = {
      ...options,
      backgroundImage: {
        mobile: 'test.png',
      },
    };
    expect(flavorWidgetWrapper(newOptions)).toEqual(
      expect.any(Array)
    );
  });
});
