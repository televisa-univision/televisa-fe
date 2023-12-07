/**
 * @module PrendeTV Blog Promo Card spec
 */
import React from 'react';
import { mount } from 'enzyme';

import Blog from '.';
import props from './__mocks__/blog.json';
import { PRENDE_TV_LANDING } from '../../../constants';
import PrendeTVContext from '../../../context';

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
  page: {
    data: {},
    error: null,
  },
};

/**
 * @test {PrendeTV Blog}
 */
describe('PrendeTV Blog Promo Card test', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <PrendeTVContext.Provider value={contextData}>
        <Blog {...props} />
      </PrendeTVContext.Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('Blog')).toHaveLength(1);
  });
});
