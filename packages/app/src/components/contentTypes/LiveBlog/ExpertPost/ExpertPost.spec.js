import React from 'react';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import ExpertPost from '.';

jest.mock('react-loadable');
redux.useSelector = jest.fn();

/** @test {Post} */
describe('ExpertPost Spec', () => {
  const post = {
    title: 'Test Post',
    publishDate: '2017-10-22T18:17:53-04:00',
    authors: [
      {
        uid: '1abc',
        socialNetworks: {
          twitterUrl: {
            url: 'https://twitter.com/test',
          },
        },
      },
    ],
    tempAuthors: [],
    body: {
      referentialText: [
        {
          type: 'text',
          value: 'hello',
        },
      ],
    },
  };

  beforeAll(async () => {
    await preloadAll();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<ExpertPost post={{ ...post, sharing: { options: {} } }} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should not show author info if no author', () => {
    const wrapper = shallow(<ExpertPost post={{ ...post, authors: [] }} />);
    expect(wrapper.find('.author')).toHaveLength(0);
  });

  it('should render link if author uri', () => {
    const wrapper = shallow(<ExpertPost
      post={{ ...post, authors: [{ ...post.authors[0], uri: 'test.com' }] }}
    />);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('should render shortDescription if author shortDescription', () => {
    const wrapper = shallow(<ExpertPost
      post={{ ...post, authors: [{ ...post.authors[0], shortDescription: 'test' }] }}
    />);
    expect(wrapper.find('.shortDescription')).toHaveLength(1);
  });

  it('should render mini bio if author mini bio is set', () => {
    const wrapper = shallow(<ExpertPost
      post={{ ...post, authors: [{ ...post.authors[0], miniBio: 'test' }] }}
    />);
    expect(wrapper.find('.description')).toHaveLength(1);
  });

  it('should show avatar if author has image', () => {
    const authorPost = {
      ...post,
      authors: [
        {
          ...post.authors[0],
          image: {
            renditions: {
              original: {
                href: 'test.com',
              },
              '1x1-mobile': {
                href: 'test.com',
              },
            },
          },
        },
      ],
    };

    const wrapper = shallow(<ExpertPost post={authorPost} />);
    expect(wrapper.find('.avatar')).toHaveLength(1);
  });

  it('should show Twitter follow if twitter url', () => {
    const wrapper = shallow(<ExpertPost post={post} />);
    expect(wrapper.find('.twitter').childAt(0).prop('twitterUrl')).toBe('https://twitter.com/test');
  });

  it('tracks ShareBar clicks', async () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<ExpertPost post={post} shareData={{ type: 'liveblog' }} />);
    wrapper.find('ShareBar').simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should not render timestamp if the prop is set to true', () => {
    const wrapper = shallow(<ExpertPost post={post} hideTimestamp />);
    expect(wrapper.find('.timeago')).toHaveLength(0);
  });

  it('should render Spanish strings for timeago component', () => {
    const wrapper = shallow(<ExpertPost post={post} />);
    expect(wrapper.find('TimeAgo').dive().text()).toContain('hace');
  });

  it('should render English strings for timeago component', () => {
    localization.setLanguage('en');
    const wrapper = shallow(<ExpertPost post={post} />);
    expect(wrapper.find('TimeAgo').dive().text()).toContain('ago');
  });
});
