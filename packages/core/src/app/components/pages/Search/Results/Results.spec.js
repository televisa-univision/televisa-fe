import React from 'react';
import { mount, shallow } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import Results from './Results';
import mockApiData from '../__mocks__/data.json';

const props = {
  results: mockApiData.data.results,
  loading: false,
};

describe('Search Page Form', () => {
  it('should not render the river element if results not has valid data', () => {
    const badResults = [null, {}];
    const wrapper = mount(<Results results={badResults} />);
    expect(wrapper.find('.river')).toHaveLength(1);
  });

  it('should render emptyResults if results has not data', () => {
    let wrapper = mount(<Results loading={false} />);
    expect(wrapper.find('.emptyResults')).toHaveLength(1);
    wrapper = shallow(<Results loading />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render an ad on river of results if the UA is mobile', () => {
    Store.dispatch(setPageData({ device: 'mobile' }));
    const wrapper = shallow(<Results {...props} />);
    expect(wrapper.find('li.ADResult')).toHaveLength(2);
  });
});
