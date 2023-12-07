import React from 'react';
import { shallow } from 'enzyme';

import getLogo from './logos';
import { DarkHeader, LightHeader } from './AmpHeader.styles';
import AmpHeader from './AmpHeader';

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
});
