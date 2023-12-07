import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import AdBelowSlideshow from './AdBelowSlideshow';

/** @test {AdBelowSlideshow} */
describe('AdBelowSlideshow', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const props = { hideAds: [] };
    ReactDOM.render(<AdBelowSlideshow {...props} />, div);
  });
  it('should hide the ad id if it is on the list', () => {
    const props = { hideAds: [AdTypes.SLIDESHOW_TOP_AD] };
    const wrapper = mount(<AdBelowSlideshow {...props} />);
    expect(wrapper.find('div.hideAd').exists()).toBe(true);
  });
});
