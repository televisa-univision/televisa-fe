import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import ShareBar from '.';

jest.mock('../Button', () => jest.fn());

/** @test {ShareBar} */
describe('ShareBar ', () => {
  let store;

  beforeEach(() => {
    store = configureStore();
  });

  it('should show comparte text if showComparte is true', () => {
    const wrapper = mount(<Provider store={store}><ShareBar showComparte /></Provider>);
    expect(wrapper.find('ShareBar___StyledDiv')
      .text()
      .toLowerCase())
      .toBe('comparte');
  });

  it('should render the passed in share buttons', () => {
    const wrapper = mount(<Provider store={store}><ShareBar stack compact /></Provider>);
    expect(wrapper.find('Link').length).toBe(3);
  });

  it('should render the css classes', () => {
    const className = 'blue';
    const wrapper = mount(<Provider store={store}><ShareBar className={className} /></Provider>);
    expect(wrapper.find(`div.${className}`).length).toBe(1);
  });

  it('should not render extraneous classes', () => {
    const className = 'blue';
    const wrapper = mount(<Provider store={store}><ShareBar className={className} /></Provider>);
    expect(wrapper.find('div.nonExistingClass').length).toBe(0);
  });

  it('should pass network name to onClick', () => {
    const click = jest.fn();
    const wrapper = mount(<Provider store={store}><ShareBar onClick={click} /></Provider>);
    wrapper.find('ShareButton').first().simulate('click', 'event');
    expect(click).toBeCalled();
  });

  it('collapses on mobile', () => {
    const wrapper = shallow(<ShareBar stack mobileCollapse device="mobile" />);
    const btn = wrapper.find('.toggleButton');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(wrapper.state('open')).toBe(true);
  });

  it('should render with a Theme color on icon', () => {
    const wrapper = shallow(<ShareBar stack mobileCollapse device="mobile" themeIcon={{ primary: 'red' }} />);
    expect(wrapper.find('Icon[name="shareSpider"]').prop('fill')).toBe('red');
  });

  it('should render "Comparte" if NOT English', () => {
    const wrapper = shallow(<ShareBar />);
    expect(wrapper.find('.comparte').text()).toEqual('Comparte');
  });

  it('should render "Share" if English', () => {
    const wrapper = shallow(<ShareBar language="en" />);
    expect(wrapper.find('.comparte').text()).toEqual('Share');
  });

  it('should render "Share This Gallery" if english and clue is active', () => {
    const wrapper = shallow(<ShareBar language="en" showShareClue />);
    expect(wrapper.find('.comparte').text()).toEqual('Share This Gallery');
  });

  it('should render "Comparte Ésta Galería" if NOT english and clue is active', () => {
    const wrapper = shallow(<ShareBar showShareClue />);
    expect(wrapper.find('.comparte').text()).toEqual('Comparte Ésta Galería');
  });
});
