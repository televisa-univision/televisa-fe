/**
 * @module storage/localStorage
 */

import Storage from '../Storage';
import consoleLogger from '../../utils/consola';

let localStorageIntance;
try {
  localStorageIntance = window.localStorage;
} catch (err) {
  if (typeof window !== 'undefined') {
    consoleLogger.warn('localStorage not available');
  }
}

/**
 * Wrapper for the localStorage API.
 * Adds support for JSON objects and uses a fallback when localStorage is not available.
 * {@link module:storage~Storage}
 */
export default new Storage(localStorageIntance);
