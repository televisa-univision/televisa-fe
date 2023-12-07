import React from 'react';
import { shallow } from 'enzyme';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';

import { AD_LAYOUT_RAIL_BOTTOM } from '../layouts';
import MobileView from '.';

storeHelpers.getPageCategory = jest.fn(() => 'soccercompetition-estadisticas');
storeHelpers.getDevice = jest.fn(() => 'desktop');

jest.mock('@univision/fe-commons/dist/components/ads/dfp/DFPAd', () => 'DFPAd');

describe('WidthSelectiveAd DesktopView', () => {
  beforeEach(() => {
    storeHelpers.getPageCategory.mockClear();
    storeHelpers.getDevice.mockClear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<MobileView />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('DFPAd')).toHaveLength(1);
  });

  it('should not insert ad for custom layout if desktop and right pageCategory', () => {
    const wrapper = shallow(<MobileView layout={AD_LAYOUT_RAIL_BOTTOM} />);
    const spyGetAd = jest.spyOn(adHelper, 'getAd');
    expect(wrapper.find('DFPAd')).toHaveLength(2);
    spyGetAd.mockRestore();
  });
});
