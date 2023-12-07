import { UPDATE_LIVE_BLOG_CONTEXT_ACTION, updateLiveBlogContext } from './liveblog-actions';

describe('LiveBlog actions', () => {
  it('should create an action for UPDATE_LIVE_BLOG_CONTEXT_ACTION', () => {
    const data = {
      displayLeadMedia: false,
      activePageNumber: 2,
    };
    const expectedAction = {
      type: UPDATE_LIVE_BLOG_CONTEXT_ACTION,
      ...data,
    };
    expect(updateLiveBlogContext(data)).toEqual(expectedAction);
  });
});
