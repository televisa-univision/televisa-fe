import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import features from '@univision/fe-commons/dist/config/features';

import Locales from '.';

beforeEach(() => {
  features.widgets.isVixEnabled = () => true;
});
describe('Locales suite', () => {
  it('should not crash when rendering', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    const wrapper = mount(
      <ThemeProvider theme={{}}>
        <Locales />
      </ThemeProvider>
    );
    expect(wrapper.find('LocalTvIcon')).toHaveLength(1);
    expect(wrapper.find('ButtonPrendeTv')).toHaveLength(1);
  });
  it('should render the dark variation when the theme prop is enabled', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    const wrapper = mount(
      <ThemeProvider theme={{ isBrandedHeaderBlack: true }}>
        <Locales theme={{ isBrandedHeaderBlack: true }} />
      </ThemeProvider>
    );
    expect(wrapper.find('LocalTvIcon').prop('variant')).toBe('dark');
    expect(wrapper.find('LocalTvIcon').prop('iconColor')).toBe('white');
  });
});
