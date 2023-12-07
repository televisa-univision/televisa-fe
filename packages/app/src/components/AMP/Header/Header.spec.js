import React from 'react';
import { shallow, mount } from 'enzyme';

import getLogo from './logos';
import { DarkHeader, LightHeader, CustomHeader } from './Header.styles';
import AmpHeader from '.';

jest.mock('./logos', () => jest.fn());

describe('AmpHeader', () => {
  it('should render a dark header', () => {
    getLogo.mockReturnValue({
      variant: 'dark',
      url: '/test',
    });
    const wrapper = shallow(<AmpHeader />);
    expect(wrapper.find(DarkHeader)).toHaveLength(1);
  });

  it('should render a dark header', () => {
    getLogo.mockReturnValue({
      variant: 'light',
      url: '/test',
    });
    const wrapper = shallow(<AmpHeader />);
    expect(wrapper.find(LightHeader)).toHaveLength(1);
  });

  it('should replace the header component when ampHeaderBackgroundColor are set', () => {
    const theme = {
      ampHeaderBackgroundColor: 'red',
    };
    const wrapper = mount(<AmpHeader theme={theme} />);
    expect(wrapper.find('header')).toHaveLength(1);
  });

  it('should load CustomHeader with ampHeaderBackgroundColor', () => {
    const CustomHeaderComponent = CustomHeader({ theme: { ampHeaderBackgroundColor: 'red' } });
    const wrapper = mount(<CustomHeaderComponent />);
    expect(wrapper.find('header')).toHaveStyleRule('background-color', 'red');
  });
});
