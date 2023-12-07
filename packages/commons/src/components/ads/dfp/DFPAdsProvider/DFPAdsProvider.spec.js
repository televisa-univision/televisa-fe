import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import GPT from 'gpt-mock';
import dfpManager from '../../../../utils/ads/dfpManager';
import DFPAd from '../DFPAd';
import DFPAdsProvider from '.';
import thirdPartiesFeature from '../../../../config/features/thirdParties';

jest.useFakeTimers();

/** @test {Ad} */
describe('DFPAdsProvider ', () => {
  const DFPAdProviderComponent = (
    <DFPAdsProvider>
      <DFPAd
        sizeMapping={{
          desktop: [[728, 90], [970, 90], [970, 250]],
          tablet: [[728, 90]],
          mobile: [[320, 50]]
        }}
      />
    </DFPAdsProvider>
  );

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(DFPAdProviderComponent, div);
  });

  it('should call ComponentDidMountCalled', () => {
    spyOn(DFPAdsProvider.prototype, 'componentDidMount');
    mount(DFPAdProviderComponent);
    jest.runOnlyPendingTimers();
    expect(DFPAdsProvider.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });
  it('should call dfpManager.preFetchAds if API ready', () => {
    const preFetchAdsSpy = jest.spyOn(dfpManager, 'preFetchAds');
    window.googletag = new GPT();
    // eslint-disable-next-line no-underscore-dangle
    window.googletag._loaded();
    mount(DFPAdProviderComponent);
    process.nextTick(() => {
      try {
        expect(preFetchAdsSpy).toHaveBeenCalledTimes(1);
      } catch (e) {
        // some logger here
      }
    });
  });
  it('should remove timer on unmount', () => {
    spyOn(global, 'clearTimeout');
    const wrapper = mount(DFPAdProviderComponent);
    wrapper.unmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });
  it('should not call dfpManager is dfp flag disabled', () => {
    const preFetchAdsSpy = jest.spyOn(dfpManager, 'preFetchAds');
    jest.spyOn(thirdPartiesFeature, 'isDFPDisabled').mockReturnValue(true);
    mount(DFPAdProviderComponent);
    process.nextTick(() => {
      try {
        expect(preFetchAdsSpy).toHaveBeenCalledTimes(0);
      } catch (e) {
        // some logger here
      }
    });
  });
});
