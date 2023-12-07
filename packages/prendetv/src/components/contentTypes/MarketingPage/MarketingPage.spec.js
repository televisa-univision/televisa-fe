/**
 * @module Marketing Page Specs
 */
import React from 'react';
import { mount } from 'enzyme';

import { PRENDE_TV_LANDING } from '../../../constants';
import PrendeTVContext from '../../../context';
import * as promoCardTypes from '../../../constants/promoCardTypes';

import MarketingPageComponent from './index';

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
  page: {
    data: {
      promoCards: [
        { type: promoCardTypes.NOTIFY_PRESS_EMAIL },
        { type: null },
      ],
    },
  },
};

/**
 * @test {Footer}
 */
describe('Marketing Page test', () => {
  it('should render the promo cards correctly', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData}>
        <MarketingPageComponent />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MarketingPage__Wrapper')).toHaveLength(1);
    expect(wrapper.find('NotifyPressEmail__Wrapper')).toHaveLength(1);
  });
});
