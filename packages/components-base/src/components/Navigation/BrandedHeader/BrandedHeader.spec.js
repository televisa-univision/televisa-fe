import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import features from '@univision/fe-commons/dist/config/features';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import BrandedHeader from '.';
import BrandedHeaderStyles, { getBackgroundColor } from './BrandedHeader.styles';
import mockData from './__mocks__/brandedHeaderData';
import * as helpers from './helpers';

features.deportes.isWorldCupMVP = jest.fn();
features.liveblog.liveBlogPerformance = jest.fn(() => true);
const store = configureStore();

describe('BrandedHeader suite', () => {
  beforeEach(() => {
    store.dispatch(setPageData({
      data: { uri: 'https://www.tudn.com' },
    }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider theme={{}}>
          <BrandedHeader {...mockData.univision} />
        </ThemeProvider>
      </Provider>, div
    );
  });

  it('should apply the dark theme', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={{ isBrandedHeaderBlack: true }}>
          <BrandedHeader theme={{ isBrandedHeaderBlack: true }} {...mockData.shows} />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BrandedHeader__Container')).toHaveLength(1);
  });

  it('should track main logo click', () => {
    const trackerSpy = jest.spyOn(helpers, 'trackMainLogoClick');
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={{ isBrandedHeaderBlack: true }}>
          <BrandedHeader
            themeV2={{ isBrandedHeaderBlack: true }}
            {...mockData.shows}
          />
        </ThemeProvider>
      </Provider>
    );

    wrapper.find('Link').props().onClick();

    expect(trackerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenCalledWith('univision');
  });

  it('should track secondary logo click', () => {
    const trackerSpy = jest.spyOn(helpers, 'trackMainLogoClick');
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={{ isBrandedHeaderBlack: true }}>
          <BrandedHeader
            themeV2={{ isBrandedHeaderBlack: true }}
            {...mockData.shows}
            logoName="tudn"
          />
        </ThemeProvider>
      </Provider>
    );

    wrapper.find('Link').props().onClick();

    expect(trackerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenCalledWith('tudn');
  });

  it('should justify center column to center when disablePrendeTvButton flag is true', () => {
    features.deportes.isWorldCupMVP.mockReturnValue(false);
    const theme = {
      disablePrendeTvButton: true,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            theme={theme}
            {...mockData.univision}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__LeftCol').prop('className')).toBe('col-3');
    expect(wrapper.find('BrandedHeader__CenterCol')).toHaveStyleRule('justify-content', 'center');
    expect(wrapper.find('BrandedHeader__CenterCol').prop('className')).toBe('col-6');
    expect(wrapper.find('BrandedHeader__RightCol').prop('className')).toBe('col-3');
  });
  it('should justify center column to flex-start when disablePrendeTvButton flag is false', () => {
    features.deportes.isWorldCupMVP.mockReturnValue(false);
    store.dispatch(setPageData({
      data: { uri: 'https://www.univision.com' },
    }));
    const theme = {
      disablePrendeTvButton: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            theme={theme}
            {...mockData.univision}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__LeftCol').prop('className')).toBe('col-1 col-sm-3');
    expect(wrapper.find('BrandedHeader__CenterCol')).toHaveStyleRule('justify-content', 'flex-start');
    expect(wrapper.find('BrandedHeader__CenterCol').prop('className')).toBe('col-5 col-sm-6');
    expect(wrapper.find('BrandedHeader__RightCol').prop('className')).toBe('col-6 col-sm-3');
    expect(wrapper.find('BrandedHeader__Logo')).toHaveStyleRule('margin-left', '8px');
  });

  it('should have correct classes when isWorldCupMVP true', () => {
    features.deportes.isWorldCupMVP.mockReturnValue(true);
    store.dispatch(setPageData({
      data: { uri: 'https://www.tudn.com/mx/futbol' },
    }));
    const theme = {
      disablePrendeTvButton: true,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            theme={theme}
            {...mockData.univision}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__LeftCol').prop('className')).toBe('col-2');
    expect(wrapper.find('BrandedHeader__CenterCol').prop('className')).toBe('col-8');
    expect(wrapper.find('BrandedHeader__RightCol').prop('className')).toBe('col-2');
  });
  it('should render the center content for homepages', () => {
    features.deportes.isWorldCupMVP.mockReturnValue(true);
    store.dispatch(setPageData({
      data: { uri: 'https://www.tudn.com/mx' },
    }));
    const theme = {
      disablePrendeTvButton: true,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            theme={theme}
            {...mockData.univision}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__Container').prop('forceCenterRender')).toEqual(true);
  });
  it('should have correct classes when isWorldCupMVP true', () => {
    features.deportes.isWorldCupMVP.mockReturnValue(true);
    const theme = {
      disablePrendeTvButton: false,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            componentCenter={() => null}
            theme={theme}
            {...mockData.univision}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__LeftCol').prop('className')).toBe('col-1 col-sm-2');
    expect(wrapper.find('BrandedHeader__CenterCol').prop('className')).toBe('col-5 col-sm-8');
    expect(wrapper.find('BrandedHeader__RightCol').prop('className')).toBe('col-6 col-sm-2');
  });

  it('should hide center column when contentType are article and isTelevisaSite are true', () => {
    const theme = {};
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            componentCenter={() => null}
            theme={theme}
            {...mockData.univision}
            pageData={{ type: 'article' }}
            isTelevisaSite
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__CenterCol').text()).toBe('');
  });

  it('should set BrandedHeader for televisa style', () => {
    const theme = {};
    features.deportes.isWorldCupMVP.mockReturnValue(false);
    const wrapper = mount(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrandedHeader
            componentCenter={() => null}
            theme={theme}
            {...mockData.univision}
            pageData={{ type: 'article' }}
            isTelevisaSite
            site={'televisa'}
          />
        </ThemeProvider>
      </Provider>
    );
    expect(wrapper.find('BrandedHeader__CenterCol').text()).toBe('');
  });
});

describe('BrandedHeader styles suite', () => {
  const BLACK = '#000000';
  const WHITE = '#ffffff';

  it('should return css by default', () => {
    expect(BrandedHeaderStyles.wrapper()).toEqual(expect.any(Array));
  });

  it('returns BLACK when isBrandedHeaderBlack is true', () => {
    const theme = { isBrandedHeaderBlack: true };
    expect(getBackgroundColor(theme)).toBe(BLACK);
  });

  it('returns brandedHeaderBackgroundColor when isBrandedHeaderBlack is false and brandedHeaderBackgroundColor is not TRANSPARENT', () => {
    const theme = { isBrandedHeaderBlack: false, brandedHeaderBackgroundColor: '#123456' };
    expect(getBackgroundColor(theme)).toBe('#123456');
  });

  it('returns WHITE when theme is undefined', () => {
    expect(getBackgroundColor(undefined)).toBe(WHITE);
  });

  it('should set wrapper with brandedHeaderBackgroundColor', () => {
    const theme = { brandedHeaderBackgroundColor: '#123456' };
    expect(BrandedHeaderStyles.wrapper({ theme })).toEqual(expect.arrayContaining([
      '#123456',
    ]));
  });
});
