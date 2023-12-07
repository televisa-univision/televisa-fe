// eslint-disable-next-line import/no-cycle
import IFrameLocalStorage from './IFrameLocalStorage';

// eslint-disable-next-line import/no-mutable-exports
let iFrameLocalStorage = null;
/**
 * Create a singleton of IFrameLocalStorage
 * @param {Object} iFrameWindow window object of the iFrame
 * @param {string} iFrameOrigin origin of the iFrameWindow
 */
export const init = (iFrameWindow, iFrameOrigin) => {
  if (iFrameWindow && iFrameOrigin && !iFrameLocalStorage) {
    iFrameLocalStorage = new IFrameLocalStorage(iFrameWindow, iFrameOrigin);
  }
};

/**
 * IFrameLocalStorage instance
 * @returns {Object}
 */
export const getInstance = () => iFrameLocalStorage;
