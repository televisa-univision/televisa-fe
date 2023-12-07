/* eslint-disable no-underscore-dangle */
import GPT from 'gpt-mock';
import promiseMock from '../jest/helpers';
import BreakPoint from '../breakpoint/breakPointMediator';
import Store from '../../store/store';
import * as Actions from '../../store/actions/ads-actions';
import * as storeHelpers from '../../store/storeHelpers';
import setPageData from '../../store/actions/page-actions';
import features from '../../config/features';
import dfpManager from './dfpManager';
import * as indexLoader from './vendors/indexLoader';
import * as dfpLoader from './vendors/dfpLoader';
import * as trackingAdEvents from './tracking/trackingAdEvents';
import { UNIVISION_SITE } from '../../constants/sites';
import thirdPartyFeatures from '../../config/features/thirdParties';
import permutiveIndexScript from './vendors/permutiveLoader';
import * as getTestGroup from './tracking/testGroups';
import * as pageSelectors from '../../store/selectors/page-selectors';

const slot = {
  slotID: 'div-gpt-ad-3455',
  sizes: [[300, 250], [300, 600]],
  sizeMapping: {
    desktop: [[728, 90]],
    tablet: [[300, 250], [300, 600]],
    mobile: [[320, 50]],
  },
  callback: () => 'Hello World!',
  refreshable: true,
  sequenceable: true,
  biddable: true,
  isSpecialAd: false,
};

storeHelpers.getDevice = jest.fn(() => 'mobile');
storeHelpers.getModeParam = jest.fn(() => { });

jest.useFakeTimers();

beforeEach(() => {
  features.advertisement.ias = () => false;
  features.advertisement.areCookiesDisallowed = () => false;
  features.tracking.displayAdPerformance = false;
  features.advertisement.areAdsTrackable = () => false;
  features.advertisement.isPrebidDisplay = () => false;
  thirdPartyFeatures.isPermutiveEnabled = jest.fn(() => false);
});

jest.useFakeTimers();

BreakPoint.getDevice = jest.fn();

describe('dfpManager load', () => {
  it('should load gpt', () => {
    features.advertisement.isPrebidDisplay = () => true;
    dfpManager.load();
    expect(window.googletag).toBeDefined();
    features.advertisement.isPrebidDisplay = () => false;
  });
  it('should create global window variables', () => {
    const mockFetch = new Promise(resolve => resolve({}));
    dfpManager.load([mockFetch, mockFetch, mockFetch, mockFetch]);
    expect(window.googletag).toBeDefined();
  });
  it('Should load gpt on index timeout', (done) => {
    spyOn(indexLoader, 'default').and.callFake(() => promiseMock({ resolve: 1 }));
    const loadGPTScriptSpy = jest.spyOn(dfpLoader, 'default');

    dfpManager.load().then(() => {
      expect(window.googletag).toBeDefined();
      expect(loadGPTScriptSpy).toHaveBeenCalled();
    });
    done();
  });
  it('should load IAS if feature flag is enabled', () => {
    features.advertisement.ias = () => true;
    dfpManager.load();
    expect(window.__iasPET).toBeDefined();
  });
  it('should not load Amazon and Rubicon if cookies are disallowed', () => {
    delete window.apstag;
    delete window.pbjs;
    features.advertisement.areCookiesDisallowed = () => true;
    dfpManager.load();
    expect(window.apstag).not.toBeDefined();
    expect(window.pbjs).not.toBeDefined();
  });
});

