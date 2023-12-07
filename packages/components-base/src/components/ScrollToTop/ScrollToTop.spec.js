import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ScrollToTop, * as helpers from '.';

/** @test {ScrollToTop} */
describe('ScrollToTop ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScrollToTop />, div);
  });

  it('should abort scroll when user performs action', () => {
    global.cancelAnimationFrame = jest.fn();
    const wrapper = shallow(<ScrollToTop />);
    wrapper.instance().abortScroll();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should abort scroll when topOffset is reached', () => {
    global.pageYOffset = 0;
    const wrapper = shallow(<ScrollToTop />);
    const instance = wrapper.instance();
    instance.abortScroll = jest.fn();
    instance.scrollStep();
    expect(instance.abortScroll).toHaveBeenCalled();
  });

  it('should not set the startTime on scrollStep if it exists', () => {
    const wrapper = shallow(<ScrollToTop />);
    const instance = wrapper.instance();
    instance.data.startTime = 321;
    instance.scrollStep(123);
    expect(instance.data.startTime).toEqual(321);
  });

  it('should scroll before topOffset is reached', () => {
    const mockFn = jest.fn();
    global.pageYOffset = 123;
    global.scrollTo = jest.fn();
    global.requestAnimationFrame = () => mockFn;
    const wrapper = shallow(<ScrollToTop />);
    const instance = wrapper.instance();
    instance.scrollStep();
    expect(global.scrollTo).toHaveBeenCalled();
    expect(instance.data.rafId).toEqual(mockFn);
  });

  it('should update instance data on click', () => {
    const mockFn = jest.fn();
    global.pageYOffset = 123;
    global.requestAnimationFrame = () => mockFn;
    const wrapper = shallow(<ScrollToTop />);
    const instance = wrapper.instance();
    instance.handleClick();
    expect(instance.data).toEqual({
      startValue: 123,
      currentTime: 0,
      startTime: null,
      rafId: mockFn,
    });
  });

  it('should hide the button if scroll is before showAtOffset value', () => {
    window.pageYOffset = 0;
    const wrapper = shallow(<ScrollToTop />);
    wrapper.setState({ visible: true });
    wrapper.instance().handleScroll();
    expect(wrapper.state().visible).toEqual(false);
  });

  it('should show the button if scroll is past showAtOffset value', () => {
    window.pageYOffset = 500;
    const wrapper = shallow(<ScrollToTop showAtOffset={400} />);
    const instance = wrapper.instance();
    instance.handleScroll();
    expect(wrapper.state().visible).toEqual(true);
    instance.setState = jest.fn();
    instance.handleScroll();
    expect(instance.setState).not.toHaveBeenCalled();
  });

  it('should remove the event listeners on unmount', () => {
    jest.spyOn(window, 'removeEventListener');
    const wrapper = shallow(<ScrollToTop />);
    wrapper.instance().componentWillUnmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });

  it('detects lack of support for passive event listeners', () => {
    const { window } = global;
    delete global.window;
    expect(helpers.supportsPassive()).toEqual(false);
    global.window = window;
  });

  it('should add passive event listener if its supported', () => {
    let passiveCheck;
    jest.spyOn(window, 'addEventListener').mockImplementation((event, func, options) => {
      if (options) {
        passiveCheck = options.passive;
      }
    });
    const wrapper = shallow(<ScrollToTop />);
    wrapper.instance().componentDidMount();
    expect(passiveCheck).toEqual(true);
  });

  it('should not add passive event listener if it is not supported', () => {
    let passiveCheck;
    jest.spyOn(window, 'addEventListener').mockImplementation((event) => {
      if (event === 'test') {
        passiveCheck = false;
      }
    });
    const wrapper = shallow(<ScrollToTop />);
    wrapper.instance().componentDidMount();
    expect(passiveCheck).toEqual(false);
  });
});
