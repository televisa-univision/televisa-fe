import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import {
  LANDSCAPE, RECTANGLE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import { PODCAST_EPISODE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/podcastCard';

import CardPictureIcon, { MediaCard } from '.';

const image = {
  type: 'image',
  uid: '00000153-f1f1-d20a-a97b-fdf934a70000',
  title: 'Univision Fallback Image',
  caption: null,
  credit: null,
  renditions: {
    original: {
      href: 'https://uvn-brightspot-lower.s3.amazonaws.com/2b/c4/4ed2e58b4bb6a2ef10f080abaa0d/contra-poder-podcst-2x.jpg',
      width: 2920,
      height: 1948,
      focusPoint: {
        x: 0.5089779434607021,
        y: 0.45656542804894135,
      },
    },
  },
};

describe('CardPictureIcon suite', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardPictureIcon />, div);
  });
  it('should render with Icon', () => {
    const wrapper = mount(
      <CardPictureIcon
        type={LANDSCAPE}
        title="test"
        image={image}
        aspectRatio={PODCAST_EPISODE_CARD_RATIOS[LANDSCAPE]}
        iconName="playcircle"
      />
    );
    expect(wrapper.find(MediaCard).length).toBe(1);
    expect(wrapper.find('Icon').length).toBe(1);
  });

  it('should render without Icon', () => {
    const wrapper = mount(
      <CardPictureIcon
        type={RECTANGLE}
        title="test"
        image={image}
        aspectRatio={PODCAST_EPISODE_CARD_RATIOS[RECTANGLE]}
        iconName="playcircle"
      />
    );
    expect(wrapper.find(MediaCard).length).toBe(1);
    expect(wrapper.find('Icon').length).toBe(0);
  });
});
