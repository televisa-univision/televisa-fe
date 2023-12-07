import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import ListButton from '.';

describe('ListButton suite', () => {
  it('should render if no theme provider is available', () => {
    const wrapper = mount(<ListButton />);
    expect(wrapper.find('ListButton__StyledButton')).toHaveLength(1);
  });
  it('should render with the gradient in theme provider', () => {
    const wrapper = mount(
      <ThemeProvider theme={{ gradient: { start: '#000', end: '#000' } }}>
        <ListButton />
      </ThemeProvider>
    );
    expect(wrapper.find('ListButton__StyledButton')).toHaveLength(1);
    expect(wrapper.find('ListButton__StyledButton')).toHaveStyleRule('background', 'linear-gradient(270deg,#000 0%,#000 100%)');
  });

  it('should have the prop isWorldCupMVP', () => {
    const wrapper = mount(<ListButton />);
    expect(wrapper.find('ListButton__StyledButton').prop('isWorldCupMVP'));
  });
  it('should have the prop isWorldCupMVP ', () => {
    const wrapper = mount(<ListButton isWorldCupMVP />);
    const buttonStyle = wrapper.find('ListButton__StyledButton').getDOMNode();
    expect(getComputedStyle(buttonStyle).getPropertyValue('font-family')).toBe("'Roboto Flex',Helvetica,Arial,sans-serif");
  });
});
