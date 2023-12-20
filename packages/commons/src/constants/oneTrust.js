/**
 * Represent the type of the scripts which OneTrust
 * turns into text/javascript if the user chooses to enable the targeted cookie.
 * @type {string}
 */
export const SCRIPT_PLAIN_TYPE = 'text/plain';

/**
 * Represent OneTrust Category for Stricly Necessary Cookies
 * as the ones to provide the service, application, and other essential
 * functionalities of our website.
 * @type {string}
 */
export const STRICTLY_NECESSARY_COOKIES = 'optanon-category-C0001';

/**
 * Represent OneTrust Category for Performance Cookies
 * as the ones to provide quantitative measurement of our
 * website and its resources used for purposes like troubleshooting and analytics.
 * @type {string}
 */
export const PERFORMANCE_COOKIES = 'optanon-category-C0002';

/**
 * Represent OneTrust Category for Functional Cookies
 * as the ones to provide enhanced performance for some website resources
 * and services as well as sometimes to adopt a higher level of personalisation on user experience.
 * @type {string}
 */
export const FUNCTIONAL_COOKIES = 'optanon-category-C0003';

/**
 * Represent OneTrust Category for Targeting Cookies
 * as the ones to provide behavioral advertising and re-marketing of analytical data
 * @type {string}
 */
export const TARGETING_COOKIES = 'optanon-category-C0004';

/**
 * Represent OneTrust Category for Social Media Cookies
 * @type {string}
 */
export const SOCIAL_MEDIA_COOKIES = 'optanon-category-C0005';

/**
 * Represent OneTrust Category for Targeting & Performance Cookies
 * For the scripts that load both types
 * @type {string}
 */
export const PERFORMANCE_TARGETING_COOKIES = 'optanon-category-C0002-C0004';

/**
 * Represent OneTrust data domains id for the different domains
 * @type {Object}
 */
export const DATA_DOMAIN_SCRIPT = {
  univision: 'e7c2a27b-9c00-4eb3-adce-e9d5fa69f48f',
  tudn: '5776a7bb-2c58-441f-9b9a-2eb23c773f79',
  mulher: '30f3e964-6097-4ed8-b5b4-b5fbdbf4de8f',
  delicioso: 'ddcbed36-5ab1-4d9c-a019-9fdd95dc3e31',
  zappeando: 'cec040a5-98d3-4984-9e76-c1a7c326b406',
  tasaudavel: 'c6f19fbc-c077-4c0a-9847-fd6c7d2ced69',
};

/**
 * Represent OneTrust script
 * @type {string}
 */
export const ONETRUST_SCRIPT = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';

/**
 * Represent OneTrust OptanonConsent Cookie which has the groups activated
 * @type {string}
 */
export const ONETRUST_COOKIE = 'OptanonConsent';
