import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import BreakPoint from '../../../utils/breakpoint/breakPointMediator';
import ResponsiveLoader from '.';

const store = {
  getState: jest.fn(() => ({
    page: {
      breakpoint: {
        size: 'lg',
        width: 1440,
        device: 'desktop',
      },
    },
  })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
};

/** @test {ResponsiveLoader} */
describe('ResponsiveLoader', () => {
  it('should render without crashing', () => {
    BreakPoint.value = 'sm';
    const wrapper = mount(<ResponsiveLoader breakpoints={['sm']}><div>Ad</div></ResponsiveLoader>);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('should be null if no breakpoint provided ', () => {
    BreakPoint.value = '';
    const wrapper = mount(<ResponsiveLoader><div>Ad</div></ResponsiveLoader>);
    expect(wrapper.find('div').length).toBe(0);
  });

  it('should display when current breakpoint is in array of given breakpoints', () => {
    const bk = ['sm', 'md', 'lg'];
    const currentBreakpoint = 'lg';

    BreakPoint.value = currentBreakpoint;

    const wrapper = mount(<ResponsiveLoader breakpoints={bk}><div>Ad</div></ResponsiveLoader>);

    expect(wrapper.state().display).toBeTruthy();
  });

  it('should NOT display when current breakpoint is outside array of given breakpoints', () => {
    const bk = ['sm', 'md'];
    const currentBreakpoint = 'lg';

    BreakPoint.value = currentBreakpoint;

    const wrapper = mount(<ResponsiveLoader breakpoints={bk}><div>Ad</div></ResponsiveLoader>);

    expect(wrapper.state().display).toBeFalsy();
  });

  it('should work with store context if breakpoint is null', () => {
    const bk = ['sm', 'md'];
    BreakPoint.value = null;
    const wrapper = mount(
      <Provider store={store}>
        <ResponsiveLoader breakpoints={bk}><div className="toShow">Ad</div></ResponsiveLoader>
      </Provider>
    );
    expect(wrapper.find('.toShow')).toHaveLength(0);
  });
});
