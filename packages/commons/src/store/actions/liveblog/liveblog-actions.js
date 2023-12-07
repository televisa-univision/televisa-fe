/**
 * Action type to update the liveblog context.
 * @type {string}
 */
export const UPDATE_LIVE_BLOG_CONTEXT_ACTION = 'UPDATE_LIVE_BLOG_CONTEXT';

/**
 * Action to update the live blog context.
 * @param {Object} data from web-api.
 * @returns {{displayLeadMedia: boolean, activePageNumber: number, type: string}}
 */
export function updateLiveBlogContext(data) {
  const {
    displayLeadMedia,
    activePageNumber,
  } = data;

  return {
    type: UPDATE_LIVE_BLOG_CONTEXT_ACTION,
    displayLeadMedia,
    activePageNumber,
  };
}
