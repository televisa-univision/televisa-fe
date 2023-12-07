import React from 'react';
import { mount } from 'enzyme';
import { motion } from 'framer-motion';
import SwipeToDismissWrapper from '.';
import SwipeToDismiss from './SwipeToDismiss';

describe('SwipeToDismissWrapper component', () => {
  it('should render SwipeToDismissWrapper', () => {
    const wrapper = mount(
      <SwipeToDismissWrapper onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismissWrapper>
    );
    expect(wrapper.find('SwipeToDismiss')).toHaveLength(1);
  });
});

describe('SwipeToDismissWrapper component', () => {
  it('should render SwipeToDismissWrapper', () => {
    const wrapper = mount(
      <SwipeToDismissWrapper onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismissWrapper>
    );
    expect(wrapper.find('SwipeToDismiss')).toHaveLength(1);
  });

  it('should render SwipeToDismiss', () => {
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    expect(wrapper.find('span')).toHaveLength(1);
  });

  it('should disable swipe if disabled', () => {
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} disabled onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    expect(wrapper.find(motion.div).prop('drag')).toEqual(false);
  });

  it('should dismiss on drag end if threshold passed', async () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={onDismiss}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    const handleDragEnd = wrapper.find(motion.div).prop('onDragEnd');
    await handleDragEnd({}, { offset: { x: 300 }, velocity: { x: 200 } });
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should not dismiss on drag end if threshold not passed', async () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={onDismiss}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    const handleDragEnd = wrapper.find(motion.div).prop('onDragEnd');
    await handleDragEnd({}, { offset: { x: 100 }, velocity: { x: 200 } });
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('should prevent the swipe gesture if dragging on JW slider element', async () => {
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    const handleTapStart = wrapper.find(motion.div).prop('onTapStart');
    handleTapStart({ target: { closest: () => true } });
    wrapper.update();
    expect(wrapper.find(motion.div).prop('drag')).toEqual(false);
  });

  it('should not prevent the swipe gesture if not dragging on JW slider element', async () => {
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    const handleTapStart = wrapper.find(motion.div).prop('onTapStart');
    handleTapStart({ target: { closest: () => false } });
    wrapper.update();
    expect(wrapper.find(motion.div).prop('drag')).toEqual('x');
  });

  it('should reset gesture handling after each tap event', () => {
    const wrapper = mount(
      <SwipeToDismiss controls={{ start: jest.fn() }} onDismiss={jest.fn()}>
        <span>hello</span>
      </SwipeToDismiss>
    );
    const handleTapEnd = wrapper.find(motion.div).prop('onTap');
    handleTapEnd();
    wrapper.update();
    expect(wrapper.find(motion.div).prop('drag')).toEqual('x');
  });
});
