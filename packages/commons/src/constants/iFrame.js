/**
 * IFrameLocalStorage class expect to communicate with an IFrame using
 * PostMessage browser Api. These are the list of supported
 * commands
 */
export const LOCAL_STORAGE_COMMANDS = Object.freeze({
  setItem: 'IFRAME_LOCAL_STORAGE_SET_ITEM',
  getItem: 'IFRAME_LOCAL_STORAGE_GET_ITEM',
  removeItem: 'IFRAME_LOCAL_STORAGE_ITEM',
  clear: 'IFRAME_LOCAL_STORAGE_CLEAR',
});

export default LOCAL_STORAGE_COMMANDS;
