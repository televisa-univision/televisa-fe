import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import {
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';

import data from '../../__mocks__/squareCard';
import PodcastSeriesCard from '.';

describe('PodcastSeriesCard', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <PodcastSeriesCard />,
      div
    );
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <PodcastSeriesCard
        {...data[13]}
        size={MEDIUM}
      />
    );
    expect(wrapper.find('PodcastSeriesCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardContainer')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardLabel')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardLinkImage')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardDescription')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem')).toHaveLength(2);
    expect(wrapper.find('PodcastSeriesCard__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem').first().text()).toBe('Noticias');
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem').last().text()).toBe('1 Episodio');
  });
  it('renders correctly with valid props for small', () => {
    const wrapper = mount(
      <PodcastSeriesCard
        {...data[13]}
        size={SMALL}
        episodeCount={10}
      />
    );
    expect(wrapper.find('PodcastSeriesCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardContainer')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardLabel')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardLinkImage')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardDescription')).toHaveLength(1);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem')).toHaveLength(2);
    expect(wrapper.find('PodcastSeriesCard__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem').first().text()).toBe('Noticias');
    expect(wrapper.find('PodcastSeriesCard__SeriesCardItem').last().text()).toBe('10 Episodios');
  });
});
