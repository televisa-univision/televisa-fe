import React from 'react';
import { mount } from 'enzyme';

import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import DateList from '.';

const dates = [
  { key: '2021-11-12', dateObj: new Date() },
  { key: '2021-11-13', dateObj: new Date() },
  { key: '2021-11-14', dateObj: new Date() },
];

describe('DateList', () => {
  const setActiveTab = jest.fn();

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render without crashing', () => {
    const wrapper = mount(<DateList />);
    expect(wrapper.find('DateList__Wrapper')).toHaveLength(1);
  });
  it('should render with appropiate elements', () => {
    const wrapper = mount(<DateList dates={dates} />);
    expect(wrapper.find('DateList__Wrapper')).toHaveLength(1);
  });
  it('should render with custom active tab', () => {
    const wrapper = mount(<DateList dates={dates} activeTab="2012-11-13" />);
    expect(wrapper.find('DateList__Wrapper')).toHaveLength(1);
  });
  it('should call setActiveTab method when button is clicked', () => {
    const wrapper = mount(
      <DateList dates={dates} activeTab="2012-11-13" setActiveTab={setActiveTab} />
    );
    wrapper.find('DateList__StyledButton').first().simulate('click');
    expect(setActiveTab).toHaveBeenCalledWith('2021-11-12');
  });
  it('should track tab clicks', () => {
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const wrapper = mount(
      <DateList dates={dates} activeTab="2012-11-13" setActiveTab={setActiveTab} />
    );
    wrapper.find('DateList__StyledButton').first().simulate('click');
    expect(setActiveTab).toHaveBeenCalledWith('2021-11-12');
    expect(trackerSpy).toHaveBeenCalled();
  });
});
