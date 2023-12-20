const KEY_PREFIX = 'SSO_IFRAME_KEY_';
const ERROR_PREFIX = 'SsoIFrame internal error.';

/**
 * IMPORTANT: This values also exist in
 * '@univision/fe-commons/dist/constants/sso'
 * they are being defined here to avoid webpack making
 * bigger the javascript bundles for this page
 * TODO: Move this to commons once we have better code splitting
 */
export const iFrameAncestorsRegex = [
  /.*localhost:.*/,
  /.*\.dev-univision\.com/,
  /.*\.univision\.com/,
  /.*\.tudn\.com/,
  /.*\.mulher\.com\.br/,
  /.*\.delicioso\.com\.br/,
  /.*\.zappeando\.com\.br/,
  /.*\.tasaudavel\.com\.br/,
  /.*\.lasestrellas\.tv/,
  /.*ydzgd0hy3d.execute-api.us-east-1.amazonaws.com/, // Integration tudn nextjs
  /.*\.canal5\.com/,
  /.*\.elnu9ve\.com/,
  /.*\.distritocomedia\.com/,
  /.*\.televisa\.com/,
  /.*\.unicable\.tv/,
  /.*\.telehit\.com/,
  /.*\.losbingers\.com/,
  /.*\.bandamax\.tv/,
  /.*\.lacasadelosfamososmexico\.tv/,
];

/**
 * IMPORTANT: These values also exist in
 * '@univision/fe-commons/dist/constants/iFrame'
 * they are being defined here to avoid webpack making
 * bigger the javascript bundles for this page
 * TODO: Move this to commons once we have better code splitting
 */
export const LOCAL_STORAGE_COMMANDS = Object.freeze({
  setItem: 'IFRAME_LOCAL_STORAGE_SET_ITEM',
  getItem: 'IFRAME_LOCAL_STORAGE_GET_ITEM',
  removeItem: 'IFRAME_LOCAL_STORAGE_ITEM',
  clear: 'IFRAME_LOCAL_STORAGE_CLEAR',
});

/**
 * Post and error message
 * @param {string} commandId unique identifier for this operation
 * @param {string} errorMessage error message
 * @param {string} targetOrigin to send back message
 */
const postErrorMessage = (
  commandId,
  errorMessage,
  targetOrigin,
) => {
  try {
    window.parent.postMessage({
      commandId,
      error: `${ERROR_PREFIX}. ${errorMessage}`,
    }, targetOrigin);
  } catch (e) {
    // This happen when a third party site tried to communicate
    // with this iframe and as it is not allowed we can't send
    // a message back to it.
  }
};

/**
 * Message handler function that serves as an API
 * to interact with the local storage of the iframe
 * using PostMessage Api and a set of defined commands.
 * @param {Object} event event
 * @property {Object} event.data.command operation that we want to do
 * @property {Object} event.data.commandId unique identifier for
 * this operation to mitigate race conditions
 * @property {Object} event.data.key key of the data in the local storage
 * @property {Object} event.data.value data to store in the local storage
 */
const localStorageMessageHandler = (event) => {
  const {
    command, commandId, key, value,
  } = event?.data ?? {};

  if (
    !command
    || !commandId
    || (command !== LOCAL_STORAGE_COMMANDS.clear && !key)) return;

  try {
    const internalKey = `${KEY_PREFIX}${key}`;
    let resultData;

    switch (command) {
      case LOCAL_STORAGE_COMMANDS.getItem:
        resultData = window.localStorage.getItem(internalKey);
        break;
      case LOCAL_STORAGE_COMMANDS.setItem:
        window.localStorage.setItem(internalKey, value);
        break;
      case LOCAL_STORAGE_COMMANDS.removeItem:
        window.localStorage.removeItem(internalKey);
        break;
      case LOCAL_STORAGE_COMMANDS.clear:
        window.localStorage.clear();
        break;
      default:
        postErrorMessage(commandId, `Invalid Command: ${command}`, event.origin);
        return;
    }

    window.parent.postMessage({
      commandId,
      data: resultData,
    }, event.origin);
  } catch (error) {
    postErrorMessage(commandId, `Message:${error.message} Stack:${error.stack}`, event.origin);
  }
};

/**
 * Determines if a parent domain can communicate
 * with the sso iframe using the PostMessage api
 * @param {string} domain to determines if it is a valid parent
 * @returns {boolean}
 */
const isValidParent = (domain) => {
  return typeof domain === 'string'
  && iFrameAncestorsRegex.some(ancestorRegex => ancestorRegex.test(domain));
};

/**
 * Root Handler for PostMessage messages
 * @param {Object} event event
 */
export const mainMessageHandler = (event) => {
  const { commandId } = event?.data ?? {};

  if (!isValidParent(event?.origin)) {
    postErrorMessage(commandId, 'Not allowed origin is communicating with the IFrame', event?.origin);
    return;
  }

  localStorageMessageHandler(event);
};

/**
 * Initialize the SSO IFrame logic
 */
const init = () => {
  // eslint-disable-next-line babel/no-unused-expressions
  global?.window.addEventListener('message', mainMessageHandler);
};

init();
