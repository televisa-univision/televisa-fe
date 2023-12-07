import React from 'react';
import { shallow } from 'enzyme';

import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import data from './__mocks__/schedule.json';
import Schedule from '.';

const matches = scoreCellsExtractor(data).slice(0, 5);

describe('Schedule', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Schedule />);
    expect(wrapper.find('Schedule__Wrapper')).toHaveLength(1);
  });
  it('should render with appropiate elements', () => {
    const wrapper = shallow(<Schedule matches={matches} />);
    expect(wrapper.find('Schedule__Wrapper')).toHaveLength(1);
  });
  it('should not render zona futbol link when user location is MX', () => {
    const wrapper = shallow(<Schedule matches={matches} userLocation="MX" />);
    expect(wrapper.find('Schedule__Wrapper')).toHaveLength(1);
    expect(wrapper.find('Schedule__ZonaFutbolLink')).toHaveLength(0);
  });
  it('should track zona futbol link', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track')
      .mockImplementation(jest.fn());
    const wrapper = shallow(<Schedule matches={matches} />);
    wrapper.find('Schedule__ZonaFutbolLink').simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
  });
});
