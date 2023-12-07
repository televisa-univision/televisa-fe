import React from 'react';
import { mount } from 'enzyme';

import CardsCarousel from '.';

describe('CardsCarousel placeholder', () => {
  it('should render as expected', () => {
    const wrapper = mount(<CardsCarousel removeContainerSpaces device="desktop" />);

    expect(wrapper.find('CardsCarousel__TitleBar')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Container')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Card')).toHaveLength(3);
    expect(wrapper.find('CardsCarousel__Separator')).toHaveLength(2);
  });

  it('should render as expected for medium devices', () => {
    const wrapper = mount(<CardsCarousel device="desktop" />);

    expect(wrapper.find('CardsCarousel__TitleBar')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Container')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Card')).toHaveLength(3);
    expect(wrapper.find('CardsCarousel__Separator')).toHaveLength(2);
  });

  it('should render as expected for small devices', () => {
    const wrapper = mount(<CardsCarousel device="tablet" />);

    expect(wrapper.find('CardsCarousel__TitleBar')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Container')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Card')).toHaveLength(2);
    expect(wrapper.find('CardsCarousel__Separator')).toHaveLength(1);
  });

  it('should render as expected for extra small devices', () => {
    const wrapper = mount(<CardsCarousel device="mobile" />);

    expect(wrapper.find('CardsCarousel__TitleBar')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__TitleContainer')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Container')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Card')).toHaveLength(1);
    expect(wrapper.find('CardsCarousel__Separator')).toHaveLength(0);
  });
});
