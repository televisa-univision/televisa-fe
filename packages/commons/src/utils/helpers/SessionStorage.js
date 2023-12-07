let fallbackStorage = {};
let available;
/**
 * Wrapper for the sessionStorage.
 * Adds support for JSON objects and uses a fallback when sessionStorage is not available.
 */
const SessionStorage = {
  /**
   * Gets the fallback object
   * @returns {Object} Object to uses as fallback for sessionStorage
   */
  getFallback() {
    return fallbackStorage;
  },
  /**
   * Detects whether sessionStorage is supported and available
   * @returns {bool}
   */
  sessionAvailable() {
    if (typeof available === 'undefined') {
      try {
        const x = '__storage_test__';
        sessionStorage.setItem(x, x);
        sessionStorage.removeItem(x);
        available = true;
      } catch (e) {
        available = false;
      }
    }
    return available;
  },
  /**
   * Retrieves an item from the sessionStorage
   * @param {string} key Item to get
   * @returns {string}
   */
  get(key) {
    if (this.sessionAvailable()) {
      return sessionStorage.getItem(key);
    }
    return this.getFallback()[key];
  },
  /**
   * Stores an item in the sessionStorage
   * @param {string} key Item key
   * @param {string} value Item value
   * @returns {boolean}
   */
  set(key, value) {
    if (this.sessionAvailable()) {
      try {
        sessionStorage.setItem(key, value);
        return true;
      } catch (e) {
        return false;
      }
    }
    this.getFallback()[key] = value;
    return true;
  },
  /**
   * Removes an item from the sessionStorage
   * @param {sting} key Item key to remove
   */
  remove(key) {
    if (this.sessionAvailable()) {
      sessionStorage.removeItem(key);
    } else {
      delete fallbackStorage[key];
    }
  },
  /**
   * Retrieves an Object from the sessionStorage
   * @param {string} key Item to get
   * @returns {Object}
   */
  getObject(key) {
    try {
      return JSON.parse(this.get(key));
    } catch (e) {
      return undefined;
    }
  },
  /**
   * Stores an Object in the sessionStorage
   * @param {string} key Item key
   * @param {Object} value Item value
   * @returns {boolean}
   */
  setObject(key, value) {
    return this.set(key, JSON.stringify(value));
  },

  clear() {
    fallbackStorage = {};
    if (this.sessionAvailable()) {
      sessionStorage.clear();
    }
  },
};

export default SessionStorage;
