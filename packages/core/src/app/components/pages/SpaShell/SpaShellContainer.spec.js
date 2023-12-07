import React from 'react';
import { shallow } from 'enzyme';
import { getVerticalNav } from '@univision/fe-components-base/dist/components/Header/data/helpers';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import features from '@univision/fe-commons/dist/config/features';
import SpaShellContainer from './SpaShellContainer';

jest.useFakeTimers();

jest.mock('../../../utils/factories/pageFactory', () => ({
  getPageComponent: jest.fn(currentPage => (
    currentPage === 'errorPage'
      ? <h2>error page component</h2>
      : <h2>page component</h2>
  )),
  getCurrentPageType: jest.fn(() => 'somepagetype'),
  mapPageTypeToBundleName: jest.fn(() => 'somemappedpagetype'),
}));

jest.mock('@univision/fe-components-base/dist/components/Header/data/helpers', () => ({
  getVerticalNav: jest.fn(),
}));

jest.mock('@univision/fe-commons/dist/utils/ads/adHelper', () => ({
  destroyAdSkin: jest.fn(),
}));

jest.mock('@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager', () => ({
  load: jest.fn(),
  pageView: jest.fn(),
  clearDataLayer: jest.fn(),
  triggerEvent: jest.fn(),
}));

jest.mock('@univision/fe-commons/dist/utils/ads/dfpManager', () => ({
  destroyAds: jest.fn(),
}));

const pageData = {
  data: {
    test: 'test',
    uri: '/',
  },
  loading: false,
};

describe('SpaShellContainer', () => {
  beforeEach(() => {
    features.tracking.gtm = jest.fn(() => true);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render pageComponent if SSR', () => {
    const windowObject = global.window;
    delete global.window;
    const wrapper = shallow(
      <SpaShellContainer
        page={pageData}
        fetchPageData={() => { }}
        initialComponent={<h1>PageComponent</h1>}
      />
    );
    expect(wrapper.find('ContentWrapper').dive().text()).toEqual('PageComponent');
    global.window = windowObject;
  });

  it('should render page component', () => {
    const fetchAnonUser = jest.fn(() => Promise.resolve({
      payload: {
        accessToken: 'test',
      },
    }));
    const fetchPageData = jest.fn();
    const wrapper = shallow(<SpaShellContainer
      page={pageData}
      fetchAnonUser={fetchAnonUser}
      fetchPageData={fetchPageData}
    />);
    expect(wrapper.find('ContentWrapper').dive().text()).toEqual('page component');
  });

  it('should render error page page component', () => {
    const fetchPageData = jest.fn();
    const wrapper = shallow(<SpaShellContainer
      page={{
        ...pageData,
        error: {
          message: 'error message',
        },
      }}
      fetchPageData={fetchPageData}
    />);
    expect(wrapper.find('ContentWrapper').dive().text()).toEqual('error page component');
  });

  it('should render loader', async () => {
    const fetchPageData = jest.fn(() => Promise.resolve({ type: 'section', uri: '/' }));
    const loadingPageData = {
      data: {
        ...pageData.data,
        analyticsData: null,
      },
      loading: false,
    };
    const wrapper = shallow(<SpaShellContainer
      page={loadingPageData}
      fetchPageData={fetchPageData}
    />);
    await wrapper.instance().handleChange('/test');
    wrapper.setProps({
      page: {
        data: {
          uri: '/test',
        },
        loading: true,
      },
    });
    wrapper.update();
    expect(wrapper.find('ContentWrapper').dive().text()).toEqual('page component');
  });

  it('should fetch new data on change and not update tracking if url is not changing', async () => {
    const fetchPageData = jest.fn();
    features.video.isSingleVideoInstance = jest.fn(() => true);
    const wrapper = shallow(<SpaShellContainer
      page={pageData}
      fetchPageData={fetchPageData}
    />);
    const instance = wrapper.instance();
    getVerticalNav.mockReturnValue({
      variant: 'dark',
    });
    await instance.handleChange('/test');
    wrapper.setProps({
      page: {
        data: {
          uri: '/test',
        },
      },
    });
    wrapper.update();
    expect(fetchPageData).toHaveBeenCalled();
    wrapper.setProps({
      page: {
        data: {
          uri: '/test',
        },
      },
    });
    wrapper.update();
    const spyUpdateTracking = jest.spyOn(MainTracking, 'updateSpaTracking');
    expect(spyUpdateTracking).not.toHaveBeenCalled();
  });

  it('should call the track for GTM', () => {
    jest.useFakeTimers();
    const fetchPageData = jest.fn();
    const loadingPageData = {
      data: {
        ...pageData.data,
        uri: '/test',
        type: 'section',
        analyticsData: {
          web: {
            common: {
            },
          },
        },
      },
      originalUrl: '/test',
      loading: false,
    };
    const wrapper = shallow(<SpaShellContainer
      page={loadingPageData}
      fetchPageData={fetchPageData}
    />);
    const instance = wrapper.instance();
    instance.componentDidUpdate({
      page: {
        ...pageData,
        uri: '/',
        loading: true,
      },
      originalUrl: '/',
    });
    jest.runTimersToTime(550);
    expect(gtmManager.triggerEvent).toHaveBeenCalled();
  });
});
