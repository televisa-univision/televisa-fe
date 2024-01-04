import React from 'react';
import { shallow, mount } from 'enzyme';
import TelevisaLink, { logo } from './TelevisaLink';

describe('<TelevisaLink />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<TelevisaLink />);
    expect(wrapper.exists()).toBe(true);
  });

  it('passes correct props to HeaderImageLink', () => {
    const isMobile = true;

    const wrapper = shallow(<TelevisaLink isMobile={isMobile} />);

    const Icon = wrapper.find('Icon');
    expect(Icon).toHaveLength(1);
    const {
      href,
      text,
      icon,
      viewBox,
    } = logo;
    expect(Icon.props()).toEqual({
      href,
      text,
      name: icon,
      icon,
      viewBox,
      size: 'medium',
    });
  });

  it('passes correct props to HeaderImageLink', () => {
    const isMobile = true;

    const wrapper = mount(<TelevisaLink isMobile={isMobile} isDark />);

    const Icon = wrapper.find('Icon');
    expect(Icon).toHaveLength(1);
    const {
      href,
      text,
    } = logo;
    expect(Icon.props()).toEqual({
      href,
      text,
      name: 'televisaAppBlack',
      icon: 'televisaAppBlack',
      viewBox: '0 0 60 45',
      size: 'medium',
    });
  });
});
