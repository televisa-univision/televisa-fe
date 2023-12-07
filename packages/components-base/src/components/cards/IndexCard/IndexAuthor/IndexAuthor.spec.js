import React from 'react';
import { mount } from 'enzyme';

import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import mockData from '../__mocks__/indexCard.json';
import IndexAuthor from '.';

describe('IndexAuthor', () => {
  it('should return a null value by default', () => {
    const wrapper = mount(<IndexAuthor />);
    expect(wrapper.find('div')).toHaveLength(0);
  });
  it('should render with the first author provided', () => {
    const wrapper = mount(<IndexAuthor authors={mockData[0].authors} />);
    expect(wrapper.find('IndexAuthor__Container')).toHaveLength(1);
  });
  it('should track clicks', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'track');

    const wrapper = mount(<IndexAuthor authors={mockData[0].authors} />);
    wrapper.find('IndexAuthor__AuthorLink').simulate('click');

    expect(trackerSpy).toHaveBeenCalledWith(
      expect.any(Function),
      'content',
      null
    );
  });
});
