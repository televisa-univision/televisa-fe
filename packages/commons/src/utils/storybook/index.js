/**
 * Returns the users device
 * @param {bool} [checkUserAgent = true] - true to check user agent for mobile device
 * @returns {string}
 */
export function getDevice(checkUserAgent = true) {
  const { userAgent = 'iPhone' } = window.navigator;

  if ((userAgent && userAgent.match(/iPhone|iPad|Android/i)) || !checkUserAgent) {
    const { innerWidth = 600, innerHeight = 600 } = window;
    return (innerWidth >= 1024 || innerHeight >= 1024) ? 'tablet' : 'mobile';
  }

  return 'desktop';
}

/**
 * Returns true if the device is mobile
 * @returns {boolean}
 */
export function isMobile() {
  return getDevice() === 'mobile';
}

/**
 * Returns true if the device is tablet
 * @returns {boolean}
 */
export function isTablet() {
  return getDevice() === 'tablet';
}

/**
 * Returns true if the device is desktop
 * @returns {boolean}
 */
export function isDesktop() {
  return getDevice() === 'desktop';
}
