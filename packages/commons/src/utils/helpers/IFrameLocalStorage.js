import getUniqKey from '@univision/fe-utilities/helpers/content/getUniqKey';
// eslint-disable-next-line import/no-cycle
import { clientLevelLogging } from '../logging/clientLogging';
import { LOCAL_STORAGE_COMMANDS } from '../../constants/iFrame';

/**
 * Receiver for the data the iFrame will send back
 * using PostMessage api
 * This function only resolves when it receives a 'message' event
 * from the same 'origin' and with the same 'commandId' that was sent.
 * @private Exposed for testing purposes
 * @param {Object} args function arguments
 * @property {Function} args.resolve promise resolver
 * @property {string} args.targetOrigin iframe origin
 * @property {string} args.commandId commandId
 * @property {string} args.isRoot flag to avoid receive
 * @param {Object} event the event
 * @property {Object} event.origin the origin of the incoming message
 * @property {Object} event.data data sent back in the incoming message
 * @returns {Function}
 */
export const requestMessageHandler = args => (event) => {
  const {
    data, commandId, isRoot, error,
  } = event?.data ?? {};
  if (
    event?.origin !== args?.targetOrigin
    || isRoot // Flag to avoid self root window messages in localhost
    || commandId !== args?.commandId
  ) return; // Message is not the expected

  if (error) {
    // eslint-disable-next-line babel/no-unused-expressions
    args?.reject(new Error(error));
  } else {
    // eslint-disable-next-line babel/no-unused-expressions
    args?.resolve(data);
  }
};

const TIMEOUT_TIME = 5000;
/**
 * Request the API implemented by the IFrame window to communicate
 * with its Local Storage  using one of the supported commands.
 * After resolves this function unregister from the 'message' event listener
 * @private Exposed for testing purposes
 * @param {Object} default options
 * @property {Object} default.command operation that we want to do
 * @property {Object} default.commandId unique identifier for
 * this operation to mitigate race conditions
 * @property {Object} default.key key of the data in the local storage
 * @property {Object} default.value data to store in the local storage
 * @returns  {Promise}
 */
export const requestLocalStorage = ({
  command,
  commandId = getUniqKey(),
  key,
  value,
  iFrameWindow,
  targetOrigin,
}) => {
  let handler;
  let timeout;
  return new Promise((resolve, reject) => {
    handler = requestMessageHandler(
      {
        resolve, reject, commandId, targetOrigin,
      }
    );

    global.window.addEventListener('message', handler);
    iFrameWindow.postMessage({
      command,
      commandId,
      isRoot: true,
      key,
      value,
    }, targetOrigin);

    // Edge case when IFrame has no been configured properly.
    // By example the iFrame defines the CSP frame-ancestors policy
    // but the page rendering that iframe is not valid for the policy
    timeout = setTimeout(() => {
      reject(new Error(`Timeout error. command:${command} targetOrigin:${targetOrigin}`));
    }, TIMEOUT_TIME);
  }).then((res) => {
    clearTimeout(timeout);
    global.window.removeEventListener('message', handler);
    return res;
  }).catch((error) => {
    clientLevelLogging({ error, info: 'IFRAME_LOCAL_STORAGE requestLocalStorage error' });
    clearTimeout(timeout);
    global.window.removeEventListener('message', handler);
  });
};

/**
 * Class that communicate with an IFrame sending
 * commands using the Post Message Api to handle
 * its Local Storage
*/
class IFrameLocalStorage {
  /**
   * Constructor
   * @param {Object} iFrameWindow instance of the iframe window
   * @param {Object} iFrameOrigin origin of the iFrame we are communicating to
   */
  constructor(iFrameWindow, iFrameOrigin) {
    this.iFrameWindow = iFrameWindow;
    this.iFrameOrigin = iFrameOrigin;
  }

  /**
   * Retrieve an item from the iFrame localStorage
   * @param {string} key Item to get
   * @returns {Promise} resolves the item
   */
  getItem(key) {
    return requestLocalStorage({
      command: LOCAL_STORAGE_COMMANDS.getItem,
      key,
      iFrameWindow: this.iFrameWindow,
      targetOrigin: this.iFrameOrigin,
    });
  }

  /**
   * Stores an item in the iFrame localStorage
   * @param {string} key Item key to store the value
   * @param {string} value Item value
   * @returns {Promise}
   */
  setItem(key, value) {
    return requestLocalStorage({
      command: LOCAL_STORAGE_COMMANDS.setItem,
      iFrameWindow: this.iFrameWindow,
      key,
      value,
      targetOrigin: this.iFrameOrigin,
    });
  }

  /**
   * Removes an item from the iFrame localStorage
   * @param {string} key Item key to remove
   * @returns {Promise}
   */
  removeItem(key) {
    return requestLocalStorage({
      command: LOCAL_STORAGE_COMMANDS.removeItem,
      iFrameWindow: this.iFrameWindow,
      key,
      targetOrigin: this.iFrameOrigin,
    });
  }

  /**
   * Retrieves an Object from the iFrame localStorage
   * @param {string} key Item to get
   * @returns {Promise} resolves the item
   */
  async getItemObject(key) {
    try {
      const data = await this.getItem(key);

      if (!data) {
        throw new Error(`Missing ${key} data from iFrame localStorage`);
      }

      return JSON.parse(data);
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Stores an Object in the iFrame localStorage
   * @param {string} key Item key
   * @param {Object} value Item value
   * @returns {Promise}
   */
  setItemObject(key, value) {
    return this.setItem(key, JSON.stringify(value));
  }

  /**
   * Clear the iFrame localStorage
   * @returns {Promise}
   */
  clear() {
    return requestLocalStorage({
      command: LOCAL_STORAGE_COMMANDS.clear,
      iFrameWindow: this.iFrameWindow,
      targetOrigin: this.iFrameOrigin,
    });
  }
}

export default IFrameLocalStorage;
