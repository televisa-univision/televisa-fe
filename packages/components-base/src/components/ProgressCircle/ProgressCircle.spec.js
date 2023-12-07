import React from 'react';
import { shallow, mount } from 'enzyme';

import Progress from '.';

/** @test {Progress} */
describe('Progress ', () => {
  it('should start the animation', () => {
    global.requestAnimationFrame = jest.fn();
    const wrapper = shallow(<Progress color="white" />);
    wrapper.instance().startAnimation();
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should render only the stroke', () => {
    global.requestAnimationFrame = jest.fn();
    const wrapper = shallow(<Progress color="white" onlyStroke />);
    wrapper.instance().startAnimation();
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should abort the animation', () => {
    global.cancelAnimationFrame = jest.fn();
    const wrapper = shallow(<Progress />);
    wrapper.instance().abortAnimation();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should request next animation frame if timer not paused', () => {
    global.requestAnimationFrame = jest.fn();
    const wrapper = mount(<Progress running />);
    wrapper.instance().animationStep();
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should not request next animation frame if timer paused', () => {
    global.requestAnimationFrame = jest.fn();
    const wrapper = mount(<Progress running={false} progress={0} />);
    wrapper.instance().animationStep();
    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('should reset the animation when the timer is at 0', () => {
    const wrapper = shallow(<Progress progress={0} />);
    const mockFn = jest.fn();
    const instance = wrapper.instance();
    instance.startAnimation = mockFn;
    instance.componentDidUpdate({});
    expect(mockFn).toHaveBeenCalled();
  });

  it('should restart the animation when unpaused', () => {
    // create a mock performance
    const mockPerformance = {
      now: jest.fn()
    };

    // mock the global window object
    const performanceSpy = jest.spyOn(global, 'performance', 'get');
    performanceSpy.mockImplementation(() => mockPerformance);

    const wrapper = shallow(<Progress progress={0.5} running />);
    const mockFn = jest.fn();
    const instance = wrapper.instance();
    instance.animationStep = mockFn;
    instance.componentDidUpdate({ running: false, progress: 0.5 });
    expect(mockFn).toHaveBeenCalled();

    performanceSpy.mockRestore();
  });

  it('should abort the animation when the end of progress is reached', () => {
    const wrapper = shallow(<Progress progress={0.9} />);
    const mockFn = jest.fn();
    const instance = wrapper.instance();
    instance.abortAnimation = mockFn;
    instance.UNSAFE_componentWillUpdate({ progress: 0 });
    expect(mockFn).toHaveBeenCalled();
  });

  it('should not abort the animation if not at end', () => {
    const wrapper = shallow(<Progress progress={0.5} />);
    const mockFn = jest.fn();
    const instance = wrapper.instance();
    instance.abortAnimation = mockFn;
    instance.UNSAFE_componentWillUpdate({ progress: 0.9 });
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should not update data values if next props are equal', () => {
    const wrapper = shallow(<Progress progress={0.9} />);
    const mockFn = jest.fn();
    const instance = wrapper.instance();
    instance.abortAnimation = mockFn;
    instance.UNSAFE_componentWillUpdate({ progress: 0.9 });
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should set the progress in the animationStep', () => {
    const wrapper = mount(<Progress />);
    const instance = wrapper.instance();
    instance.data.currentTime = 100;
    instance.data.startValue = 0.1;
    instance.data.endValue = 0.5;
    instance.animationStep(110);
    expect(instance.data.progress).toEqual(0.1 * instance.data.offset);
  });

  it('should only update progress if next value is larger', () => {
    const wrapper = mount(<Progress />);
    const instance = wrapper.instance();
    instance.data.currentTime = 100;
    instance.data.startValue = 0.1;
    instance.data.endValue = 0.5;
    instance.data.progress = 50;
    instance.indicator.current = null;
    instance.animationStep(110);
    expect(instance.data.progress).toEqual(50);
  });

  it('should not set the start time equal to timestamp if defined', () => {
    const wrapper = mount(<Progress />);
    const instance = wrapper.instance();
    instance.data.startTime = 100;
    instance.animationStep(200);
    expect(instance.data.currentTime).toEqual(100);
  });

  it('should abort the animation on unmount', () => {
    const wrapper = mount(<Progress />);
    const instance = wrapper.instance();
    instance.abortAnimation = jest.fn();
    instance.componentWillUnmount();
    expect(instance.abortAnimation).toHaveBeenCalled();
  });
});
