import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressBar from '.';

describe('ProgressBar component tests', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ProgressBar />);
    expect(wrapper.getElement()).toBeDefined();
  });

  it('should add borderRadius if rounded is true', () => {
    const wrapper = mount(<ProgressBar rounded trailSize={20} />);
    expect(wrapper.find('ProgressBar__Trail').props().style.borderRadius).toBe('10px');
  });

  it('should set the percet to 100 if highter than 100', () => {
    const wrapper = mount(<ProgressBar rounded percent={200} />);
    expect(wrapper.find('ProgressBar__Bar').props().style.transform).toBe('translate3d(-0%,0,0)');
  });
});
