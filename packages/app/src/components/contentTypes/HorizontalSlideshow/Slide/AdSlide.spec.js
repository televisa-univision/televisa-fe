/* eslint-disable require-jsdoc */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import AdSlide from './AdSlide';

jest.mock('react-loadable');
jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => {
  const DfpAd = () => <div>test</div>;

  return DfpAd;
});

/** @test {AdSlide} */
describe('AdSlide', () => {
  const props = {
    shouldRefresh: jest.fn(),
    hideAdByIds: jest.fn(),
  };

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdSlide {...props} active />, div);
  });

  it('should render DFPAd component', () => {
    const wrapper = mount(<AdSlide {...props} active />);
    expect(wrapper.find('DfpAd').length).toBe(1);
  });

  it('should render custom-ad component', () => {
    const wrapper = mount(<AdSlide {...props} advertisement={<custom-ad />} active />);
    expect(wrapper.find('custom-ad').length).toBe(1);
  });

  it('should render empty div when inactive', () => {
    const wrapper = shallow(<AdSlide {...props} active={false} />);
    wrapper.instance().componentDidUpdate();
    expect(wrapper.find('DfpAd').length).toBe(0);
  });

  it('should call shouldRefresh if active', () => {
    const wrapper = shallow(<AdSlide {...props} active />);
    wrapper.instance().componentDidUpdate();
    expect(props.shouldRefresh).toHaveBeenCalled();
  });

  it('should call renderSimpleStatus if prop is passed', () => {
    const mock = jest.fn();
    shallow(<AdSlide {...props} renderSimpleStatus={mock} />);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
