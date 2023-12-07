import React from 'react';
import { mount, shallow } from 'enzyme';

import Collapsible from '.';

const mockEvent = {
  preventDefault: jest.fn(),
};

/**
 * Create a new Collapsible component
 * @access private
 * @param {Object} props - additional props for creation
 * @returns {JSX}
 */
const makeCollapsible = (props = {}) => {
  const element = (
    <Collapsible {...props}>
      {
        props.children ? ({ colapse }) => props.children({ colapse }) : (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            sagittis elit id, blandit libero. In faucibus nisl ipsum,
            vitae venenatis est laoreet sit amet.
          </p>
        )
      }
    </Collapsible>
  );
  return mount(element);
};

/**
 * Custom Collapsible header
 * @access private
 * @returns {JSX}
 */
const Header = () => <div className="customHeader" />;

// The tests for "Collapsible" component
describe('Collapsible', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  it('should be rendered', () => {
    const wrapper = makeCollapsible();
    const { show, height } = wrapper.state();

    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('.collapsible')).toHaveLength(1);
    expect(height).toBe(0);
    expect(show).not.toBeTruthy();
    expect(wrapper.find('.header')).toHaveLength(1);
  });

  it('should have height 0 for collapsible element', () => {
    const wrapper = makeCollapsible();

    expect(wrapper.find('.wrapper').prop('style')).toEqual({ height: 0 });
  });

  it('should show the collapsible element', () => {
    const wrapper = makeCollapsible();
    const hideSpy = jest.spyOn(wrapper.instance(), 'hideHandler');

    wrapper.instance().toggleHandler(mockEvent);
    jest.runAllTimers();

    const { show, height } = wrapper.state();

    expect(show).toBeTruthy();
    expect(height).not.toBeNull();
    expect(height).not.toBeUndefined();
    expect(hideSpy).not.toHaveBeenCalled();
  });

  it('should return 0 as fallback height', () => {
    const wrapper = shallow(<Collapsible />);

    wrapper.instance().toggleHandler(mockEvent);

    const { height } = wrapper.state();

    expect(height).toBe(0);
    expect(height).not.toBeNull();
    expect(height).not.toBeUndefined();
  });

  it('should have the correct header', () => {
    const wrapper = makeCollapsible({ header: Header });

    expect(wrapper.prop('header')).toEqual(Header);
    expect(wrapper.find('.header')).toHaveLength(0);
    expect(wrapper.find('.customHeader')).toHaveLength(1);
  });

  it('should set the correct status to header', () => {
    const wrapper = makeCollapsible({ header: Header });
    let headerElement = wrapper.find('.toggle').children();

    expect(headerElement).toHaveLength(1);
    expect(headerElement.props().status).toBe('hide');

    wrapper.instance().toggleHandler(mockEvent);
    wrapper.update();
    headerElement = wrapper.find('.toggle').children();

    expect(headerElement.props().status).toBe('show');
  });

  it('should set height "auto" after transition ends when is showing', () => {
    const wrapper = makeCollapsible();

    wrapper.instance().toggleHandler(mockEvent);
    wrapper.find('.wrapper').simulate('transitionEnd');
    expect(wrapper.state('height')).toBe('auto');
  });

  it('should set height "0" after transition ends when is not showing', () => {
    const wrapper = makeCollapsible();

    wrapper.find('.wrapper').simulate('transitionEnd');
    expect(wrapper.state('height')).toBe(0);
  });

  it('should hide collapsible completely after state update', () => {
    const wrapper = makeCollapsible();

    wrapper.setState({
      show: true,
      height: 'auto',
    });
    wrapper.instance().toggleHandler(mockEvent);

    expect(window.setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
  });

  it('should fire "hideHandler" when "show" is false', () => {
    const wrapper = makeCollapsible();
    const hideSpy = jest.spyOn(wrapper.instance(), 'hideHandler');

    wrapper.setState({
      show: true,
      height: 'auto',
    });
    wrapper.instance().toggleHandler(mockEvent);
    jest.runAllTimers();

    expect(hideSpy).toHaveBeenCalled();
    expect(wrapper.state('height')).toBe(0);
    expect(wrapper.state('show')).toBe(false);
  });

  it('should fire "toggleHandler" when the button is clicked', () => {
    const wrapper = makeCollapsible();
    const toggleSpy = jest.spyOn(wrapper.instance(), 'toggleHandler');
    const preventSpy = jest.spyOn(mockEvent, 'preventDefault');

    wrapper.instance().forceUpdate();
    wrapper.find('.toggle').simulate('click');

    expect(toggleSpy).toHaveBeenCalled();
    expect(preventSpy).toHaveBeenCalled();
    expect(wrapper.state('show')).toBeTruthy();
    expect(wrapper.find('.wrapper').hasClass('isOpen')).toBeTruthy();
  });

  it('should fire "toggleHandler" from children', () => {
    // eslint-disable-next-line react/prop-types,require-jsdoc
    const customButton = ({ colapse }) => {
      return <button type="button" className="customButton" onClick={colapse} />;
    };
    const wrapper = makeCollapsible({
      children: customButton,
    });
    const toggleSpy = jest.spyOn(wrapper.instance(), 'toggleHandler');
    const preventSpy = jest.spyOn(mockEvent, 'preventDefault');

    wrapper.instance().forceUpdate();
    expect(wrapper.find('.customButton')).toHaveLength(1);
    wrapper.find('.customButton').simulate('click');

    expect(toggleSpy).toHaveBeenCalled();
    expect(preventSpy).toHaveBeenCalled();
    expect(wrapper.state('show')).toBeTruthy();
    expect(wrapper.find('.wrapper').hasClass('isOpen')).toBeTruthy();
  });

  it('should fire "onChange" when status changed', () => {
    const changeHandler = jest.fn();
    const wrapper = makeCollapsible({ onChange: changeHandler });

    wrapper.instance().toggleHandler(mockEvent);
    jest.runAllTimers();

    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(changeHandler).toHaveBeenCalledWith('show');

    wrapper.instance().toggleHandler(mockEvent);
    jest.runAllTimers();

    expect(changeHandler).toHaveBeenCalledWith('hide');
  });

  it('should clear the timeout when component unmounts', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const wrapper = makeCollapsible();
    wrapper.setState({
      show: true,
      height: 'auto',
    });
    const wrapperInstance = wrapper.instance();
    wrapperInstance.toggleHandler(mockEvent);
    wrapperInstance.timeout = 1;
    wrapperInstance.componentWillUnmount();
    expect(clearTimeoutSpy).toHaveBeenCalledWith(1);
    clearTimeoutSpy.mockRestore();
  });
});
