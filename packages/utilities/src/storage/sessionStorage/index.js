/**
 * @module storage/sessionStorage
 */

import Storage from '../Storage';
import consoleLogger from '../../utils/consola';

let sessionStorageIntance;
try {
  sessionStorageIntance = window.sessionStorage;
} catch (err) {
  if (typeof window !== 'undefined') {
    consoleLogger.warn('sessionStorage not available');
  }
}

/**
 * Wrapper for the sessionStorage API.
 * Adds support for JSON objects and uses a fallback when sessionStorage is not available.
 * {@link module:storage~Storage}
 */
export default new Storage(sessionStorageIntance);
