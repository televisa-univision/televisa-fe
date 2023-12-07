import React from 'react';
import { shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Search from './Search';

describe('Search Page', () => {
  it('should render an Header + SearchBody + Footer', () => {
    const wrapper = shallow(<Search page={{}} />);
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('FooterWrapper')).toHaveLength(1);
  });

  it('should return null for invalid data', () => {
    const wrapper = shallow(<Search page={null} />);
    expect(wrapper.type()).toBe(null);
  });

  it('the header should return null for invalid data', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    const wrapper = shallow(<Search page={{}} />);
    expect(wrapper.find('Header').prop('renderingOptions').showSearch).toBe(true);
  });
});
