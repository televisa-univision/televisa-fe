import LocalStorage from '../helpers/LocalStorage';
import {
  getCustomTrackingForPage,
  getUserData,
  getUserType,
  getUtagData,
  getPersonalizationCategory,
  getMvpdData,
  isPersonalizedContent,
} from './trackingHelpers';
import setPageData from '../../store/actions/page-actions';
import Store from '../../store/store';
import { PHASED_RELEASE, VIDEO_PREVIEW_DISABLED, PHASED_RELEASE_BASELINE } from '../../constants/tracking';
import * as userSelectors from '../../store/selectors/user-selectors';
import * as pageSelectors from '../../store/selectors/page-selectors';
import SessionStorage from '../helpers/SessionStorage';
import { HOROSCOPES } from '../../constants/personalizationType';
import mvpdProviders from './mvpdProvidersData.json';
import dataTrakingList from './__mocks__/dataTrakingList.json';
import { USER_ID } from '../../constants/personalization';

let pageData;

beforeEach(() => {
  pageData = {
    device: 'mobile',
  };
  Store.dispatch(setPageData(pageData));
});

describe('getCustomTrackingForPage', () => {
  it('should return null if invalid', () => {
    const settings = getCustomTrackingForPage({});
    expect(settings).toBeNull();
  });

  it('should return error page settings', () => {
    const errorPageData = { statusCode: 404 };
    const expectedResult = {
      content_type: 'errorpage',
      error_type: 'page does not exist',
      title: 'Page not found - Pagina no encontrada',
    };
    const settings = getCustomTrackingForPage(errorPageData);
    expect(settings).toEqual(expectedResult);
  });
});

describe('getUserType', () => {
  it('should return authenticated by default', () => {
    expect(getUserType({})).toBe('authenticated');
  });
  it('should return anonymous', () => {
    expect(getUserType({ isUserAnonymous: true })).toBe('anonymous');
  });
  it('should return mvpd sub', () => {
    expect(getUserType({ isUserAnonymous: true, isMvpdLoggedIn: true })).toBe('mvpdsubscriber');
  });
});

describe('getUserData', () => {
  let userSelectorSpy;
  let modifiedPageData;

  beforeEach(() => {
    userSelectorSpy = jest.spyOn(userSelectors, 'userSelector').mockReturnValue({
      sub: 'test',
      anonymous: true,
    });
    modifiedPageData = {
      ...pageData,
      requestParams: {
        anonUser: 'true',
      },
    };
    Store.dispatch(setPageData(modifiedPageData));
  });

  afterEach(() => {
    SessionStorage.remove('mvpdData');
    jest.restoreAllMocks();
  });

  it('should return an empty object when the feature flag is disabled', () => {
    modifiedPageData = {
      ...pageData,
      requestParams: {
        anonUser: 'false',
      },
    };
    Store.dispatch(setPageData(modifiedPageData));
    expect(getUserData()).toEqual({});
  });
  it('should return an empty object when user id is not set', () => {
    userSelectorSpy.mockReturnValue({});
    expect(getUserData()).toEqual({});
  });
  it('should return stored user id if userSelector has not fetched', () => {
    LocalStorage.setObject(USER_ID, { univision_user_id: '1234' });
    userSelectorSpy.mockReturnValue({ anonymous: true });
    expect(getUserData()).toEqual({
      userId: '1234',
      userType: 'anonymous',
    });
  });
  it('should return the expected object data', () => {
    expect(getUserData()).toEqual({
      userId: 'test',
      userType: 'anonymous',
    });
  });
  it('should return mvpd subscriber', () => {
    SessionStorage.setObject('mvpdData', {
      loggedIn: true,
    });
    expect(getUserData()).toEqual({
      userId: 'test',
      userType: 'mvpdsubscriber',
    });
  });
});

describe('getMvpdData', () => {
  afterEach(() => {
    SessionStorage.clear();
  });
  it('should return an empty object by default', () => {
    expect(getMvpdData()).toEqual({});
  });
  it('should return the set value', () => {
    SessionStorage.setObject('mvpdData', mvpdProviders[0]);
    expect(getMvpdData()).toEqual(mvpdProviders[0]);
  });
});

