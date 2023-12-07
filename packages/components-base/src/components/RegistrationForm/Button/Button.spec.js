import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Button from '.';

/** @test Button */
describe('RegistrationForm Button', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button label="test" />, div);
  });
  it('should render with an icon', () => {
    const wrapper = mount(<Button label="test" icon="facebookRegistration" iconPositionRight />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should render with a solid background color', () => {
    const wrapper = mount(<Button label="test" backgroundColor="#666" />);
    expect(wrapper.find('Button__StyledButton')).toHaveStyleRule('background-color', '#666');
  });
  it('should render with a background gradient', () => {
    const gradient = {
      start: '#777',
      end: '#666',
    };
    const wrapper = mount(<Button label="test" gradient={gradient} />);
    expect(wrapper.find('Button__StyledButton'))
      .toHaveStyleRule('background', 'linear-gradient(90deg,#777 0%,#666 100%)');
  });
  it('should render with rounded style', () => {
    const wrapper = mount(<Button label="test" isRounded />);
    expect(wrapper.find('Button__StyledButton')).toHaveStyleRule('border-radius', '24px');
    expect(wrapper.find('Button__StyledButton')).toHaveStyleRule('letter-spacing', 'normal');
    expect(wrapper.find('Button__StyledButton')).toHaveStyleRule('text-transform', 'none');
  });
  it('should render with rounded style and icon', () => {
    const wrapper = mount(<Button label="test" icon="facebookRegistration" isRounded />);
    expect(wrapper.find('Button__Label')).toHaveStyleRule('margin-left', '16px');
  });
});
