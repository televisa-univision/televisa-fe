import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import WithNativeMarker from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeMarker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import FourAcrossGrid from '.';
import ContentCard from '../../ContentCard';
import TopicBar from '../../TopicBar';
import Clickable from '../../Clickable';
import LongformWrapper from '../../LongformWrapper';

import mockApiData from './mockData.json';

storeHelpers.isCurrentPage = jest.fn();
storeHelpers.isUnivisionSite = jest.fn();

/**
 * Mocked content items for test
 * @type {Array}
 */
let simpleDataConstants = [];

beforeEach(() => {
  simpleDataConstants = [{
    device: 'desktop',
    settings: {
      title: 'Title',
      contentLimit: 4,
      type: 'Grid',
    },
  }];
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('FourAcrossGrid Spec', () => {
  it('should render without crashing', () => {
    const { settings } = simpleDataConstants[0];
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>,
      div
    );
  });

  it('should render the WithNativeMarker ad component', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(WithNativeMarker)).toBeDefined();
  });

  it('should render in dark', () => {
    features.shows.showsRedesign = jest.fn();
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const data = { data: { uri: 'univision.com/tv-en-vivo' }, pageCategory: 'show' };
    Store.dispatch(setPageData(data));
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(TopicBar).props().variant).toBe('dark');
  });

  it('should render a ContentCard component', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(ContentCard).length).toEqual(simpleDataConstants[0].settings.contentLimit);
  });

  it('should render all ContentCards if contentLimit is undefined', () => {
    let { settings } = simpleDataConstants[0];
    let bogusContentLimit;
    settings = {
      ...settings,
      contentLimit: bogusContentLimit,
    };
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(ContentCard).length).toEqual(mockApiData.length);
  });

  it('should render ContentCards equal to contentLimit if defined', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(FourAcrossGrid).props().content.length).toBeGreaterThan(0);
    expect(wrapper.find(ContentCard).length).toEqual(settings.contentLimit);
  });

  it('should render ContentCards if content is an array greather than 0', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    const gridInstance = wrapper.find(FourAcrossGrid);
    expect(Array.isArray(gridInstance.props().content)).toEqual(true);
    expect(gridInstance.props().content.length).toBeGreaterThan(0);
  });

  it('should not crash ContentCards if content is an empty array', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={[]}
          settings={settings}
        />
      </Provider>
    );
    const gridInstance = wrapper.find(FourAcrossGrid);
    expect(Array.isArray(gridInstance.props().content)).toEqual(true);
    expect(gridInstance.props().content.length).toEqual(0);
  });

  it('should render vertical ContentCard', () => {
    const { settings } = simpleDataConstants[0];
    const device = 'desktop';
    const type = 'vertical';
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
          device={device}
          view="vertical"
        />
      </Provider>
    );
    const card = wrapper.find(ContentCard).first();
    expect(card.props().view).toEqual(type);
  });

  it('should render horizontal ContentCard', () => {
    const { settings } = simpleDataConstants[0];
    const device = 'mobile';
    const type = 'horizontal';
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
          device={device}
          view="horizontal"
        />
      </Provider>
    );
    const card = wrapper.find(ContentCard).first();
    expect(card.props().view).toEqual(type);
  });

  it('should render a title button if title prop is defined', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(TopicBar).length).toEqual(1);
  });

  it('should render a title button that equals passed title', () => {
    const { settings } = simpleDataConstants[0];
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(TopicBar).props()).toHaveProperty('settings.title', settings.title);
  });

  it('should pass author prop if authors array is defined', () => {
    const { settings } = simpleDataConstants[0];
    const authors = [{
      title: 'Author Name',
    }];

    const content = [{
      ...mockApiData[0],
      authors,
    }];

    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={content}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(ContentCard).length).toEqual(1);
    expect(wrapper.find(ContentCard).props()).toHaveProperty('authors', authors);
  });

  it('should Featured Shows Widget', () => {
    const settings = {
      title: 'Title',
      contentLimit: 4,
      type: 'agnosticepisodeswidget',
    };
    storeHelpers.isCurrentPage.mockReturnValueOnce(false);
    storeHelpers.isUnivisionSite.mockReturnValueOnce(true);
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(Clickable)).toHaveLength(1);
    expect(wrapper.find(Clickable).props()).toHaveProperty('label', localization.get('viewMoreTVShows'));
  });

  it('should not add more episodes button if not univision site', () => {
    const settings = {
      title: 'Title',
      contentLimit: 4,
      type: 'agnosticepisodeswidget',
    };
    storeHelpers.isCurrentPage.mockReturnValueOnce(true);
    storeHelpers.isUnivisionSite.mockReturnValueOnce(false);
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(Clickable)).toHaveLength(0);
  });

  it('should Agnostic Episodes Widget', () => {
    const settings = {
      title: 'Title',
      contentLimit: 4,
      type: 'agnosticepisodeswidget',
    };

    const content = [{
      type: 'video',
      title: 'A lot of enhancements',
      image: {
        type: 'image',
        uid: '0000015f-4a88-d615-a7ff-6a9fcf760000',
        title: 'Dwyane Wade, centro, de los Cavaliers de Cleveland, se dirige a la canasta entre Terrence Ross, izquierda, y Evan Fournier, del Magic de Orlando, en duelo de NBA el sábado 21 de octubre de 2017 en Cleveland. (AP Foto/Tony Dejak)',
        renditions: {
          original: {
            href:
              'https://cdn3.performance.univision.com/4c/ed/f85ecd8b4944911f690644080644/c1ab694a05af45bebff95b2fef5af960',
            width: 3456,
            height: 2500,
          },
        },
        primaryTag: {
          name: 'K-Love 107.5',
          link: '/los-angeles/klve',
        },
        primaryTopic: 'Local',
        leadType: null,
      },
    }];
    storeHelpers.isCurrentPage.mockReturnValueOnce(false);
    storeHelpers.isUnivisionSite.mockReturnValueOnce(true);

    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={content}
          settings={settings}
        />
      </Provider>
    );
    expect(wrapper.find(LongformWrapper)).toHaveLength(1);
    expect(wrapper.find(Clickable).props()).toHaveProperty('label', localization.get('exploreEpisodes'));
  });

  it('should track clicks on CTA', () => {
    const trackSpy = jest.spyOn(WidgetTracker, 'track');
    const settings = {
      title: 'Title',
      contentLimit: 4,
      type: 'agnosticepisodeswidget',
    };
    storeHelpers.isCurrentPage.mockReturnValueOnce(false);
    storeHelpers.isUnivisionSite.mockReturnValueOnce(true);
    const wrapper = mount(
      <Provider store={Store}>
        <FourAcrossGrid
          content={mockApiData}
          settings={settings}
        />
      </Provider>
    );
    wrapper.find(Clickable).simulate('click');
    expect(trackSpy).toHaveBeenLastCalledWith(expect.any(Function), expect.any(Object));
  });
});
