import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';

import {
  GREEN,
  BLUE,
} from '@univision/fe-utilities/styled/constants';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import CastingTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/CastingTracker';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';

import CastingExplainer from '.';

describe('CastingExplainer component tests', () => {
  let castingTrackerSpy;
  beforeEach(() => {
    localStorage.clear();
    castingTrackerSpy = jest.spyOn(CastingTracker, 'track');
  });
  it('renders without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <CastingExplainer />,
      div
    );
  });
  it('should renders as expected', () => {
    const wrapper = mount(
      <CastingExplainer
        explainerTitle="this is the title"
        explainerCopy="this is the copy"
        explainerId="testCastingExplainer"
        showExplainer
      />
    );
    expect(wrapper.find('CastingExplainer__Label').text()).toBe('this is the copy');
    expect(wrapper.find('CastingExplainer__TitleStyled').text()).toBe('this is the title');
    expect(wrapper.find('CastingExplainer__TextButton').first().text()).toBe('Saltar');
    expect(wrapper.find('CastingExplainer__TextButton').last().text()).toBe('Entendido');
  });
  it('should render with default arrow color', () => {
    const wrapper = mount(
      <CastingExplainer explainerId="testCastingExplainer" showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow')).toHaveLength(1);
    expect(wrapper.find('CastingExplainer__Arrow div')).toHaveStyleRule('border-bottom', `11px solid ${GREEN}`);
  });
  it('should render with theme color', () => {
    const theme = {
      primary: BLUE,
    };
    const wrapper = mount(
      <CastingExplainer explainerId="testCastingExplainer" theme={theme} showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow div')).toHaveStyleRule('border-bottom', `11px solid ${BLUE}`);
  });
  it('should show explainer up', () => {
    const wrapper = mount(
      <CastingExplainer showExplainerUp showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow')).toHaveStyleRule('top', '-11px');
  });
  it('should show arrow at right', () => {
    const wrapper = mount(
      <CastingExplainer showArrowRight showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow div')).toHaveStyleRule('right', '15%');
  });
  it('should show explainer down', () => {
    const wrapper = mount(
      <CastingExplainer showExplainerUp={false} showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow')).toHaveStyleRule('bottom', '-11px');
  });
  it('should show arrow at left', () => {
    const wrapper = mount(
      <CastingExplainer showArrowRight={false} showExplainer />
    );
    expect(wrapper.find('CastingExplainer__Arrow')).toHaveStyleRule('left', '15%');
  });
  it('should close explainer on click', () => {
    const wrapper = mount(<CastingExplainer showExplainer showTimes={2} />);
    expect(wrapper.find('CastingExplainer__Wrapper').first().prop('closeExplainer')).toBe(false);
    act(() => {
      wrapper.find('CastingExplainer__ExternalButtonWrapper').first().simulate('click', 'event');
    });
    wrapper.update();
    expect(wrapper.find('CastingExplainer__Wrapper').first().prop('closeExplainer')).toBe(true);
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.explainerClick,
      'closing',
    );
  });
  it('should update local storage if close is true', () => {
    const wrapper = mount(<CastingExplainer close explainerId="testCastingExplainer" />);
    expect(localStorage.get('testCastingExplainer')).toEqual('1');
    expect(wrapper.find('CastingExplainer__Wrapper')).toHaveLength(0);
  });
  it('should show only one time to the user', () => {
    const wrapper = mount(<CastingExplainer showTimes={1} showExplainer explainerId="testCastingExplainer" />);
    expect(wrapper.find('CastingExplainer__InnerWrapper')).toHaveLength(1);
    act(() => {
      wrapper.find('CastingExplainer__ButtonWrapper').first().simulate('click', 'event');
    });
    wrapper.update();
    expect(localStorage.get('testCastingExplainer')).toEqual('1');
    expect(wrapper.find('CastingExplainer__Wrapper')).toHaveLength(0);
    expect(castingTrackerSpy).toHaveBeenCalledWith(
      CastingTracker.events.explainerClick,
      'entendido',
    );
  });
  it('should not show if the number of times is equal o higher', () => {
    localStorage.set('testCastingExplainer', 2);
    const wrapper = mount(<CastingExplainer showTimes={2} explainerId="testCastingExplainer" showExplainer />);
    expect(wrapper.find('CastingExplainer__Wrapper')).toHaveLength(0);
  });
  it('should not show if have legacy true value in the storage', () => {
    localStorage.set('testCastingExplainer', 'true');
    const wrapper = mount(<CastingExplainer showTimes={1} explainerId="testCastingExplainer" showExplainer />);
    expect(wrapper.find('CastingExplainer__Wrapper')).toHaveLength(0);
  });
  it('should not call display track explainer if not on client side', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const { window } = global;
    delete global.window;
    const wrapper = shallow(
      <CastingExplainer showExplainer showTimes={3} />
    );
    expect(wrapper.find('CastingExplainer__Wrapper')).toHaveLength(1);
    expect(trackerSpy).not.toHaveBeenCalled();
    global.window = window;
  });
});
