/**
 * @module helpers/url/isWhatsappUrl
 */

/**
 * Check if this is a whatsapp url
 * @param {string} href the original href prop
 * @returns {boolean}
 */
function isWhatsappUrl(href) {
  return /^(whatsapp):.+/.test(href);
}

export default isWhatsappUrl;
