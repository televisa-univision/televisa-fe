import reducer from './liveblog-reducer';
import { UPDATE_LIVE_BLOG_CONTEXT_ACTION } from '../../actions/liveblog/liveblog-actions';

describe('LiveBlog reducer', () => {
  it('should handle UPDATE_LIVE_BLOG_CONTEXT_ACTION', () => {
    const expectedState = {
      displayLeadMedia: true,
      activePageNumber: 1,
    };
    expect(reducer({}, {
      type: UPDATE_LIVE_BLOG_CONTEXT_ACTION,
      ...expectedState,
    })).toEqual(expectedState);
  });

  it('should return same state as default', () => {
    const state = { foo: 'bar', };
    expect(reducer(state, {})).toEqual(state);
  });
});
