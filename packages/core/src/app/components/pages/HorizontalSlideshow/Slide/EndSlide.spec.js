import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';

import EndSlide from './EndSlide';

global.window ??= Object.create(window);
Object.defineProperty(global.window, 'href', {
  configurable: true,
  writable: true,
});
Object.defineProperty(global.window, 'location', {
  configurable: true,
  writable: true,
});

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
    const div = document.createElement('div');
    ReactDOM.render(<EndSlide {...slideProps} />, div);
  });

  it('should track a click to related gallery - with event', () => {
    let timeoutCalled = false;
    global.window.setTimeout = (fn) => {
      fn();
      timeoutCalled = true;
    };
    const wrapper = shallow(<EndSlide {...slideProps} />);
    spyOn(SlideshowTracker, 'track');
    wrapper.instance().onClick({
      preventDefault: jest.fn,
    });
    expect(timeoutCalled).toBe(true);
  });

  it('should call the event but without a preventDefault function', () => {
    let timeoutCalled = false;
    global.window.setTimeout = (fn) => {
      fn();
      timeoutCalled = true;
    };
    const wrapper = shallow(<EndSlide {...slideProps} />);
    spyOn(SlideshowTracker, 'track');
    wrapper.instance().onClick({
      preventDefault: false,
    });
    expect(timeoutCalled).toBe(true);
  });

  it('should clear the timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = shallow(<EndSlide {...slideProps} />);
    wrapper.instance().timeout = 1;
    wrapper.instance().componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });
});
