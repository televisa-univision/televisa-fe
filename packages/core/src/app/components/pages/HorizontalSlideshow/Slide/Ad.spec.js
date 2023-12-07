import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Ad from './Ad';

jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => 'DFPAd');

/** @test {AdSlide} */
describe('Ad', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Ad active />, div);
  });

  it('should not render anything if ad slide is not active', () => {
    const wrapper = shallow(<Ad />);
    expect(wrapper.find('DFPAd').exists()).toBe(false);
  });

  it('should render ad if ad slide is active', () => {
    const wrapper = shallow(<Ad active />);
    expect(wrapper.find('DFPAd').exists()).toBe(true);
  });

  it('should implement shouldComponentUpdate so it returns false is ad was displayed', () => {
    const wrapper = shallow(<Ad active />);

    expect(wrapper.instance().shouldComponentUpdate()).toBe(false);
  });
});
