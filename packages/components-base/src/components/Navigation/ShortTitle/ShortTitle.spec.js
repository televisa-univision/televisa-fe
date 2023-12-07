import React from 'react';
import * as ReactRedux from 'react-redux';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Store from '@univision/fe-commons/dist/store/store';
import Features from '@univision/fe-commons/dist/config/features';
import * as Logo from '../../Logo';

import ShortTitle from '.';

import mockData from './__mocks__/shortTitle.json';
import mockTheme from './__mocks__/shortTitleThemes';

const { Provider } = ReactRedux;

describe('ShortTitle component suite', () => {
  beforeEach(() => {
    jest.spyOn(Logo, 'default').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={Store}>
        <ShortTitle {...mockData.gordoflaca} />
      </Provider>
    );
    expect(wrapper.find('.container')).toBeDefined();
  });

  it('should apply the theme from ThemeProvider', () => {
    const shortTitleTheme = {
      theme: {
        subNavBackgroundColor: mockTheme.lareinasoyyo.subNavBackgroundColor,
        titleBackgroundImage: mockTheme.lareinasoyyo.titleBackgroundImage,
      },
    };

    const shortTitleParams = {
      uri: mockData.lareinasoyyo.uri,
      title: mockData.lareinasoyyo.title,
    };

    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider {...shortTitleTheme}>
          <ShortTitle {...shortTitleParams} />
        </ThemeProvider>
      </Provider>
    );

    expect(wrapper.find('ShortTitle__Wrapper')).toHaveLength(1);
  });

  it('should set title center from the theme', () => {
    const shortTitleTheme = {
      theme: {
        shortTitleAlignCenter: true,
      },
    };

    const shortTitleParams = {
      uri: mockData.lareinasoyyo.uri,
      title: mockData.lareinasoyyo.title,
    };

    const wrapper = mount(
      <Provider store={Store}>
        <ThemeProvider {...shortTitleTheme}>
          <ShortTitle {...shortTitleParams} />
        </ThemeProvider>
      </Provider>
    );

    expect(wrapper.find('ShortTitle__ShortTitleLink')).toHaveStyleRule('text-align', 'center');
  });

  it('should render properly when a title is sent as content', () => {
    const shortTitleParams = {
      uri: mockData.lareinasoyyo.uri,
      title: mockData.lareinasoyyo.title,
    };

    const wrapper = shallow(
      <Provider store={Store}>
        <ShortTitle {...shortTitleParams} />
      </Provider>
    );

    expect(wrapper.find('ShortTitle__ShortTitleLogo')).toHaveLength(0);
  });

  it('should render properly when a logo is sent as content', () => {
    const shortTitleParams = {
      uri: mockData.local.uri,
      logo: mockData.local.logo,
    };

    // Mock the Image constructor
    const mockImage = {
      onload: null,
      srcValue: '',
      set src(value) {
        this.srcValue = value;
        if (this.onload) {
          this.onload();
        }
      },
      get src() {
        return this.srcValue;
      },
      width: 100,
      height: 100,
    };
    global.Image = jest.fn(() => mockImage);

    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle {...shortTitleParams} />
      </Provider>
    );

    wrapper.update();

    expect(wrapper.find('ShortTitle__ShortTitleLogo')).toHaveLength(1);
  });

  it('should render properly when no logo or title are send', () => {
    const shortTitleParams = {
      uri: mockData.local.uri,
    };

    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle {...shortTitleParams} />
      </Provider>
    );

    expect(wrapper.find('ShortTitle__Wrapper')).toBeDefined();
  });

  it('should render properly when a right column widget is sent', () => {
    const shortTitleParams = {
      componentRight: () => {},
    };

    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle {...shortTitleParams} />
      </Provider>
    );

    expect(wrapper.find('ShortTitle__Wrapper')).toBeDefined();
  });

  it('should render properly when use custom logos is provided', () => {
    ReactRedux.useSelector = jest.fn(() => ({
      logo: 'img.jpg',
      sublogo: 'sub.jog',
      useCustomLogos: true,
    }));
    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle />
      </Provider>
    );

    expect(wrapper.find('ShortTitle__Wrapper')).toBeDefined();
  });

  it('should render properly when use custom logos is provided', () => {
    ReactRedux.useSelector = jest.fn(() => ({
      svgIcon: {
        name: 'live247',
        viewBox: '0 0 127 50',
      },
      sublogo: 'sub.jpg',
      useCustomLogos: true,
    }));
    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle />
      </Provider>
    );

    expect(wrapper.find('ShortTitle__IconWrapper')).toBeDefined();
  });
  it('should have isWorldCupMVP', () => {
    Features.deportes.isWorldCupMVP = jest.fn(() => true);
    const shortTitleParams = {
      uri: mockData.lareinasoyyo.uri,
      title: mockData.lareinasoyyo.title,
    };

    const wrapper = mount(
      <Provider store={Store}>
        <ShortTitle {...shortTitleParams} />
      </Provider>
    );
    expect(wrapper.find('ShortTitle__ShortTitleRowContainer').prop('isWorldCupMVP')).toBe(true);
  });
});