describe('dfpManager registerSlot', () => {
  window.googletag = new GPT();
  it('Should dfpManager Slot array == 1', () => {
    dfpManager.registerSlot(slot);
    const storeAds = Store.getState().dfpAds.ads;
    expect(storeAds.length).toBe(1);
  });
  it('Should ad.sizes use sizes if sizeMapping[device] is not defined', () => {
    BreakPoint.value = 'xs';
    storeHelpers.getDevice.mockReturnValueOnce('');
    dfpManager.registerSlot(slot);
    const ad = Store.getState().dfpAds.ads[0];
    expect(ad.sizes).toBe(ad.sizes);
  });
  it('Should ad.sizes use sizes if sizeMapping[device] is defined', () => {
    BreakPoint.device = 'mobile';
    slot.sizeMapping = undefined;
    storeHelpers.getDevice.mockReturnValueOnce('');
    dfpManager.registerSlot(slot);
    const ad = Store.getState().dfpAds.ads[0];
    expect(ad.sizes).toBe(ad.sizes);
  });
  it('Should call load if window.googletag is not defined', () => {
    thirdPartyFeatures.isPermutiveEnabled = jest.fn(() => true);
    dfpManager.haveScriptsLoaded = false;
    delete window.googletag;
    const checkLoadSpy = spyOn(dfpManager, 'checkLoadScripts').and.callThrough();
    const loadSpy = jest.spyOn(dfpManager, 'load');
    dfpManager.registerSlot(slot);
    expect(checkLoadSpy).toHaveBeenCalledTimes(1);
    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(dfpManager.haveScriptsLoaded).toBe(true);
  });
  it('Should call preFetchAds if displayAboveTheFold', () => {
    const preFetchAdsSpy = spyOn(dfpManager, 'preFetchAds').and.callThrough();
    Store.dispatch(Actions.displayAdsAboveTheFold());
    dfpManager.registerSlot(slot);
    expect(preFetchAdsSpy).toHaveBeenCalledTimes(1);
  });
});

