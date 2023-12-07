import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import usePosition, { getPosition } from '.';
import mutationDomChanges from '../../video/mutationDomChanges';

jest.mock('../../video/mutationDomChanges', () => jest.fn());

// eslint-disable-next-line require-jsdoc
const getBoundingClientRect = (left, top) => () => ({
  top, left,
});

describe('usePosition', () => {
  let dummyRef;
  beforeEach(() => {
    dummyRef = null;
  });
  /**
   * Dummy component
   * @returns {*}
   * @constructor
   */
  const DummyComponent = () => {
    const { left, top } = usePosition(dummyRef);
    // eslint-disable-next-line react/jsx-one-expression-per-line
    return <div>{left},{top}</div>;
  };

  it('should retrieve the element position', () => {
    const wrapper = shallow(<DummyComponent />);
    expect(wrapper.text()).toBe('0,0');
  });

  it('should react to resize window change changes', () => {
    dummyRef = {
      current: {
        getBoundingClientRect: getBoundingClientRect(10, 12),
      },
    };
    const wrapper = mount(<DummyComponent />);
    expect(wrapper.text()).toBe('10,12');
    act(() => {
      dummyRef.current.getBoundingClientRect = getBoundingClientRect(80, 90);
      window.dispatchEvent(new Event('resize'));
    });
    expect(wrapper.text()).toBe('80,90');
    act(() => {
      dummyRef.current.getBoundingClientRect = getBoundingClientRect(80, 90);
      window.dispatchEvent(new Event('resize'));
    });
    expect(wrapper.text()).toBe('80,90');
  });

  it('should remove resize listener on unmount', () => {
    window.removeEventListener = jest.fn();
    const wrapper = mount(<DummyComponent />);
    act(() => {
      window.removeEventListener.mockClear();
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });

  it('should remove mutation listener on unmount', () => {
    mutationDomChanges.mockImplementation(() => ({
      disconnect: jest.fn(),
    }));
    document.removeEventListener = jest.fn();
    const wrapper = mount(<DummyComponent />);
    act(() => {
      document.removeEventListener.mockClear();
      wrapper.unmount();
    });
    expect(document.removeEventListener).toHaveBeenCalledWith('DOMChildChanges', expect.any(Function));
  });
});

describe('getPosition', () => {
  it('should return get element position', () => {
    const element = {
      getBoundingClientRect: getBoundingClientRect(50, 50),
    };
    expect(getPosition(element)).toEqual({
      top: 50,
      left: 50,
    });
  });

  it('should return a default position of 0,0', () => {
    expect(getPosition({})).toEqual({
      top: 0,
      left: 0,
    });
  });
});
