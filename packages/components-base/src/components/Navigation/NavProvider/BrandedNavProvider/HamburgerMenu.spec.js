import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import HamburgerMenu from './HamburgerMenu';

describe('HamburgerMenu suite', () => {
  const theme = {
    isBrandedHeaderBlack: false,
  };

  it('should render without crashing', () => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <HamburgerMenu setHamburgerClosed={jest.fn()} setHamburgerOpen={jest.fn()} />
      </ThemeProvider>
    );
    expect(wrapper.find('HamburgerMenu__Wrapper')).toHaveLength(1);
  });
  it('should call the hamburger open method when the button is clicked', () => {
    const mockFunction = jest.fn();
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <HamburgerMenu setHamburgerClosed={jest.fn()} setHamburgerOpen={mockFunction} />
      </ThemeProvider>
    );
    wrapper.find('button.sectionsBtn').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
  it('should call the hamburger closed method when the button is clicked', () => {
    const mockFunction = jest.fn();
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <HamburgerMenu
          setHamburgerClosed={mockFunction}
          setHamburgerOpen={jest.fn()}
          isHamburgerMenuOpen
        />
      </ThemeProvider>
    );
    wrapper.find('button.sectionsBtn').simulate('click');
    expect(mockFunction).toHaveBeenCalled();
  });
  it('should apply the dark variant if theme has the prop enabled', () => {
    const darkTheme = { isBrandedHeaderBlack: true };
    const wrapper = mount(
      <ThemeProvider theme={darkTheme}>
        <HamburgerMenu
          theme={darkTheme}
          setHamburgerClosed={jest.fn()}
          setHamburgerOpen={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(wrapper.find('HamburgerMenu__Wrapper').prop('variant')).toBe('dark');
  });
});
