import { UPDATE_LIVE_BLOG_CONTEXT_ACTION } from '../../actions/liveblog/liveblog-actions';

/**
 * LiveBlog store reducer.
 * @param {Object} state Store state
 * @param {string} action to process;
 * @returns {Object}
 */
export default function liveBlogReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_LIVE_BLOG_CONTEXT_ACTION:
      return Object.assign({}, state, {
        displayLeadMedia: action.displayLeadMedia,
        activePageNumber: action.activePageNumber,
      });
    default:
      return state;
  }
}
