import React from 'react';
import { shallow } from 'enzyme';

import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import Store from '@univision/fe-commons/dist/store/store';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as spaHelpers from '@univision/fe-commons/dist/utils/helpers/spa';

import Horoscope from '.';
import config from './configs';

/* globals jsdom */

storeHelpers.getSharingOptions = () => ({
  facebook: {},
  twitter: {},
  mail: {},
});

jest.useFakeTimers();

let props;
let animals;
beforeEach(() => {
  props = {};
  ({ animals } = config);
  jest.clearAllTimers();
});

describe('Horoscope', () => {
  it('renders as expected with initial state', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    expect(horoscope.find('.animal')).toHaveLength(animals.length);

    // no selection, no sharebar
    expect(horoscope.find('.share')).toHaveLength(0);
  });

  it('shows the assist text when an animal is selected', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const index = 1;
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.setState({ index });
    expect(horoscope.find('.show').prop('href')).toEqual(`#horoscopo-chino-${animals[index].name}`);
    expect(horoscope.find('.animalWrapper').at(index).find('small.assist')).toHaveLength(1);
  });

  it('renders the sharebar after animal selection', () => {
    const wrapper = shallow(<Horoscope {...props} />).first();
    const index = 1;
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.setState({ index });
    // 2 sharebars - one for tablet/desktop, another for mobile
    expect(horoscope.find('.share')).toHaveLength(2);
  });

  it('updates the sharingOptions with the correct animal link', () => {
    jsdom.reconfigure({
      url: 'https://univ.io',
    });
    const wrapper = shallow(<Horoscope {...props} />);
    const index = 1;
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.setState({ index });
    const shareOptions = horoscope.find('.share').first().prop('sharingOptions');
    expect(shareOptions.facebook.url).toEqual(`${global.window.location.origin}${animals[index].path}`);
  });

  it('runs onChangeInput happy path as expected', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.instance().onChangeInput({ target: { value: '1987' } });
    expect(horoscope.state('year')).toEqual(1987);
    expect(horoscope.state('index')).toEqual(3);
  });

  it('resets year if entry is not valid', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.instance().onChangeInput({ target: { value: 'HELLO' } });
    expect(horoscope.state('year')).toBe('');
  });

  it('does not set index if year is invalid', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.instance().onChangeInput({ target: { value: '1800' } });
    expect(horoscope.state('index')).not.toBeDefined();

    horoscope.instance().onChangeInput({ target: { value: new Date().getFullYear + 1 } });
    expect(horoscope.state('index')).not.toBeDefined();
  });

  it('prevents default on form submit', () => {
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    const e = {
      preventDefault: jest.fn(),
    };
    horoscope.find('form').simulate('submit', e);
    expect(e.preventDefault).toBeCalled();
  });

  it('should not fire the track event when onSelectAnimal has not url or window is undefined', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    const instance = horoscope.instance();
    instance.onSelectAnimal();
    expect(fireEventSpy).not.toHaveBeenCalled();
  });

  it('should fire the track event on when onSelectAnimal is called', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());

    // create a mock window
    const mockWindow = {
      location: {
        href: 'https://univision.com',
      },
    };

    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);

    horoscope.find('.animalWrapper').first().simulate('click');
    expect(fireEventSpy).toHaveBeenCalled();

    windowSpy.mockRestore();
  });

  it('should call history.push if context.history is set', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    const history = {
      push: jest.fn(fn => fn),
    };
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')({ history }));
    horoscope.find('.animalWrapper').first().simulate('click');
    expect(history.push).toHaveBeenCalled();
  });

  it('should not call history.push if context.history is set but should skip spa', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const history = {
      push: jest.fn(fn => fn),
    };
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')({ history }));
    horoscope.find('.animalWrapper').first().simulate('click');
    expect(history.push).not.toHaveBeenCalled();
  });

  it('should fire SocialTracker when onShare is called', () => {
    Store.dispatch(setPageData({
      data: {
        uid: '123',
      },
    }));
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    const instance = horoscope.instance();
    const socialTrackerSpy = jest.spyOn(SocialTracker, 'track');
    instance.onShare('mail');
    expect(socialTrackerSpy).toBeCalled();
  });

  it('should clear the timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = shallow(<Horoscope {...props} />);
    const horoscope = shallow(wrapper.prop('children')());
    horoscope.instance().timeout = 1;
    horoscope.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });
});
