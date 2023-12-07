import React from 'react';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import TropicalSystemsMap from '.';

describe('TropicalSystemsMap', () => {
  it('should render a WxWidget with the proper settings', () => {
    const wrapper = shallow(<TropicalSystemsMap />);
    expect(wrapper.find('WxWidget').prop('menuitems')).toBe('1101,0002,0009,0015,0017,0021');
  });

  it('should render a WxWidget with title', () => {
    const wrapper = shallow(<TropicalSystemsMap settings={{ title: 'Test' }} />);
    expect(wrapper.find('.untitled')).toHaveLength(0);
  });

  it('should render a WxWidget with overrides', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
      data: {
        brandable: {
          tvStation: {
            call: 'WLTV',
          },
        },
      },
    }));
    const wrapper = shallow(<TropicalSystemsMap />);
    expect(wrapper.find('WxWidget').prop('menuitems')).toBe('1101,0002,0015');
    expect(wrapper.find('WxWidget').prop('zoomlevel')).toBe(3);
  });

  it('should render a WxWidget with overrides', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: {
        brandable: {
          tvStation: {
            call: 'WLTV',
          },
        },
      },
    }));
    const wrapper = shallow(<TropicalSystemsMap />);
    expect(wrapper.find('WxWidget').prop('zoomlevel')).toBe(4);
  });
});
