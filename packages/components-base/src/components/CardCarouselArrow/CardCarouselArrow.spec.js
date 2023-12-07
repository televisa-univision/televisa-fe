import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';

import CardCarouselArrow from '.';

describe('CardCarouselArrow suite', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CardCarouselArrow />, div);
  });
  it('should render dark variant', () => {
    const wrapper = mount(<CardCarouselArrow variant="dark" />);
    expect(wrapper.find('CardCarouselArrow__ArrowButton')).toHaveStyleRule('background-color', '#333333');
    expect(wrapper.find('Icon').props().fill).toBe('#ffffff');
  });
  it('should render right direction', () => {
    const wrapper = mount(<CardCarouselArrow direction="right" size={30} />);
    expect(wrapper.find('Icon').props().name).toBe('arrowRight');
  });
  it('should apply the transform style when the arrow is hidden', () => {
    const wrapper = mount(<CardCarouselArrow isHidden />);
    expect(wrapper.find('CardCarouselArrow__Box')).toHaveStyleRule('transform', 'translate3d(-104%,0,0)');
  });

  it('should apply the transform style when the arrow is hidden and direction right', () => {
    const wrapper = mount(<CardCarouselArrow isHidden direction="right" />);
    expect(wrapper.find('CardCarouselArrow__Box')).toHaveStyleRule('transform', 'translate3d(104%,0,0)');
  });
});
