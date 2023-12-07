import React from 'react';
import { mount } from 'enzyme';
import ScrollTracker from './ScrollTracker';

const props = {
  onMilestone: jest.fn(),
  children: <div />,
  scrollKey: 'default',
};

describe('ScrollTracker tests', () => {
  it('should remove the listener if there are not elements to track', () => {
    const wrapper = mount(<ScrollTracker {...props} />);
    const instance = wrapper.instance();
    spyOn(window, 'removeEventListener');
    instance.handleScroll();
    expect(window.removeEventListener).toBeCalled();
  });

  it('should not trigger any milestone if the user has not scrolled', () => {
    props.onMilestone = jest.fn();
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();
    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({});
    instance.handleScroll();

    expect(props.onMilestone).not.toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].length).toBe(0);
  });

  it('should trigger the 25% milestone', () => {
    props.onMilestone = jest.fn();
    window.innerHeight = 500;
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -250,
      height: 1000,
    });

    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].indexOf(25)).toBe(0);
  });

  it('should trigger a milestone for multiple keys (only once per key)', () => {
    props.onMilestone = jest.fn();
    window.innerHeight = 500;
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -250,
      height: 1000,
    });

    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].indexOf(25)).toBe(0);

    wrapper.setProps({ scrollKey: 'test' });
    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones.test.indexOf(25)).toBe(0);

    wrapper.setProps({ scrollKey: props.scrollKey });
    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].lastIndexOf(25)).toBe(0);
  });

  it('should trigger the 50% milestone', () => {
    props.onMilestone = jest.fn();
    window.innerHeight = 500;
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -500,
      height: 1000,
    });

    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].indexOf(50)).toBe(1);
  });

  it('should trigger the 75% milestone', () => {
    props.onMilestone = jest.fn();
    window.innerHeight = 500;
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -750,
      height: 1000,
    });

    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].indexOf(75)).toBe(2);
  });

  it('should trigger the 100% milestone', () => {
    props.onMilestone = jest.fn();
    window.innerHeight = 500;
    const wrapper = mount(<ScrollTracker {...props}><div><p>Test</p></div></ScrollTracker>);
    const instance = wrapper.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -1000,
      height: 1000,
    });

    instance.handleScroll();
    expect(props.onMilestone).toBeCalled();
    expect(instance.trackedMilestones[props.scrollKey].indexOf(100)).toBe(3);
  });

  it('should add event listener', () => {
    const wrapper = mount(<ScrollTracker {...props} />);
    spyOn(window, 'addEventListener');
    wrapper.instance().componentDidMount();
    expect(window.addEventListener).toBeCalled();
  });

  it('should remove event listener', () => {
    const wrapper = mount(<ScrollTracker {...props} />);
    spyOn(window, 'removeEventListener');
    wrapper.instance().componentWillUnmount();
    expect(window.removeEventListener).toBeCalled();
  });
});
