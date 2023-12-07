/**
 * Constants used to store user credentials in the local storage
 * This constants live here to avoid the increase in size of the bundle
 * that use this constants
 */
export const SSO_ACP_STORAGE_KEYS = Object.freeze({
  ACCESS_TOKEN: 'userSessionAccessToken',
  REFRESH_TOKEN: 'userSessionRefreshToken',
  ID_TOKEN: 'userSessionIdToken',
  AUTH_CODE: 'userSessionAuthCode',
});

export default SSO_ACP_STORAGE_KEYS;
