import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Post from './Post';
import Styles from './Post.scss';

/** @test {Post} */
describe('Post Spec', () => {
  const post = {
    title: 'Test Post',
    publishDate: '2017-10-22T18:17:53-04:00',
    authors: [{ uid: '1abc' }],
    tempAuthors: [{ uid: '2bcd' }],
    body: {
      referentialText: [{
        type: 'text',
        value: 'hello',
      }],
    },
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Post post={{ ...post, sharing: { options: [] } }} />, div);
  });
  it('should render without crashing with null authors', () => {
    const div = document.createElement('div');
    const noAuthors = {
      ...post, authors: null, tempAuthors: null, sharing: { options: [] }
    };
    ReactDOM.render(<Post post={noAuthors} />, div);
  });

  it('should show destacado if isPinned', () => {
    const wrapper = shallow(<Post post={post} isPinned />);
    expect(wrapper.find(`span.${Styles.pinned}`)).toHaveLength(1);
  });

  it('tracks ShareBar clicks', async () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Post post={post} shareData={{ type: 'liveblog' }} />);
    wrapper
      .find('ShareBar')
      .simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should not render timestamp if prop is set to true', () => {
    const wrapper = shallow(<Post post={post} hideTimestamp />);
    expect(wrapper.find('.timeago')).toHaveLength(0);
    expect(wrapper.find('.plain')).toHaveLength(0);
  });

  it('should render Spanish strings for timeago component', () => {
    const wrapper = shallow(<Post post={post} />);
    expect(wrapper.find('TimeAgo').dive().text()).toContain('hace');
  });

  it('should render English strings for timeago component', () => {
    localization.setLanguage('en');
    const wrapper = shallow(<Post post={post} />);
    expect(wrapper.find('TimeAgo').dive().text()).toContain('ago');
  });
});
