import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import {
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import data from '../../__mocks__/squareCard';
import PodcastEpisodeCard from '.';

const store = configureStore();

describe('PodcastEpisodeCard', () => {
  it('should render without crashing', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <PodcastEpisodeCard />
      </Provider>,
      div
    );
  });
  it('renders correctly with valid props for medium', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastEpisodeCard
          {...data[7]}
          size={MEDIUM}
        />
      </Provider>
    );
    expect(wrapper.find('PodcastEpisodeCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardPlayButton')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardLabel')).toHaveLength(0);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardTitle')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardDescription')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItemButton')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItem')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__Wrapper').prop('size')).toBe(MEDIUM);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItem').text()).toBe('');
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardTitle').text()).toBe(
      'Trump habla en vivo de la crisis en los centros de detención en la frontera, de la crisis en los centros de detención en la frontera'
    );
  });
  it('renders correctly with valid props for small with new episode', () => {
    const wrapper = mount(
      <Provider store={store}>
        <PodcastEpisodeCard
          {...data[7]}
          size={SMALL}
          duration="2:00"
          feedPubDate={new Date().getTime()}
        />
      </Provider>
    );
    expect(wrapper.find('PodcastEpisodeCard__Wrapper')).toHaveLength(1);
    expect(wrapper.find('BackgroundImage')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardPlayButton')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardLabel')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardTitle')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardDescription')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItemButton')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItem')).toHaveLength(1);
    expect(wrapper.find('PodcastEpisodeCard__Wrapper').prop('size')).toBe(SMALL);
    expect(wrapper.find('PodcastEpisodeCard__EpisodeCardItem').text()).toBe('2:00');
  });
});
