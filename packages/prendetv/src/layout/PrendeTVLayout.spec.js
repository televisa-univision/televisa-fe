/**
 * @module PrendeTV Layout Specs
 */
import React from 'react';
import { mount, shallow } from 'enzyme';

import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';

import PrendeTVContext from '../context';
import { PRENDE_TV_LANDING } from '../constants';
import * as promoCardTypes from '../constants/promoCardTypes';

import PrendeTVLayout from '.';

const contextData = {
  lang: 'en',
  path: PRENDE_TV_LANDING,
  device: 'mobile',
  page: {
    data: {
      title: 'title',
      description: 'description',
      seo: {
        title: 'title',
        description: 'description',
      },
      promoCards: [
        { type: promoCardTypes.NOTIFY_PRESS_EMAIL },
        { type: null },
      ],
    },
    error: null,
  },
};

/**
 * @test {PrendeTVLayout}
 */
describe('PrendeTVLayout test', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <PrendeTVLayout>
        <div className="children">Layout</div>
      </PrendeTVLayout>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.children').text()).toBe('Layout');
  });

  it('should render correctly with context', () => {
    const { Provider } = PrendeTVContext;
    const wrapper = mount(
      <Provider value={contextData}>
        <PrendeTVLayout>
          <div className="children">Layout</div>
        </PrendeTVLayout>
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.children').text()).toBe('Layout');
  });

  it('should render correctly without seo data', () => {
    const { Provider } = PrendeTVContext;
    delete contextData.page.data.seo;
    const wrapper = mount(
      <Provider value={contextData}>
        <PrendeTVLayout>
          <div className="children">Layout</div>
        </PrendeTVLayout>
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('.children').text()).toBe('Layout');
  });

  it('should render when path is not found', () => {
    const realUseContext = React.useContext;
    React.useContext = jest.fn(() => 'an invalid page');

    const wrapper = shallow(
      <PrendeTVLayout />
    );

    expect(wrapper).toHaveLength(1);

    React.useContext = realUseContext;
  });

  it('should trigger the 50% milestone', () => {
    jest.spyOn(gtmManager, 'triggerEvent');
    window.innerHeight = 500;
    window.dataLayer = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <PrendeTVLayout>
        <div className="children">Layout</div>
      </PrendeTVLayout>
    );
    const scrollTracker = wrapper.find('ScrollTracker');
    const instance = scrollTracker.instance();

    spyOn(instance.node.current, 'getBoundingClientRect').and.returnValue({
      bottom: -500,
      height: 1000,
    });
    instance.handleScroll();
    expect(gtmManager.triggerEvent).toBeCalled();
  });
});
