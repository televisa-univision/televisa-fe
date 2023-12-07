import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';

import AdSlide from './AdSlide';

jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => 'DFPAd');

/** @test {AdSlide} */
describe('AdSlide', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdSlide active />, div);
  });

  it('should render DFPAd component', () => {
    const wrapper = mount(<AdSlide active />);
    expect(wrapper.find('DFPAd').length).toBe(1);
  });

  it('should render custom-ad component', () => {
    const wrapper = mount(<AdSlide advertisement={<custom-ad />} active />);
    expect(wrapper.find('custom-ad').length).toBe(1);
  });

  it('should render empty div when inactive', () => {
    const wrapper = shallow(<AdSlide active={false} />);
    expect(wrapper.find('DFPAd').length).toBe(0);
  });

  it('should call dispatch if active', () => {
    Store.dispatch = jest.fn();
    const wrapper = shallow(<AdSlide active />);
    wrapper.instance().componentDidUpdate();
    expect(Store.dispatch).toHaveBeenCalled();
  });

  it('should not call dispatch if not active', () => {
    Store.dispatch = jest.fn();
    const wrapper = shallow(<AdSlide />);
    wrapper.instance().componentDidUpdate();
    expect(Store.dispatch).not.toHaveBeenCalled();
  });

  it('should call renderSimpleStatus if prop is passed', () => {
    const mock = jest.fn();
    shallow(<AdSlide renderSimpleStatus={mock} />);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
