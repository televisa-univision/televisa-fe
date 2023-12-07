import getDeviceForRequest from './deviceDetector';
import * as devices from '../../constants/devices';

const userAgentMobileIos = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
const userAgentMobileAndroid = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36';
const userAgentIpad = 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
const userAgentDesktop = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36';

describe('getDeviceForRequest', () => {
  const request = {
    headers: {},
  };
  beforeEach(() => {
    request.headers = {};
  });

  it('should return null for an invalid request', () => {
    expect(getDeviceForRequest(null)).toBe(null);
  });

  describe('X_UA_DEVICE header', () => {
    it('should return "desktop" using the X_UA_DEVICE header', () => {
      request.headers['x-ua-device'] = 'pc';
      expect(getDeviceForRequest(request)).toBe('desktop');

      request.headers['x-ua-device'] = 'bot';
      expect(getDeviceForRequest(request)).toBe('desktop');

      request.headers['x-ua-device'] = 'IE8';
      expect(getDeviceForRequest(request)).toBe('desktop');
    });

    it('should return "mobile" using the X_UA_DEVICE header', () => {
      request.headers['x-ua-device'] = 'mobile-iphone';
      expect(getDeviceForRequest(request)).toBe('mobile');

      request.headers['x-ua-device'] = 'mobile-android';
      expect(getDeviceForRequest(request)).toBe('mobile');

      request.headers['x-ua-device'] = 'mobile-generic';
      expect(getDeviceForRequest(request)).toBe('mobile');
    });

    it('should return "tablet" using the X_UA_DEVICE header', () => {
      request.headers['x-ua-device'] = 'tablet-android';
      expect(getDeviceForRequest(request)).toBe('tablet');

      request.headers['x-ua-device'] = 'tablet-ipad';
      expect(getDeviceForRequest(request)).toBe('tablet');
    });
  });

  describe('User-Agent (device module)', () => {
    it('should return "desktop" using the User Agent', () => {
      request.headers['user-agent'] = userAgentDesktop;
      expect(getDeviceForRequest(request)).toBe('desktop');
    });

    it('should return "mobile" using the User Agent', () => {
      request.headers['user-agent'] = userAgentMobileAndroid;
      expect(getDeviceForRequest(request)).toBe('mobile');

      request.headers['user-agent'] = userAgentMobileIos;
      expect(getDeviceForRequest(request)).toBe('mobile');
    });

    it('should return "tablet" using the User Agent', () => {
      request.headers['user-agent'] = userAgentIpad;
      expect(getDeviceForRequest(request)).toBe('tablet');
    });
  });

  describe('Cloudfront header', () => {
    it('should return "desktop" when the desktop viewer is true', () => {
      request.headers['user-agent'] = devices.UA_AMAZON_CLOUDFRONT;
      request.headers['cloudfront-is-desktop-viewer'] = 'true';
      expect(getDeviceForRequest(request)).toBe('desktop');
    });
    it('should return "tablet" when the tablet viewer is true', () => {
      request.headers['user-agent'] = devices.UA_AMAZON_CLOUDFRONT;
      request.headers['cloudfront-is-tablet-viewer'] = 'true';
      expect(getDeviceForRequest(request)).toBe('tablet');
    });
    it('should return "mobile" when the mobile viewer is true', () => {
      request.headers['user-agent'] = devices.UA_AMAZON_CLOUDFRONT;
      request.headers['cloudfront-is-mobile-viewer'] = 'true';
      expect(getDeviceForRequest(request)).toBe('mobile');
    });
    it('should return "desktop" when the viewer is not indicated', () => {
      request.headers['user-agent'] = devices.UA_AMAZON_CLOUDFRONT;
      expect(getDeviceForRequest(request)).toBe('desktop');
    });
  });
});
