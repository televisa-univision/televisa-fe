import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import AdSettings from '../../../../utils/ads/adSettings.json';
import * as AdTypes from '../../../../utils/ads/ad-types';
import FWAdStandAlone from './FWAdStandAlone';

const pageData = {
  env: 'test',
  device: 'desktop',
  requestParams: {
    mode: 'test',
    debug: 'true'
  },
  data: {
    adSettings: {
      disableAds: false,
      freewheel: {
        sectionId: 'tv_shows_despiertaamerica_homepage',
        assetId: null,
        adValue: null,
        test: {
          displayAdProfilePath: 'univision_test',
          host: 'https://1b656.v.fwmrm.net',
          linkTag2Profile: '111976:univision_linktag2_test',
          networkCode: '111976',
          profilePath: 'univision_test_HTML5'
        },
        production: {
          displayAdProfilePath: 'univision_test',
          host: 'https://1b656.v.fwmrm.net',
          linkTag2Profile: 'univision_linktag2_live',
          networkCode: '112214',
          profilePath: 'univision_Live_HTML5'
        }
      }
    }
  }
};

describe('FWAdStandAlone ', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FWAdStandAlone width="1" height="3" adType={AdTypes.SLED_AD} pageData={pageData} />, div);
  });
});

describe('FWAdStandAlone getIframeSrc', () => {
  it('Should return null if adType not defiend', () => {
    expect(FWAdStandAlone.getIframeSrc('')).toBe(null);
  });
  it('Should return null if wrong api data', () => {
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD)).toBe(null);
  });
  it('Should not return null if adType is defined and right data', () => {
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, pageData)).not.toBe(null);
  });
  it('Should use prod enviroment if not env included', () => {
    const newPageData = Object.assign({}, pageData);
    delete newPageData.env;
    delete newPageData.requestParams;
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData).indexOf('112214')).not.toBe(-1);
  });
  it('Should return test parameters if requestParams.mode = debug', () => {
    const newPageData = Object.assign({}, pageData);
    delete newPageData.env;
    delete newPageData.requestParams.mode;
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData).indexOf('111976')).not.toBe(-1);
  });
  it('Should use prod enviroment if no request parameter or env', () => {
    const newPageData = Object.assign({}, pageData);
    delete newPageData.requestParams.debug;
    delete newPageData.requestParams.mode;
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData).indexOf('112214')).toBe(-1);
  });
  it('Should use prod enviroment if requestParams.mode = prod', () => {
    const newPageData = Object.assign({}, pageData);
    delete newPageData.requestParams.debug;
    newPageData.requestParams.mode = 'prod';
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData).indexOf('112214')).not.toBe(-1);
  });
  it('Should return null if adSettings.freewheel[env] is not defined', () => {
    const newPageData = Object.assign({}, pageData);
    newPageData.env = 'abc';
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData)).toBe(null);
  });
  it('Should use mobile if pageData.device is not defined', () => {
    const newPageData = Object.assign({}, pageData);
    delete newPageData.device;
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SLED_AD, newPageData).indexOf('ssid=m')).not.toBe(-1);
  });
  it('Should not have printOptions if AdSettings is not array', () => {
    AdTypes.SAMPLE_AD = 'SAMPLE_AD';
    AdSettings[AdTypes.SAMPLE_AD] = '';
    expect(FWAdStandAlone.getIframeSrc(AdTypes.SAMPLE_AD, pageData).indexOf('w=1&h=3')).toBe(-1);
  });
});

describe('FWAdStandAlone render', () => {
  it('Should render iframe after mount', () => {
    const wrapper = mount(<FWAdStandAlone width="1" height="3" adType={AdTypes.SLED_AD} pageData={pageData} />);
    expect(wrapper.find('div').html().indexOf('iframe')).not.toBe(-1);
  });
});
