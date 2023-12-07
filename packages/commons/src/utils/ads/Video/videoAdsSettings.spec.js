import videoAds from './videoAdsSettings';
import { pageData } from '../../../config/storyMocks';
import features from '../../../config/features';
import * as storeHelpers from '../../../store/storeHelpers';
import { UNIVISION_SITE } from '../../../constants/sites';
import { PHASED_RELEASE_BASELINE } from '../../../constants/tracking';

describe('getDFPSettings', () => {
  it('Should return expected dfp ad settings when desktop', () => {
    const adSettings = videoAds.getDFPSettings(pageData);
    expect(adSettings).toEqual({
      advalue: 'univision_section_homepage',
      prefix: 'rd.',
      customParams: pageData.data.adSettings.targeting,
    });
  });

  it('Should return expected dfp ad settings when no targeting values', () => {
    const clonedPageData = JSON.parse(JSON.stringify(pageData));
    delete clonedPageData.data.adSettings.targeting;

    const adSettings = videoAds.getDFPSettings(clonedPageData);

    expect(adSettings).toMatchObject({
      advalue: 'univision_section_homepage',
      prefix: 'rd.',
    });
  });

  it('should add custom dfp params for Ad Rules', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'test',
      writable: true,
    });
    const clonedPageData = JSON.parse(JSON.stringify(pageData));
    delete clonedPageData.data.adSettings.targeting;
    spyOn(features.video, 'enableAdRules').and.returnValue(true);
    spyOn(storeHelpers, 'getNavigationCount').and.returnValue(2);
    const adSettings = videoAds.getDFPSettings(clonedPageData);
    expect(adSettings.customParams).toEqual({
      spaStart: false,
      user_agent: 'test',
    });
  });

  it('should add custom dfp params for disabling ads', () => {
    const clonedPageData = JSON.parse(JSON.stringify(pageData));
    delete clonedPageData.data.adSettings.targeting;
    spyOn(features.video, 'enableAdRules').and.returnValue(true);
    spyOn(storeHelpers, 'getNavigationCount').and.returnValue(2);
    const adSettings = videoAds.getDFPSettings(clonedPageData, true);
    expect(adSettings.customParams).toEqual({
      spaStart: false,
      cms_disableads: true,
      user_agent: 'test',
    });
  });

  it('should add custom dfp params for Video performance', () => {
    const clonedPageData = JSON.parse(JSON.stringify(pageData));
    delete clonedPageData.data.adSettings.targeting;
    spyOn(storeHelpers, 'getNavigationCount').and.returnValue(2);
    const adSettings = videoAds.getDFPSettings({
      ...clonedPageData,
      site: UNIVISION_SITE,
    });
    expect(adSettings.customParams).toEqual({
      spaStart: false,
      test_group: PHASED_RELEASE_BASELINE,
      user_agent: 'test',
    });
  });

  it('Should return null if no ad settings', () => {
    const clonedPageData = JSON.parse(JSON.stringify(pageData));
    delete clonedPageData.data.adSettings;

    const adSettings = videoAds.getDFPSettings(clonedPageData);
    expect(adSettings).toEqual(null);
  });

  it('Should return expected prefix when ios', () => {
    // Set iOS Navigator
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone iOS 11 like Mac OS X) Mobile Safari/535.19',
      writable: true,
    });

    const prefix = videoAds.getDevicePrefix();
    expect(prefix).toEqual('rm.');
  });

  it('Should return expected prefix when android', () => {
    // Set Android Navigator
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) Mobile Safari/535.19',
      writable: true,
    });

    const prefix = videoAds.getDevicePrefix();
    expect(prefix).toEqual('rm.');
  });

  it('Should add user agent to custom params', () => {
    const userAgent = 'test';
    Object.defineProperty(window.navigator, 'userAgent', {
      value: userAgent,
      writable: true,
    });
    const adSettings = videoAds.getDFPSettings(pageData);
    expect(adSettings.customParams.user_agent).toEqual(userAgent);
  });
});
