/**
 * @module PrendeTV Navigation Specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import Navigation from '.';
import { PRENDE_TV_PARTNERS, TRACK_DATA } from '../../constants';
import PrendeTVContext from '../../context';

window.dataLayer = {
  push: jest.fn(),
};

/**
 * @test {Navigation}
 */
describe('Prende TV Static Navigation test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Navigation />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__List')).toHaveLength(1);
  });
  it('should render correctly if it is the footer', () => {
    const wrapper = mount(
      <Navigation isFooter />
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Navigation__List')).toHaveLength(1);
  });
  it('should assign the active class to the current path', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={{ lang: 'en', path: PRENDE_TV_PARTNERS }}>
        <Navigation />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.active')).toBeDefined();
  });
  it('should track the click event for press page', () => {
    const wrapper = mount(
      <Navigation />
    );
    wrapper
      .find('Navigation__Link')
      .first()
      .simulate('click');
    expect(window.dataLayer.push).toBeCalledWith({
      event: `click_${TRACK_DATA.press}`,
    });
  });
  it('should track the click event for blog page', () => {
    const wrapper = mount(
      <Navigation />
    );
    wrapper
      .find('Navigation__Link')
      .at(1)
      .simulate('click');
    expect(window.dataLayer.push).toBeCalledWith({
      event: `click_${TRACK_DATA.blog}`,
    });
  });
  it('should track the click event for business page', () => {
    const wrapper = mount(
      <Navigation />
    );
    wrapper
      .find('Navigation__Link')
      .at(2)
      .simulate('click');
    expect(window.dataLayer.push).toBeCalledWith({
      event: `click_${TRACK_DATA.business}`,
    });
  });
});
