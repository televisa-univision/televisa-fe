import { shallow, mount } from 'enzyme';

import articleAds from './articleAds';

describe('articleAds getRightRailTopAd', () => {
  it('should render FWAd when lead is video', () => {
    const wrapper = shallow(articleAds.getRightRailTopAd('video', 'desktop'));
    expect(wrapper.find('#videocompanion').length).not.toBe(0);
  });
  it('should render DFPAd when lead is not video', () => {
    const wrapper = mount(articleAds.getRightRailTopAd('article', 'mobile'));
    expect(wrapper.find('#videocompanion').length).toBe(0);
  });
});
