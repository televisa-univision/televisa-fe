import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import getCardByContentType from '@univision/fe-components-base/dist/utils/cardMapper';
import * as AdSelector from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import * as pageSelectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';

import LocalOpening, { areStatePropsEqual } from './LocalOpening';
import data from './__mocks__/localOpening';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn(),
}));

jest.mock(
  '../../compound/WeatherCardContent/WeatherCardVideo',
  () => () => 'VideoCard'
);
jest.mock(
  '../../compound/WeatherCardContent/WeatherCardSlideshow',
  () => () => 'WeatherSlide'
);
jest.mock(
  '../../connected/WeatherCard',
  () => () => 'WeatherCard'
);

const store = configureStore();
const cardData = getCardByContentType(data.content[0]);
const widgetContext = {
  id: 'foo',
  position: 1,
};

features.content.hasEnhancement = jest.fn(() => true);

// @TODO: Remove all showEnhancement references
//  after the new SquareCard is deployed on Jan/2021
//  and feature flag showEnhancement is removed

/** @test {Local Opening Widget} */
describe('LocalOpening', () => {
  beforeEach(() => {
    jest.spyOn(AdSelector, 'isTopAdInsertedSelector').mockReturnValue(true);
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('mobile');
    delete process.env.APP_VERSION;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should render without crashing (showEnhancement flag on)', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render without crashing (showEnhancement flag off)', () => {
    features.content.hasEnhancement.mockReturnValueOnce(false);
    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render without crashing (showEnhancement flag off) PORTRAIT', () => {
    features.content.hasEnhancement.mockReturnValueOnce(false);
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('desktop');
    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render on mobile without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render on mobile without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render on desktop without crashing', () => {
    jest.spyOn(pageSelectors, 'deviceSelector').mockReturnValue('desktop');

    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} widgetContext={widgetContext} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render without a lead card without crashing', () => {
    data.content = null;

    const wrapper = mount(
      <Provider store={store}>
        <LocalOpening cardData={cardData} {...data} />
      </Provider>
    );

    expect(wrapper.find('LocalOpening')).toHaveLength(1);
  });

  it('should render ad with next', async () => {
    const wrapper = await mount(
      <Provider store={store}>
        <LocalOpening
          cardData={cardData}
          shouldInjectTopAd
          {...data}
          widgetContext={{
            position: 1,
          }}
        />
      </Provider>
    );
    expect(wrapper.find('LocalOpening__AdWrapper')).toHaveLength(1);
  });

  describe('LocalOpening Widget - areStatePropsEqual', () => {
    it('should return true', () => {
      expect(areStatePropsEqual(
        {
          content: 'some content',
        },
        {
          content: 'some content',
        }
      )).toBeTruthy();
    });

    it('should return false', () => {
      expect(areStatePropsEqual(
        {
          content: 'some content',
        },
        {
          content: 'another content',
        }
      )).toBeFalsy();
    });
  });
});
