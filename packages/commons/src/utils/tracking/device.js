/**
 * Utility to detect device based on user agent
 */

const device = {
  /**
   * Detect mobile
   * @param {string} userAgent from client
   * @param {string} bpDevice from breakpoint
   * @returns {boolean}
   */
  isMobile(userAgent, bpDevice) {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      && /mobile/i.test(userAgent.toLowerCase())
      && bpDevice === 'mobile'
    );
  },
  /**
   * Detect tablet
   * @param {string} userAgent from client
   * @param {string} bpDevice from breakpoint
   * @returns {boolean}
   */
  isTablet(userAgent, bpDevice) {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      && bpDevice === 'tablet'
    );
  },
  /**
   * Detect desktop
   * @param {string} userAgent from client
   * @param {string} bpDevice from breakpoint
   * @returns {boolean}
   */
  isDesktop(userAgent, bpDevice) {
    return (
      !this.isMobile(userAgent, bpDevice)
      && !this.isTablet(userAgent, bpDevice)
      && bpDevice === 'desktop'
    );
  },
  /**
   * Detect Ios
   * @param {string} userAgent from client
   * @returns {boolean}
   */
  isIos(userAgent) {
    return /iPad|iPhone|iPod/.test(userAgent);
  },
  /**
   * Detect android
   * @param {string} userAgent from client
   * @returns {boolean}
   */
  isAndroid(userAgent) {
    return /android/.test(userAgent.toLowerCase());
  },
  /**
   * Detect Safari
   * @param {string} userAgent from client
   * @returns {boolean}
   */
  isSafari(userAgent) {
    return /^((?!chrome|crios|fxios).)*safari/i.test(userAgent);
  },
};

export default device;
