import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { mockAllIsIntersecting, getAllInstances } from '../../../../__mocks__/intersection';
import LazyWrapper from '.';

const onShow = jest.fn();

describe('LazyWrapper', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LazyWrapper onShow={onShow} />, div);
  });

  it('should not call onShow if element is not intersecting', () => {
    const wrapper = mount(
      <LazyWrapper onShow={onShow} />,
    );

    act(() => {
      mockAllIsIntersecting(false);
    });

    wrapper.update();

    expect(onShow).not.toHaveBeenCalled();
  });

  it('should call onShow if element is intersecting', () => {
    const wrapper = mount(
      <LazyWrapper onShow={onShow} />,
    );

    act(() => {
      mockAllIsIntersecting(true);
    });

    wrapper.update();

    expect(onShow).toHaveBeenCalled();
  });

  it('should call onShow single time and then unObserve', () => {
    onShow.mockClear();
    const wrapper = mount(
      <LazyWrapper onShow={onShow} once />,
    );

    act(() => {
      mockAllIsIntersecting(true);
    });

    wrapper.update();

    const instances = getAllInstances();

    expect(onShow).toHaveBeenCalledTimes(1);
    expect(instances.size).toBe(0);
  });
});
