import setPageData, * as Actions from './page-actions';
import * as types from './action-types';
import fetchContent from '../../utils/api/content/fetch';
import dfpManager from '../../utils/ads/dfpManager';
import clientLogging from '../../utils/logging/clientLogging';
import features from '../../config/features';

jest.useFakeTimers();
jest.mock('../../utils/api/content/fetch', () => jest.fn());
jest.mock('../../utils/logging/clientLogging', () => jest.fn());

describe('setAmp action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setAmp(true))
      .toEqual({
        type: types.SET_AMP,
        isAMP: true,
      });
  });
});

describe('setPageData action', () => {
  it('should returns expected action type', () => {
    expect(setPageData({}))
      .toEqual({
        type: types.SET_PAGE_DATA,
        data: {},
      });
  });
});

describe('fetchPageData action', () => {
  beforeEach(() => {
    fetchContent.mockReset();
    clientLogging.mockReset();
    features.widgets.truncateText = true;
    // create a mock window
    const mockWindow = {
      location: {
        href: '#',
      },
    };
    // mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
  });

  it('should return expected action type', async () => {
    fetchContent.mockImplementationOnce(async () => ({
      page: {
        data: {
          type: 'test',
        },
      },
    }));
    const action = Actions.fetchPageData('/deportes');
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch, jest.fn());
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should reset the ads', async () => {
    jest.spyOn(dfpManager, 'destroyAds');
    window.uvnDestroyAdSkin = jest.fn();
    fetchContent.mockImplementationOnce(async () => ({
      page: {
        data: {
          type: 'test',
        },
      },
    }));
    const action = Actions.fetchPageData('/deportes', { meta: { initiator: 'spa' }, resetAds: true });
    const mockDispatch = jest.fn().mockImplementation(() => (
      new Promise((resolve) => {
        resolve({ value: { data: 'test' } });
      })
    ));
    await action(mockDispatch, () => ({ page: {} }));
    jest.runAllTimers();
    expect(dfpManager.destroyAds).toHaveBeenCalled();
    expect(window.uvnDestroyAdSkin).toHaveBeenCalled();
  });

  it('should log the error if there is an invalid response on the SPA fetch.', async () => {
    fetchContent.mockImplementationOnce(async () => ({}));
    features.video.isSingleVideoInstance = jest.fn(() => true);
    const action = Actions.fetchPageData('/deportes', { meta: { initiator: 'spa' } });
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch, jest.fn());
    expect(clientLogging).toHaveBeenCalledWith(new Error('[SPA] Invalid webapp state for page /deportes. Redirecting.'));
  });

  it('should redirect with no log if there is an invalid response on the SPA fetch.', async () => {
    fetchContent.mockImplementationOnce(async () => ({ error: 'SSR error' }));
    features.video.isSingleVideoInstance = jest.fn(() => false);
    const action = Actions.fetchPageData('/deportes', { meta: { initiator: 'spa' } });
    const mockDispatch = jest.fn().mockImplementation(() => new Promise((resolve) => {
      resolve({ value: { data: 'test' } });
    }));
    await action(mockDispatch, jest.fn());
    expect(clientLogging).not.toHaveBeenCalled();
  });
});

describe('setThemeData action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setThemeData({}))
      .toEqual({
        type: types.SET_THEME_DATA,
        theme: {},
      });
  });
});

describe('setPreLoadableComponents action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setPreLoadableComponents({}))
      .toEqual({
        type: types.SET_PRE_LOADABLE_COMPONENTS,
        loadableComponents: {},
      });
  });
});

describe('setWidgetExtraData action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setWidgetExtraData(12, {}))
      .toEqual({
        type: types.SET_WIDGET_EXTRA_DATA,
        id: 12,
        data: {},
      });
  });
});

describe('setWidgetExtraData action with settings', () => {
  it('should returns expected action type', () => {
    expect(Actions.setWidgetExtraData(12, null, { test: true }))
      .toEqual({
        type: types.SET_WIDGET_EXTRA_DATA,
        id: 12,
        settings: { test: true },
      });
  });
});

describe('addWidgets action', () => {
  it('should returns expected action type', () => {
    expect(Actions.addWidgets([]))
      .toEqual({
        type: types.ADD_WIDGETS,
        widgets: [],
      });
  });
});

describe('extendBrandableShow action', () => {
  it('should returns expected action type', () => {
    expect(Actions.extendBrandableShow({}, 'test'))
      .toEqual({
        type: types.EXTEND_BRANDABLE_SHOW,
        data: {},
        pageCategory: 'test',
      });
  });
});

describe('setHeaderData action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setHeaderData({ headerTitle: 'test' }))
      .toEqual({
        type: types.SET_HEADER_DATA,
        navData: { headerTitle: 'test' },
      });
  });
});

describe('setAdSkin action', () => {
  it('should return expected action type', () => {
    const action = Actions.setAdSkin(true);
    expect(action.type).toEqual(types.SET_AD_SKIN);
    expect(action.hasAdSkin).toBe(true);
  });
});

describe('resetNextSpa action', () => {
  it('should call dispatch function', () => {
    const dispatchMock = jest.fn();
    const getState = jest.fn(() => ({ page: {} }));
    const nextActionCall = Actions.resetNextSpa();
    nextActionCall(dispatchMock, getState);
    expect(dispatchMock.mock.calls.length).toBe(2);
  });
});

describe('destroyAdSkin', () => {
  it('should invoke ad skin destroyer', () => {
    window.uvnDestroyAdSkin = jest.fn();
    const dispatch = jest.fn();
    Actions.destroyAdSkin(dispatch);
    expect(window.uvnDestroyAdSkin).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });
  it('should invoke not dispatch action if uvnDestroyAdSkin is not defined', () => {
    delete window.uvnDestroyAdSkin;
    const dispatch = jest.fn();
    Actions.destroyAdSkin(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe('setCurrentLanguage action', () => {
  it('should returns expected action type', () => {
    expect(Actions.setCurrentLanguage(''))
      .toEqual({
        type: types.SET_CURRENT_LANGUAGE,
        language: '',
      });
  });
});
