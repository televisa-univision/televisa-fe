import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';

import { mockAllIsIntersecting } from '../../../__mocks__/intersection';
import VisibilityWrapper, { useIsInView } from '.';

jest.mock('@univision/fe-utilities/helpers/common/isClientSide', () => jest.fn());

window.IntersectionObserver = jest.fn();
window.IntersectionObserverEntry = jest.fn();

describe('VisibilityWrapper', () => {
  beforeAll(() => {
    isClientSide.mockReturnValue(true);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<VisibilityWrapper />, div);
  });

  it('should render correctly', async () => {
    const wrapper = mount(
      <VisibilityWrapper>
        <p>test</p>
      </VisibilityWrapper>
    );

    expect(wrapper.find('VisibilityWrapper').children().length).toBe(1);
  });

  it('should call onHide callback', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <VisibilityWrapper onHide={mockFn}>
        <p>test</p>
      </VisibilityWrapper>
    );

    act(() => {
      wrapper.setProps();
    });

    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call onHide callback if its not valid', async () => {
    const mockFn = 'test';
    const wrapper = mount(
      <VisibilityWrapper onHide={mockFn}>
        <p>test</p>
      </VisibilityWrapper>
    );

    act(() => {
      wrapper.setProps();
    });
  });

  it('should call onShow callback if its valid', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(
      <VisibilityWrapper onShow={mockFn}>
        <p>test</p>
      </VisibilityWrapper>
    );

    act(() => {
      mockAllIsIntersecting(true);
      wrapper.setProps();
    });

    expect(mockFn).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should not observe an invalid element', async () => {
    /**
     * Invalid component
     * @returns {JSX}
     */
    const Invalid = () => {
      const [ref, isIntersecting] = useIsInView();

      if (!ref.current || isIntersecting) return <p>fail</p>;

      return <p>works</p>;
    };

    const wrapper = mount(<Invalid />);

    expect(wrapper.text()).toEqual('fail');
  });

  it('should not set the state if its already visible', async () => {
    /**
     * Invalid component
     * @returns {JSX}
     */
    const Invalid = () => {
      const [ref, isIntersecting] = useIsInView({ percentage: 2 });

      if (isIntersecting) {
        return <p>intercepting</p>;
      }

      return <div ref={ref}>already visible</div>;
    };

    const wrapper = mount(<Invalid />);

    act(() => {
      mockAllIsIntersecting(true);
      wrapper.setProps();
    });

    expect(wrapper.text()).toEqual('already visible');
  });

  it('should not observe an if it does not support intersection observer', async () => {
    isClientSide.mockReturnValue(false);
    /**
     * Invalid component
     * @returns {JSX}
     */
    const Invalid = () => {
      const [ref, isIntersecting] = useIsInView();

      if (!ref.current || isIntersecting) return <p>fail</p>;

      return <p>works</p>;
    };

    const wrapper = mount(<Invalid />);

    expect(wrapper.text()).toEqual('fail');
  });
});
