import React from 'react';
import { shallow } from 'enzyme';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import DFPAdsProvider from '@univision/fe-commons/dist/components/ads/dfp/DFPAdsProvider';
import Features from '@univision/fe-commons/dist/config/features';
import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';

import MainWrapper from '.';
import mockData from './data/mockData.json';

localization.setLanguage = jest.fn();
Features.optimize.antiFlicker = jest.fn();
Features.header.hideHeaderFooter = jest.fn();

let props;
beforeEach(() => {
  localization.setLanguage.mockReset();
  props = {
    state: {
      page: {
        env: 'test',
        language: 'en',
        data: {
          ...mockData.data,
        },
        requestParams: null,
      },
    },
  };
});

jest.mock('@univision/fe-commons/dist/components/tracking/MainTracking', () => 'MainTracking');

/** @test {Head} */
describe('MainWrapper Spec', () => {
  it('should provide default language if none provided', () => {
    props.state.page.language = undefined;
    shallow(<MainWrapper {...props} />);
    expect(localization.setLanguage).toBeCalledWith('es');
  });

  it('passes empty config objects if not defined in page', () => {
    const componentProps = { ...props, state: { page: null } };
    const wrapper = shallow(<MainWrapper {...componentProps} />);
    expect(wrapper.find(MainTracking).prop('contentType')).toBeNull();
  });

  it('should include dfp provider by default', () => {
    const wrapper = shallow(<MainWrapper {...props} />);
    expect(wrapper.find(DFPAdsProvider).length).toBe(1);
  });

  it('should not include dfp provider if dfpSupport false', () => {
    const wrapper = shallow(<MainWrapper {...props} dfpSupport={false} />);
    expect(wrapper.find(DFPAdsProvider).length).toBe(0);
  });

  it('should not include dfp provider if sensitive content', () => {
    spyOn(Features.content, 'isSensitive').and.returnValue(true);
    const wrapper = shallow(<MainWrapper {...props} />);
    expect(wrapper.find(DFPAdsProvider).length).toBe(0);
  });

  it('should not connect MainTracking to page by default', () => {
    const wrapper = shallow(<MainWrapper {...props} />);
    expect(wrapper.find('MainTracking')).toHaveLength(1);
  });

  it('should connect MainTracking to page if connectTracking prop is true', () => {
    const wrapper = shallow(<MainWrapper {...props} connectTracking />);
    expect(typeof wrapper.find('[contentType="section"]').get(0).type).toBe('function');
    expect(wrapper.find('MainTracking')).toHaveLength(0);
  });

  it('should not included unnecessary components for SPA', () => {
    props.state.page.isSpa = true;
    const wrapper = shallow(<MainWrapper {...props} />);
    expect(wrapper.find(BKPIndicator)).toHaveLength(0);
  });
});