describe('getUtagData', () => {
  it('should not throw an error if tracking settings are null', () => {
    expect(() => getUtagData(null)).not.toThrow();
  });

  it('should not throw an error if tracking settings are undefined', () => {
    expect(() => getUtagData(undefined)).not.toThrow();
  });
  it('should set the test_group for video preview disabled', () => {
    pageData.requestParams = {
      [PHASED_RELEASE]: VIDEO_PREVIEW_DISABLED,
    };
    Store.dispatch(setPageData(pageData));
    expect(getUtagData({}).test_group).toBe(`${PHASED_RELEASE}:${VIDEO_PREVIEW_DISABLED}`);
  });
  it('should set the test_group a baseline ', () => {
    pageData.requestParams = {};
    Store.dispatch(setPageData(pageData));
    expect(getUtagData({}).test_group).toBe(`${PHASED_RELEASE}:${PHASED_RELEASE_BASELINE}`);
  });
  it('should set the listItem a meets all the conditions', () => {
    const newDataMain = {
      data: {
        uid: dataTrakingList.uid,
        sponsor: dataTrakingList.sponsor,
        body: [
          {
            ...dataTrakingList.data.body[0],

          },
          {
            ...dataTrakingList.data.body[3],
          },
          {
            ...dataTrakingList.data.body[4],
          },
        ],
      },
    };
    Store.dispatch(setPageData(newDataMain));
    const utagData = getUtagData({ article_type: 'list' });

    expect(utagData.article_type).toBe('list');
    expect(newDataMain.data.article_type).toEqual(newDataMain.data.article_type);
  });
  it('should set the listItem a without body', () => {
    const newDataMain = {
      data: {
        uid: '0000017b-c21c-d881-a17f-cbffca150004',
        sponsor: 'Barbie Sponsor logo',
      },
    };

    Store.dispatch(setPageData(newDataMain));
    const utagData = getUtagData({ article_type: 'list' });

    expect(utagData.article_type).toBe('list');
    expect(newDataMain.data).toEqual(newDataMain.data);
  });
  it('should set the listItem a without the video type', () => {
    const newDataMain = {
      data: {
        uid: dataTrakingList.uid,
        sponsor: dataTrakingList.sponsor,
        body: [
          {
            ...dataTrakingList.data.body[0],

          },
          {
            ...dataTrakingList.data.body[2],
          },
        ],
      },
    };
    Store.dispatch(setPageData(newDataMain));
    const utagData = getUtagData({ article_type: 'list' });

    expect(utagData.article_type).toBe('list');
    expect(newDataMain).toEqual(newDataMain);
  });
  it('should set the navigation count', () => {
    // 0-based in the Store
    pageData.navigationCount = 3;
    Store.dispatch(setPageData(pageData));
    // 1-based in the data layer
    expect(getUtagData({}).spa_page_count).toBe(4);
  });
  it('should add a user id and user type when available', () => {
    jest.spyOn(userSelectors, 'userSelector').mockReturnValue({
      sub: 'test',
      anonymous: true,
    });
    pageData.requestParams = { anonUser: 'true' };
    Store.dispatch(setPageData(pageData));
    const utagData = getUtagData({});

    expect(utagData.user_id).toBe('test');
    expect(utagData.user_type).toBe('anonymous');
  });
  it('should add a mvpd provider id', () => {
    SessionStorage.setObject('mvpdData', { providerId: mvpdProviders[0].providerId });
    const utagData = getUtagData({});
    expect(utagData.mvpdproviderid).toEqual(mvpdProviders[0].displayName);
    SessionStorage.clear();
  });
  it('should set spa v2 if app version is 2', () => {
    process.env.APP_VERSION = '2';
    Store.dispatch(setPageData(pageData));
    expect(getUtagData({}).spa).toBe('v2');
  });
});

describe('getPersonalizationCategory', () => {
  it('should return generic by default', () => {
    expect(getPersonalizationCategory()).toBe('generic');
  });
  it('should return horoscopos category', () => {
    expect(getPersonalizationCategory(HOROSCOPES)).toBe('horoscopos');
  });
});

describe('isPersonalizedContent', () => {
  let pageUIDMock;
  let horoscopeFavoritesMock;

  beforeEach(() => {
    pageUIDMock = jest.spyOn(pageSelectors, 'pageUIDSelector').mockReturnValue(undefined);
    horoscopeFavoritesMock = jest.spyOn(userSelectors, 'horoscopesCardDataSelector').mockReturnValue(null);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should return undefined', () => {
    expect(isPersonalizedContent()).toBe(undefined);
  });
  it('should return undefined when no page UID is available', () => {
    pageUIDMock.mockReturnValue(undefined);
    expect(isPersonalizedContent()).toBe(undefined);
  });
  it('should return false when no valid favorite array is provided', () => {
    pageUIDMock.mockReturnValue('test');
    horoscopeFavoritesMock.mockReturnValue('test');
    expect(isPersonalizedContent()).toBe(false);
  });
  it('should return false when page UID is not in the favorites list', () => {
    pageUIDMock.mockReturnValue('test');
    horoscopeFavoritesMock.mockReturnValue([
      { uid: 'test1' },
      { uid: 'test2' },
    ]);
    expect(isPersonalizedContent()).toBe(false);
  });
  it('should return true when page UID is in the favorites list', () => {
    pageUIDMock.mockReturnValue('test');
    horoscopeFavoritesMock.mockReturnValue([
      { uid: 'test' },
      { uid: 'test2' },
    ]);
    expect(isPersonalizedContent()).toBe(true);
  });
});
