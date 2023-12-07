import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import {
  DEEP_SEA,
  TROPICAL_RAIN_FOREST,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import * as AdSelector from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';

import GridWidgetComponent from './GridConnector';
import mockData from './__mocks__/gridMockData.json';

const store = configureStore();

/** @test {Grid widget} */
describe('Grid Widget test', () => {
  beforeEach(() => {
    jest.spyOn(AdSelector, 'isTopAdInsertedSelector').mockReturnValue(false);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render the GridWidgetComponent', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[0]}
        />
      </Provider>
    );
    expect(wrapper.find('div'));
  });

  it('should render and track the cta', () => {
    global.innerWidth = 768;
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    store.dispatch(setPageData({ breakpoint: { size: 'sm' } }));
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          content={mockData[0].content}
          settings={{
            ...mockData[0].settings,
            seeMoreLink: {
              href: 'https://qa.x.univision.com/noticias',
              target: '_self',
              text: 'ver mas',
              uid: '0000016d-d6eb-d24b-a3ef-d6fbfae90001',
            },
            listTitle: null,
          }}
          widgetContext={{
            name: 'GridWidget',
          }}
          device="tablet"
        />
      </Provider>
    );
    act(() => {
      wrapper.find('button').simulate('click');
    });
    wrapper.update();

    expect(trackerSpy).toHaveBeenLastCalledWith(
      { title: '', uid: '' },
      { name: 'GridWidget2' },
      'ver_mas'
    );
  });

  it('should correctly apply the theme', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[0]}
          theme={{ primary: TROPICAL_RAIN_FOREST }}
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', TROPICAL_RAIN_FOREST);
  });

  it('should render correctly in dark mode', () => {
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    const darkProps = {
      ...mockData[0],
      settings: {
        ...mockData[0].settings,
        title: 'Test title',
      },
      commonRootSection: {
        uri: 'shows',
      },
      theme: {
        isDark: true,
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...darkProps}
          breakpoint="sm"
          device="tablet"
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveLength(2);
    expect(wrapper.find('WidgetTitle').at(1)).toHaveStyleRule('color', WHITE);
  });

  it('should render the AdWrapper on mobile', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[0]}
          widgetContext={{ id: 'test', position: 1 }}
          device="mobile"
          shouldInjectTopAd
        />
      </Provider>
    );
    expect(wrapper.find('GridCardsContainer').prop('shouldRenderAd')).toBe(true);
  });

  it('should have prop isWorldCupMvp FALSE on ListContainer ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[1]}
          settings={{
            ...mockData[0].settings,
            seeMoreLink: {
              href: 'https://qa.x.univision.com/noticias',
              target: '_self',
              text: 'ver mas',
              uid: '0000016d-d6eb-d24b-a3ef-d6fbfae90001',
            },
            listTitle: null,
          }}
        />
      </Provider>
    );
    expect(wrapper.find('GridEnhancement__ButtonWrapperStyled').prop('isWorldCupMVP')).toBe(false);
  });
  it('should have prop isWorldCupMvp true ButtonWrapperStyled', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[1]}
          settings={{
            ...mockData[0].settings,
            seeMoreLink: {
              href: 'https://qa.x.univision.com/noticias',
              target: '_self',
              text: 'ver mas',
              uid: '0000016d-d6eb-d24b-a3ef-d6fbfae90001',
            },
            listTitle: null,
          }}
        />
      </Provider>
    );
    expect(wrapper.find('GridEnhancement__ButtonWrapperStyled').prop('isWorldCupMVP')).toBe(true);
  });

  it('it should show the WidgetTitle with color rebrand MVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <GridWidgetComponent
          {...mockData[0]}
          theme={{ widgetTitleColor: DEEP_SEA }}
        />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', DEEP_SEA);
  });
});
