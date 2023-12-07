import { mount } from 'enzyme';

import slideslowAds from './slideshowAds';

jest.mock('react-lazyload', () => jest.fn(c => c.children));

describe('slidesowAds getInlineAd', () => {
  it('should return DFPAd component', () => {
    const wrapper = mount(slideslowAds.getInlineAd(1));
    expect(wrapper.find('DPFAd')).toBeDefined();
  });
  it('should return DFPAd with sizeMapping 300x250 for mobile every 3rd slide', () => {
    const wrapper = mount(slideslowAds.getInlineAd(6));
    expect(wrapper.find('[sizeMapping]').props('sizeMapping').sizeMapping.mobile).toEqual([[300, 250]]);
  });
  it('should return DFPAd with sizeMapping 300x50 for mobile by default', () => {
    const wrapper = mount(slideslowAds.getInlineAd(1));
    expect(wrapper.find('[sizeMapping]').props('sizeMapping').sizeMapping.mobile).toEqual([[320, 50]]);
  });
});

describe('slidesowAds injectAds', () => {
  it('should return array with add', () => {
    const slides = ['a', 'b', 'c', 'e', 'd'];
    expect(slideslowAds.injectAds(slides).length).toBeGreaterThan(slides.length);
  });
  it('should return same argument if not array', () => {
    expect(slideslowAds.injectAds(1)).toBe(1);
  });
});
