export const types = {
  PORTAL_THEME: 'Match operation using the portal theme',
  TAG_HIERARCHY: 'Match operation using the tag hierarchy',
  PAGE_URI: 'Match operation using the page uri',
  CUSTOM: 'Match operation using a custom logic',
};

/**
 * Performs a match operation.
 */
export default class Matcher {
  /**
   * Constructor
   * @param {string} type Matcher type
   * @param {function} func Matcher function
   */
  constructor(type, func) {
    this.type = type;
    this.func = func;
  }

  /**
   * Executes the this.func function
   * @param {Object} args Arguments
   * @returns {*}
   */
  match(args) {
    if (typeof this.func === 'function') {
      return this.func(args);
    }
    return false;
  }
}
