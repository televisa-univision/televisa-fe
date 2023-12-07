import React from 'react';
import Loadable from 'react-loadable';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import ComplicatedExample from '.';

jest.useFakeTimers();

describe('Carousel component tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<ComplicatedExample />);
    jest.runAllTimers();
    expect(wrapper.getElement()).toBeDefined();
  });

  it('should call goToPage when the circle is clicked', async () => {
    window.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    spyOn(ComplicatedExample.prototype, 'goToPage').and.callThrough();
    const wrapper = mount(<ComplicatedExample />);
    jest.runAllTimers();
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    instance.carousel.current.setState({
      viewWidth: 999,
    });
    wrapper.update();
    const button = wrapper.find('.circle').at(2);
    button.simulate('click');
    expect(ComplicatedExample.prototype.goToPage).toHaveBeenCalledTimes(1);
  });

  it('should call next when the right arrow is clicked', async () => {
    window.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const nextSpy = jest.spyOn(ComplicatedExample.prototype, 'next');
    const wrapper = mount(<ComplicatedExample />);
    jest.runAllTimers();
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    instance.carousel.current.setState({
      viewWidth: 999,
    });
    wrapper.update();
    const button = wrapper.find('.rightArrow').children().at(0);
    button.prop('onClick')();
    expect(nextSpy).toHaveBeenCalledTimes(1);
  });

  it('should call prev when the left arrow is clicked', async () => {
    window.innerWidth = 1440;
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const prevSpy = jest.spyOn(ComplicatedExample.prototype, 'prev');
    const wrapper = mount(<ComplicatedExample />);
    jest.runAllTimers();
    const instance = wrapper.instance();
    await Loadable.preloadAll();
    instance.carousel.current.setState({
      viewWidth: 999,
    });
    wrapper.update();
    const button = wrapper.find('.leftArrow').children().at(0);
    button.prop('onClick')();
    expect(prevSpy).toHaveBeenCalledTimes(1);
  });
});
