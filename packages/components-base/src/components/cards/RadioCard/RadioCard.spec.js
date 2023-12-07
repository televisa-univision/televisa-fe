import React from 'react';

import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import {
  LIST,
  SQUARE,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';

import RadioCard from '.';

import props from './__mocks__/radioCard';

/** @test {RadioCard} */
describe('RadioCard', () => {
  it(`should render the RadioCard (${LIST})`, () => {
    const wrapper = mount(
      <Provider store={Store}>
        <RadioCard {...props.podcast} type={LIST} />
      </Provider>
    );

    expect(wrapper.find('RadioCard__RadioCardBackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardBackgroundImage')).toHaveLength(0);
    expect(wrapper.find('RadioCard__RadioCardContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardDescription')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardImageContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardLogoContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButton')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButtonLabel')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPodcastLength')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardTitle')).toHaveLength(1);
  });

  it(`should render the RadioCard (${SQUARE})`, () => {
    Store.dispatch(
      setPageData({
        data: {
          uri: 'https://www.univision.com/radio',
        },
      })
    );
    const wrapper = mount(
      <Provider store={Store}>
        <RadioCard {...props.podcast} type={SQUARE} />
      </Provider>
    );

    expect(wrapper.find('RadioCard__RadioCardBackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardBackgroundImage')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardDescription')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardImageContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardLogoContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButton')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButtonLabel')).toHaveLength(0);
    expect(wrapper.find('RadioCard__RadioCardPodcastLength')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardTitle')).toHaveLength(1);
  });

  it(`should render the RadioCard (${SQUARE}) with truncated description`, () => {
    Store.dispatch(
      setPageData({
        data: {
          uri: 'https://www.univision.com/radio',
        },
      })
    );
    const longDescProps = {
      ...props.radiostation,
      description: 'This is a really long description that will truncate',
      localMarket: { title: 'This is a really really long market that will truncate' },
    };
    const wrapper = mount(
      <Provider store={Store}>
        <RadioCard {...longDescProps} type={SQUARE} />
      </Provider>
    );
    const longDescPropsNoMarket = {
      ...props.radiostation,
      description: 'This is a really long description that will truncate',
      localMarket: null,
      sharing: null,
    };
    const wrapperNoMarket = mount(
      <Provider store={Store}>
        <RadioCard {...longDescPropsNoMarket} type={SQUARE} />
      </Provider>
    );

    expect(wrapper.find('RadioCard__RadioCardDescription').text()).toEqual('This is a really long description that will truncate • This is a really really…');
    expect(wrapperNoMarket.find('RadioCard__RadioCardDescription').text()).toEqual('This is a really long description that will truncate ');
  });

  it(`should render the RadioCard (${VERTICAL})`, () => {
    const wrapper = mount(
      <Provider store={Store}>
        <RadioCard {...props.podcast} type={VERTICAL} />
      </Provider>
    );

    expect(wrapper.find('RadioCard__RadioCardBackgroundOverlay')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardBackgroundImage')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardDescription')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardImageContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardLogoContainer')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButton')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardPlayButtonLabel')).toHaveLength(0);
    expect(wrapper.find('RadioCard__RadioCardPodcastLength')).toHaveLength(1);
    expect(wrapper.find('RadioCard__RadioCardTitle')).toHaveLength(1);
  });
});
