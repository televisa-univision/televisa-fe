import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import Link from '@univision/fe-components-base/dist/components/Link';

import EndSlide from './EndSlide';

jest.mock('react-loadable');

const clearTimeoutSpy = jest.fn();

const url = 'https://www.example.com';

const locationSpy = {
  location: url,
};

const mockWindow = {
  setTimeout: jest.fn((fn) => {
    fn();
    timeoutCalled = true;
  }),
  clearTimeout: clearTimeoutSpy,
  location: locationSpy,
};

// Use jest fake timers
jest.useFakeTimers();

const windowSpy = jest.spyOn(global, 'window', 'get');

windowSpy.mockImplementation(() => mockWindow);

/** @test {EndSlide} */
describe('EndSlide', () => {
  const slideProps = {
    mainImage: {
      renditions: {
        '16x9-mobile': {
          href: 'test',
        },
      },
    },
    slideCount: 1,
    title: 'test',
    url: 'test.url',
    slideshow: {},
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<EndSlide {...slideProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should track a click to related gallery - with event', () => {
    const wrapper = shallow(<EndSlide {...slideProps} />);

    spyOn(SlideshowTracker, 'track');

    const instance = wrapper.instance();
    const preventDefaultSpy = jest.fn();

    act(() => {
      instance.onClick({
        preventDefault: preventDefaultSpy,
      });
    });

    wrapper.update();

    expect(preventDefaultSpy).toBeCalled();
  });

  it('should call the event but without a preventDefault function', () => {
    const wrapper = shallow(<EndSlide {...slideProps} />);

    spyOn(SlideshowTracker, 'track');

    const instance = wrapper.instance();

    act(() => {
      instance.onClick({
        preventDefault: false,
      });
    });

    wrapper.update();

    expect(instance.timeout).not.toBeNull();
  });

  it('should clear the timeout when component unmounts', () => {
    const wrapper = shallow(<EndSlide {...slideProps} />);
    const instance = wrapper.instance();

    act(() => {
      instance.componentWillUnmount();
    });

    expect(instance.timeout).toBeNull();
  });

  it('should call window.location.assign inside setTimeout', () => {
    const windowSpy2 = jest.spyOn(global, 'window', 'get');
    windowSpy2.mockImplementation(() => mockWindow);

    const wrapper = shallow(<EndSlide {...slideProps} />);

    act(() => {
      wrapper.find(Link).first().simulate('click', {
        preventDefault: jest.fn(),
      });
    });

    jest.advanceTimersByTime(1000);

    expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
