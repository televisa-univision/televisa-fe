import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { mockAllIsIntersecting } from '../__mocks__/intersection';
import useIntersectionObserver from '.';

describe('useIntersectionObsever hook', () => {
  it('should get elRef, initial observer ref and empty entries', () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.observerRef).toBeDefined();
    expect(result.current.elRef).toBeDefined();
    expect(result.current.entries).toEqual([]);
  });

  it('should call onShow when entry is intersecting', () => {
    const onShow = jest.fn();
    // eslint-disable-next-line require-jsdoc
    const Component = () => {
      const { elRef, entries } = useIntersectionObserver();

      if (entries?.[0]?.isIntersecting) {
        onShow();
      }

      return <div ref={elRef} />;
    };

    const wrapper = mount(<Component />);
    act(() => {
      mockAllIsIntersecting(true);
    });

    wrapper.update();

    expect(onShow).toHaveBeenCalled();
  });

  it('should return null observerRef if intersection is not supported', () => {
    const { IntersectionObserver } = global.window;
    delete global.window.IntersectionObserver;
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.observerRef.current).toBe(null);
    global.window.IntersectionObserver = IntersectionObserver;
  });

  it('should return empty object if intersection observer is disabled', () => {
    const { IntersectionObserver } = global.window;
    delete global.window.IntersectionObserver;
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.observerRef.current).toBe(null);
    global.window.IntersectionObserver = IntersectionObserver;
  });
});
