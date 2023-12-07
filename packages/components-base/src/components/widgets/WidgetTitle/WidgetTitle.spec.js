import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import WidgetTitle from '.';

const theme = {
  primary: '#007350',
};

const themeWidgetColor = {
  widgetTitleColor: '#000000',
};

describe('WidgetTitle Component', () => {
  it('should have styleValue with prop isTitleCase = true', () => {
    const styleValue = 'capitalize';
    const wrapper = mount(<WidgetTitle isTitleCase title="test capitalize" />);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('text-transform', styleValue);
  });
  it('should not have styleValue with prop isTitleCase = false', () => {
    const styleValue = 'uppercase';
    const wrapper = mount(<WidgetTitle title="test uppercase" />);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('text-transform', styleValue);
  });
  it('should have styleValue with prop isDark = true', () => {
    const styleValue = '#ffffff';
    const wrapper = mount(<WidgetTitle isDark title="test color white" />);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', styleValue);
  });
  it('should not have styleValue with prop isDark = false', () => {
    const styleValue = '#000000';
    const wrapper = mount(<ThemeProvider theme={themeWidgetColor}><WidgetTitle isDark={false} title="test color black" /></ThemeProvider>);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', styleValue);
  });
  it('should have styleValue color theme primary.', () => {
    const styleValue = '#007350';
    const wrapper = mount(<ThemeProvider theme={theme}><WidgetTitle title="test color black theme" /></ThemeProvider>);
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', styleValue);
  });
});
