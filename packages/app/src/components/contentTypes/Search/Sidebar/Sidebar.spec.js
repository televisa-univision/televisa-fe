import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Sidebar from '.';
import Styles from './Sidebar.scss';

const parent = { current: { clientHeight: 100, offsetTop: 50 } };
const container = { current: { clientHeight: 100 } };

let clientTop = -100;
const getBoundingClientRect = jest.fn(() => (
  {
    top: clientTop,
  }
));

const props = {
  parent,
  container,
};

describe('Search Page Form', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
  });

  it('should render the sidebar element', () => {
    const wrapper = mount(<Sidebar {...props} />);
    expect(wrapper.find(`.${Styles.sidebar}`).length).toBe(1);
  });

  it('should add event listener on componentDidMount', () => {
    const wrapper = mount(<Sidebar {...props} />);
    spyOn(window, 'addEventListener');
    wrapper.instance().componentDidMount();
    expect(window.addEventListener).toBeCalled();
  });

  it('should remove event listener on componentWillUnmount', () => {
    const wrapper = mount(<Sidebar {...props} />);
    spyOn(window, 'removeEventListener');
    wrapper.instance().componentWillUnmount();
    expect(window.removeEventListener).toBeCalled();
  });

  it('check the fixed and absolute position', () => {
    const wrapper = mount(<Sidebar {...props} />);
    const instance = wrapper.instance();
    instance.sidebar.current.getBoundingClientRect = getBoundingClientRect;
    wrapper.setProps({ container: { current: { clientHeight: 200 } } });
    instance.handleScrolling();
    expect(instance.sidebar.current.classList[3]).toBe('sticky');
    clientTop = 100;
    instance.sidebar.current.getBoundingClientRect = getBoundingClientRect;
    instance.handleScrolling();
    expect(instance.sidebar.current.classList[3]).not.toBe('sticky');
    document.body.scrollTop = -100;
    instance.handleScrolling();
    wrapper.setProps({ container: { current: { clientHeight: 0 } } });
    instance.handleScrolling();
    document.body.scrollTop = 120;
    wrapper.setProps({ container: { current: { clientHeight: 200 } } });
    clientTop = 20;
    instance.sidebar.current.getBoundingClientRect = getBoundingClientRect;
    instance.handleScrolling();
    instance.sidebar.current = null;
    instance.handleScrolling();
  });
});
