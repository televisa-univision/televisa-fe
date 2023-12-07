let fallbackStorage = {};
/**
 * Wrapper for the localStorage.
 * Adds support for JSON objects and uses a fallback when localStorage is not available.
 */
const LocalStorage = {
  /**
   * Gets the fallback object
   * @returns {Object} Object to uses as fallback for localStorage
   */
  getFallback() {
    return fallbackStorage;
  },
  /**
   * Retrieves an item from the localStorage
   * @param {string} key Item to get
   * @returns {string}
   */
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return this.getFallback()[key];
    }
  },
  /**
   * Stores an item in the localStorage
   * @param {string} key Item key
   * @param {string} value Item value
   */
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      this.getFallback()[key] = value;
    }
  },
  /**
   * Removes an item from the localStorage
   * @param {sting} key Item key to remove
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete fallbackStorage[key];
    }
  },
  /**
   * Retrieves an Object from the localStorage
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
   * Stores an Object in the localStorage
   * @param {string} key Item key
   * @param {Object} value Item value
   */
  setObject(key, value) {
    this.set(key, JSON.stringify(value));
  },

  /**
   * Add an item to a localStorage() object
   * @param {string} name  The localStorage() key
   * @param {string} key   The localStorage() value object key
   * @param {Object} value The localStorage() value object value
   */
  setMultiObject(name, key, value) {
    const existing = this.getObject(name) || {};
    existing[key] = value;

    // Save back to localStorage
    this.setObject(name, existing);
  },

  clear() {
    fallbackStorage = {};
    try {
      localStorage.clear();
    } catch (e) {
      // nothing to do here
    }
  },
};

export default LocalStorage;
