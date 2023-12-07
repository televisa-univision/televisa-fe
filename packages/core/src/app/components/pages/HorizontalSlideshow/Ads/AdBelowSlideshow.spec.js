import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import AdBelowSlideshow from './AdBelowSlideshow';

const store = configureStore({ dfpAds: { hideAds: [AdTypes.SLIDESHOW_BOT_AD] } });

/** @test {AdBelowSlideshow} */
describe('AdBelowSlideshow', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdBelowSlideshow store={store} />, div);
  });
  it('should hide the ad id if it is on the list', () => {
    const wrapper = mount(<AdBelowSlideshow store={store} />);
    expect(wrapper.find('div.hideAd').exists()).toBe(true);
  });
});
