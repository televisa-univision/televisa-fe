/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import { asDeferrer, useDefer } from '.';

jest.useFakeTimers();
describe('Deferrer', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should work with Hooks', () => {
    const wrapper = mount(<WithHook />);
    expect(wrapper.text()).toBe('1');
    jest.runAllTimers();

    // Execute the deffered function
    expect(wrapper.text()).toBe('2');

    // Clear the timeout
    wrapper.unmount();
    expect(window.clearTimeout).toHaveBeenCalled();
  });

  it('should work with React classes without componentWillUnmount', () => {
    const wrapper = shallow(<WithoutComponentWillUnmount />);
    const instance = wrapper.instance();
    // Add the deferred function in componentDidMount
    expect(instance.deferredFunctions).toHaveLength(1);
    // expect(window.setTimeout).toHaveBeenCalledWith(instance.test);
    expect(wrapper.state('test')).toBe(3);

    jest.runAllTimers();
    // Execute the deferred function
    expect(wrapper.state('test')).toBe(2);

    // Clear the timeouts
    wrapper.unmount();
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(instance.deferredFunctions).toHaveLength(0);
  });

  it('should work with React classes with componentWillUnmount', () => {
    const wrapper = shallow(<WithComponentWillUnmount />);
    const instance = wrapper.instance();
    // Add the deferred function in componentDidMount
    expect(instance.deferredFunctions).toHaveLength(1);
    // expect(window.setTimeout).toHaveBeenCalledWith(instance.test);
    expect(wrapper.state('test')).toBe(3);

    jest.runAllTimers();
    // Execute the deferred function
    expect(wrapper.state('test')).toBe(2);

    // Clear the timeouts
    wrapper.unmount();
    expect(window.clearTimeout).toHaveBeenCalled();
    expect(instance.deferredFunctions).toHaveLength(0);
    expect(window.unmountedValue).toBe(2);
  });
});

/**
 * Test
 */
@asDeferrer
class WithoutComponentWillUnmount extends React.Component {
  state = {
    test: 1,
  };

  /**
   * Test
   */
  componentDidMount() {
    this.defer(this.test);
    this.setState({ test: 3 });
  }

  /**
   * Test
   */
  test() {
    this.setState({ test: 2 });
  }

  /**
   * Test
   * @returns {number} test
   */
  render() {
    const { test } = this.state;
    return test;
  }
}

/**
 * Test
 */
@asDeferrer
class WithComponentWillUnmount extends React.Component {
  state = {
    test: 1,
  };

  /**
   * Test
   */
  componentDidMount() {
    this.defer(this.test);
    this.setState({ test: 3 });
  }

  /**
   * Test
   */
  componentWillUnmount() {
    const { test } = this.state;
    window.unmountedValue = test;
  }

  /**
   * Test
   */
  test() {
    this.setState({ test: 2 });
  }

  /**
   * Test
   * @returns {number} test
   */
  render() {
    const { test } = this.state;
    return test;
  }
}

/**
 * Test
 * @returns {JSX} test
 */
const WithHook = () => {
  const [test, setTest] = useState(1);
  useDefer(() => {
    setTest(2);
  });
  return <div>{test}</div>;
};
