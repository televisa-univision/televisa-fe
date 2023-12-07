import React from 'react';
import { shallow } from 'enzyme';
import SmartBannerMetadata from '.';

const props = {
  appId: 'com.univision',
  deepLink: 'univision://article/1234',
  trackingId: 'smart_banner_univision_now',
};

/** @test {SmartBannerMetadata} */
describe('SmartBannerMetadata test', () => {
  it('should not render in client side', () => {
    const wrapper = shallow(<SmartBannerMetadata {...props} />);

    expect(wrapper.find('meta')).toHaveLength(0);
  });

  it('should render correctly is SSR', () => {
    delete global.window;
    const wrapper = shallow(<SmartBannerMetadata {...props} />);

    expect(wrapper.find('meta')).toHaveLength(1);
    expect(wrapper.find('meta').html()).toMatch(/content="app-id=com.univision/);
  });

  it('should not render in SSR if not have valid app id', () => {
    const wrapper = shallow(<SmartBannerMetadata {...props} appId={null} />);

    expect(wrapper.find('meta')).toHaveLength(0);
  });

  it('should render with deepLink data', () => {
    const wrapper = shallow(<SmartBannerMetadata {...props} />);

    expect(wrapper.find('meta')).toHaveLength(1);
    expect(wrapper.find('meta').html()).toMatch(/app-argument=univision/);
  });

  it('should render without deepLink', () => {
    const wrapper = shallow(<SmartBannerMetadata {...props} deepLink={null} />);

    expect(wrapper.find('meta')).toHaveLength(1);
    expect(wrapper.find('meta').html()).not.toMatch(/app-argument=univision/);
  });
});
