/**
 * Helper to get app version
 * Todo: Remove after full migration
 * @returns {boolean}
 */
export default function isNextjsVersion() {
  return process.env.APP_VERSION === '2';
}
