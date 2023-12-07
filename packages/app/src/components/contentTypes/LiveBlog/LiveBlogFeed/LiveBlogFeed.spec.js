import React from 'react';
import { shallow } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';

import LiveBlogFeed from '.';

describe('LiveBlogFeed', () => {
  const props = {
    posts: [
      {
        uid: '1',
        publishDate: '2017-10-22T21:16:46-04:00',
      },
      {
        uid: '2',
        publishDate: '2017-10-24T21:16:46-04:00',
      },
      {
        uid: '3',
        publishDate: '2017-10-23T21:16:46-04:00',
      },
    ],
    pageData: {},
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render a sorted list of Posts', () => {
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.find('Post').get(0).props.post.uid).toBe('2');
    expect(wrapper.find('Post').get(1).props.post.uid).toBe('3');
    expect(wrapper.find('Post').get(2).props.post.uid).toBe('1');
  });

  it('should render an ExpertPost, if present', () => {
    props.posts.push({
      uid: '4',
      publishDate: '2017-10-23T21:16:46-04:00',
      expertPost: true,
    });
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.find('ExpertPost')).toHaveLength(1);
    wrapper.update();
  });

  it('should handle the pinned post', () => {
    const pageData = {
      displayPinnedPost: true,
      pinnedPost: props.posts[0],
    };
    const wrapper = shallow(<LiveBlogFeed {...props} pageData={pageData} lastFeedUpdate={1} />);
    expect(wrapper.find('Post')).toHaveLength(props.posts.length - 1);
  });

  it('should include a TOP_AD', () => {
    const wrapper = shallow(<LiveBlogFeed {...props} llastFeedUpdate={1} />);
    expect(wrapper.find('[position="TOP"]')).toHaveLength(1);
  });

  it('should include an Ad every 3 posts', () => {
    props.posts.push(...props.posts);
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.find('[position]')).toHaveLength(Math.floor(props.posts.length / 3));
  });

  it('should re-render the component if the Feed has been updated', () => {
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.instance().shouldComponentUpdate({ lastFeedUpdate: 2 })).toBe(true);
  });

  it('should not re-render the component if the Feed has not been updated', () => {
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.instance().shouldComponentUpdate({ lastFeedUpdate: 1 })).toBe(false);
  });

  it('should hide the timestamp if the options include it', () => {
    const pageData = {
      options: {
        hideTimestamp: true,
      },
    };
    const wrapper = shallow(<LiveBlogFeed {...props} pageData={pageData} lastFeedUpdate={1} />);
    expect(wrapper.find('Post').get(0).props.hideTimestamp).toBe(true);
  });
  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(<LiveBlogFeed {...props} lastFeedUpdate={1} />);
    expect(wrapper.find('Icon')).toHaveLength(0);
  });
});
