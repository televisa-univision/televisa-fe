import React from 'react';
import { shallow } from 'enzyme';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import { AD_LAYOUT_RAIL_BOTTOM } from './layouts';
import WithSelectiveAd from '.';

/**
 * Sample React component
 * @returns {JSX}
 */
const SampleComponent = () => (<div>Hello</div>);
const CmpWithAds = WithSelectiveAd(SampleComponent);
const CmpWithAdsLayout = WithSelectiveAd(SampleComponent, AD_LAYOUT_RAIL_BOTTOM);

storeHelpers.getPageCategory = jest.fn();
storeHelpers.getDevice = jest.fn(() => 'mobile');

jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => 'DFPAd');

describe('WidthSelectiveAd', () => {
  beforeEach(() => {
    storeHelpers.getPageCategory.mockClear();
    storeHelpers.getDevice.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return the same componet by default', () => {
    const wrapper = shallow(<CmpWithAds />);
    expect(wrapper.dive().contains(<div>Hello</div>)).toBeTruthy();
  });

  it('should inject ad on top if mobile and right pageCategory', () => {
    storeHelpers.getPageCategory.mockReturnValue('soccercompetition-estadisticas');
    const wrapper = shallow(<CmpWithAds />);
    expect(wrapper.dive().find('DFPAd')).toHaveLength(1);
  });

  it('should not insert ad on sidebar if desktop and right pageCategory', () => {
    storeHelpers.getPageCategory.mockReturnValue('soccerteam-plantel');
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    const wrapper = shallow(<CmpWithAds />);
    expect(wrapper.dive().find('.sidebar')).toHaveLength(1);
  });

  it('should inject refresahble ad if mobile and right pageCategory', () => {
    storeHelpers.getPageCategory.mockReturnValue('deportes posiciones');
    const wrapper = shallow(<CmpWithAds />);
    const spyGetAd = jest.spyOn(adHelper, 'getAd');
    expect(wrapper.dive().find('DFPAd')).toHaveLength(1);
    expect(spyGetAd).toHaveBeenCalledWith('Top Ad No Flex', {
      isLazyLoaded: false,
      onRegisterSlot: expect.any(Function),
    });
    spyGetAd.mockRestore();
  });

  it('should inject refresahble ad if desktop and right pageCategory', () => {
    storeHelpers.getPageCategory.mockReturnValue('deportes posiciones');
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    const wrapper = shallow(<CmpWithAds />);
    const spyGetAd = jest.spyOn(adHelper, 'getAd');
    expect(wrapper.dive().find('DFPAd')).toHaveLength(1);
    expect(spyGetAd).toHaveBeenCalledWith('Widget Ad Refreshable', {
      isLazyLoaded: false,
      onRegisterSlot: expect.any(Function),
    });
    spyGetAd.mockRestore();
  });

  it('should set slots and allow refresh ads', () => {
    storeHelpers.getPageCategory.mockReturnValue('deportes posiciones');
    const wrapper = shallow(<CmpWithAds />);
    const refreshAdsSpy = jest.spyOn(dfpManager, 'refreshAds');
    const { onRegisterSlot } = wrapper.props();
    const { refreshSelectiveAd } = wrapper.find(SampleComponent).props();
    expect(onRegisterSlot).toEqual(expect.any(Function));
    expect(refreshSelectiveAd).toEqual(expect.any(Function));
    onRegisterSlot();
    refreshSelectiveAd();
    expect(refreshAdsSpy).not.toHaveBeenCalled();
    onRegisterSlot('ad-1234');
    refreshSelectiveAd();
    expect(refreshAdsSpy).toHaveBeenCalledWith(['ad-1234']);
  });

  it('should inject ad for custom layout if mobile and right pageCategory', () => {
    const wrapper = shallow(<CmpWithAdsLayout />);
    const spyGetAd = jest.spyOn(adHelper, 'getAd');
    expect(wrapper.dive().find('DFPAd')).toHaveLength(2);
    expect(spyGetAd).toHaveBeenCalledTimes(2);
    spyGetAd.mockRestore();
  });

  it('should not insert ad for custom layout if desktop and right pageCategory', () => {
    storeHelpers.getDevice.mockReturnValueOnce('desktop');
    const wrapper = shallow(<CmpWithAdsLayout />);
    const spyGetAd = jest.spyOn(adHelper, 'getAd');
    expect(wrapper.dive().find('DFPAd')).toHaveLength(2);
    expect(spyGetAd).toHaveBeenCalledTimes(2);
    spyGetAd.mockRestore();
  });
});
