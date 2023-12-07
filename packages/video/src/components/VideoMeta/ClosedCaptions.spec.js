import React from 'react';
import { shallow } from 'enzyme';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import ClosedCaptions from './ClosedCaptions';

let props;
let wrapper;

beforeEach(() => {
  jest.resetAllMocks();
  props = {
    mcpId: '123',
    variant: 'dark',
    captions: [{ begin: '00:00:10.456', content: 'Hello' }],
  };
  storeHelpers.getPageData = jest.fn(() => ({ data: { mcpid: '123' } }));
  wrapper = shallow(<ClosedCaptions {...props} />);
});

describe('[Video Meta] Closed Caption', () => {
  it('should render as expected', () => {
    wrapper.instance().variant = 'dark';
    wrapper.setState({ captionsOpen: true });
    expect(wrapper.text()).toContain('hello');
  });

  it('should be empty if no captions', () => {
    delete props.captions;
    wrapper = shallow(<ClosedCaptions {...props} />);
    expect(wrapper.text()).not.toContain('hello');
  });

  it('should be empty if not main video', () => {
    storeHelpers.getPageData.mockReturnValueOnce({ data: { mcpid: '456' } });
    wrapper = shallow(<ClosedCaptions {...props} />);
    expect(wrapper.text()).not.toContain('hello');
  });

  it('should fallback to empty string if no caption content', () => {
    props = {
      mcpId: '123',
      variant: 'dark',
      captions: [{ begin: '00:00:10.456', content: null }],
    };
    storeHelpers.getPageData.mockReturnValueOnce({ data: { mcpid: '123' } });
    wrapper = shallow(<ClosedCaptions {...props} />);
    expect(wrapper.text()).toContain('');
  });

  it('should update state as expected', () => {
    const instance = wrapper.instance();
    instance.variant = 'dark';
    wrapper.setState({ showCloseButton: true });
    instance.toggleCaptions();
    expect(wrapper.state('captionsOpen')).toBe(true);
  });

  it('should be empty if not main video', () => {
    storeHelpers.getPageData.mockReturnValueOnce({ data: { mcpid: '456' } });
    props = {
      mcpId: 123,
      variant: 'dark',
      captions: [{ begin: '00:00:10.456' }],
    };
    wrapper = shallow(<ClosedCaptions {...props} />);
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('should close captions', () => {
    global.window.scrollTo = jest.fn();
    const instance = wrapper.instance();
    instance.variant = 'light';
    wrapper.setState({ showCloseButton: true });
    instance.toggleCaptions();
    expect(wrapper.state('captionsOpen')).toBe(true);
    instance.closeCaptions();
    expect(wrapper.state('captionsOpen')).toBe(false);
  });

  it('should not position close button when captions open', () => {
    global.window.scrollTo = jest.fn();
    const instance = wrapper.instance();
    instance.toggleCaptions();
    instance.positionCloseButton = jest.fn();
    instance.toggleCaptions();
    expect(instance.positionCloseButton).not.toBeCalled();
  });

  it('should remove event listeners', () => {
    global.window.document.removeEventListener = jest.fn();
    const instance = wrapper.instance();
    instance.componentWillUnmount();
    expect(global.window.document.removeEventListener).toBeCalled();
  });

  it('should position captions', () => {
    const instance = wrapper.instance();
    instance.wrapperElem = {
      current: {
        getBoundingClientRect: () => ({
          right: 100,
        }),
      },
    };

    instance.closeElem = {
      current: {
        style: {},
      },
    };

    instance.showCloseButton();
    instance.positionCloseButton();
    expect(instance.closeElem.current.style.left).toBe('60px');
  });

  it('should show close button', () => {
    const instance = wrapper.instance();
    instance.toggleCaptionsElem = {
      current: {
        getBoundingClientRect: () => ({
          right: 100,
        }),
      },
    };
    instance.closeElem = null;
    instance.wrapperElem = {
      current: {
        getBoundingClientRect: () => ({
          right: 100,
        }),
      },
    };
    helpers.isInViewport = jest.fn();
    helpers.isInViewport.mockReturnValueOnce(false);
    instance.showCloseButton();
    instance.positionCloseButton();
    expect(wrapper.state('showCloseButton')).toBe(true);
  });
});