describe('dfpManager defineSlot', () => {
  const setTargetingSpy = jest.fn();
  const addServiceSpy = jest.fn(() => ({
    setTargeting: setTargetingSpy,
  }));
  const defineSlotSpy = jest.fn(() => ({
    addService: addServiceSpy,
  }));
  beforeEach(() => {
    Object.defineProperty(window, 'googletag', {
      value: {
        defineSlot: defineSlotSpy,
        pubads: jest.fn(() => ({
          addService: addServiceSpy,
        })),
        sizeMapping: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const pageData = {
    site: UNIVISION_SITE,
    data: {
      type: 'article',
      adSettings: {
        targeting: {
          tag: ['test, test1'],
        },
      },
    },
  };
  const middleSlot = {
    slotName: '/6881/d.tv/homepage',
    sizes: [[300, 250], [300, 600]],
    slotID: 'div-gpt-ad-3455',
    device: 'desktop',
    position: 'MID',
    sequenceable: true,
    biddable: true,
    widgetName: 'Grid',
    cardType: 'rectangle',
  };
  Store.dispatch(setPageData(pageData));
  it('Should call window.googletag.defineSlot', () => {
    dfpManager.defineSlot(middleSlot);
    expect(defineSlotSpy).toHaveBeenCalledTimes(1);
  });
  it('Should call slot setTargeting with pos key for televisa sites', () => {
    dfpManager.isTelevisaSite = true;
    dfpManager.defineSlot(middleSlot);
    expect(setTargetingSpy).toHaveBeenCalledWith('pos', middleSlot.position);
  });
});

describe('dfpManager getReferrer', () => {
  it('returns `direct` for empty strings', () => {
    expect(dfpManager.getReferrer('')).toBe('direct');
  });
  it('returns `direct` for null values', () => {
    expect(dfpManager.getReferrer(null)).toBe('direct');
  });
  it('returns the last two parts of the referrer base URL', () => {
    expect(dfpManager.getReferrer('http://m.facebook.com')).toBe('facebook.com');
  });
  it('removes everythign after the base URL', () => {
    expect(dfpManager.getReferrer('http://facebook.com/test/path?with=queryparams')).toBe('facebook.com');
  });
});

describe('dfpManager getAdName', () => {
  const data = {
    config: {
      deploy: {
        env: 'production',
      },
    },
    data: {
      adSettings: {
        adTagValue: 'section_entretenimiento',
        disableAds: false,
      },
    },
  };
  it('should create AdName with prod values if not env', () => {
    BreakPoint.value = 'md';
    Store.dispatch(setPageData(data));
    const adName = dfpManager.getAdName();
    expect(adName).toBe('/6881/rm.univision_section_entretenimiento');
  });
  it('should create AdName for desktop', () => {
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    data.config.deploy.env = 'test';
    Store.dispatch(setPageData(data));
    const adName = dfpManager.getAdName();
    expect(adName).toBe('/7009/rd.univision_section_entretenimiento');
  });
  it('should create AdName for tablet', () => {
    BreakPoint.value = 'md';
    data.config.deploy.env = 'production';
    Store.dispatch(setPageData(data));
    storeHelpers.getModeParam.mockReturnValueOnce('test');
    const adName = dfpManager.getAdName();
    expect(adName).toBe('/7009/rm.univision_section_entretenimiento');
  });
});

describe('dfpManager getReadyAds', () => {
  it('Should return not displayed ads array', () => {
    const adsArray = [
      { displayed: true },
      { a: 'test', b: 'hello', displayed: true },
      { a: 'test', b: 'hello', displayed: false },
    ];
    expect(dfpManager.getReadyAds(adsArray).length).toBe(1);
  });
});

describe('dfpManager preFetchAds', () => {
  beforeEach(() => {
    jest.spyOn(dfpManager, 'setPageLevelParams')
      .mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should increase cmd callback', async () => {
    window.googletag = new GPT();
    const cmdSize = window.googletag.cmd.length;
    delete window.apstag;
    window.permutive = {
      readyWithTimeout: jest.fn(() => Promise.resolve()),
    };
    await dfpManager.preFetchAds();
    expect(window.googletag.cmd.length).toBeGreaterThan(cmdSize);
  });
  it('Should enabledService once permutive is loaded', () => {
    dfpManager.haveScriptsLoaded = false;
    delete window.googletag;
    permutiveIndexScript();
    dfpManager.preFetchAds();
    expect(window.googletag).toBeDefined();
  });
  it('Should call load if window.googletag is not defined', () => {
    dfpManager.haveScriptsLoaded = false;
    delete window.googletag;
    const checkLoadSpy = spyOn(dfpManager, 'checkLoadScripts').and.callThrough();
    const loadSpy = spyOn(dfpManager, 'load').and.callThrough();
    dfpManager.preFetchAds();
    expect(checkLoadSpy).toHaveBeenCalledTimes(1);
    expect(loadSpy).toHaveBeenCalledTimes(1);
    expect(dfpManager.haveScriptsLoaded).toBe(true);
  });
  it('Should call performance.mark if displayAdPerformance feature enabled', async () => {
    dfpManager.haveScriptsLoaded = false;
    const adsSpy = jest.spyOn(dfpManager, 'getReadyAds');
    features.tracking.displayAdPerformance = true;
    features.advertisement.isPrebidDisplay = () => true;
    window.googletag = new GPT();
    window.googletag.pubads().setPrivacySettings = jest.fn();
    window.googletag._loaded();
    await dfpManager.preFetchAds();
    expect(adsSpy).toHaveBeenCalledTimes(1);
  });
  it('Should call performance.mark if displayAdPerformance feature enabled, but special ad', async () => {
    const slots = [{ isSpecialAd: true }];
    const adsSpy = spyOn(dfpManager, 'getReadyAds').and.returnValue(slots);
    features.tracking.displayAdPerformance = true;
    features.advertisement.isPrebidDisplay = () => true;
    window.googletag = new GPT();
    window.googletag._loaded();
    await dfpManager.preFetchAds();
    expect(adsSpy).toHaveBeenCalledTimes(1);
  });
  it('Should not call performance.mark if displayAdPerformance feature disabled', async () => {
    const adsSpy = spyOn(dfpManager, 'getReadyAds').and.returnValue([slot]);
    features.tracking.displayAdPerformance = false;
    window.googletag = new GPT();
    window.googletag._loaded();
    await dfpManager.preFetchAds();
    expect(adsSpy).toHaveBeenCalledTimes(1);
  });
  it('Should allow refreshing ads to be passed', async () => {
    delete window.permutive;
    dfpManager.gptInitialized = false;
    const adsSpy = spyOn(dfpManager, 'getReadyAds').and.returnValue([slot]);
    features.tracking.displayAdPerformance = false;
    window.googletag = new GPT();
    window.googletag.pubads().setPrivacySettings = jest.fn();
    window.googletag._loaded();
    await dfpManager.preFetchAds([slot]);
    expect(adsSpy).not.toHaveBeenCalledTimes(1);
  });
});

describe('Testing getAdById', () => {
  it('Should return null if id not id provided', () => {
    expect(dfpManager.getAdById()).toBe(null);
  });
  it('Should return function if id provided', () => {
    expect(dfpManager.getAdById('div-gpt-ad-3455')).toBeInstanceOf(Object);
  });
  it('Should return null if not state', () => {
    const realStore = Store.getState;
    Store.getState = jest.fn();
    Store.getState.mockReturnValue({});
    expect(dfpManager.getAdById('div-gpt-ad-3455')).toBe(null);
    Store.getState = realStore;
  });
});

describe('Testing getAdIndexById', () => {
  it('Should return -1 if no id provided', () => {
    expect(dfpManager.getAdIndexById()).toBe(-1);
  });
  it('Should return index if id found', () => {
    expect(dfpManager.getAdIndexById('div-gpt-ad-3455')).toBe(0);
  });
  it('Should return -1 if id not found', () => {
    const realStore = Store.getState;
    Store.getState = jest.fn();
    Store.getState.mockReturnValue({});
    expect(dfpManager.getAdIndexById('div-gpt-ad-3455')).toBe(-1);
    Store.getState = realStore;
  });
});

describe('Testing googletag.cmd.push calls', () => {
  const adDiv = document.createElement('div');
  adDiv.setAttribute('class', 'ad_wrapper');
  const innerDiv = document.createElement('div');
  const skeleton = document.createElement('div');
  skeleton.setAttribute('class', 'uvs-skeleton');
  adDiv.appendChild(innerDiv);
  adDiv.appendChild(skeleton);

  const ad = {
    callback: () => 'hello world',
    trackingValue: undefined,
    isNativeAd: true,
  };
  const event = {
    isEmpty: false,
    slot: {
      getSlotId: () => ({ getDomId: () => '' }),
    },
  };
  it('SlotRenderEndedCallback does not add class to non empty responses', () => {
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(innerDiv);
    const adDivClass = dfpManager.slotRenderEndedCallback(event);
    expect(adDivClass.parentElement.className).toBe('ad_wrapper uvs-ad-ready');
  });
  it('SlotRenderEndedCallback adds class to empty responses', () => {
    event.isEmpty = true;
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(innerDiv);

    const adDivClass = dfpManager.slotRenderEndedCallback(event);
    expect(adDivClass.parentElement.className).toContain('uvs-ad-wrapper-empty');
  });
  it('SlotRenderEndedCallback adds class to non empty responses', () => {
    event.isEmpty = false;
    document.getElementById = jest.fn();
    dfpManager.getAdById = jest.fn();
    dfpManager.getAdById.mockReturnValue(ad);
    document.getElementById.mockReturnValue(innerDiv);

    const adDivClass = dfpManager.slotRenderEndedCallback(event);
    expect(adDivClass.className).toContain('uvs-native-ad-container');
  });
  it('should call ad.callback once', () => {
    features.tracking.displayAdPerformance = false;
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(innerDiv);
    event.slot.getSlotId = () => ({
      getDomId: () => 'div-gpt-ad-3455',
    });

    dfpManager.getAdById = jest.fn();
    dfpManager.getAdById.mockReturnValue(ad);
    const adCallbackSpy = spyOn(ad, 'callback');
    dfpManager.slotRenderEndedCallback(event);
    dfpManager.slotRenderEndedCallback(event);
    expect(adCallbackSpy).toHaveBeenCalledTimes(1);
  });

  it('should call updateSlotAfterAdRender action once', () => {
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(innerDiv);
    event.slot.getSlotId = () => ({
      getDomId: () => 'div-gpt-ad-3455',
    });
    const actionSpy = jest.spyOn(Actions, 'updateNativeAdEmpty');
    dfpManager.getAdById = jest.fn();
    dfpManager.getAdById.mockReturnValue(ad);
    dfpManager.slotRenderEndedCallback(event);
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('should not call the tracker', () => {
    const trackerSpy = spyOn(trackingAdEvents, 'default').and.callThrough();
    dfpManager.getAdById = jest.fn();
    dfpManager.getAdById.mockReturnValue(ad);
    dfpManager.impressionViewableCallback(event);
    expect(trackerSpy).not.toHaveBeenCalled();
  });

  it('should call tracker if available', () => {
    ad.trackingValue = '1';
    features.tracking.displayAdPerformance = false;
    features.advertisement.areAdsTrackable = () => true;
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValue(innerDiv);
    dfpManager.getAdById = jest.fn();
    dfpManager.getAdById.mockReturnValue(ad);
    const trackerSpy = spyOn(trackingAdEvents, 'default').and.callThrough();
    dfpManager.impressionViewableCallback(event);
    expect(trackerSpy).toHaveBeenCalled();
  });
});

describe('dfpManager processAd', () => {
  it('should call IAS logic if feature is enabled', () => {
    jest.useFakeTimers();
    spyOn(dfpManager, 'displayAds');
    features.advertisement.ias = () => true;
    window.__iasPET.setTargetingForGPT = jest.fn();
    const adSlot = dfpManager.defineSlot(slot);
    dfpManager.processAd(adSlot, true);
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
    window.__iasPET.queue[0].dataHandler();
    expect(clearTimeout).toHaveBeenLastCalledWith(7);
  });
  it('should not call IAS logic when window.__iasPET.queue is not loaded', () => {
    jest.useFakeTimers();
    const displayAdsSpy = spyOn(dfpManager, 'displayAds').and.callThrough();
    features.advertisement.ias = () => true;
    window.__iasPET.queue = null;
    const adSlot = dfpManager.defineSlot(slot);
    dfpManager.processAd(adSlot, true);
    expect(displayAdsSpy).toHaveBeenCalled();
  });
});

it('should load Amazon if cookies are allowed', () => {
  delete window.apstag;
  features.advertisement.areCookiesDisallowed = () => false;
  features.advertisement.isPrebidDisplay = () => true;
  dfpManager.load();
  expect(window.apstag).toBeDefined();
});

describe('dfpManager refreshAds', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(dfpManager, 'setPageLevelParams').mockImplementation(jest.fn());
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Should increase cmd callback', () => {
    window.googletag = new GPT();
    const cmdSize = window.googletag.cmd.length;
    dfpManager.registerSlot(slot);
    dfpManager.refreshAds();
    expect(window.googletag.cmd.length).toBeGreaterThan(cmdSize);
  });
  it('Should call preFetchAds()', () => {
    window.googletag = new GPT();
    dfpManager.registerSlot(slot);
    const preFetchAdsSpy = spyOn(dfpManager, 'preFetchAds').and.callThrough();
    dfpManager.refreshAds();
    expect(preFetchAdsSpy).toHaveBeenCalledTimes(1);
  });
  it('Should call window.googletag.pubads().refresh() for a single ad', () => {
    window.googletag = new GPT();
    const getRefreshableAdsSpy = jest.spyOn(dfpManager, 'getRefreshableAds').mockImplementation(() => ([{
      slotID: 'div-gpt-ad-3455',
    }]));
    const refreshSpy = jest.spyOn(window.googletag.pubads(), 'refresh').mockImplementation();
    dfpManager.refreshAds(slot.slotID);
    window.googletag._loaded();
    expect(getRefreshableAdsSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });

  it('Should call preFetchAds() with array of id ads', () => {
    window.googletag = new GPT();
    const ads = {
      first: {
        slotID: 'div-gpt-ad-3455',
      },
      second: {
        slotID: 'div-gpt-ad-3467',
      },
    };
    const getRefreshableAdsSpy = jest.spyOn(dfpManager, 'getRefreshableAds').mockImplementation(() => ([ads.first, ads.second, ads.first]));
    const preFetchAdsSpy = spyOn(dfpManager, 'preFetchAds').and.callThrough();
    dfpManager.refreshAds([slot.slotID, slot.slotID]);
    expect(getRefreshableAdsSpy).toHaveBeenCalledTimes(1);
    expect(preFetchAdsSpy).toHaveBeenCalledTimes(1);
    expect(preFetchAdsSpy).toHaveBeenCalledWith(expect.any(Array));
  });
  it('Should call window.googletag.pubads().refresh() with array and stop if have the same size', () => {
    window.googletag = new GPT();
    const ad = {
      slotID: 'div-gpt-ad-3455',
    };
    const getRefreshableAdsSpy = jest.spyOn(dfpManager, 'getRefreshableAds').mockImplementation(() => ([ad, ad]));
    const refreshSpy = jest.spyOn(window.googletag.pubads(), 'refresh').mockImplementation();
    dfpManager.refreshAds([slot.slotID]);
    window.googletag._loaded();
    expect(getRefreshableAdsSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledTimes(1);
    expect(refreshSpy).toHaveBeenCalledWith(expect.any(Array));
  });
  it('Should not call window.googletag.pubads().refresh() for a single ad if not match', () => {
    window.googletag = new GPT();
    const refreshSpy = jest.spyOn(window.googletag.pubads(), 'refresh').mockImplementation();
    dfpManager.refreshAds('slot-ID');
    window.googletag._loaded();
    expect(refreshSpy).not.toHaveBeenCalled();
  });
  it('Should not call window.googletag.pubads().refresh() if not have ads', () => {
    window.googletag = new GPT();
    dfpManager.destroyAds();
    const refreshSpy = jest.spyOn(window.googletag.pubads(), 'refresh').mockImplementation();
    dfpManager.refreshAds();
    expect(refreshSpy).not.toHaveBeenCalled();
  });
});

describe('dfpManager destroyAds', () => {
  it('Should increase cmd callback', () => {
    Store.dispatch(Actions.displayAdsAboveTheFold());
    window.googletag = new GPT();
    const cmdSize = window.googletag.cmd.length;
    dfpManager.registerSlot(slot);
    dfpManager.destroyAds();
    expect(window.googletag.cmd.length).toBeGreaterThan(cmdSize);
  });
  it('Should call window.googletag.destorySlots()', () => {
    jest.spyOn(dfpManager, 'setPageLevelParams').mockImplementation(jest.fn());

    window.googletag = new GPT();
    dfpManager.registerSlot(slot);
    const destroySpy = spyOn(window.googletag, 'destroySlots');
    dfpManager.destroyAds();
    // eslint-disable-next-line no-underscore-dangle
    window.googletag._loaded();
    expect(destroySpy).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });
  it('Should not be called if window.googletag is not defined', () => {
    delete window.googletag;
    const loadSpy = spyOn(dfpManager, 'load').and.callThrough();
    dfpManager.destroyAds();
    expect(loadSpy).toHaveBeenCalledTimes(0);
  });
});

describe('dfpManager getRefreshableAds', () => {
  it('Should smaller array than argument', () => {
    const ads = [{ refreshable: true }, { refreshable: false }, { refreshable: false }];
    expect(dfpManager.getRefreshableAds(ads).length).toBeLessThan(ads.length);
  });
});

describe('dfpManager getSequence', () => {
  it('should return seuence like D-F728', () => {
    expect(dfpManager.getSequence('desktop', [[728, 90], [300, 250]]).indexOf('D-F728')).toBe(0);
  });
  it('should return empty string if not array provided', () => {
    expect(dfpManager.getSequence('desktop', '')).toBe('');
  });
  it('should return sequence like D-728 if not flex unit', () => {
    expect(dfpManager.getSequence('desktop', [[728, 90]]).indexOf('D-728')).toBe(0);
  });
});

describe('dfpManager getBkpAttr', () => {
  it('should return 320 by default', () => {
    BreakPoint.value = 'xs';
    expect(dfpManager.getBkpAttr()).toBe(320);
  });
  it('should return 1440 if Breakpoints >=1440', () => {
    BreakPoint.value = 'xl';
    expect(dfpManager.getBkpAttr()).toBe(1440);
  });
  it('should return 1024 if Breakpoints <1440 and >=1024', () => {
    BreakPoint.value = 'md';
    expect(dfpManager.getBkpAttr()).toBe(1024);
  });
  it('should return 768 if Breakpoints <1024 and >=768', () => {
    BreakPoint.value = 'sm';
    expect(dfpManager.getBkpAttr()).toBe(768);
  });
  it('should return 320 if Breakpoints <768', () => {
    BreakPoint.value = 'xs';
    expect(dfpManager.getBkpAttr()).toBe(320);
  });
});

describe('setTargeting', () => {
  it('should set the targeting if provided with valid input', () => {
    const targeting = {
      vertical: 'deportes',
      tag: ['soccer', 'futbol'],
    };
    const adSlot = {
      setTargeting: jest.fn(),
    };
    dfpManager.setTargeting(targeting, adSlot);
    expect(adSlot.setTargeting).toBeCalledWith('vertical', 'deportes');
    expect(adSlot.setTargeting).toBeCalledWith('tag', 'soccer,futbol');
  });

  it('should not set the targeting if provided with invalid input', () => {
    const targeting = null;
    const adSlot = {
      setTargeting: jest.fn(),
    };
    dfpManager.setTargeting(targeting, adSlot);
    expect(adSlot.setTargeting).not.toBeCalledWith();
  });
});

describe('getAdDomId', () => {
  it('should return slot id', () => {
    const testSlot = {
      getSlotId: () => ({ getDomId: () => 'slot-id-test' }),
    };
    expect(dfpManager.getAdDomId(testSlot)).toBe('slot-id-test');
  });
});

describe('dfpManager setWithUserId', () => {
  let setTargeting = jest.fn();
  let setPublisherProvidedId = jest.fn();
  const setPrivacySettings = jest.fn();
  beforeEach(() => {
    window.googletag = new GPT();
    setTargeting = jest.fn();
    setPublisherProvidedId = jest.fn();
    jest.spyOn(
      window.googletag,
      'pubads'
    ).mockImplementation(() => ({
      setPublisherProvidedId,
      setTargeting,
      setPrivacySettings,
    }));
  });
  it('should call functions within setWithUserId', () => {
    dfpManager.setWithUserId('userId');
    expect(setTargeting).toHaveBeenCalled();
    expect(setPublisherProvidedId).toHaveBeenCalled();
  });

  it('should not call functions within setWithUserId', () => {
    delete window.googletag;
    dfpManager.setWithUserId();
    expect(setTargeting).not.toHaveBeenCalled();
    expect(setPublisherProvidedId).not.toHaveBeenCalled();
  });
});

describe('dfpManager setPageLevelParams', () => {
  const originalWindow = global.window;
  let setTargeting;
  let clearTargeting;
  let setPrivacySettings;

  beforeEach(() => {
    setTargeting = jest.fn();
    clearTargeting = jest.fn();
    setPrivacySettings = jest.fn();

    Object.defineProperty(global, 'window', {
      value: {
        location: {
          search: '?skey=value',
        },
        googletag: {
          pubads: jest.fn(() => {
            return {
              clearTargeting,
              setTargeting,
              setPrivacySettings,
            };
          }),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    global.window = originalWindow;
    delete global.window.googletag;
  });

  it('should not run method if googletag is not defined', () => {
    delete window.googletag;
    dfpManager.setPageLevelParams();
  });

  it('should call set targeting on page level', () => {
    dfpManager.shouldResetPageLevelParams = false;
    dfpManager.setPageLevelParams();
    expect(setTargeting).toHaveBeenCalled();
  });

  it('should call clear targeting on page level', () => {
    dfpManager.shouldResetPageLevelParams = true;
    dfpManager.setPageLevelParams();
    expect(clearTargeting).toHaveBeenCalled();
  });

  it('should not set test group param when null', () => {
    const testGroupSpy = jest.spyOn(getTestGroup, 'default').mockReturnValue(null);
    dfpManager.setPageLevelParams();
    expect(testGroupSpy).toBeCalled();
  });

  it('should set targeting values', () => {
    dfpManager.shouldResetPageLevelParams = true;
    const targetingValuesSpy = jest.spyOn(pageSelectors, 'adSettingsTargetingSelector')
      .mockReturnValue({
        vertical: 'main',
      });
    dfpManager.setPageLevelParams();
    expect(targetingValuesSpy).toHaveBeenCalled();
  });
  it('should set skey targeting when isTelevisaSite is true and skey is in the URL', () => {
    dfpManager.shouldResetPageLevelParams = false;
    dfpManager.isTelevisaSite = true;
    dfpManager.setPageLevelParams();

    expect(setTargeting).toBeCalledWith('skey', 'value');
  });
  it('should set skey targeting when isTelevisaSite is true and skey is not in the URL', () => {
    dfpManager.shouldResetPageLevelParams = false;
    global.window.location.search = '';
    dfpManager.isTelevisaSite = true;
    dfpManager.setPageLevelParams();
    expect(setTargeting).not.toHaveBeenCalledWith('skey', 'value');
  });
  it('should set skey targeting when isTelevisaSite is false and skey is in the URL', () => {
    dfpManager.shouldResetPageLevelParams = false;
    dfpManager.isTelevisaSite = false;
    dfpManager.setPageLevelParams();
    expect(setTargeting).not.toHaveBeenCalledWith('skey', 'value');
  });
});
