import React from 'react';
import { shallow } from 'enzyme';

import HorizontalSlideshow from '.';

const sampleSlides = [
  {
    uid: 0, image: { credit: 'test', renditions: { original: { href: 'test' } } }, caption: 'Test',
  },
  {
    uid: 0, image: { credit: 'test', renditions: { original: { href: 'test' } } }, caption: 'Test', credit: 'Test',
  },
  { uid: 1, image: {} },
  { uid: 2, image: {} },
  { uid: 3, image: {} },
  { uid: 4, image: {} },
  { image: {}, caption: 'Test' },
];

/** @test {InlineSlideshow} */
describe('InlineSlideshow', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<HorizontalSlideshow />);
    expect(wrapper).toBeDefined();
  });

  it('should inject ads slides', () => {
    const wrapper = shallow(<HorizontalSlideshow uid="1" type="inline" slides={sampleSlides} />);
    const slides = wrapper.instance().getSlides();
    expect(slides.length).toEqual(9);
  });
});
