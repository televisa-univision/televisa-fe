import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import AmpIcon from '../icon/AmpIcon';
import AmpFooter from './AmpFooter';
import { Footer, FooterImageLink } from './AmpFooter.styles';

describe('AmpFooter', () => {
  beforeEach(() => {
    storeHelpers.getTheme = jest.fn();
    storeHelpers.isTudnSite = jest.fn();
  });
  it('should render as expected', () => {
    const wrapper = mount(<AmpFooter />);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(FooterImageLink)).toHaveLength(6);
  });

  it('should use the light variant', () => {
    const theme = { variant: 'light', primary: '#000' };
    storeHelpers.getTheme.mockReturnValue(theme);
    storeHelpers.isTudnSite.mockReturnValue(false);
    const wrapper = mount(<ThemeProvider theme={theme}><AmpFooter /></ThemeProvider>);
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#000');
  });

  it('should use the dark variant', () => {
    const theme = { variant: 'dark', primary: '#fff' };
    storeHelpers.getTheme.mockReturnValue(theme);
    storeHelpers.isTudnSite.mockReturnValue(false);
    const wrapper = mount(<ThemeProvider theme={theme}><AmpFooter /></ThemeProvider>);
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#fff');
  });
  it('should use tudn logo dark variant', () => {
    const theme = { variant: 'dark', primary: '#fff' };
    storeHelpers.getTheme.mockReturnValue(theme);
    storeHelpers.isTudnSite.mockReturnValue(true);
    const wrapper = mount(<ThemeProvider theme={theme}><AmpFooter /></ThemeProvider>);
    expect(wrapper.find(AmpIcon).get(0).props.fill).toBe('#fff');
  });
});
