import device from './device';

const userAgentMobileIos = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
const userAgentMobileAndroid = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36';
const userAgentIpad = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
const userAgentDesktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';
const userAgentSafari = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15';
const userAgentChrome = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/85.0.4183.92 Mobile/15E148 Safari/604.1';

/** @test {device detection} */
describe('isMobile', () => {
  it('should return true if mobile', () => {
    expect(device.isMobile(userAgentMobileIos, 'mobile')).toBe(true);
  });
  it('should return false if desktop user agent', () => {
    expect(device.isMobile(userAgentDesktop, 'mobile')).toBe(false);
  });
  it('should return false if desktop from breakpoint', () => {
    expect(device.isMobile(userAgentMobileIos, 'desktop')).toBe(false);
  });
});

describe('isTablet', () => {
  it('should return true if ipad', () => {
    expect(device.isTablet(userAgentIpad, 'tablet')).toBe(true);
  });
  it('should return false if desktop from use agent', () => {
    expect(device.isTablet(userAgentDesktop, 'tablet')).toBe(false);
  });
  it('should return false if desktop from breakpoint', () => {
    expect(device.isTablet(userAgentIpad, 'desktop')).toBe(false);
  });
});

describe('isDesktop', () => {
  it('should return true if desktop', () => {
    expect(device.isDesktop(userAgentDesktop, 'desktop')).toBe(true);
  });
  it('should return false if mobile from user agent', () => {
    expect(device.isDesktop(userAgentMobileIos, 'tablet')).toBe(false);
  });
  it('should return false if mobile from breakpoint', () => {
    expect(device.isDesktop(userAgentDesktop, 'mobile')).toBe(false);
  });
});

describe('isIos', () => {
  it('should return true if isIos', () => {
    expect(device.isIos(userAgentMobileIos)).toBe(true);
  });
  it('should return false if android', () => {
    expect(device.isIos(userAgentMobileAndroid)).toBe(false);
  });
});

describe('isAndroid', () => {
  it('should return true if isAndroid', () => {
    expect(device.isAndroid(userAgentMobileAndroid)).toBe(true);
  });
  it('should return false if isIos', () => {
    expect(device.isAndroid(userAgentMobileIos)).toBe(false);
  });
});

describe('isSafari', () => {
  it('should return true when browser is safari', () => {
    expect(device.isSafari(userAgentSafari)).toEqual(true);
  });
  it('should return false when its not', () => {
    expect(device.isSafari(userAgentChrome)).toEqual(false);
  });
});
