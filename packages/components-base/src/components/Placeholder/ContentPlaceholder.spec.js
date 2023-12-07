import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import {
  EmptyPlaceholder,
  ContentPlaceholder,
  ImagePlaceholder,
  OpeningPlaceholder,
  CardPlaceHolder,
} from '.';

import TVGuidePlaceholder from './tvGuideCards';
import HorizontalCardPlaceholder from './horizontalCard';
import SearchPlaceholder from './searchCard';

describe('Placeholder', () => {
  it('renders as expected', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentPlaceholder />, div);
  });

  it('renders as expected with width', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentPlaceholder hasWidth />, div);
  });

  it('renders a empty div', () => {
    const wrapper = shallow(<EmptyPlaceholder type="empty" />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders an img', () => {
    const wrapper = shallow(ImagePlaceholder({ renditions: {} })());
    expect(wrapper.length).toBe(1);
  });

  it('renders a fullwidth image', () => {
    const wrapper = shallow(ImagePlaceholder({ renditions: {} }, true, true)());
    expect(wrapper.find('[aspectRatio]')).toHaveLength(1);
  });
});

describe('OpeningPlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<OpeningPlaceholder />);
    expect(wrapper.find('CardPlaceHolder').length).toBe(4);
  });
});

describe('CardPlaceHolder', () => {
  it('renders as expected', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardPlaceHolder />, div);
  });
});

describe('HorizontalCardPlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = mount(<HorizontalCardPlaceholder />);
    expect(wrapper.find('horizontalCard__SkeletonWrapper')).toHaveLength(1);
  });
});

describe('TVGuidePlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<TVGuidePlaceholder />);
    expect(wrapper.find('HorizontalCardPlaceholder').length).toBe(3);
  });
});

describe('SearchPlaceholder', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<SearchPlaceholder numberOfCards={3} />);
    expect(wrapper.find('HorizontalCardPlaceholder').length).toBe(3);
  });
});
