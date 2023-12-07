import React from 'react';
import { mount } from 'enzyme';

import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import mockData from '../__mocks__/indexCard.json';
import IndexRelatedTopics from '.';

const mockTags = mockData[0].hierarchy.map(item => ({
  ...item,
  uid: item.uuid,
}));

describe('IndexRelatedTopics', () => {
  it('should not render topic list without a featuredTags value', () => {
    const wrapper = mount(<IndexRelatedTopics />);
    expect(wrapper.find('IndexRelatedTopics__TopicList')).toHaveLength(0);
  });
  it('should render a topic list', () => {
    const wrapper = mount(<IndexRelatedTopics featuredTags={mockTags} />);
    expect(wrapper.find('IndexRelatedTopics__TopicList')).toHaveLength(1);
    expect(wrapper.find('IndexRelatedTopics__TopicLink')).toHaveLength(3);
  });
  it('should render a topic list with a theme', () => {
    const wrapper = mount(<IndexRelatedTopics
      featuredTags={mockTags}
      theme={{ primary: 'red' }}
    />);
    expect(wrapper.find('IndexRelatedTopics__TopicList')).toHaveLength(1);
    expect(wrapper.find('IndexRelatedTopics__TopicLink')).toHaveLength(3);
    expect(wrapper.find('IndexRelatedTopics__TopicLink').first().prop('color')).toBe('red');
  });
  it('should track clicks', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'track');

    const wrapper = mount(<IndexRelatedTopics featuredTags={mockTags} />);
    wrapper.find('IndexRelatedTopics__TopicLink').first().simulate('click');

    expect(trackerSpy).toHaveBeenCalledWith(
      expect.any(Function),
      'content',
      null
    );
  });
});
