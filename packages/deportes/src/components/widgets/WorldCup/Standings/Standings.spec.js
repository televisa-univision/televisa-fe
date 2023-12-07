import React from 'react';
import { mount } from 'enzyme';

import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Standings from '.';
import data from './__mocks__/standings.json';

const props = {
  ...standingsExtractor(data),
  viewMoreLink: 'https://tudn.com',
};

describe('Standings', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<Standings />);
    expect(wrapper.find('Standings__Wrapper')).toHaveLength(1);
  });
  it('should render with appropiate elements', () => {
    const wrapper = mount(<Standings {...props} />);
    expect(wrapper.find('Standings__Wrapper')).toHaveLength(1);
  });
  it('should track view all standings click', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track')
      .mockImplementation(jest.fn());
    const wrapper = mount(<Standings {...props} />);
    wrapper.find('Standings__MoreButton')
      .find('Link')
      .simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
});
