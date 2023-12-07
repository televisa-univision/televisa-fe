/**
 * Represents a phone
 * @type {string}
 */
export const MOBILE = 'mobile';
/**
 * Represents a tablet
 * @type {string}
 */
export const TABLET = 'tablet';
/**
 * Represents a pc/laptop
 * @type {string}
 */
export const DESKTOP = 'desktop';

/**
 * Devices used for X-UA-DEVICE
 * @type {Object}
 */
export const X_UA_DEVICE = {
  [MOBILE]: [
    'mobile-iphone',
    'mobile-iphone-safari',
    'mobile-android',
    'mobile-firefoxos',
    'mobile-smartphone',
    'mobile-generic',
  ],

  [TABLET]: [
    'tablet-ipad',
    'tablet-android',
    'tablet-ipad-safari',
  ],

  [DESKTOP]: [
    'pc',
    'bot',
    'IE8',
  ],
};

/**
 * Represent if the user-agent is set by Amazon Cloudfront
 */
export const UA_AMAZON_CLOUDFRONT = 'Amazon CloudFront';
