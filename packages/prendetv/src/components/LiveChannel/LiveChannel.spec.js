/**
 * @module PrendeTV Live Channel Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import LiveChannel from '.';
import { PRENDE_TV_PARTNERS } from '../../constants';

/**
 * @test {LiveChannel}
 */
describe('Prende TV Static LiveChannel test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LiveChannel text="text" />, div);
  });

  it('should render correctly if the device is mobile', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LiveChannel device="mobile" />, div);
  });
  it('should render correctly if the bulltes is present', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LiveChannel device="desktop" bullets={['1', '2']} />, div);
  });

  it('should render correctly if it is business page', () => {
    const wrapper = mount(<LiveChannel text="text" device="mobile" page={PRENDE_TV_PARTNERS} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('LiveChannel__Wrapper')).toHaveLength(1);
    expect(wrapper.find('LiveChannel__Image').prop('src')).toBe('https://st1.uvnimg.com/00/3e/4b560466425e8cf0fbcceb471990/clever-partners-mobile.png');
  });
  it('should render correctly if it is business page on desktop', () => {
    const wrapper = mount(<LiveChannel text="text" device="desktop" page={PRENDE_TV_PARTNERS} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('LiveChannel__Wrapper')).toHaveLength(1);
    expect(wrapper.find('LiveChannel__Image').prop('src')).toBe('https://st1.uvnimg.com/79/d6/cda679354ecfa9b03efb9cb191dc/clever-partners-desktop.png');
  });
});
