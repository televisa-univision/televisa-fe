import React from 'react';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';

import Post from '.';

jest.mock('react-loadable');
jest.mock('@univision/fe-commons/dist/assets/images/striped-background.svg');
redux.useSelector = jest.fn();

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
    sharing: { options: {} },
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<Post post={post} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should render without crashing with null authors', () => {
    const noAuthors = {
      ...post, authors: null, tempAuthors: null,
    };
    const wrapper = shallow(<Post post={noAuthors} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should show destacado if isPinned', () => {
    const wrapper = shallow(<Post post={post} isPinned />);
    expect(wrapper.find('Icon')).toHaveLength(1);
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
    const wrapper = shallow(<Post post={{ ...post, sharing: undefined }} />);
    expect(wrapper.find('TimeAgo').dive().text()).toContain('ago');
  });
  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = shallow(<Post post={post} isPinned />);
    expect(wrapper.find('ShareBar')).toHaveLength(0);
  });

  it('should have televisa style', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    features.televisa.isTelevisaSite = jest.fn(() => true);
    const wrapper = shallow(<Post post={post} />);
    expect(wrapper.find('ShareBar')).toHaveLength(1);
  });
});
