import React from 'react';
import { shallow } from 'enzyme';

import RadioBar from './RadioBar';

jest.mock('../../compound/Toolbar/Toolbar', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    topOffset: 100,
    theme: {},
  };
});

/** @test {RadioBar} */
describe('RadioBar Spec', () => {
  it('stops scroll eventListener after mount', () => {
    global.window.removeEventListener = jest.fn();
    const wrapper = shallow(<RadioBar {...props} />);
    wrapper.instance().componentWillUnmount();
    expect(global.window.removeEventListener).toBeCalledWith('scroll', wrapper.instance().listenScrollEvent);
  });

  it('attaches scroll event listner to window', () => {
    global.window.addEventListener = jest.fn();
    const wrapper = shallow(<RadioBar {...props} />);
    wrapper.instance().componentDidMount();
    expect(global.window.addEventListener).toBeCalledWith('scroll', wrapper.instance().listenScrollEvent);
  });

  it('handles scrolling in the view', async () => {
    global.window.document.body.getBoundingClientRect = jest.fn(() => ({
      top: -110,
    }));
    const wrapper = shallow(<RadioBar {...props} />);
    wrapper.instance().listenScrollEvent();
    expect(wrapper.state('visible')).toBe(true);
  });

  it('handles scrolling in the view', async () => {
    global.window.document.body.getBoundingClientRect = jest.fn(() => ({
      top: -110,
    }));
    const wrapper = shallow(<RadioBar {...props} />);
    wrapper.instance().listenScrollEvent();
    expect(wrapper.state('visible')).toBe(true);
    wrapper.instance().listenScrollEvent();
    expect(wrapper.state('visible')).toBe(true);
  });

  it('handles scrolling out the view', async () => {
    global.window.document.body.getBoundingClientRect = jest.fn(() => ({
      top: 0,
    }));
    const wrapper = shallow(<RadioBar {...props} />);
    wrapper.instance().listenScrollEvent();
    expect(wrapper.state('visible')).toBe(false);
  });
});
