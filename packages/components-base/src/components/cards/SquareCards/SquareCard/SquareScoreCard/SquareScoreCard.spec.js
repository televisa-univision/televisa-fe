import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import data from '../__mocks__/squareCard';
import matchData from './__mocks__/squareMatchCard.json';
import SquareScoreCard from '.';

const store = configureStore();

describe('SquareScoreCard', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <SquareScoreCard />
      </Provider>,
      div
    );
  });
  it('renders correctly with valid props for large', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.cell}
          size={LARGE}
        />
      </Provider>
    );
    expect(wrapper.find('SquareScoreCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__PictureStyled')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__MatchImageWrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__BackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__Wrapper').prop('size')).toBe(LARGE);
    expect(wrapper.find('ScoreCardBadge').prop('cardLabel')).toBe('EN JUEGO');
    expect(wrapper.find('SquareScoreCard__ScoreWrapper')).toHaveStyleRule('left', '24px');
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.cell}
          size={MEDIUM}
        />
      </Provider>
    );
    expect(wrapper.find('SquareScoreCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__PictureStyled')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__MatchImageWrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__BackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('ScoreCardBadge').prop('cardLabel')).toBe('EN JUEGO');
    expect(wrapper.find('SquareScoreCard__ScoreWrapper')).toHaveStyleRule('left', '16px');
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.cell}
          size={SMALL}
          shouldFetchMatch
          getMatch={() => {}}
        />
      </Provider>
    );
    expect(wrapper.find('SquareScoreCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__PictureStyled')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__MatchImageWrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__BackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('ScoreCardBadge').prop('cardLabel')).toBe('EN JUEGO');
    expect(wrapper.find('SquareScoreCard__ScoreWrapper')).toHaveStyleRule('left', '8px');
  });
  it('renders correctly with valid props for is list card', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.cell}
          size={SMALL}
          shouldFetchMatch
          getMatch={() => {}}
          isListCard
        />
      </Provider>
    );
    expect(wrapper.find('SquareScoreCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__PictureStyled')).toHaveLength(0);
    expect(wrapper.find('SquareScoreCard__MatchImageWrapper')).toHaveLength(0);
    expect(wrapper.find('SquareScoreCard__BackgroundOverlay')).toHaveLength(0);
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('ScoreCardBadge').prop('cardLabel')).toBe('EN JUEGO');
    expect(wrapper.find('SquareScoreCard__ScoreWrapper')).toHaveStyleRule('bottom', '0');
  });
  it('renders correctly with valid props for is list card and text only', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.cell}
          size={SMALL}
          shouldFetchMatch
          getMatch={() => {}}
          isListCard
          isTextOnly
        />
      </Provider>
    );
    expect(wrapper.find('SquareScoreCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__PictureStyled')).toHaveLength(0);
    expect(wrapper.find('SquareScoreCard__MatchImageWrapper')).toHaveLength(0);
    expect(wrapper.find('SquareScoreCard__BackgroundOverlay')).toHaveLength(0);
    expect(wrapper.find('ScoreCardBadge')).toHaveLength(0);
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('SquareScoreCard__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('SquareScoreCard__ScoreWrapper')).toHaveStyleRule('bottom', '0');
  });
  it('should render MatchCardScore with color #00ffb0', () => {
    const wrapper = mount(
      <Provider store={store}>
        <SquareScoreCard
          {...data[10]}
          {...matchData.default}
          size={LARGE}
          widgetContext={{ isWorldCupMVP: true }}
        />
      </Provider>
    );
    expect(wrapper.find('MatchCardScore')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore__VideoIconWrapper')).toHaveLength(1);
    expect(wrapper.find('MatchCardScore__GradientWrapper')).toHaveLength(1);
    expect(wrapper.find('Gradient')).toHaveLength(1);
    expect(wrapper.find('Gradient').prop('colors')).toStrictEqual(['#00ffb0', '#00ffb0']);
  });
});
