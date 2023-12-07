/**
 * @module helpers/string/isValidEmail
*/
/**
 * Validates if provided string has a valid email format
 * @param {any} email - value that needs to be validated
 * @returns {boolean}
*/
export default function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
