import React from 'react';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import AmpShell from './AmpShell';

describe('AmpShell', () => {
  const assets = {};
  const page = '<div id="page"></div>';

  Store.dispatch(setPageData({ data: mockApiData.data, requestParams: {} }));

  it('should render with __INITIAL_STATE__', () => {
    process.env.NODE_ENV = 'development';

    const wrapper = mount(<AmpShell
      assets={assets}
      page={page}
    />);

    expect(wrapper.find('#initial-state').length).toBe(1);
  });

  it('should render without uri', () => {
    Store.dispatch(setPageData({ data: { ...mockApiData.data, uri: null }, requestParams: {} }));
    process.env.NODE_ENV = 'production';
    const wrapper = mount(<AmpShell
      assets={assets}
      page={page}
    />);

    expect(wrapper.find('#initial-state').length).toBe(0);
  });
});
