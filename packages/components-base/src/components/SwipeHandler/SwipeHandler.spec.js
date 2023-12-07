import React from 'react';
import { mount } from 'enzyme';
import { motion } from 'framer-motion';

import SwipeHandlerPropInjector from '.';
import SwipeHandler from './SwipeHandler';

const disabled = {
  down: false,
  left: false,
  right: false,
  up: false,
};

describe('SwipeHandlerPropInjector component', () => {
  it('should render SwipeHandlerPropInjector', () => {
    const wrapper = mount(
      <SwipeHandlerPropInjector disabled={disabled}>
        <span>hello</span>
      </SwipeHandlerPropInjector>
    );
    expect(wrapper.find('SwipeHandler')).toHaveLength(1);
  });
});

describe('SwipeHandler component', () => {
  it('should render SwipeHandler', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    expect(wrapper.find('SwipeHandler')).toHaveLength(1);
  });

  it('should disable swipe if disabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: true,
          left: true,
          right: true,
          up: true,
        }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual(false);
  });

  it('should call onRight on drag end if threshold passed', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ right: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { x: 300, y: 0 }, velocity: { x: 200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).toHaveBeenCalled();
  });

  it('should call onRight failure transition on drag end if threshold not passed', async () => {
    const failureTransition = { opacity: 1 };
    const startControls = jest.fn();

    const wrapper = mount(
      <SwipeHandler
        controls={{ start: startControls }}
        disabled={disabled}
        swipeConfig={{ right: { failureTransition } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { x: 3, y: 0 }, velocity: { x: 1 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(startControls).toHaveBeenCalledWith(failureTransition);
  });

  it('should call onRight reset transition on drag end if threshold passed', async () => {
    const resetTransition = { opacity: 1 };
    const startControls = jest.fn();

    const wrapper = mount(
      <SwipeHandler
        controls={{ start: startControls }}
        disabled={disabled}
        swipeConfig={{ right: { onComplete: jest.fn(), resetTransition } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { x: 300, y: 0 }, velocity: { x: 200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(startControls).toHaveBeenCalledWith(resetTransition);
  });

  it('should not call onComplete on drag end if disabled', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: true,
          left: true,
          right: true,
          up: true,
        }}
        swipeConfig={{ right: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { x: 300, y: 0 }, velocity: { x: 200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('should call onLeft on drag end if threshold passed', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ left: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { x: -300, y: 0 }, velocity: { x: -200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).toHaveBeenCalled();
  });

  it('should call onUp on drag end if threshold passed', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ up: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { y: -300, x: 0 }, velocity: { y: -200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).toHaveBeenCalled();
  });

  it('should call onDown on drag end if threshold passed', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ down: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { y: 300, x: 0 }, velocity: { y: 200 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).toHaveBeenCalled();
  });

  it('should not call onDown on drag end if threshold not passed', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ down: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const eventInfo = { offset: { y: 0, x: 0 }, velocity: { y: 0 } };
    wrapper.find(motion.div).first().prop('onDragStart')({}, eventInfo);
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, eventInfo);
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('should not call onDown on drag end if velocity undefined', async () => {
    const onComplete = jest.fn();
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        swipeConfig={{ down: { onComplete } }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    wrapper.find(motion.div).first().prop('onDragStart')({}, { offset: { y: 10, x: 0 }, velocity: { y: 10 } });
    wrapper.update();
    const handleDragEnd = wrapper.find(motion.div).first().prop('onDragEnd');
    await handleDragEnd({}, { offset: { y: 10, x: 0 } });
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('should set the drag direction to x when horizontal swipe starts', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { x: 300, y: 0 }, velocity: { x: 200, y: 0 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('x');
  });

  it('should set the drag direction to y when vertical swipe starts', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { y: 300, x: 0 }, velocity: { y: 200, x: 0 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('y');
  });

  it('should prevent the swipe gesture if dragging on JW slider element', async () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleTapStart = wrapper.find(motion.div).first().prop('onTapStart');
    handleTapStart({ target: { closest: () => true } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual(false);
  });

  it('should prevent the swipe gesture if dragging on playlist elements', async () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleTapStart = wrapper.find(motion.div).first().prop('onTapStart');
    handleTapStart({ target: { closest: () => true } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual(false);
  });

  it('should not prevent the swipe gesture if not dragging on JW slider element', async () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleTapStart = wrapper.find(motion.div).first().prop('onTapStart');
    handleTapStart({ target: { closest: () => false } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual(true);
  });

  it('should reset gesture handling after each tap event', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span>hello</span>
      </SwipeHandler>
    );
    const handleTapEnd = wrapper.find(motion.div).first().prop('onTap');
    handleTapEnd();
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual(true);
  });

  it('should not render the sibling element if drag direction doesnt match', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={disabled}
        sibling={() => <p>hello world</p>}
        siblingVisiblity="y"
      >
        <span>hello</span>
      </SwipeHandler>
    );
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('should only allow vertical swipe if horizontal swipe is disabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: false,
          left: true,
          right: true,
          up: false,
        }}
        interpolatedStyle={{ test: true }}
        siblingVisiblity
      >
        <span>hello</span>
      </SwipeHandler>
    );
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('y');
  });

  it('should only allow horizontal swipe if vertical swipe is disabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: true,
          left: false,
          right: false,
          up: true,
        }}
        interpolatedStyle={{ test: true }}
        siblingVisiblity
      >
        <span>hello</span>
      </SwipeHandler>
    );
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('x');
  });

  it('should only allow horizontal swipe if swipe is horizontal and right is enabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: false,
          left: false,
          right: true,
          up: false,
        }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { x: 300, y: 0 }, velocity: { x: 200, y: 0 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('x');
  });

  it('should only allow horizontal swipe if swipe is horizontal and left is enabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: false,
          left: true,
          right: false,
          up: false,
        }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { x: 300, y: 0 }, velocity: { x: 200, y: 0 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('x');
  });

  it('should only allow vertical swipe if swipe is vertical and down is enabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: false,
          left: false,
          right: false,
          up: true,
        }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { x: 0, y: 300 }, velocity: { x: 0, y: 200 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('y');
  });

  it('should only allow vertical swipe if swipe is vertical and up is enabled', () => {
    const wrapper = mount(
      <SwipeHandler
        controls={{ start: jest.fn() }}
        disabled={{
          down: true,
          left: false,
          right: false,
          up: false,
        }}
      >
        <span>hello</span>
      </SwipeHandler>
    );
    const handleDragStart = wrapper.find(motion.div).first().prop('onDragStart');
    handleDragStart({}, { offset: { x: 0, y: 300 }, velocity: { x: 0, y: 200 } });
    wrapper.update();
    expect(wrapper.find(motion.div).first().prop('drag')).toEqual('y');
  });

  it('should render multiple children appropriately', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled}>
        <span key="player">player</span>
        <span key="playlist">player</span>
      </SwipeHandler>
    );
    expect(wrapper.find('span')).toHaveLength(2);
  });

  it('should render without animation', () => {
    const wrapper = mount(
      <SwipeHandler controls={{ start: jest.fn() }} disabled={disabled} disableAnimation>
        <span key="player">player</span>
      </SwipeHandler>
    );
    expect(wrapper.find('SwipeHandler__AnimatedDiv')).toHaveStyleRule(
      'transform',
      'initial !important'
    );
  });
});
