import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import {
  PRIMARY_PURPLE,
  WHITE,
  BLACK,
} from '@univision/fe-utilities/styled/constants';

import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';

import mockData from './__mocks__/indexCard.json';
import IndexCard from '.';

describe('IndexCard', () => {
  const theme = { isDark: false };

  it('should render without crashing', () => {
    const wrapper = mount(<IndexCard {...mockData[0]} />);
    expect(wrapper.find('IndexCard__Wrapper')).toHaveLength(1);
  });
  it('should render dark theme', () => {
    const wrapper = mount(<IndexCard {...mockData[0]} theme={{ isDark: true }} />);
    expect(wrapper.find('IndexCard__Wrapper')).toHaveLength(1);
  });
  it('should not render an image with flag turned on', () => {
    const wrapper = mount(<IndexCard {...mockData[0]} theme={theme} hideImage />);
    expect(wrapper.find('IndexCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('IndexImage')).toHaveLength(0);
  });
  it('should track clicks', () => {
    const spyTracker = jest.spyOn(CardTracker, 'track');
    const wrapper = mount(<IndexCard {...mockData[0]} theme={theme} />);
    wrapper.find('IndexCard__StyledTitleLink').simulate('click');
    expect(spyTracker).toHaveBeenCalledWith(
      expect.any(Function),
      'content',
      null
    );
  });
  it('should render no dark mode and PRIMARY_PURPLE color title', () => {
    const wrapper = mount(
      <ThemeProvider
        theme={{ isDark: false, widgetTitleColor: PRIMARY_PURPLE }}
      >
        <IndexCard {...mockData[0]} />
      </ThemeProvider>
    );

    const title = wrapper.find('IndexCard__StyledTitleLink').first();

    expect(title.exists()).toBe(true);
    expect(title).toHaveStyleRule('color', PRIMARY_PURPLE);
  });
  it('should render dark mode and PRIMARY_PURPLE color title', () => {
    const wrapper = mount(
      <ThemeProvider
        theme={{ isDark: true, widgetTitleColor: PRIMARY_PURPLE }}
      >
        <IndexCard {...mockData[0]} />
      </ThemeProvider>
    );

    const title = wrapper.find('IndexCard__StyledTitleLink').first();

    expect(title.exists()).toBe(true);
    expect(title).toHaveStyleRule('color', PRIMARY_PURPLE);
  });
  it('should render no dark mode and BLACK color title', () => {
    const wrapper = mount(
      <ThemeProvider
        theme={{ isDark: false, widgetTitleColor: null }}
      >
        <IndexCard {...mockData[0]} />
      </ThemeProvider>
    );

    const title = wrapper.find('IndexCard__StyledTitleLink').first();

    expect(title.exists()).toBe(true);
    expect(title).toHaveStyleRule('color', BLACK);
  });
  it('should render no dark mode and WHITE color title', () => {
    const wrapper = mount(
      <ThemeProvider
        theme={{ isDark: true, widgetTitleColor: null }}
      >
        <IndexCard {...mockData[0]} />
      </ThemeProvider>
    );

    const title = wrapper.find('IndexCard__StyledTitleLink').first();

    expect(title.exists()).toBe(true);
    expect(title).toHaveStyleRule('color', WHITE);
  });
  it('should render no dark mode is not defined', () => {
    const wrapper = mount(
      <ThemeProvider
        theme={{ isDark: null, widgetTitleColor: null, primary: BLACK }}
      >
        <IndexCard {...mockData[0]} />
      </ThemeProvider>
    );

    const title = wrapper.find('IndexCard__StyledTitleLink').first();

    expect(title.exists()).toBe(true);
    expect(title).toHaveStyleRule('color', BLACK);
  });
});
