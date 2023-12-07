import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import {
  ConnectedWithNativeContent,
} from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeContent';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import {
  LARGE,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { HOROSCOPE } from '@univision/fe-commons/dist/constants/pageCategories';
import SquareCard from '../../../../cards/SquareCards/SquareCard';
import * as WithPersonalizedWidgetContent from '../../../../personalize/WithPersonalizedWidgetContent';

import GridCard, { areEqualProps } from '.';
import mockData from '../__mocks__/gridMockData.json';

const store = configureStore();
const props = {
  cardContent: mockData[0].content[0],
  device: 'desktop',
};

let personalizedWidgetContentMock;
const widgetContentComp = () => { return null; }; // eslint-disable-line require-jsdoc

/** @test {GridCard} */
describe('Grid card test', () => {
  beforeEach(() => {
    personalizedWidgetContentMock = jest.spyOn(WithPersonalizedWidgetContent, 'default')
      .mockImplementation(() => widgetContentComp);
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
        />
      </Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('GridCard__Card')).toHaveLength(1);
  });

  it('should render SquareCard by default on desktop', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={3}
        />
      </Provider>
    );

    expect(wrapper.find('SquareCard')).toHaveLength(1);
  });

  it('should render SquareCard on desktop up to card 2 if listGrid is true', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={2}
          listGrid
        />
      </Provider>
    );

    expect(wrapper.find('SquareCard')).toHaveLength(1);
  });

  it('should render ListCard on desktop from card 3 onwards if listGrid is true', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={3}
          listGrid
        />
      </Provider>
    );

    expect(wrapper.find('ListCard')).toHaveLength(1);
  });

  it('should render SquareCard on mobile for first card', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          device="mobile"
          cardPosition={0}
          isFirst
        />
      </Provider>
    );

    expect(wrapper.find('SquareCard')).toHaveLength(1);
  });

  it('should render the personalized component', () => {
    const personalizedProps = {
      ...props,
      cardContent: {
        ...mockData[0].content[0],
        personalizationType: HOROSCOPE,
      },
    };
    mount(
      <Provider store={store}>
        <GridCard
          {...personalizedProps}
          device="mobile"
          cardPosition={0}
          isFirst
        />
      </Provider>
    );

    expect(personalizedWidgetContentMock).toHaveBeenCalledWith(0, HOROSCOPE, SquareCard);
  });

  it('should render ListCard by default on mobile from card 2 onwards', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          device="mobile"
          cardPosition={1}
        />
      </Provider>
    );

    expect(wrapper.find('ListCard')).toHaveLength(1);
  });

  it('should apply card size by position', () => {
    const mainSize = LARGE;
    const otherSize = SMALL;
    const wrapperFirst = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={1}
          mainCardSize={mainSize}
          isFirst
        />
      </Provider>
    );
    const wrapperSecond = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={2}
          otherCardSize={otherSize}
          isFirst={false}
        />
      </Provider>
    );

    expect(wrapperFirst.find('SquareCard').prop('size')).toEqual(LARGE);
    expect(wrapperSecond.find('SquareCard').prop('size')).toEqual(SMALL);
  });

  it('should set isInlineVideo on first card and with content type video', () => {
    const propsVideo = {
      cardContent: {
        ...props.cardContent,
        type: contentTypes.VIDEO,
      },
    };
    const wrapperFirst = mount(
      <Provider store={store}>
        <GridCard
          {...propsVideo}
          cardPosition={1}
          isFirst
        />
      </Provider>
    );
    const wrapperSecond = mount(
      <Provider store={store}>
        <GridCard
          {...propsVideo}
          cardPosition={2}
          isFirst={false}
        />
      </Provider>
    );

    expect(wrapperFirst.find('SquareCard').prop('isInlineVideo')).toBe(true);
    expect(wrapperSecond.find('SquareCard').prop('isInlineVideo')).toBe(false);
  });

  it('should load a DigitalChannelEPG if the isDigitalChannelLiveStream is set to true', () => {
    const propsVideo = {
      cardContent: {
        ...props.cardContent,
        type: contentTypes.VIDEO,
        isDigitalChannelLiveStream: true,
      },
    };
    const wrapperFirst = mount(
      <Provider store={store}>
        <GridCard
          {...propsVideo}
          cardPosition={1}
          isFirst
        />
      </Provider>
    );

    expect(wrapperFirst.find('DigitalChannelEPG')).toHaveLength(1);
  });

  it('should render the AdWrapper if shouldRenderAd is true and card position is 1', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardWidgetContext={{ id: 'test', position: 1 }}
          device="mobile"
          cardPosition={1}
          shouldRenderAd
        />
      </Provider>
    );

    expect(wrapper.find('GridCard__AdWrapper')).toHaveLength(1);
  });

  it('should not render the AdWrapper if shouldRenderAd is false', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          device="desktop"
          cardPosition={1}
          shouldRenderAd={false}
        />
      </Provider>
    );

    expect(wrapper.find('GridCard__AdWrapper')).toHaveLength(0);
  });

  it('should render ConnectedWithNativeContent just in the last item', () => {
    const wrapperFirst = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={1}
          isFirst
        />
      </Provider>
    );
    const wrapperLast = mount(
      <Provider store={store}>
        <GridCard
          {...props}
          cardPosition={2}
          isLast
        />
      </Provider>
    );

    expect(wrapperFirst.find(ConnectedWithNativeContent)).toHaveLength(0);
    expect(wrapperLast.find(ConnectedWithNativeContent)).toHaveLength(1);
  });

  it('should not re-render if not change content id or personalization type', () => {
    expect(areEqualProps(props, { ...props })).toBe(true);
    expect(areEqualProps(props, { cardContent: { ...props.cardContent, uid: '023' } })).toBe(false);
    expect(areEqualProps(props, { cardContent: { ...props.cardContent, personalizationType: '023' } })).toBe(false);
  });

  it('should grab content uri if hierarchy is not present', () => {
    const modifiedProps = {
      ...props,
      cardContent: {
        ...props.cardContent,
        hierarchy: [],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <GridCard {...modifiedProps} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('GridCard__Card')).toHaveLength(1);
  });

  it('should fallback to widget theme when vertical theme is empty', () => {
    const modifiedProps = {
      ...props,
      cardContent: {
        ...props.cardContent,
        hierarchy: [
          { uri: '/invalid' },
        ],
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <GridCard {...modifiedProps} />
      </Provider>
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('GridCard__Card')).toHaveLength(1);
  });
});
