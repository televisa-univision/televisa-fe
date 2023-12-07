import React from 'react';
import { mount } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import { lockUnlockBody } from '../../helpers';
import PlayerSwipeController from './PlayerSwipeController';

jest.mock('../../helpers', () => ({
  lockUnlockBody: jest.fn(),
}));

describe('PlayerSwipeController component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should render PlayerSwipeController', () => {
    const wrapper = mount(
      <PlayerSwipeController>
        <span>hello</span>
      </PlayerSwipeController>
    );
    expect(wrapper.find('SwipeHandler')).toHaveLength(1);
  });

  it('should add the appropriate disabled state to the SwipeHandler', () => {
    const wrapper = mount(
      <PlayerSwipeController disabled>
        <span>hello</span>
      </PlayerSwipeController>
    );
    expect(wrapper.find('SwipeHandler').prop('disabled')).toEqual({
      down: true,
      left: true,
      right: true,
      up: true,
    });
  });

  it('should add the appropriate disabled state when it is expanded', () => {
    const wrapper = mount(
      <PlayerSwipeController isExpanded expandChild={jest.fn()}>
        <span>hello</span>
      </PlayerSwipeController>
    );

    const swipeConfig = wrapper.find('SwipeHandler').prop('swipeConfig');
    swipeConfig.up.onComplete();
    wrapper.update();

    expect(wrapper.find('SwipeHandler').prop('disabled')).toEqual({
      down: false,
      left: true,
      right: true,
      up: true,
    });
  });

  it('should add the appropriate disabled state when disableUp', () => {
    const wrapper = mount(
      <PlayerSwipeController disableUp>
        <span>hello</span>
      </PlayerSwipeController>
    );

    const swipeConfig = wrapper.find('SwipeHandler').prop('swipeConfig');
    swipeConfig.up.onComplete();
    wrapper.update();

    expect(wrapper.find('SwipeHandler').prop('disabled')).toEqual({
      down: true,
      left: true,
      right: false,
      up: true,
    });
  });

  it('should not call lockUnlockBody on swipe when not isMobile', () => {
    const wrapper = mount(
      <PlayerSwipeController isExpanded expandChild={jest.fn()}>
        <span>hello</span>
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.down.onComplete();
    config.up.onComplete();
    expect(lockUnlockBody.mock.instances.length).toBe(0);
  });

  it('should call onChange on swipe up', () => {
    const props = {
      onChange: jest.fn(),
      expandChild: jest.fn(),
    };

    const wrapper = mount(
      <PlayerSwipeController isExpanded {...props}>
        {[
          <span>hello</span>,
        ]}
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.down.onComplete();
    config.up.onComplete();
    expect(props.onChange).toBeCalled();
  });

  it('should call onClose on swipe right', () => {
    const props = {
      onClose: jest.fn(),
      expandChild: jest.fn(),
      onChange: jest.fn(),
    };

    const wrapper = mount(
      <PlayerSwipeController isExpanded {...props}>
        {[
          <span>hello</span>,
        ]}
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.right.onComplete();
    config.up.onComplete();
    expect(props.onClose).toBeCalled();
  });

  it('should call onClose on swipe right', () => {
    const props = {
      onClose: jest.fn(),
      expandChild: jest.fn(),
      onChange: jest.fn(),
    };

    const wrapper = mount(
      <PlayerSwipeController isExpanded {...props}>
        {[
          <span>hello</span>,
        ]}
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.right.onComplete();
    config.up.onComplete();
    expect(props.onClose).toBeCalled();
  });

  it('should not call onChange on swipe up', () => {
    const props = {
      onChange: jest.fn(),
      expandChild: jest.fn(),
    };

    helpers.isValidFunction = jest.fn(() => false);
    const wrapper = mount(
      <PlayerSwipeController isExpanded {...props}>
        {[
          <span>hello</span>,
        ]}
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.down.onComplete();
    config.up.onComplete();
    expect(props.onChange).not.toBeCalled();
  });

  it('should call onClose on swipe right', () => {
    helpers.isValidFunction = jest.fn(() => false);
    const props = {
      onClose: jest.fn(),
      expandChild: jest.fn(),
      onChange: jest.fn(),
    };

    const wrapper = mount(
      <PlayerSwipeController isExpanded {...props}>
        {[
          <span>hello</span>,
        ]}
      </PlayerSwipeController>
    );
    const config = wrapper.find('SwipeHandler').prop('swipeConfig');

    config.right.onComplete();
    config.up.onComplete();
    expect(props.onClose).not.toBeCalled();
  });
});
