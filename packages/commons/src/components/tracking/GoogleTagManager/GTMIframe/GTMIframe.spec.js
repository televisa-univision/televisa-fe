import React from 'react';
import { shallow } from 'enzyme';
import gtmConfig from '../../../../utils/tracking/googleTagManager/gtmConfig.json';
import GTMIframe from '.';
import Store from '../../../../store/store';
import setPageData from '../../../../store/actions/page-actions';

describe('GTMIframe', () => {
  it('should render an iframe to load GTM', () => {
    const wrapper = shallow(<GTMIframe />);
    expect(wrapper.html()).toContain(`src="https://www.googletagmanager.com/ns.html?id=${gtmConfig.id}"`);
  });

  it('should render an iframe to load GTM in test mode', () => {
    Store.dispatch(setPageData({
      env: 'test',
    }));
    const wrapper = shallow(<GTMIframe />);
    expect(wrapper.html()).toContain(`src="https://www.googletagmanager.com/ns.html?id=${gtmConfig.id + gtmConfig.testParameters}"`);
  });
});
