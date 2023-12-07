/**
 * @module storage
 */

/**
 * Wrapper for the browser storage API's.
 * Adds support for JSON objects and uses a fallback is not available.
 */
class Storage {
  /**
   * Defined storage type, fallback and availability
   * @constructor
   * @param {Object} storage - instance of store to wrap
   * @param {Object} fallbackStorage - to save data in memory as fallback
   * when the main store is not available
   */
  constructor(storage, fallbackStorage) {
    this.storage = storage;
    this.fallbackStorage = fallbackStorage || {};

    // Detects whether the storage is supported and available
    try {
      storage.toString();
      this.isAvailable = true;
    } catch (e) {
      this.isAvailable = false;
    }
  }

  /**
   * Command wrapper to catch error like invalid values or undefined keys
   * @param {string} commandName - command to call call
   * @param {string} args - additional arguments for Storage instance
   * @returns {?string}
   */
  call(commandName, ...args) {
    try {
      return this.storage[commandName](...args);
    } catch (err) {
      return undefined;
    }
  }

  /**
   * Retrieves an item from the Storage instance
   * @param {string} key Item to get
   * @returns {string}
   */
  get(key) {
    if (this.isAvailable) {
      return this.call('getItem', key);
    }
    return this.fallbackStorage[key];
  }

  /**
   * Stores an item in the Storage instance
   * @param {string} key Item key
   * @param {string} value Item value
   */
  set(key, value) {
    try {
      if (this.isAvailable) {
        this.call('setItem', key, value);
      } else {
        this.fallbackStorage[key] = value;
      }
    } catch (err) {
      // internal error
    }
  }

  /**
   * Removes an item from the Storage instance
   * @param {sting} key Item key to remove
   */
  remove(key) {
    if (this.isAvailable) {
      this.call('removeItem', key);
    }
    delete this.fallbackStorage[key];
  }

  /**
   * Clean the storage values/keys
   */
  clear() {
    this.fallbackStorage = {};
    if (this.isAvailable) {
      this.call('clear');
    }
  }

  /**
   * Retrieves an Object from the Storage instance
   * @param {string} key Item to get
   * @returns {Object}
   */
  getObject(key) {
    try {
      return JSON.parse(this.get(key));
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Stores an Object in the Storage instance
   * @param {string} key Item key
   * @param {Object} value Item value
   */
  setObject(key, value) {
    try {
      this.set(key, JSON.stringify(value));
    } catch (e) {
      // Internal error
    }
  }

  /**
   * Add an item to Storage instance object value
   * @param {string} name - the Storage key
   * @param {string} key - the Storage value object key
   * @param {Object} value - the Storage value object value
   */
  setInObject(name, key, value) {
    const existing = this.getObject(name) || {};
    existing[key] = value;
    this.setObject(name, existing);
  }

  /**
   * Get an item in a Storage instance object value
   * @param {string} name - the Storage key
   * @param {string} key - the Storage value object key to get
   * @returns {*}
   */
  getInObject(name, key) {
    const existing = this.getObject(name) || {};
    return existing[key];
  }
}

export default Storage;
