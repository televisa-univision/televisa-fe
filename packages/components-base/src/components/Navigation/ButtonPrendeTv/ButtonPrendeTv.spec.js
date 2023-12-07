import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import vixTheme from '@univision/fe-commons/dist/themes/vix';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import features from '@univision/fe-commons/dist/config/features';

import ButtonPrendeTv from '.';

const buttonVixTheme = vixTheme();

beforeEach(() => {
  features.widgets.isVixEnabled = () => true;
});
describe('ButtonPrendeTV test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const element = (<ButtonPrendeTv />);
    ReactDOM.render(element, div);
  });
  it('should have the correct styling', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    const wrapper = mount(<ButtonPrendeTv />);
    expect(wrapper.find('ButtonPrendeTv__StyledActionLink').prop('theme'))
      .toEqual(
        expect.objectContaining({
          direction: 'left',
          primary: buttonVixTheme.primary,
          secondary: buttonVixTheme.secondary,
        })
      );
    expect(wrapper.find('svg').prop('fill')).toBe('#ffffff');
    expect(wrapper.find('svg').prop('width')).toBe(48);
    expect(wrapper.find('svg').prop('height')).toBe(48);
  });
  it('should track clicks', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<ButtonPrendeTv />);
    wrapper.find('ActionLink').simulate('click');
    expect(trackerSpy).toHaveBeenCalled();
    expect(trackerSpy).toHaveBeenCalledWith(NavigationTracker.events.click, {
      eventAction: 'topnav-header-prendetv',
    });
  });
});
