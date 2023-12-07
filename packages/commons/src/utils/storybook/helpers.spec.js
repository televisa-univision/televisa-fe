import {
  getDevice, isMobile, isTablet, isDesktop
} from '.';

/**
 * Mocks the user agent
 * @param {string} userAgent - user agent to mock
 */
const mockUserAgent = (userAgent) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: userAgent,
    writable: true,
    configurable: true
  });
};

describe('Storybook helpers', () => {
  it('should return true if the device is mobile', () => {
    global.window.innerWidth = 400;
    mockUserAgent('android');
    expect(isMobile()).toBeTruthy();
  });

  it('should return true if the device is tablet', () => {
    global.window.innerWidth = 1024;
    mockUserAgent('android');
    expect(isTablet()).toBeTruthy();
  });

  it('should return true if the device is desktop', () => {
    global.window.innerWidth = 1024;
    mockUserAgent('windows');
    expect(isDesktop()).toBeTruthy();
  });

  it('should use the default value set to iPhone when the user agent is missing', () => {
    global.window.innerWidth = 400;
    mockUserAgent(undefined);
    expect(isMobile()).toBeTruthy();
  });

  it('should use the default width if the window.innerWidth is missing', () => {
    global.window.innerWidth = undefined;
    global.window.innerHeight = undefined;
    mockUserAgent(undefined);
    expect(isMobile()).toBeTruthy();
  });

  it('should returns desktop if userAgent is missing', () => {
    global.window.innerWidth = undefined;
    global.window.innerHeight = undefined;
    mockUserAgent(null);
    expect(isDesktop()).toBeTruthy();
  });

  it('should returns mobile from getDevice', () => {
    mockUserAgent('iPhone');
    expect(getDevice()).toEqual('mobile');
  });

  it('should returns desktop from getDevice', () => {
    mockUserAgent('mac');
    expect(getDevice()).toEqual('desktop');
  });
});
