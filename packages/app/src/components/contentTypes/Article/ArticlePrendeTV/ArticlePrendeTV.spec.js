import React from 'react';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore'; // eslint-disable-line

import { PRENDE_TV_LANDING } from '@univision/fe-prendetv/dist/constants';

import PrendeTVContext from '@univision/fe-prendetv/dist/context';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import preloadAll from 'jest-next-dynamic';
import ArticlePrendeTV from '.';

const store = configureStore();

jest.mock('../ArticleBody');

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
 * @test {ArticlePrendeTV}
 */
describe('ArticlePrendeTV test', () => {
  beforeAll(async () => {
    await preloadAll();
  });
  it('should render correctly when page data is not specified', async () => {
    const wrapper = mount(
      <PrendeTVContext.Provider value={{
        ...contextData,
        page: null,
      }}
      >
        <ArticlePrendeTV />
      </PrendeTVContext.Provider>,
    );
    expect(wrapper.find('ArticlePrendeTV__Wrapper')).toHaveLength(0);
  });
  it('should render correctly', () => {
    store.dispatch(setPageData({ ...contextData.page, device: contextData.device }));
    const wrapper = mount(
      <PrendeTVContext.Provider value={contextData}>
        <ArticlePrendeTV />
      </PrendeTVContext.Provider>,
    );
    expect(wrapper.find('.uvs-container')).toHaveLength(1);
  });
});
