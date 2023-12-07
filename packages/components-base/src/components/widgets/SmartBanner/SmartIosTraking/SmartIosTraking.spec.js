import React from 'react';
import { shallow } from 'enzyme';
import SmartIosTraking from '.';

const props = {
  appId: 'com.univision',
  trackingId: 'smart_banner_univision_now',
};

/** @test {SmartIosTraking} */
describe('SmartIosTraking test', () => {
  it('should render correctly', () => {
    delete global.window;
    const wrapper = shallow(<SmartIosTraking {...props} />);

    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').prop('src')).toBe('https://app.appsflyer.com/idcom.univision?pid=ios_smart_banner&c=smart_banner_univision_now');
  });

  it('should not render if not have valid data', () => {
    const wrapper = shallow(<SmartIosTraking {...props} trackingId={null} />);

    expect(wrapper.html()).toBeNull();
  });
});
