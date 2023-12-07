import React from 'react';
import { shallow } from 'enzyme';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';

import RadarMap from '.';

describe('RadarMap', () => {
  it('should render a WxWidget with the proper settings', () => {
    const wrapper = shallow(<RadarMap settings={{ menuitems: '1101,0002,0011' }} />);
    expect(wrapper.find('WxWidget').prop('menuitems')).toBe('1101,0002,0011');
  });

  it('should render a WxWidget with title', () => {
    const wrapper = shallow(<RadarMap settings={{ title: 'Test' }} />);
    expect(wrapper.find('.untitled')).toHaveLength(0);
  });

  it('should render a WxWidget with overrides', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<RadarMap settings={{ animate: true }} />);
    expect(wrapper.find('WxWidget').prop('animate')).toBeTruthy();
  });
});
